 import React, { useState, useEffect, useRef } from 'react';
import { FileText, TrendingUp, AlertCircle } from 'lucide-react';

const TypingTest = ({ language, isMock, onDataUpdate }) => {
  const [typedText, setTypedText] = useState('');
  const [stats, setStats] = useState({
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    wrongKeystrokes: 0,
    backspaceCount: 0,
    wordsTyped: 0,
    errors: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 100
  });
  const [startTime, setStartTime] = useState(null);
  const textareaRef = useRef(null);

  const samplePassage = language === 'marathi' ?'महाराष्ट्र लोकसेवा आयोग ही महाराष्ट्र राज्यातील सर्वोच्च भरती संस्था आहे. या आयोगाद्वारे राज्यातील विविध सेवांमध्ये भरती प्रक्रिया राबविली जाते. टंकलेखन कौशल्य परीक्षा ही या प्रक्रियेचा महत्त्वाचा भाग आहे.' :'The Maharashtra Public Service Commission is the premier recruitment body in Maharashtra state. Through this commission, recruitment processes are conducted for various services in the state. The typing skill test is an important part of this process.';

  const wordLimit = language === 'marathi' ? 300 : 400;

  useEffect(() => {
    if (typedText?.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [typedText]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        calculateStats();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [typedText, startTime]);

  useEffect(() => {
    onDataUpdate?.(stats);
  }, [stats]);

  const calculateStats = () => {
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const words = typedText?.trim()?.split(/\s+/)?.filter(word => word?.length > 0);
    const wordsTyped = words?.length;
    const charactersTyped = typedText?.length;
    
    const wpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
    const cpm = elapsedMinutes > 0 ? Math.round(charactersTyped / elapsedMinutes) : 0;
    
    // Calculate errors (simplified)
    const passageWords = samplePassage?.split(/\s+/);
    let errors = 0;
    words?.forEach((word, index) => {
      if (passageWords?.[index] && word !== passageWords?.[index]) {
        errors++;
      }
    });

    const accuracy = wordsTyped > 0 ? Math.round(((wordsTyped - errors) / wordsTyped) * 100) : 100;

    setStats(prev => ({
      ...prev,
      wordsTyped,
      wpm,
      cpm,
      errors,
      accuracy,
      totalKeystrokes: charactersTyped
    }));
  };

  const handleTextChange = (e) => {
    const newText = e?.target?.value;
    const words = newText?.trim()?.split(/\s+/)?.filter(word => word?.length > 0);
    
    if (words?.length <= wordLimit) {
      setTypedText(newText);
    }
  };

  const handleKeyDown = (e) => {
    // Disable certain keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown']?.includes(e?.key)) {
      e?.preventDefault();
      return;
    }

    if (e?.key === 'Backspace') {
      setStats(prev => ({ ...prev, backspaceCount: prev?.backspaceCount + 1 }));
    }

    // Caps Lock warning
    if (e?.getModifierState('CapsLock')) {
      // Show warning (could be enhanced with a modal)
      console.warn('Caps Lock is ON');
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
  };

  const handleContextMenu = (e) => {
    e?.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">{isMock ? 'Mock Test' : 'Final Typing Exam'}</h2>
                <p className="text-blue-100">Type the passage shown below</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Word Limit</p>
              <p className="text-3xl font-bold">{wordLimit}</p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-4 p-6 bg-gray-50 border-b">
          <div className="text-center">
            <p className="text-sm text-gray-600">WPM</p>
            <p className="text-2xl font-bold text-blue-600">{stats?.wpm}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">CPM</p>
            <p className="text-2xl font-bold text-purple-600">{stats?.cpm}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Accuracy</p>
            <p className="text-2xl font-bold text-green-600">{stats?.accuracy}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Errors</p>
            <p className="text-2xl font-bold text-red-600">{stats?.errors}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Words</p>
            <p className="text-2xl font-bold text-gray-900">{stats?.wordsTyped}/{wordLimit}</p>
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-2 divide-x">
          {/* Passage Section */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Passage to Type</h3>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                {samplePassage}
              </p>
            </div>
          </div>

          {/* Typing Section */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Your Typing</h3>
            </div>
            <textarea
              ref={textareaRef}
              value={typedText}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onContextMenu={handleContextMenu}
              className="w-full h-64 p-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg leading-relaxed resize-none"
              placeholder="Start typing here..."
              autoFocus
              spellCheck={false}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Characters: <span className="font-semibold">{typedText?.length}</span>
              </p>
              <p className="text-sm text-gray-600">
                Backspaces: <span className="font-semibold">{stats?.backspaceCount}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-yellow-50 border-t">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900 mb-2">Important Instructions:</p>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Copy/paste is disabled</li>
                <li>Arrow keys and navigation keys are disabled</li>
                <li>Right-click is disabled</li>
                <li>Type exactly as shown in the passage</li>
                <li>The test will auto-submit when time expires</li>
                {!isMock && <li className="font-semibold">This is your final exam - type carefully!</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;