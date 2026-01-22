import React from 'react';
import { TrendingUp, Download, Calendar, Award } from 'lucide-react';

const AttemptHistory = ({ language }) => {
  // Mock data for attempt history
  const attempts = [
    {
      id: 1,
      passageTitle: `${language === 'marathi' ? 'मराठी' : 'English'} Passage 3`,
      date: '2026-01-18',
      wpm: 45,
      accuracy: 92,
      errors: 8,
      duration: 10
    },
    {
      id: 2,
      passageTitle: `${language === 'marathi' ? 'मराठी' : 'English'} Passage 1`,
      date: '2026-01-17',
      wpm: 42,
      accuracy: 88,
      errors: 12,
      duration: 10
    },
    {
      id: 3,
      passageTitle: `${language === 'marathi' ? 'मराठी' : 'English'} Passage 2`,
      date: '2026-01-16',
      wpm: 38,
      accuracy: 85,
      errors: 15,
      duration: 10
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Attempt History</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>
      {attempts?.length === 0 ? (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No attempts yet. Start practicing to see your progress!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts?.map((attempt) => (
            <div
              key={attempt?.id}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{attempt?.passageTitle}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{attempt?.date}</span>
                    <span>•</span>
                    <span>{attempt?.duration} minutes</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">WPM</p>
                  <p className="text-2xl font-bold text-blue-600">{attempt?.wpm}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Accuracy</p>
                  <p className="text-2xl font-bold text-green-600">{attempt?.accuracy}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Errors</p>
                  <p className="text-2xl font-bold text-red-600">{attempt?.errors}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttemptHistory;