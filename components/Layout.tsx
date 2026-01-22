
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateHowItWorks: () => void;
  onNavigateMethodology: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigateHome, onNavigateHowItWorks, onNavigateMethodology }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={onNavigateHome}
          >
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Psyche<span className="text-indigo-600">Guide</span></span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={onNavigateHowItWorks}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              How it works
            </button>
            <button 
              onClick={onNavigateMethodology}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Methodology
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">© 2024 PsycheGuide Assessment Platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
