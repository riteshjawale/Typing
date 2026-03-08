import React from 'react';
import { Lock, CheckCircle, Clock, FileText } from 'lucide-react';
import Button from '../../../components/ui/Button';

const BombayHighCourtSection = () => {
  const courtExams = [
    {
      title: 'Bombay High Court Typing Test English',
      description: 'Take Bombay High Court Typing Test for Marathi / English',
      duration: '10 minutes',
      sections: 6,
      locked: false,
      popular: true,
    },
  ];

  return (
    <section id="bombay-high-court" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText size={16} />
            <span>Court Examinations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bombay High Court Exams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bombay High Court Typing Test for Marathi and English
          </p>
        </div>

        {/* Court Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courtExams?.map((exam, index) => (
            <div
              key={index}
              className="bg-white border-2 border-indigo-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <FileText size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exam?.title}</h3>
                    <p className="text-sm text-gray-600">{exam?.description}</p>
                  </div>
                </div>
                {exam?.popular && (
                  <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}
              </div>

              {/* Exam Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2 text-indigo-600" />
                  <span>Duration: {exam?.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileText size={16} className="mr-2 text-indigo-600" />
                  <span>Sections: {exam?.sections}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  {exam?.locked ? (
                    <Lock size={16} className="mr-2 text-indigo-600" />
                  ) : (
                    <CheckCircle size={16} className="mr-2 text-green-600" />
                  )}
                  <span>{exam?.locked ? 'Locked' : 'Available'}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                fullWidth
                disabled={exam?.locked}
                className={`${
                  exam?.locked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {exam?.locked ? 'Locked' : 'Start Exam'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BombayHighCourtSection;