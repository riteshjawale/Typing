import React from 'react';
import { Keyboard } from 'lucide-react';
import Button from '../../../components/ui/Button';

const KeyboardsSection = () => {
  const keyboards = [
    {
      title: 'Remington Keyboard',
      description: 'Read detailed mapping between English Keys and Remington Keyboard Keys.',
      icon: '⌨️',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Inscript Keyboard',
      description: 'Read detailed mapping between English Keys and Inscript Keyboard Keys.',
      icon: '⌨️',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Typewriter Keyboard',
      description: 'Read detailed mapping between English Keys and Typewriter Keyboard Keys.',
      icon: '⌨️',
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'KrutiDev Keyboard',
      description: 'Read detailed mapping between English Keys and KrutiDev Keyboard Keys.',
      icon: '⌨️',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Keyboard size={16} />
            <span>Keyboard Layouts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Keyboards
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We will be discussing various keyboards available for typing. Our main focus will be on Marathi typing keyboards, which include the Remington Keyboard, Inscript Keyboard and Typewriter Keyboard.
          </p>
        </div>

        {/* Keyboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyboards?.map((keyboard, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-center">{keyboard?.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                {keyboard?.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
                {keyboard?.description}
              </p>

              {/* CTA Button */}
              <Button
                fullWidth
                variant="outline"
                className={`border-2 hover:bg-gradient-to-r ${keyboard?.color} hover:text-white hover:border-transparent transition-all`}
              >
                View Layout
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyboardsSection;