import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './views/Dashboard';
import MaterialsView from './views/ActiveChat'; // Importing the Materials view
import { PageId } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigateToMaterials={() => setCurrentPage('materials')} />;
      case 'materials':
        return <MaterialsView />;
      case 'workshops':
      case 'about':
      case 'contact':
        // Generic placeholder for other static pages
        return (
          <div className="flex flex-col h-full bg-slate-50 p-12 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-sm border border-slate-200">
              <h1 className="text-3xl font-bold text-slate-900 mb-6 capitalize">{currentPage}</h1>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p className="text-lg mb-4">
                  Welcome to the {currentPage} section. This page is currently being updated with new content for the upcoming semester.
                </p>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 my-8">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Contact Information</h3>
                  <p>Email: support@leonaai.edu</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p className="mt-4 text-sm text-slate-500">Office Hours: Mon-Fri, 9:00 AM - 5:00 PM EST</p>
                </div>
                <p>
                  Please check back later or visit the <button onClick={() => setCurrentPage('home')} className="text-indigo-600 font-medium hover:underline">Home page</button> for the latest announcements.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onNavigateToMaterials={() => setCurrentPage('materials')} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
      
      <main className="flex-1 h-full relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;