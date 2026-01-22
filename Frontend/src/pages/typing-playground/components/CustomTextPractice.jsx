import React, { useState, useEffect, useRef } from 'react';
import { Copy, Play, RotateCcw, Clock, Zap, Target, TrendingUp } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomTextPractice = () => {
  const [customText, setCustomText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stats, setStats] = useState({
    wpm: 0,
    cpm: 0,
    accuracy: 100,
    errors: 0,
  });
  const textareaRef = useRef(null);
  const timerRef = useRef(null);

  const sampleTexts = [
    'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet.',
    'Practice makes perfect. Consistent typing practice will help you improve your speed and accuracy over time.',
    'राज्य शासकीय विभागांच्या परीक्षेसाठी मराठी आणि इंग्रजी टायपिंग चाचणी अत्यंत महत्वाची आहे.',
  ];

  useEffect(() => {
    if (isTyping && startTime) {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
        calculateStats(elapsed);
      }, 1000);
    } else {
      if (timerRef?.current) {
        clearInterval(timerRef?.current);
      }
    }

    return () => {
      if (timerRef?.current) {
        clearInterval(timerRef?.current);
      }
    };
  }, [isTyping, startTime, typedText]);

  const calculateStats = (elapsed) => {
    if (elapsed === 0 || !customText) return;

    const words = typedText?.trim()?.split(/\s+/)?.length;
    const characters = typedText?.length;
    const minutes = elapsed / 60;

    const wpm = Math.round(words / minutes) || 0;
    const cpm = Math.round(characters / minutes) || 0;

    // Calculate accuracy
    let errors = 0;
    const minLength = Math.min(typedText?.length, customText?.length);
    for (let i = 0; i < minLength; i++) {
      if (typedText?.[i] !== customText?.[i]) {
        errors++;
      }
    }

    const accuracy = minLength > 0 ? Math.round(((minLength - errors) / minLength) * 100) : 100;

    setStats({ wpm, cpm, accuracy, errors });
  };

  const handleStart = () => {
    if (!customText?.trim()) {
      alert('Please enter or paste some text to practice!');
      return;
    }
    setIsTyping(true);
    setStartTime(Date.now());
    setTypedText('');
    textareaRef?.current?.focus();
  };

  const handleReset = () => {
    setIsTyping(false);
    setStartTime(null);
    setElapsedTime(0);
    setTypedText('');
    setStats({ wpm: 0, cpm: 0, accuracy: 100, errors: 0 });
  };

  const handleTyping = (e) => {
    if (!isTyping) return;
    setTypedText(e?.target?.value);
  };

  const loadSampleText = (text) => {
    setCustomText(text);
    handleReset();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getCharacterClass = (index) => {
    if (index >= typedText?.length) return 'text-gray-400';
    if (typedText?.[index] === customText?.[index]) return 'text-green-600 bg-green-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl text-white">
            <Copy size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Custom Text Practice</h2>
            <p className="text-gray-600">
              Paste your own text or use sample passages for personalized typing practice
            </p>
          </div>
        </div>
      </div>
      {/* Stats Dashboard */}
      {isTyping && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} />
              <span className="text-sm font-medium opacity-90">Time</span>
            </div>
            <div className="text-3xl font-bold">{formatTime(elapsedTime)}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={20} />
              <span className="text-sm font-medium opacity-90">Speed</span>
            </div>
            <div className="text-3xl font-bold">{stats?.wpm} WPM</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Target size={20} />
              <span className="text-sm font-medium opacity-90">Accuracy</span>
            </div>
            <div className="text-3xl font-bold">{stats?.accuracy}%</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} />
              <span className="text-sm font-medium opacity-90">CPM</span>
            </div>
            <div className="text-3xl font-bold">{stats?.cpm}</div>
          </div>
        </div>
      )}
      {/* Main Practice Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Source Text</h3>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e?.target?.value)}
            placeholder="Paste your custom text here or select a sample below..."
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all resize-none font-mono text-sm"
            disabled={isTyping}
          />
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Sample Texts:</p>
            <div className="flex flex-wrap gap-2">
              {sampleTexts?.map((text, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => loadSampleText(text)}
                  disabled={isTyping}
                >
                  Sample {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Typing Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Typing</h3>
          {!isTyping ? (
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
              <div className="text-center">
                <Play size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Click Start to begin typing practice</p>
                <Button
                  size="lg"
                  onClick={handleStart}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Play size={20} className="mr-2" />
                  Start Practice
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="h-48 p-4 border-2 border-indigo-300 rounded-xl bg-indigo-50 overflow-auto mb-4 font-mono text-sm">
                {customText?.split('')?.map((char, index) => (
                  <span key={index} className={getCharacterClass(index)}>
                    {char}
                  </span>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={typedText}
                onChange={handleTyping}
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all resize-none font-mono text-sm"
                placeholder="Start typing here..."
                autoFocus
              />
              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Encouraging Tips */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Practice Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Focus on accuracy first, speed will come naturally with practice</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Take breaks every 15-20 minutes to avoid fatigue</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Practice with different types of text to improve versatility</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomTextPractice;