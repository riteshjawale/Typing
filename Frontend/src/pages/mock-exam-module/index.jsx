import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock } from 'lucide-react';
import PassageCard from './components/PassageCard';
import TestConfiguration from './components/TestConfiguration';
import SubscriptionPrompt from './components/SubscriptionPrompt';
import AttemptHistory from './components/AttemptHistory';

const MockExamModule = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('marathi');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [testConfig, setTestConfig] = useState({
    timer: 10,
    fontSize: 16,
    examMode: false,
    keyboardLayout: 'remington'
  });

  // Mock data for passages
  const passages = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `${selectedLanguage === 'marathi' ? 'मराठी' : 'English'} Passage ${i + 1}`,
    difficulty: ['easy', 'medium', 'hard']?.[i % 3],
    estimatedTime: [5, 10, 15]?.[i % 3],
    isLocked: i >= 5 && !hasSubscription,
    preview: selectedLanguage === 'marathi' ?'महाराष्ट्र लोकसेवा आयोग ही महाराष्ट्र राज्यातील सर्वोच्च भरती संस्था आहे...' :'The Maharashtra Public Service Commission is the premier recruitment body in Maharashtra state...',
    wordCount: [200, 300, 400]?.[i % 3]
  }));

  const filteredPassages = passages?.filter(passage => {
    if (selectedDifficulty === 'all') return true;
    return passage?.difficulty === selectedDifficulty;
  });

  const handlePassageSelect = (passage) => {
    if (passage?.isLocked) {
      setShowSubscription(true);
      return;
    }
    setSelectedPassage(passage);
    setShowConfig(true);
  };

  const handleStartTest = () => {
    navigate('/typing-test-interface', {
      state: {
        passage: selectedPassage,
        config: testConfig,
        language: selectedLanguage
      }
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BookOpen className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mock Exam Module</h1>
                <p className="text-gray-600">Practice with 50 passages per language</p>
              </div>
            </div>
            {!hasSubscription && (
              <button
                onClick={() => setShowSubscription(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
              >
                Upgrade to Premium
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e?.target?.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="marathi">Marathi</option>
                <option value="english">English</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e?.target?.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Keyboard Layout (Marathi only) */}
            {selectedLanguage === 'marathi' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Keyboard Layout</label>
                <select
                  value={testConfig?.keyboardLayout}
                  onChange={(e) => setTestConfig({ ...testConfig, keyboardLayout: e?.target?.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="remington">Remington</option>
                  <option value="unicode">Unicode</option>
                  <option value="krutidev055">Kruti Dev 055</option>
                  <option value="krutidev010">Kruti Dev 010</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Status */}
        {!hasSubscription && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <Lock className="w-6 h-6 text-yellow-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Access: First 5 Passages</h3>
                <p className="text-gray-700 mb-4">
                  You have access to the first 5 passages for free. Upgrade to premium for unlimited access to all 50 passages.
                </p>
                <button
                  onClick={() => setShowSubscription(true)}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                >
                  Unlock All Passages - ₹299/28 days
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Passage Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Passages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPassages?.map((passage) => (
              <PassageCard
                key={passage?.id}
                passage={passage}
                onSelect={handlePassageSelect}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>
        </div>

        {/* Attempt History */}
        <AttemptHistory language={selectedLanguage} />
      </div>
      {/* Test Configuration Modal */}
      {showConfig && selectedPassage && (
        <TestConfiguration
          passage={selectedPassage}
          config={testConfig}
          onConfigChange={setTestConfig}
          onStart={handleStartTest}
          onClose={() => setShowConfig(false)}
        />
      )}
      {/* Subscription Prompt Modal */}
      {showSubscription && (
        <SubscriptionPrompt
          onClose={() => setShowSubscription(false)}
          onSubscribe={() => {
            setHasSubscription(true);
            setShowSubscription(false);
          }}
        />
      )}
    </div>
  );
};

export default MockExamModule;