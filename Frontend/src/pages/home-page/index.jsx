import React from 'react';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FreeTypingTestSection from './components/FreeTypingTestSection';
import MockExamsSection from './components/MockExamsSection';
import BombayHighCourtSection from './components/BombayHighCourtSection';
import PlaygroundSection from './components/PlaygroundSection';
import KeyboardsSection from './components/KeyboardsSection';
import TypingLessonsSection from './components/TypingLessonsSection';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main>
        <HeroSection />
        <FreeTypingTestSection />
        <MockExamsSection />
        <BombayHighCourtSection />
        <PlaygroundSection />
        <KeyboardsSection />
        <TypingLessonsSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;