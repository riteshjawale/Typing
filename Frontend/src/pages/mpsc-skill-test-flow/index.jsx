import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, AlertTriangle, CheckCircle, Maximize } from 'lucide-react';

import KeyboardTest from './components/KeyboardTest';
import TypingTest from './components/TypingTest';
import BreakScreen from './components/BreakScreen';
import WarningModal from './components/WarningModal';

const PHASES = {
  KEYBOARD_TEST: 'keyboard_test',
  BREAK_1: 'break_1',
  MOCK_TEST: 'mock_test',
  BREAK_2: 'break_2',
  FINAL_EXAM: 'final_exam',
  COMPLETED: 'completed'
};

const PHASE_CONFIG = {
  keyboard_test: { duration: 300, name: 'Keyboard Test', canSkip: false },
  break_1: { duration: 300, name: 'Break', canSkip: false },
  mock_test: { duration: 600, name: 'Mock Test', canSkip: false },
  break_2: { duration: 120, name: 'Break', canSkip: false },
  final_exam: { duration: 600, name: 'Final Typing Exam', canSkip: false }
};

const MPSCSkillTestFlow = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(PHASES?.KEYBOARD_TEST);
  const [timeRemaining, setTimeRemaining] = useState(PHASE_CONFIG?.keyboard_test?.duration);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [violations, setViolations] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isDivyang, setIsDivyang] = useState(false);
  const [language, setLanguage] = useState('marathi');
  const [testData, setTestData] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    requestFullscreen();
    return () => {
      if (timerRef?.current) clearInterval(timerRef?.current);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      if (!isCurrentlyFullscreen && currentPhase !== PHASES?.COMPLETED) {
        handleViolation('Fullscreen mode exited. Please return to fullscreen.');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [currentPhase]);

  useEffect(() => {
    if (currentPhase === PHASES?.COMPLETED) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handlePhaseComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef?.current) clearInterval(timerRef?.current);
    };
  }, [currentPhase]);

  const requestFullscreen = () => {
    const elem = document.documentElement;
    if (elem?.requestFullscreen) {
      elem?.requestFullscreen()?.catch(err => {
        console.error('Fullscreen request failed:', err);
      });
    }
  };

  const handleViolation = (message) => {
    setViolations(prev => prev + 1);
    setWarningMessage(message);
    setShowWarning(true);

    if (violations >= 2) {
      autoSubmitExam();
    }
  };

  const autoSubmitExam = () => {
    if (timerRef?.current) clearInterval(timerRef?.current);
    alert('Multiple violations detected. Exam auto-submitted.');
    navigate('/exam-results', { state: { autoSubmitted: true, testData } });
  };

  const handlePhaseComplete = () => {
    const phases = Object.keys(PHASES);
    const currentIndex = phases?.indexOf(currentPhase);
    
    if (currentIndex < phases?.length - 1) {
      const nextPhase = phases?.[currentIndex + 1];
      setCurrentPhase(nextPhase);
      
      if (PHASE_CONFIG?.[nextPhase]) {
        let duration = PHASE_CONFIG?.[nextPhase]?.duration;
        if (nextPhase === PHASES?.FINAL_EXAM && isDivyang) {
          duration = 2220; // 37 minutes for Divyang
        }
        setTimeRemaining(duration);
      }
    } else {
      setCurrentPhase(PHASES?.COMPLETED);
      navigate('/exam-results', { state: { testData } });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case PHASES?.KEYBOARD_TEST:
        return <KeyboardTest language={language} onComplete={handlePhaseComplete} />;
      case PHASES?.BREAK_1:
      case PHASES?.BREAK_2:
        return <BreakScreen nextPhase={PHASE_CONFIG?.[currentPhase === PHASES?.BREAK_1 ? 'mock_test' : 'final_exam']?.name} />;
      case PHASES?.MOCK_TEST:
        return <TypingTest language={language} isMock={true} onDataUpdate={setTestData} />;
      case PHASES?.FINAL_EXAM:
        return <TypingTest language={language} isMock={false} onDataUpdate={setTestData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Timer */}
      <div className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Timer className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Current Phase</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {PHASE_CONFIG?.[currentPhase]?.name || 'Completed'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Time Remaining</p>
                <p className="text-3xl font-bold text-blue-600">{formatTime(timeRemaining)}</p>
              </div>

              {!isFullscreen && currentPhase !== PHASES?.COMPLETED && (
                <button
                  onClick={requestFullscreen}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                  <span>Enter Fullscreen</span>
                </button>
              )}
            </div>
          </div>

          {/* Phase Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              {Object.entries(PHASE_CONFIG)?.map(([key, config], index) => (
                <div key={key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPhase === key ? 'bg-blue-600 text-white' :
                    Object.keys(PHASES)?.indexOf(currentPhase) > Object.keys(PHASES)?.indexOf(key) ?
                    'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {Object.keys(PHASES)?.indexOf(currentPhase) > Object.keys(PHASES)?.indexOf(key) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  {index < Object.keys(PHASE_CONFIG)?.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      Object.keys(PHASES)?.indexOf(currentPhase) > Object.keys(PHASES)?.indexOf(key) ?
                      'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Violation Warning */}
      {violations > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
            <p className="text-yellow-800">
              <span className="font-semibold">Warning:</span> {violations} violation(s) detected. 
              {violations >= 2 ? ' Exam will be auto-submitted.' : ' One more violation will auto-submit the exam.'}
            </p>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPhaseContent()}
      </div>
      {/* Warning Modal */}
      {showWarning && (
        <WarningModal
          message={warningMessage}
          onClose={() => setShowWarning(false)}
          onReturnFullscreen={requestFullscreen}
        />
      )}
    </div>
  );
};

export default MPSCSkillTestFlow;