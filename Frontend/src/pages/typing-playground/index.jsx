import React, { useState } from 'react';
import Header from '../home-page/components/Header';
import Footer from '../home-page/components/Footer';
import PracticeCategoriesSection from './components/PracticeCategoriesSection';
import KeyboardLayoutTutorial from './components/KeyboardLayoutTutorial';
import CustomTextPractice from './components/CustomTextPractice';
import ProgressTracker from './components/ProgressTracker';

const TypingPlayground = () => {
  const [activeTab, setActiveTab] = useState('practice');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🎯</span>
            <span>Free Practice Environment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Typing Playground
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Flexible practice environment with diverse exercises and keyboard layout tutorials for skill development
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'practice' ?'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' :'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Practice Exercises
          </button>
          <button
            onClick={() => setActiveTab('keyboard')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'keyboard' ?'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' :'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Keyboard Layouts
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'custom' ?'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' :'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Custom Text
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'progress' ?'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' :'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Progress Tracker
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'practice' && <PracticeCategoriesSection />}
          {activeTab === 'keyboard' && <KeyboardLayoutTutorial />}
          {activeTab === 'custom' && <CustomTextPractice />}
          {activeTab === 'progress' && <ProgressTracker />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TypingPlayground;