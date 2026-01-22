import React from 'react';
import { Timer } from 'lucide-react';

const PhaseTimer = ({ phaseName, timeRemaining, totalTime }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const progressPercentage = (timeRemaining / totalTime) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Timer className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Current Phase</p>
            <p className="text-xl font-bold text-gray-900">{phaseName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Time Remaining</p>
          <p className="text-3xl font-bold text-blue-600">{formatTime(timeRemaining)}</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default PhaseTimer;