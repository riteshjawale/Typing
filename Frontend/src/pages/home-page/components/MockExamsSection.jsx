import React from 'react';
import { Lock, CheckCircle, Clock, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const MockExamsSection = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleStartMockTest = () => {
    if (isAuthenticated) {
      navigate('/mock-exam-module');
    } else {
      navigate('/login');
    }
  };

  const mockExams = [
    {
      title: 'MPSC Typing Skill Test Marathi / English',
      description: 'Take MPSC Skill Test for Marathi / English',
      duration: '32 minutes',
      sections: 5,
      locked: false,
      popular: true,
    },
    {
      title: 'Bombay High Court Typing Test Marathi / English',
      description: 'Take Bombay High Court Typing Test for Marathi / English',
      duration: '45 minutes',
      sections: 6,
      locked: false,
      popular: false,
    },
  ];

  return (
    <section id="mock-exams" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText size={16} />
            <span>Mock Examinations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mock Exams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MPSC Skill Test for Marathi and English
          </p>
        </div>

        {/* Mock Exam Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {mockExams?.map((exam, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
            >
              {exam?.popular && (
                <div className="absolute -top-3 left-8 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {exam?.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{exam?.description}</p>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2 text-indigo-600" />
                      <span>{exam?.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText size={16} className="mr-2 text-indigo-600" />
                      <span>{exam?.sections} Sections</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <CheckCircle size={16} className="mr-2" />
                      <span>Exam Mode Available</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {exam?.locked ? (
                    <>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      >
                        <Lock size={18} className="mr-2" />
                        Subscribe to Unlock
                      </Button>
                      <p className="text-sm text-gray-600 text-center">₹299 for 28 days</p>
                    </>
                  ) : (
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      onClick={handleStartMockTest}
                    >
                      Start Mock Test
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockExamsSection;