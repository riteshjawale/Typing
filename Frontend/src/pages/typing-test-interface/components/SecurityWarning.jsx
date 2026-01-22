import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SecurityWarning = ({ message }) => {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3">
        <AlertTriangle size={20} />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default SecurityWarning;