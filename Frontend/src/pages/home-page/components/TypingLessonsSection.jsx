import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import Button from '../../../components/ui/Button';

const TypingLessonsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap size={16} />
            <span>Learn & Improve</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Typing Lessons
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Step by step lessons to learn typing
          </p>
        </div>

        {/* Lessons Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={64} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  English Typing Lessons
                </h3>
                <p className="text-gray-700 mb-6">
                  Read learn typing and practice lessons by selecting lessons in our typing test.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <BookOpen size={18} className="mr-2" />
                  Start Learning
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypingLessonsSection;