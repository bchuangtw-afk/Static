import React from 'react';
import { ResourceItem } from '../types';
import { FileText, Video, Link as LinkIcon, Download, ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  item: ResourceItem;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ item }) => {
  const getIcon = () => {
    switch(item.type) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'video': return <Video className="w-6 h-6 text-blue-500" />;
      case 'link': return <LinkIcon className="w-6 h-6 text-emerald-500" />;
      default: return <FileText className="w-6 h-6 text-slate-500" />;
    }
  };

  const getActionIcon = () => {
    return item.type === 'link' ? <ExternalLink className="w-4 h-4" /> : <Download className="w-4 h-4" />;
  };

  const getBadgeColor = () => {
     switch(item.type) {
      case 'pdf': return 'bg-red-50 text-red-700 border-red-100';
      case 'video': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'link': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="group bg-white rounded-xl p-5 border border-slate-200 hover:shadow-lg hover:border-indigo-100 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
          {getIcon()}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border ${getBadgeColor()}`}>
          {item.type}
        </span>
      </div>
      
      <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">{item.title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 h-10">{item.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <span className="text-xs text-slate-400 font-medium">{item.date}</span>
        <button className="flex items-center gap-2 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
          {item.type === 'link' ? 'Visit Link' : 'Download'}
          {getActionIcon()}
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;