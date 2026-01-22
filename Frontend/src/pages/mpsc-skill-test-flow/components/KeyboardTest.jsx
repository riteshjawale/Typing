import React, { useState } from 'react';
import { Keyboard, CheckCircle } from 'lucide-react';

const KeyboardTest = ({ language, onComplete }) => {
  const [testedKeys, setTestedKeys] = useState(new Set());
  const [currentKey, setCurrentKey] = useState('');

  const requiredKeys = language === 'marathi' 
    ? ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ']
    : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];

  const handleKeyPress = (e) => {
    const key = e?.key;
    setCurrentKey(key);
    
    if (requiredKeys?.includes(key)) {
      setTestedKeys(prev => new Set([...prev, key]));
    }
  };

  const progress = (testedKeys?.size / requiredKeys?.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Keyboard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Keyboard Test</h2>
          <p className="text-gray-600">Please test your keyboard by typing the keys shown below</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-600">{testedKeys?.size} / {requiredKeys?.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-600 mb-4">Type these keys:</p>
          <div className="grid grid-cols-10 gap-2">
            {requiredKeys?.map((key) => (
              <div
                key={key}
                className={`flex items-center justify-center h-12 rounded-lg font-semibold transition-all ${
                  testedKeys?.has(key)
                    ? 'bg-green-500 text-white' :'bg-white border-2 border-gray-300 text-gray-700'
                }`}
              >
                {key}
                {testedKeys?.has(key) && <CheckCircle className="w-4 h-4 ml-1" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2">Test your keyboard here:</p>
          <input
            type="text"
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Start typing..."
            autoFocus
          />
          {currentKey && (
            <p className="mt-2 text-sm text-gray-600">Last key pressed: <span className="font-semibold text-blue-600">{currentKey}</span></p>
          )}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Note:</span> This phase will automatically complete after the timer ends. 
            Please verify all keys are working properly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardTest;