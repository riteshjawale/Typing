import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, ArrowRight } from 'lucide-react';
import Button from '../../../components/ui/Button';

const FreeTypingTestSection = () => {
  const tests = [
    {
      title: 'Marathi Typing Test',
      subtitle: 'Marathi Remington Typing Test',
      description: 'We have more than 100 passages available for Marathi Typing Test.',
      difficulty: 'Easy to Hard',
      duration: '10-30 min',
      icon: '🇮🇳',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      title: 'English Typing Test',
      subtitle: 'English Typing Test',
      description: 'We have 200 passages available for English Typing Test.',
      difficulty: 'Beginner to Expert',
      duration: '5-30 min',
      icon: '🇬🇧',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Marathi Typing Test',
      subtitle: 'Marathi Kruti Dev Typing Test',
      description: 'We have passages available for Marathi Kruti Dev Typing Test.',
      difficulty: 'Easy to Hard',
      duration: '10-30 min',
      icon: '📝',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Hindi Typing Test',
      subtitle: 'Hindi Kruti Dev Typing Test',
      description: 'We have passages available for Hindi Kruti Dev Typing Test.',
      difficulty: 'Easy to Hard',
      duration: '10-30 min',
      icon: '🇮🇳',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Free Typing Test
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wide variety of passages are free to practice for Marathi and English languages.
          </p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tests?.map((test, index) => (
            <div
              key={index}
              className={`group relative ${test?.bgColor} ${test?.borderColor} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{test?.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {test?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{test?.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                {test?.description}
              </p>

              {/* Meta Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <BarChart3 size={16} className="mr-2" />
                  <span>{test?.difficulty}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>{test?.duration}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/typing-test-interface">
                <Button
                  fullWidth
                  className={`bg-gradient-to-r ${test?.color} hover:shadow-lg transition-all`}
                >
                  Start Test
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeTypingTestSection;