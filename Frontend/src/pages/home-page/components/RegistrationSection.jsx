import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, UserPlus } from 'lucide-react';

const RegistrationSection = () => {
  return (
    <section id="registration" className="py-16 bg-white border-t-2 border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-yellow-300 px-6 py-2 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-red-700" style={{ fontFamily: 'Georgia, serif' }}>
              For Typist / Stenographer / Designer / Computer Operator
            </h2>
          </div>
          <p className="text-blue-700 font-medium">
            (on www.mytypingwala.com)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
              Register as a Professional Service Provider
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Multiple Roles</h4>
                  <p className="text-gray-600 text-sm">Register as Typist, Stenographer, Designer, or Computer Operator</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Simple Documentation</h4>
                  <p className="text-gray-600 text-sm">Just upload your Aadhaar card and a recent photograph</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Get Verified</h4>
                  <p className="text-gray-600 text-sm">After admin verification, receive your unique User ID</p>
                </div>
              </div>
            </div>

            {/* Requirements Box */}
            <div className="border-2 border-gray-200 p-4 bg-gray-50">
              <h4 className="font-bold text-gray-800 mb-3">Required Documents:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Aadhaar Card (PDF or Image)</li>
                <li>Recent Passport Size Photo</li>
                <li>Bank Account Details</li>
                <li>Valid Mobile Number (OTP verification required)</li>
              </ul>
            </div>
          </div>

          {/* Right - CTA Card */}
          <div className="border-2 border-gray-300 rounded-none p-6 bg-white shadow-lg">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Online Application Form
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-500">
                <span className="font-bold text-blue-700">1</span>
                <span className="text-gray-700">Fill the application form with your details</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-500">
                <span className="font-bold text-blue-700">2</span>
                <span className="text-gray-700">Verify your mobile number with OTP</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-500">
                <span className="font-bold text-blue-700">3</span>
                <span className="text-gray-700">Submit and wait for admin verification</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 border-l-4 border-green-500">
                <span className="font-bold text-green-700">4</span>
                <span className="text-gray-700">Receive your User ID after approval</span>
              </div>
            </div>

            <Link
              to="/registration"
              className="block w-full text-center py-4 bg-red-600 text-white font-bold text-lg rounded-none hover:bg-red-700 transition-colors"
            >
              Apply Now
            </Link>

            <p className="text-center text-xs text-gray-500 mt-4">
              Mobile number OTP verification is mandatory at the time of registration.
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Are you a professional typist, stenographer, designer, or computer operator? 
            Register with us to get connected with clients who need your services. 
            After admin verification, your profile will be active and you'll receive a unique User ID.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
