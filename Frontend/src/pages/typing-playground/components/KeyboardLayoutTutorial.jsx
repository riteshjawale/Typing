import React, { useState } from 'react';
import { Volume2, Hand, Info, BookOpen } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const KeyboardLayoutTutorial = () => {
  const [selectedLayout, setSelectedLayout] = useState('remington');
  const [showFingerGuide, setShowFingerGuide] = useState(true);
  const [highlightedKey, setHighlightedKey] = useState(null);

  const layouts = [
    { value: 'remington', label: 'Marathi Remington' },
    { value: 'unicode', label: 'Marathi Unicode' },
    { value: 'krutidev055', label: 'Kruti Dev 055' },
    { value: 'krutidev010', label: 'Kruti Dev 010' },
  ];

  const remingtonKeys = [
    // Row 1
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    // Row 2
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    // Row 3
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
    // Row 4
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
  ];

  const marathiMapping = {
    'Q': 'ौ', 'W': 'ै', 'E': 'ा', 'R': 'ी', 'T': 'ू', 'Y': 'ब', 'U': 'ह', 'I': 'ग', 'O': 'द', 'P': 'ज',
    'A': 'ो', 'S': 'े', 'D': '्', 'F': 'ि', 'G': 'ु', 'H': 'प', 'J': 'र', 'K': 'क', 'L': 'त',
    'Z': 'ॉ', 'X': 'ं', 'C': 'म', 'V': 'न', 'B': 'व', 'N': 'ल', 'M': 'स',
  };

  const fingerColors = {
    leftPinky: 'bg-red-200 hover:bg-red-300',
    leftRing: 'bg-orange-200 hover:bg-orange-300',
    leftMiddle: 'bg-yellow-200 hover:bg-yellow-300',
    leftIndex: 'bg-green-200 hover:bg-green-300',
    thumb: 'bg-blue-200 hover:bg-blue-300',
    rightIndex: 'bg-green-200 hover:bg-green-300',
    rightMiddle: 'bg-yellow-200 hover:bg-yellow-300',
    rightRing: 'bg-orange-200 hover:bg-orange-300',
    rightPinky: 'bg-red-200 hover:bg-red-300',
  };

  const getFingerForKey = (key, rowIndex, keyIndex) => {
    if (rowIndex === 0) {
      if (keyIndex === 0) return fingerColors?.leftPinky;
      if (keyIndex <= 4) return fingerColors?.leftIndex;
      if (keyIndex <= 7) return fingerColors?.rightIndex;
      return fingerColors?.rightPinky;
    }
    if (rowIndex === 1) {
      if (keyIndex === 0) return fingerColors?.leftPinky;
      if (keyIndex <= 4) return fingerColors?.leftIndex;
      if (keyIndex <= 7) return fingerColors?.rightIndex;
      return fingerColors?.rightPinky;
    }
    if (rowIndex === 2) {
      if (keyIndex === 0) return fingerColors?.leftPinky;
      if (keyIndex <= 3) return fingerColors?.leftIndex;
      if (keyIndex <= 6) return fingerColors?.rightIndex;
      return fingerColors?.rightPinky;
    }
    if (rowIndex === 3) {
      if (keyIndex === 0) return fingerColors?.leftPinky;
      if (keyIndex <= 3) return fingerColors?.leftIndex;
      if (keyIndex <= 6) return fingerColors?.rightIndex;
      return fingerColors?.rightPinky;
    }
    return 'bg-gray-200 hover:bg-gray-300';
  };

  const playPronunciation = (key) => {
    // Placeholder for audio pronunciation
    console.log(`Playing pronunciation for: ${marathiMapping?.[key] || key}`);
  };

  return (
    <div className="space-y-8">
      {/* Tutorial Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl text-white">
              <BookOpen size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Keyboard Tutorial</h2>
              <p className="text-gray-600">Learn keyboard layouts with visual guides and audio pronunciation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select
              options={layouts}
              value={selectedLayout}
              onChange={setSelectedLayout}
              className="w-64"
            />
            <Button
              variant={showFingerGuide ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFingerGuide(!showFingerGuide)}
            >
              <Hand size={16} className="mr-2" />
              Finger Guide
            </Button>
          </div>
        </div>
      </div>
      {/* Finger Guide Legend */}
      {showFingerGuide && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
          <div className="flex items-center gap-2 mb-4">
            <Hand size={20} className="text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Finger Positioning Guide</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${fingerColors?.leftPinky}`}></div>
              <span className="text-sm text-gray-700">Left Pinky</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${fingerColors?.leftRing}`}></div>
              <span className="text-sm text-gray-700">Left Ring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${fingerColors?.leftMiddle}`}></div>
              <span className="text-sm text-gray-700">Left Middle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${fingerColors?.leftIndex}`}></div>
              <span className="text-sm text-gray-700">Index Fingers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${fingerColors?.thumb}`}></div>
              <span className="text-sm text-gray-700">Thumbs (Space)</span>
            </div>
          </div>
        </div>
      )}
      {/* Keyboard Layout */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
        <div className="space-y-3">
          {remingtonKeys?.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row?.map((key, keyIndex) => {
                const marathiChar = marathiMapping?.[key];
                const isHighlighted = highlightedKey === key;
                return (
                  <button
                    key={keyIndex}
                    className={`relative min-w-[3rem] h-14 rounded-lg border-2 transition-all duration-200 ${
                      showFingerGuide ? getFingerForKey(key, rowIndex, keyIndex) : 'bg-white hover:bg-gray-100'
                    } ${
                      isHighlighted ? 'border-indigo-600 shadow-lg scale-110' : 'border-gray-300'
                    }`}
                    onMouseEnter={() => setHighlightedKey(key)}
                    onMouseLeave={() => setHighlightedKey(null)}
                    onClick={() => marathiChar && playPronunciation(key)}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="text-lg font-bold text-gray-900">{key}</span>
                      {marathiChar && (
                        <span className="text-sm text-indigo-600 font-semibold">{marathiChar}</span>
                      )}
                    </div>
                    {marathiChar && isHighlighted && (
                      <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1">
                        <Volume2 size={12} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
          {/* Spacebar */}
          <div className="flex justify-center">
            <button
              className={`w-96 h-14 rounded-lg border-2 border-gray-300 transition-all duration-200 ${
                showFingerGuide ? fingerColors?.thumb : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-sm text-gray-600">Space</span>
            </button>
          </div>
        </div>
      </div>
      {/* Tutorial Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Info size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Home Row Position</h4>
              <p className="text-sm text-gray-600">
                Keep your fingers on ASDF (left) and JKL; (right) as the starting position
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="bg-green-600 p-2 rounded-lg text-white">
              <Hand size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Finger Movement</h4>
              <p className="text-sm text-gray-600">
                Each finger is responsible for specific keys. Practice moving only the required finger
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="bg-purple-600 p-2 rounded-lg text-white">
              <Volume2 size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Audio Pronunciation</h4>
              <p className="text-sm text-gray-600">
                Click on any Marathi character to hear its pronunciation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardLayoutTutorial;