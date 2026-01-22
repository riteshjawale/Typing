import React from 'react';
import { Scale, FileText, Clock, Target } from 'lucide-react';
import Button from '../../../components/ui/Button';

const BombayHighCourtSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Scale size={16} />
                <span>Court Exam Preparation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Bombay HighCourt Exams Details
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Court Exam Education Criteria and Exams Procedure
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <FileText size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Detailed Examination Criteria</h4>
                    <p className="text-sm text-gray-600">Complete information about eligibility and requirements</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Exam Procedure & Timeline</h4>
                    <p className="text-sm text-gray-600">Step-by-step guide for the complete exam process</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Target size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Preparation Resources</h4>
                    <p className="text-sm text-gray-600">Specialized materials for court exam preparation</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                View Complete Details
              </Button>
            </div>

            {/* Right Visual */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <Scale size={120} className="mx-auto mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">Bombay High Court</h3>
                <p className="text-amber-100">Official Typing Test Preparation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BombayHighCourtSection;