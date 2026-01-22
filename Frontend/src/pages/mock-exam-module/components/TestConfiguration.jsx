import React from 'react';
import { Settings, Clock, Type, Target, X } from 'lucide-react';

const TestConfiguration = ({ passage, config, onConfigChange, onStart, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8" />
              <div>
                <h3 className="text-2xl font-bold">Test Configuration</h3>
                <p className="text-blue-100">{passage?.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Timer Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Timer Duration (minutes)</span>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[5, 10, 15, 20]?.map((time) => (
                <button
                  key={time}
                  onClick={() => onConfigChange({ ...config, timer: time })}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    config?.timer === time
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time} min
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
              <Type className="w-5 h-5 text-blue-600" />
              <span>Font Size: {config?.fontSize}px</span>
            </label>
            <input
              type="range"
              min="12"
              max="24"
              value={config?.fontSize}
              onChange={(e) => onConfigChange({ ...config, fontSize: parseInt(e?.target?.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>12px</span>
              <span>24px</span>
            </div>
          </div>

          {/* Exam Mode */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Test Mode</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onConfigChange({ ...config, examMode: false })}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  !config?.examMode
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Practice Mode
              </button>
              <button
                onClick={() => onConfigChange({ ...config, examMode: true })}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  config?.examMode
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Exam Mode
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {config?.examMode
                ? 'Exam mode: No backspace, strict timing, no pause' :'Practice mode: Backspace allowed, can pause'}
            </p>
          </div>

          {/* Preview */}
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Passage Preview</p>
            <p className="text-gray-800" style={{ fontSize: `${config?.fontSize}px` }}>
              {passage?.preview}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={onStart}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
            >
              <span>Start Test</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConfiguration;