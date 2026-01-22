import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, Trophy, Target } from 'lucide-react';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Trophy size={16} />
            <span className="text-sm font-medium">India's Premium Typing Test Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Master Typing for
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Government Job Success
            </span>
          </h1>

          {/* Marathi Introduction */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg sm:text-xl text-indigo-100 leading-relaxed">
              राज्य शासकीय विभागांच्या परीक्षेसाठी मराठी आणि इंग्रजी टायपिंग चाचणी
            </p>
            <p className="text-base sm:text-lg text-indigo-100">
              MPSC, Clerk, Typist, Stenographer आणि इतर सरकारी परीक्षांसाठी संपूर्ण तयारी
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/typing-test-interface">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8"
              >
                <Keyboard className="mr-2" size={20} />
                Start Free Test
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8"
            >
              <Target className="mr-2" size={20} />
              View Mock Exams
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">50+</div>
              <div className="text-sm text-indigo-200 mt-1">Mock Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">10K+</div>
              <div className="text-sm text-indigo-200 mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">4+</div>
              <div className="text-sm text-indigo-200 mt-1">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;