import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    address: '',
    photo: null,
    shopAddress: '',
    shopAct: null,
    shopPhoto: null,
    mobile: '',
    otp: '',
    availableTime: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    email: '',
    services: '',
    aadhaar: null,
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { value: '', label: 'Select Role' },
    { value: 'typist', label: 'Typist' },
    { value: 'stenographer', label: 'Stenographer' },
    { value: 'designer', label: 'Designer' },
    { value: 'computer_operator', label: 'Computer Operator' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!otpVerified) newErrors.otp = 'Please verify mobile number with OTP';
    if (!formData.availableTime.trim()) newErrors.availableTime = 'Available time is required';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.services.trim()) newErrors.services = 'Services list is required';
    if (!formData.aadhaar) newErrors.aadhaar = 'Aadhaar card upload is required';
    if (!formData.consent) newErrors.consent = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = () => {
    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
      setErrors(prev => ({ ...prev, mobile: 'Please enter a valid 10-digit mobile number' }));
      return;
    }
    // Simulate OTP sending
    setOtpSent(true);
    alert('OTP sent to +91 ' + formData.mobile);
  };

  const handleVerifyOTP = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
      return;
    }
    // Simulate OTP verification
    setOtpVerified(true);
    alert('OTP verified successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Application submitted successfully! Your application is pending admin verification. You will receive your User ID after approval.');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-300 px-6 py-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-red-700" style={{ fontFamily: 'Georgia, serif' }}>
              For Typist / Stenographer / Designer / Computer Operator
            </h1>
          </div>
          <p className="text-lg text-blue-700 font-medium">
            (on www.mytypingwala.com)
          </p>
        </div>

        {/* Main Title */}
        <div className="bg-white border-2 border-gray-300 rounded-none shadow-sm mb-6">
          <div className="bg-gray-100 px-6 py-4 border-b-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
              Online Application Form for Typist / Stenographer registration with the following details:
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Role <span className="text-red-600">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Address <span className="text-red-600">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                placeholder="Enter your complete address"
              />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Photo <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, JPEG (Max 2MB)</p>
              {errors.photo && <p className="text-red-600 text-sm mt-1">{errors.photo}</p>}
            </div>

            {/* Shop Details - Optional */}
            <div className="border-2 border-dashed border-gray-300 p-4 bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-4">Shop Details (Optional for Shop Owners)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Shop Address
                  </label>
                  <input
                    type="text"
                    name="shopAddress"
                    value={formData.shopAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                    placeholder="Enter shop address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Shop Act Certificate
                    </label>
                    <input
                      type="file"
                      name="shopAct"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Shop Photo
                    </label>
                    <input
                      type="file"
                      name="shopPhoto"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <p className="text-sm text-blue-600 italic">Skip shop details for freelancers</p>
              </div>
            </div>

            {/* Mobile Number with OTP */}
            <div className="border-2 border-gray-200 p-4 bg-blue-50">
              <h3 className="font-bold text-gray-700 mb-4">Mobile Verification</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 py-2 border-2 border-r-0 border-gray-300 bg-gray-100 text-gray-700 font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        maxLength="10"
                        className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                        placeholder="10 digit mobile number"
                      />
                    </div>
                    {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={otpSent}
                      className="px-6 py-2 bg-blue-600 text-white font-bold rounded-none hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {otpSent ? 'OTP Sent' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Enter OTP <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                        maxLength="6"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                        placeholder="Enter 6-digit OTP"
                        disabled={otpVerified}
                      />
                      {errors.otp && <p className="text-red-600 text-sm mt-1">{errors.otp}</p>}
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={handleVerifyOTP}
                        disabled={otpVerified}
                        className={`px-6 py-2 font-bold rounded-none ${
                          otpVerified 
                            ? 'bg-green-600 text-white cursor-default' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {otpVerified ? 'Verified ✓' : 'Verify OTP'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Available Time */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Available Time <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                placeholder="e.g., 9:00 AM - 6:00 PM, Monday to Saturday"
              />
              {errors.availableTime && <p className="text-red-600 text-sm mt-1">{errors.availableTime}</p>}
            </div>

            {/* Bank Details */}
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-bold text-gray-700 mb-4">Bank Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Bank Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                    placeholder="Bank name"
                  />
                  {errors.bankName && <p className="text-red-600 text-sm mt-1">{errors.bankName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Account Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                    placeholder="Account number"
                  />
                  {errors.accountNumber && <p className="text-red-600 text-sm mt-1">{errors.accountNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    IFSC Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                    placeholder="IFSC code"
                  />
                  {errors.ifscCode && <p className="text-red-600 text-sm mt-1">{errors.ifscCode}</p>}
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email ID <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Services List */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Services List <span className="text-red-600">*</span>
              </label>
              <textarea
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                placeholder="List the services you provide (e.g., Typing in Marathi, English, Data Entry, etc.)"
              />
              {errors.services && <p className="text-red-600 text-sm mt-1">{errors.services}</p>}
            </div>

            {/* Aadhaar Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Upload Aadhaar Card <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                name="aadhaar"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG, JPEG (Max 2MB)</p>
              {errors.aadhaar && <p className="text-red-600 text-sm mt-1">{errors.aadhaar}</p>}
            </div>

            {/* Consent Section */}
            <div className="border-2 border-gray-300 p-4 bg-yellow-50">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 border-2 border-gray-400 rounded-none"
                />
                <div>
                  <label className="text-sm font-bold text-gray-800">
                    I agree to User Data Consent and Company Terms & Conditions <span className="text-red-600">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    By checking this box, you confirm that all the information provided is accurate and you agree to our{' '}
                    <Link to="/terms" className="text-blue-600 underline hover:text-blue-800">
                      Terms & Conditions
                    </Link>
                    .
                  </p>
                  {errors.consent && <p className="text-red-600 text-sm mt-1">{errors.consent}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !otpVerified}
                className="w-full md:w-auto px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-none hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

            {/* Footer Note */}
            <div className="border-t-2 border-gray-300 pt-4 mt-6">
              <p className="text-center text-sm font-bold text-red-600">
                Mobile number OTP verification is mandatory at the time of registration.
              </p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
