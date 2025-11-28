import React from 'react';
import { Announcement } from '../types';
import { ArrowRight, Star, Calendar } from 'lucide-react';

interface HomeProps {
  onNavigateToMaterials: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToMaterials }) => {
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'New AI Workshop Schedule Released',
      date: 'Oct 24, 2023',
      content: 'We have updated the calendar for the upcoming Winter semester workshops. Check the materials section for the full syllabus.',
      tag: 'News'
    },
    {
      id: '2',
      title: 'Lecture Slides: Neural Networks Intro',
      date: 'Oct 20, 2023',
      content: 'The slides from yesterday\'s guest lecture are now available for download.',
      tag: 'Resources'
    },
    {
      id: '3',
      title: 'System Maintenance',
      date: 'Oct 15, 2023',
      content: 'The student portal will be undergoing maintenance this weekend.',
      tag: 'System'
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-slate-50">
      
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Welcome to the <span className="text-indigo-600">Leona AI</span> Learning Hub
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Your central repository for course materials, research papers, and workshop resources. 
              Explore our comprehensive library of documentation designed to help you master AI concepts.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={onNavigateToMaterials}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
              >
                Browse Materials
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-white text-slate-700 border border-slate-300 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                Read Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Featured Section */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                Featured Content
              </h2>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-2">Introduction to Large Language Models</h3>
                <p className="text-indigo-100 mb-6 max-w-xl">
                  A comprehensive guide covering the basics of transformers, attention mechanisms, and prompt engineering strategies.
                </p>
                <button 
                  onClick={onNavigateToMaterials}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-50 transition-colors"
                >
                  Start Reading
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Upcoming Events</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Join our weekly webinars to discuss the latest trends in generative AI.
                  </p>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                    <Star className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Certification</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Complete the core modules to earn your Leona AI proficiency certificate.
                  </p>
               </div>
            </section>
          </div>

          {/* Announcements Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-8">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-800">Latest Announcements</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {announcements.map((item) => (
                  <div key={item.id} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.content}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">View All Updates</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;