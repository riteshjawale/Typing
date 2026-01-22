import React from 'react';
import { Crown, Check, X, CreditCard } from 'lucide-react';

const SubscriptionPrompt = ({ onClose, onSubscribe }) => {
  const features = [
    'Access to all 50 passages per language',
    'Unlimited practice attempts',
    'Detailed performance analytics',
    'PDF result downloads',
    'Attempt history tracking',
    'Priority support'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white p-8 text-center">
          <Crown className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
          <p className="text-yellow-100">Unlock unlimited access to all features</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-gray-900 mb-2">₹299</p>
            <p className="text-gray-600">for 28 days</p>
          </div>

          <div className="space-y-3 mb-8">
            {features?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Note:</span> Separate subscription required for each language (Marathi/English)
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onSubscribe}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
            >
              <CreditCard className="w-5 h-5" />
              <span>Subscribe Now</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPrompt;