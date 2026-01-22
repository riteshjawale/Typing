import React from 'react';
import { Home } from 'lucide-react';

const TestHeader = ({ onExit }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">MT</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Typing Test</h1>
              <p className="text-xs text-gray-500">Focus Mode Active</p>
            </div>
          </div>

          <button
            onClick={onExit}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Home size={18} />
            <span className="text-sm font-medium">Exit Test</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TestHeader;