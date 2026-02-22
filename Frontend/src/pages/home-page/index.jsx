import React, { useEffect } from 'react';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FreeTypingTestSection from './components/FreeTypingTestSection';
import MockExamsSection from './components/MockExamsSection';
import PlaygroundSection from './components/PlaygroundSection';
import KeyboardsSection from './components/KeyboardsSection';
import TypingLessonsSection from './components/TypingLessonsSection';
import RegistrationSection from './components/RegistrationSection';
import ScrollTopButton from './components/ScrollTopButton';
import Footer from './components/Footer';

const HomePage = () => {
  useEffect(() => {
    // Handle hash scroll when component mounts
    const hash = window.location.hash;
    if (hash === '#registration') {
      setTimeout(() => {
        const element = document.getElementById('registration');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main>
        <HeroSection />
        <FreeTypingTestSection />
        <MockExamsSection />
        <PlaygroundSection />
        <KeyboardsSection />
        <TypingLessonsSection />
        <RegistrationSection />
      </main>
      <ScrollTopButton />
      <Footer />
    </div>
  );
};

export default HomePage;
