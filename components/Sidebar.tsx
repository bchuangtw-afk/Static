import React from 'react';
import { PageId } from '../types';
import { 
  LayoutGrid, 
  BookOpen, 
  Info, 
  Mail, 
  Sparkles,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageId;
  onChangePage: (page: PageId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onChangePage }) => {
  
  const navItemClass = (isActive: boolean) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-medium' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }`;

  return (
    <div className="h-full w-64 bg-slate-900 flex flex-col border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-6 pb-8">
        <div className="flex items-center gap-3" onClick={() => onChangePage('home')} role="button">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Leona AI
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-3 flex flex-col gap-1">
        <div 
          onClick={() => onChangePage('home')}
          className={navItemClass(currentPage === 'home')}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Home</span>
        </div>
        
        <div 
          onClick={() => onChangePage('materials')}
          className={navItemClass(currentPage === 'materials')}
        >
          <BookOpen className="w-5 h-5" />
          <span>Class Materials</span>
        </div>

        <div 
          onClick={() => onChangePage('workshops')}
          className={navItemClass(currentPage === 'workshops')}
        >
          <GraduationCap className="w-5 h-5" />
          <span>Workshops</span>
        </div>

        <div 
          onClick={() => onChangePage('about')}
          className={navItemClass(currentPage === 'about')}
        >
          <Info className="w-5 h-5" />
          <span>About Us</span>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800">
        <div 
          onClick={() => onChangePage('contact')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <Mail className="w-5 h-5 text-slate-400" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-200">Contact</span>
            <span className="text-xs text-slate-500">Get in touch</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;