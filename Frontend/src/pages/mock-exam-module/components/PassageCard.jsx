import React from 'react';
import { Lock, Clock, FileText, Play } from 'lucide-react';

const PassageCard = ({ passage, onSelect, getDifficultyColor }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
        passage?.isLocked ? 'opacity-75' : 'cursor-pointer transform hover:-translate-y-1'
      }`}
      onClick={() => onSelect(passage)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{passage?.title}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(passage?.difficulty)}`}>
              {passage?.difficulty?.charAt(0)?.toUpperCase() + passage?.difficulty?.slice(1)}
            </span>
          </div>
          {passage?.isLocked && (
            <Lock className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 line-clamp-3">{passage?.preview}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{passage?.estimatedTime} min</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>{passage?.wordCount} words</span>
          </div>
        </div>

        <button
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
            passage?.isLocked
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={passage?.isLocked}
        >
          {passage?.isLocked ? (
            <>
              <Lock className="w-5 h-5" />
              <span>Locked</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Start Test</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PassageCard;