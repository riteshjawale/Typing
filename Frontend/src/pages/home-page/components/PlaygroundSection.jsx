import React from 'react';
import { Play, Keyboard } from 'lucide-react';
import Button from '../../../components/ui/Button';

const PlaygroundSection = () => {
  const playgrounds = [
    {
      title: 'English Playground',
      subtitle: 'English Typing Playground',
      description: 'Practice your own English (Paragraph) Here.',
      icon: '🇬🇧',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Marathi Playground',
      subtitle: 'Marathi Remington Keyboard Typing Playground',
      description: 'Practice your own Marathi (Remington keyboard) Paragraph Here.',
      icon: '🇮🇳',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Marathi Playground',
      subtitle: 'Kruti Dev Typing Playground',
      description: 'Practice your own Marathi (Paragraph) Here.',
      icon: '📝',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play size={16} />
            <span>Practice Zone</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Free Practice Typing Playground
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wide variety of passages are free to practice for Marathi and English languages.
          </p>
        </div>

        {/* Playground Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playgrounds?.map((playground, index) => (
            <div
              key={index}
              className={`${playground?.bgColor} border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 text-center">{playground?.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {playground?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 text-center">
                {playground?.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-6 text-center leading-relaxed">
                {playground?.description}
              </p>

              {/* CTA Button */}
              <Button
                fullWidth
                className={`bg-gradient-to-r ${playground?.color} hover:shadow-lg transition-all`}
              >
                <Play size={16} className="mr-2" />
                Start Practicing
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlaygroundSection;