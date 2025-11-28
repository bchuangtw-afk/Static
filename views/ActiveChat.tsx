import React, { useState } from 'react';
import { ResourceItem } from '../types';
import ResourceCard from '../components/BotCard'; // Using the repurposed BotCard as ResourceCard
import { Search, Filter, FolderOpen } from 'lucide-react';

const MATERIALS_DATA: ResourceItem[] = [
  {
    id: '1',
    title: 'Lecture 1: Introduction to AI',
    description: 'Overview of artificial intelligence history, core concepts, and modern applications.',
    type: 'pdf',
    date: '2023-10-01'
  },
  {
    id: '2',
    title: 'Workshop: Prompt Engineering Basics',
    description: 'Hands-on guide to crafting effective prompts for LLMs. Includes examples and exercises.',
    type: 'doc',
    date: '2023-10-05'
  },
  {
    id: '3',
    title: 'Video: Neural Networks Explained',
    description: 'A 45-minute deep dive into how neural networks function, backpropagation, and weights.',
    type: 'video',
    date: '2023-10-10'
  },
  {
    id: '4',
    title: 'Reference: Python for Data Science',
    description: 'External resource link to the official documentation and best practices guide.',
    type: 'link',
    date: '2023-10-12'
  },
  {
    id: '5',
    title: 'Case Study: Generative AI in Healthcare',
    description: 'Analysis of how GenAI is transforming medical diagnosis and patient care.',
    type: 'pdf',
    date: '2023-10-15'
  },
  {
    id: '6',
    title: 'Lab Materials: Computer Vision',
    description: 'Assets and starter code for the computer vision laboratory session.',
    type: 'doc',
    date: '2023-10-20'
  }
];

const MaterialsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'video' | 'doc'>('all');

  const filteredMaterials = MATERIALS_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <FolderOpen className="w-6 h-6 text-indigo-600" />
            Class Materials
          </h1>
          <p className="text-slate-500 mt-1">
            Access and download all course resources, lecture notes, and supplementary guides.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur border-b border-slate-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search materials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 mr-2 hidden md:block" />
            {(['all', 'pdf', 'video', 'doc'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all whitespace-nowrap ${
                  filterType === type 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((item) => (
                <ResourceCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <FolderOpen className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">No materials found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialsView;