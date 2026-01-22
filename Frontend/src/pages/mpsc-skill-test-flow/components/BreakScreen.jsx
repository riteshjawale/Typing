import React from 'react';
import { Coffee, Clock } from 'lucide-react';

const BreakScreen = ({ nextPhase }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <Coffee className="w-20 h-20 text-blue-600 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Break Time</h2>
        <p className="text-xl text-gray-600 mb-8">
          Take a moment to relax. The next phase will begin automatically.
        </p>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <p className="text-lg font-semibold text-gray-900">Next Phase</p>
          </div>
          <p className="text-2xl font-bold text-blue-600">{nextPhase}</p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <p className="text-sm text-green-800">
            <span className="font-semibold">Tip:</span> Use this time to stretch, hydrate, and prepare for the next section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakScreen;