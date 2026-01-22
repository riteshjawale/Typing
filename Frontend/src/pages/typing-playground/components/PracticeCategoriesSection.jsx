import React from 'react';
import { Zap, Target, FileText, Award, Clock, TrendingUp } from 'lucide-react';
import Button from '../../../components/ui/Button';

const PracticeCategoriesSection = () => {
  const categories = [
    {
      title: 'Speed Drills',
      description: 'Focus on increasing your typing speed with timed exercises',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      exercises: [
        { name: 'Quick Burst - 1 min', difficulty: 'Easy', wpm: '30+' },
        { name: 'Sprint - 3 min', difficulty: 'Medium', wpm: '40+' },
        { name: 'Marathon - 10 min', difficulty: 'Hard', wpm: '50+' },
      ],
    },
    {
      title: 'Accuracy Exercises',
      description: 'Improve precision and reduce errors with focused practice',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      exercises: [
        { name: 'Error-Free Typing', difficulty: 'Easy', accuracy: '95%+' },
        { name: 'Precision Practice', difficulty: 'Medium', accuracy: '98%+' },
        { name: 'Perfect Score', difficulty: 'Hard', accuracy: '100%' },
      ],
    },
    {
      title: 'Government Exam Prep',
      description: 'Specialized practice for MPSC, Clerk, and other government exams',
      icon: Award,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      exercises: [
        { name: 'MPSC Format Practice', difficulty: 'Medium', words: '300' },
        { name: 'Clerk Exam Simulation', difficulty: 'Medium', words: '400' },
        { name: 'Typist Exam Practice', difficulty: 'Hard', words: '500' },
      ],
    },
    {
      title: 'Mixed Practice',
      description: 'Balanced exercises combining speed and accuracy',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      exercises: [
        { name: 'Beginner Mix', difficulty: 'Easy', duration: '5 min' },
        { name: 'Intermediate Mix', difficulty: 'Medium', duration: '10 min' },
        { name: 'Advanced Mix', difficulty: 'Hard', duration: '15 min' },
      ],
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <FileText size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Relaxed Practice Environment</h3>
            <p className="text-indigo-100">
              No restrictions here! Copy-paste enabled, navigation allowed, and no security locks. 
              Practice at your own pace and experiment freely.
            </p>
          </div>
        </div>
      </div>
      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories?.map((category, index) => {
          const IconComponent = category?.icon;
          return (
            <div
              key={index}
              className={`${category?.bgColor} ${category?.borderColor} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
            >
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`bg-gradient-to-br ${category?.color} p-3 rounded-xl text-white`}>
                  <IconComponent size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category?.title}</h3>
                  <p className="text-gray-600">{category?.description}</p>
                </div>
              </div>
              {/* Exercise List */}
              <div className="space-y-3">
                {category?.exercises?.map((exercise, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {exercise?.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(exercise?.difficulty)}`}>
                            {exercise?.difficulty}
                          </span>
                          {exercise?.wpm && (
                            <span className="text-xs text-gray-600 flex items-center gap-1">
                              <Zap size={12} />
                              {exercise?.wpm} WPM
                            </span>
                          )}
                          {exercise?.accuracy && (
                            <span className="text-xs text-gray-600 flex items-center gap-1">
                              <Target size={12} />
                              {exercise?.accuracy}
                            </span>
                          )}
                          {exercise?.words && (
                            <span className="text-xs text-gray-600 flex items-center gap-1">
                              <FileText size={12} />
                              {exercise?.words} words
                            </span>
                          )}
                          {exercise?.duration && (
                            <span className="text-xs text-gray-600 flex items-center gap-1">
                              <Clock size={12} />
                              {exercise?.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeCategoriesSection;