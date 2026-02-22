import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white border-2 border-gray-300 shadow-sm">
        <div className="bg-gray-100 px-6 py-4 border-b-2 border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800">Declaration / Undertaking</h1>
        </div>

        <div className="p-6 space-y-4 text-gray-800 leading-relaxed">
          <p>I hereby agree to comply with the following terms and conditions:</p>

          <p>(i) After the ID is issued to me, I will use it on a 7-day free trial basis. If I wish to continue after the trial period, I will pay the prescribed charges as decided by Smooth Online Services Pvt. Ltd. If the required payment is not made, my ID may be deactivated without any objection from me.</p>
          <p>(ii) In case I violate any rules, Smooth Online Services Pvt. Ltd. reserves the right to deactivate my ID without prior notice and without assigning any reason.</p>
          <p>(iii) The information and documents provided by me are true and correct. I am submitting them voluntarily with my signature. I have no objection if the company publishes this information on its website or stores it in its records.</p>
          <p>(iv) I will not use the ID for any illegal activity, misuse, or any violation of government laws or company rules and regulations set by Smooth Online Services Pvt. Ltd.</p>
          <p>(v) I will keep my ID password and other login credentials confidential and will not share them with anyone without company permission. I will be personally responsible for any unauthorized use of my ID and will immediately inform the company in case of any such incident.</p>
          <p>(vi) I will maintain strict confidentiality of customers personal information such as their names, mobile numbers, submitted documents, other records, typing work, and services provided to them.</p>
          <p>(vii) I will not hold the company responsible for service interruptions caused due to technical issues, internet problems, server maintenance, or upgrades. I will strictly follow the technical guidelines provided by the company.</p>
          <p>(viii) Once the service charges (Platform Fees) are paid, they are non-refundable under any circumstances. I fully understand this.</p>
          <p>(ix) I will behave politely with customers and remain honest in my work. I will not consume alcohol or any intoxicating substances during work.</p>
          <p>(x) In case of any dispute with customers, I will be solely responsible for resolving it.</p>
          <p>(xi) Any dispute arising in connection with this service shall be subject to the jurisdiction of the court where the company registered office is located.</p>

          <p className="font-semibold pt-2">
            I have read and understood all the above terms and conditions and agree to them.
          </p>
        </div>

        <div className="px-6 pb-6">
          <Link to="/registration" className="text-blue-600 underline hover:text-blue-800">
            &larr; Back to Registration Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
