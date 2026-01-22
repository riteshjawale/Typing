import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TestHeader from './components/TestHeader';
import SourceTextDisplay from './components/SourceTextDisplay';
import TypingInput from './components/TypingInput';
import PerformanceMetrics from './components/PerformanceMetrics';
import SecurityWarning from './components/SecurityWarning';

const TypingTestInterface = () => {
  const navigate = useNavigate();
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [errors, setErrors] = useState([]);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [wrongKeystrokes, setWrongKeystrokes] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const inputRef = useRef(null);
  const autoSaveIntervalRef = useRef(null);

  // Sample source text
  const sampleText = "The quick brown fox jumps over the lazy dog. This is a typing test to measure your speed and accuracy. Practice makes perfect, and consistent effort leads to improvement. Government job exams require excellent typing skills with high accuracy and speed. Focus on maintaining proper posture and finger placement while typing.";

  useEffect(() => {
    setSourceText(sampleText);
    // Disable right-click
    const handleContextMenu = (e) => {
      e?.preventDefault();
      showWarningMessage('Right-click is disabled during the test');
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // Detect page refresh
    const handleBeforeUnload = (e) => {
      if (testStarted && !testCompleted) {
        autoSubmitTest();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (autoSaveIntervalRef?.current) {
        clearInterval(autoSaveIntervalRef?.current);
      }
    };
  }, [testStarted, testCompleted]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (testStarted && !testCompleted && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testStarted, testCompleted, startTime]);

  // Auto-save every 2 seconds
  useEffect(() => {
    if (testStarted && !testCompleted) {
      autoSaveIntervalRef.current = setInterval(() => {
        saveProgress();
      }, 2000);
    }
    return () => {
      if (autoSaveIntervalRef?.current) {
        clearInterval(autoSaveIntervalRef?.current);
      }
    };
  }, [testStarted, testCompleted, typedText]);

  const showWarningMessage = (message) => {
    setWarningMessage(message);
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000);
  };

  const saveProgress = () => {
    try {
      const progressData = {
        typedText,
        elapsedTime,
        totalKeystrokes,
        correctKeystrokes,
        wrongKeystrokes,
        backspaceCount,
        timestamp: Date.now(),
      };
      localStorage.setItem('typingTestProgress', JSON.stringify(progressData));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const autoSubmitTest = () => {
    saveProgress();
    setTestCompleted(true);
  };

  const handleStartTest = () => {
    setTestStarted(true);
    setStartTime(Date.now());
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  const handleTyping = (e) => {
    const value = e?.target?.value;
    const key = e?.nativeEvent?.data;

    // Detect Caps Lock
    if (e?.nativeEvent?.getModifierState && e?.nativeEvent?.getModifierState('CapsLock')) {
      showWarningMessage('Caps Lock is ON! Please turn it off.');
    }

    // Prevent copy/paste
    if (e?.nativeEvent?.inputType === 'insertFromPaste') {
      e?.preventDefault();
      showWarningMessage('Copy/Paste is not allowed!');
      return;
    }

    setTypedText(value);
    setTotalKeystrokes(prev => prev + 1);

    // Check if character is correct
    const currentIndex = value?.length - 1;
    if (currentIndex >= 0 && currentIndex < sourceText?.length) {
      if (value?.[currentIndex] === sourceText?.[currentIndex]) {
        setCorrectKeystrokes(prev => prev + 1);
      } else {
        setWrongKeystrokes(prev => prev + 1);
        setErrors(prev => [...prev, currentIndex]);
      }
    }

    // Check if test is complete
    if (value?.length >= sourceText?.length) {
      setTestCompleted(true);
    }
  };

  const handleKeyDown = (e) => {
    // Block arrow keys
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']?.includes(e?.key)) {
      e?.preventDefault();
      showWarningMessage('Navigation keys are disabled!');
      return;
    }

    // Track backspace
    if (e?.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }

    // Detect Scroll Lock
    if (e?.getModifierState && e?.getModifierState('ScrollLock')) {
      showWarningMessage('Scroll Lock is ON! Please turn it off.');
    }
  };

  const calculateWPM = () => {
    if (elapsedTime === 0) return 0;
    const words = typedText?.trim()?.split(/\s+/)?.length;
    return Math.round((words / elapsedTime) * 60);
  };

  const calculateCPM = () => {
    if (elapsedTime === 0) return 0;
    return Math.round((typedText?.length / elapsedTime) * 60);
  };

  const calculateAccuracy = () => {
    if (totalKeystrokes === 0) return 100;
    return Math.round((correctKeystrokes / totalKeystrokes) * 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader onExit={() => navigate('/home-page')} />
      {showWarning && <SecurityWarning message={warningMessage} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!testStarted ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Typing Test?
              </h1>
              <p className="text-gray-600 mb-8">
                Type the given text as accurately and quickly as possible.
              </p>
              <button
                onClick={handleStartTest}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Start Test
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <PerformanceMetrics
              wpm={calculateWPM()}
              cpm={calculateCPM()}
              accuracy={calculateAccuracy()}
              time={formatTime(elapsedTime)}
              errors={errors?.length}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SourceTextDisplay
                sourceText={sourceText}
                typedText={typedText}
                errors={errors}
              />

              <TypingInput
                inputRef={inputRef}
                typedText={typedText}
                onTyping={handleTyping}
                onKeyDown={handleKeyDown}
                disabled={testCompleted}
              />
            </div>

            {testCompleted && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Test Completed!
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-3xl font-bold text-indigo-600">{calculateWPM()}</div>
                    <div className="text-sm text-gray-600">WPM</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{calculateCPM()}</div>
                    <div className="text-sm text-gray-600">CPM</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">{calculateAccuracy()}%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">{errors?.length}</div>
                    <div className="text-sm text-gray-600">Errors</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/home-page')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTestInterface;