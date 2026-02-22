import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationSection = () => {
  return (
    <section id="registration" className="py-16 bg-white border-t-2 border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-block bg-yellow-300 px-6 py-2 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-red-700" style={{ fontFamily: 'Georgia, serif' }}>
              For Typist / Stenographer / Designer / Computer Operator
            </h2>
          </div>
          <p className="text-blue-700 font-medium mb-6">(on www.mytypingwala.com)</p>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            The complete professional registration details and application flow are now available on the Forms page.
          </p>
          <Link
            to="/forms"
            className="inline-block px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-none hover:bg-red-700 transition-colors"
          >
            Open Forms Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
