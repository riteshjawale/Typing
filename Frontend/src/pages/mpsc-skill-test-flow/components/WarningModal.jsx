import React from 'react';
import { AlertTriangle, Maximize } from 'lucide-react';

const WarningModal = ({ message, onClose, onReturnFullscreen }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="bg-red-600 text-white p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Warning</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-800 text-lg mb-6">{message}</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Important:</span> Multiple violations will result in automatic exam submission.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                onReturnFullscreen();
                onClose();
              }}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Maximize className="w-5 h-5" />
              <span>Return to Fullscreen</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;