import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitRegistrationApplication } from '../services/registrationService';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const createInitialAvailability = () =>
  WEEK_DAYS.reduce((acc, day) => {
    acc[day] = { enabled: false, from: '', to: '' };
    return acc;
  }, {});

const getInitialFormData = () => ({
  role: '',
  fullName: '',
  address: '',
  photo: null,
  shopAddress: '',
  shopAct: null,
  shopPhoto: null,
  mobile: '',
  availability: createInitialAvailability(),
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  email: '',
  services: '',
  aadhaar: null,
  resources: {
    computerLaptop: false,
    internet: false,
    headphonesEarbuds: false,
  },
  consent: false,
});

const RegistrationForm = () => {
  const [formData, setFormData] = useState(getInitialFormData);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [submitToast, setSubmitToast] = useState(null);
  const [copyFromDay, setCopyFromDay] = useState('Monday');

  const roles = [
    { value: '', label: 'Select Role' },
    { value: 'typist', label: 'Typist' },
    { value: 'stenographer', label: 'Stenographer' },
    { value: 'designer', label: 'Designer' },
    { value: 'computer_operator', label: 'Computer Operator' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvailabilityToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          enabled: !prev.availability[day].enabled,
        },
      },
    }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next.availableTime;
      delete next[`availability_${day}`];
      return next;
    });
  };

  const handleAvailabilityTimeChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value,
        },
      },
    }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[`availability_${day}`];
      return next;
    });
  };

  const handleApplyTimeToAllDays = () => {
    const source = formData.availability[copyFromDay];

    if (!source.enabled || !source.from || !source.to) {
      setErrors((prev) => ({
        ...prev,
        availableTime: `Set and select ${copyFromDay} time first, then apply to all days.`,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      availability: WEEK_DAYS.reduce((acc, day) => {
        acc[day] = {
          enabled: true,
          from: source.from,
          to: source.to,
        };
        return acc;
      }, {}),
    }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next.availableTime;
      WEEK_DAYS.forEach((day) => {
        delete next[`availability_${day}`];
      });
      return next;
    });
  };

  const handleResourceChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      resources: {
        ...prev.resources,
        [name]: checked,
      },
    }));

    if (errors.equipment) {
      setErrors((prev) => ({ ...prev, equipment: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    const selectedDays = WEEK_DAYS.filter((day) => formData.availability[day].enabled);
    if (selectedDays.length === 0) {
      newErrors.availableTime = 'Please select at least one day and set time.';
    } else {
      selectedDays.forEach((day) => {
        const slot = formData.availability[day];
        if (!slot.from || !slot.to) {
          newErrors[`availability_${day}`] = `${day}: select both from and to time.`;
        }
      });
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.services.trim()) newErrors.services = 'Services list is required';
    if (!formData.aadhaar) newErrors.aadhaar = 'Aadhaar card upload is required';
    const allResourcesChecked =
      formData.resources.computerLaptop &&
      formData.resources.internet &&
      formData.resources.headphonesEarbuds;
    if (!allResourcesChecked) newErrors.equipment = 'all equipment are necessary';
    if (!formData.consent) newErrors.consent = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitToast(null);

    try {
      await submitRegistrationApplication(formData);
      setFormData(getInitialFormData());
      setErrors({});
      setFormKey((prev) => prev + 1);
      setSubmitToast({
        type: 'success',
        message: 'Application submitted successfully! Your application is pending admin verification.',
      });
    } catch (error) {
      setSubmitToast({
        type: 'error',
        message: error.message || 'Failed to submit the application.',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitToast(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-300 px-6 py-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-red-700" style={{ fontFamily: 'Georgia, serif' }}>
              For Typist / Stenographer / Designer / Computer Operator
            </h1>
          </div>
          <p className="text-lg text-blue-700 font-medium">(on www.mytypingwala.com)</p>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-none shadow-sm mb-6">
          <div className="bg-gray-100 px-6 py-4 border-b-2 border-gray-300">
            <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
              Online Application Form for Typist / Stenographer registration with the following details:
            </h2>
          </div>

          <form key={formKey} onSubmit={handleSubmit} className="p-6 space-y-6">

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
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
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

            <div className="border-2 border-gray-200 p-4 bg-blue-50">
              <h3 className="font-bold text-gray-700 mb-4">Mobile Number</h3>
              <div>
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
              {/* OTP will be enabled later. */}
            </div>

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

            <div className="border-2 border-dashed border-gray-300 p-4 bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-4">Shop Details (Optional for Shop Owners)</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Shop Address</label>
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
                    <label className="block text-sm font-bold text-gray-700 mb-2">Shop Act Certificate</label>
                    <input
                      type="file"
                      name="shopAct"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Shop Photo</label>
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

            <div className="border-2 border-gray-200 p-3 bg-white">
              <h3 className="font-bold text-gray-700 mb-4">
                Available Time <span className="text-red-600">*</span>
              </h3>

              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center">
                <label className="text-sm font-medium text-gray-700">Copy time from:</label>
                <select
                  value={copyFromDay}
                  onChange={(e) => setCopyFromDay(e.target.value)}
                  className="w-full md:w-auto px-2 py-1.5 text-sm border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none"
                >
                  {WEEK_DAYS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleApplyTimeToAllDays}
                  className="w-full md:w-auto px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-none hover:bg-blue-700"
                >
                  Apply to all days
                </button>
              </div>

              <div className="space-y-2">
                {WEEK_DAYS.map((day) => {
                  const slot = formData.availability[day];
                  return (
                    <div key={day}>
                      <div className="grid grid-cols-1 md:grid-cols-[130px_auto_20px_auto] gap-2 items-center md:justify-start">
                        <label className="inline-flex items-center gap-2 text-gray-700 font-medium text-sm">
                          <input
                            type="checkbox"
                            checked={slot.enabled}
                            onChange={() => handleAvailabilityToggle(day)}
                            className="h-3.5 w-3.5 border-2 border-gray-400 rounded-none"
                          />
                          <span>{day}</span>
                        </label>

                        <input
                          type="time"
                          value={slot.from}
                          onChange={(e) => handleAvailabilityTimeChange(day, 'from', e.target.value)}
                          disabled={!slot.enabled}
                          className="w-[130px] px-2 py-1.5 text-sm border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                        />

                        <span className="text-gray-600 text-center text-sm">to</span>

                        <input
                          type="time"
                          value={slot.to}
                          onChange={(e) => handleAvailabilityTimeChange(day, 'to', e.target.value)}
                          disabled={!slot.enabled}
                          className="w-[130px] px-2 py-1.5 text-sm border-2 border-gray-300 rounded-none focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>

                      {errors[`availability_${day}`] && (
                        <p className="text-red-600 text-sm mt-1">{errors[`availability_${day}`]}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {errors.availableTime && <p className="text-red-600 text-sm mt-3">{errors.availableTime}</p>}
            </div>

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

            <div className="border-2 border-gray-200 p-4 bg-gray-50">
              <h3 className="font-bold text-gray-700 mb-3">Required Resources:</h3>
              <div className="space-y-2">
                <label className="inline-flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.resources.computerLaptop}
                    onChange={(e) => handleResourceChange('computerLaptop', e.target.checked)}
                    className="h-4 w-4 border-2 border-gray-400 rounded-none"
                  />
                  <span>a) Computer / Laptop</span>
                </label>
                <label className="inline-flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.resources.internet}
                    onChange={(e) => handleResourceChange('internet', e.target.checked)}
                    className="h-4 w-4 border-2 border-gray-400 rounded-none"
                  />
                  <span>b) Internet</span>
                </label>
                <label className="inline-flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.resources.headphonesEarbuds}
                    onChange={(e) => handleResourceChange('headphonesEarbuds', e.target.checked)}
                    className="h-4 w-4 border-2 border-gray-400 rounded-none"
                  />
                  <span>c) Headphones / Earbuds</span>
                </label>
              </div>
              {errors.equipment && <p className="text-red-600 text-sm mt-2">{errors.equipment}</p>}
            </div>

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

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-none hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

            <div className="border-t-2 border-gray-300 pt-4 mt-6">
              <p className="text-center text-sm font-bold text-red-600">
                Mobile number OTP verification will be enabled in a future update.
              </p>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>

      {submitToast && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div
            className={`rounded border px-4 py-3 text-sm shadow-lg ${
              submitToast.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {submitToast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
