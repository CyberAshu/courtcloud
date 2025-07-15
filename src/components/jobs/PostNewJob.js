import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const PostNewJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    matter: null,
    clientName: '',
    clientLocation: '',
    jobType: null,
    locationType: 'physical',
    physicalAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    meetingLink: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    timeZone: 'America/New_York',
    languageRequirements: [],
    numberOfParticipants: 1,
    specialInstructions: '',
    attachments: [],
    priority: 'medium',
    conflictCheck: false,
    autoAssignVendor: false,
    notifyInternalTeam: true,
    isRecurring: false,
    recurrencePattern: 'weekly',
    recurrenceEnd: '',
    createdBy: 'John Doe' // This would be auto-filled with current user
  });

  const [errors, setErrors] = useState({});
  const [showRecurrence, setShowRecurrence] = useState(false);
  const [showGoogleMaps, setShowGoogleMaps] = useState(false);

  // Mock data - in real app, these would come from API
  const matterOptions = [
    { value: 'matter1', label: 'Smith vs. Johnson - Personal Injury', client: 'Smith Family', location: 'New York, NY' },
    { value: 'matter2', label: 'ABC Corp Merger', client: 'ABC Corporation', location: 'Los Angeles, CA' },
    { value: 'matter3', label: 'Estate Planning - Williams', client: 'Williams Estate', location: 'Chicago, IL' },
    { value: 'matter4', label: 'Criminal Defense - Davis', client: 'Michael Davis', location: 'Miami, FL' }
  ];

  const jobTypeOptions = [
    { value: 'deposition', label: 'Deposition' },
    { value: 'court_hearing', label: 'Court Hearing' },
    { value: 'client_meeting', label: 'Client Meeting' },
    { value: 'mediation', label: 'Mediation' },
    { value: 'arbitration', label: 'Arbitration' },
    { value: 'document_review', label: 'Document Review' },
    { value: 'interview', label: 'Interview' },
    { value: 'consultation', label: 'Consultation' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese (Mandarin)' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'russian', label: 'Russian' },
    { value: 'portuguese', label: 'Portuguese' }
  ];

  const timeZoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: '#10b981' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#ef4444' },
    { value: 'urgent', label: 'Urgent', color: '#dc2626' }
  ];

  const recurrenceOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleMatterChange = (selectedMatter) => {
    setFormData(prev => ({
      ...prev,
      matter: selectedMatter,
      clientName: selectedMatter ? selectedMatter.client : '',
      clientLocation: selectedMatter ? selectedMatter.location : ''
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.matter) {
      newErrors.matter = 'Matter selection is required';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Job type is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.locationType === 'physical') {
      if (!formData.physicalAddress.street.trim()) {
        newErrors.physicalAddress = 'Physical address is required';
      }
    } else if (formData.locationType === 'remote') {
      if (!formData.meetingLink.trim()) {
        newErrors.meetingLink = 'Meeting link is required for remote jobs';
      }
    }

    if (formData.numberOfParticipants < 1) {
      newErrors.numberOfParticipants = 'Number of participants must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your API
      alert('Job posted successfully!');
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '42px',
      border: state.isFocused ? '2px solid #3b82f6' : '1px solid #d1d5db',
      borderRadius: '6px',
      boxShadow: 'none',
      '&:hover': {
        border: state.isFocused ? '2px solid #3b82f6' : '1px solid #9ca3af'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#eff6ff',
      border: '1px solid #3b82f6'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1e40af'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#1e40af',
      '&:hover': {
        backgroundColor: '#3b82f6',
        color: 'white'
      }
    })
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Job</h1>
        <p className="text-gray-600">Create a new job posting with all necessary details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Job Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter job title"
              />
              {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
              <Select
                value={formData.jobType}
                onChange={(selected) => setFormData(prev => ({ ...prev, jobType: selected }))}
                options={jobTypeOptions}
                styles={customSelectStyles}
                placeholder="Select job type"
                isClearable
              />
              {errors.jobType && <p className="mt-1 text-sm text-red-600">{errors.jobType}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Matter *</label>
              <Select
                value={formData.matter}
                onChange={handleMatterChange}
                options={matterOptions}
                styles={customSelectStyles}
                placeholder="Select matter"
                isClearable
              />
              {errors.matter && <p className="mt-1 text-sm text-red-600">{errors.matter}</p>}
            </div>

            {formData.matter && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Location</label>
                  <input
                    type="text"
                    value={formData.clientLocation}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    readOnly
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
              <input
                type="text"
                value={formData.createdBy}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Location Details
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Location Type</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="locationType"
                  value="physical"
                  checked={formData.locationType === 'physical'}
                  onChange={handleInputChange}
                  className="mr-2 text-blue-600"
                />
                <span className="text-gray-700">Physical Location</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="locationType"
                  value="remote"
                  checked={formData.locationType === 'remote'}
                  onChange={handleInputChange}
                  className="mr-2 text-blue-600"
                />
                <span className="text-gray-700">Remote/Virtual</span>
              </label>
            </div>
          </div>

          {formData.locationType === 'physical' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  name="physicalAddress.street"
                  value={formData.physicalAddress.street}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.physicalAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter street address"
                />
                {errors.physicalAddress && <p className="mt-1 text-sm text-red-600">{errors.physicalAddress}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="physicalAddress.city"
                  value={formData.physicalAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="physicalAddress.state"
                  value={formData.physicalAddress.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="physicalAddress.zipCode"
                  value={formData.physicalAddress.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ZIP code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  name="physicalAddress.country"
                  value={formData.physicalAddress.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleMaps(!showGoogleMaps)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {showGoogleMaps ? 'Hide' : 'Show'} Google Maps Integration
                </button>
                {showGoogleMaps && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Google Maps integration would be implemented here</p>
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Google Maps Placeholder</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {formData.locationType === 'remote' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link *</label>
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.meetingLink ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter meeting link (Zoom, Teams, etc.)"
              />
              {errors.meetingLink && <p className="mt-1 text-sm text-red-600">{errors.meetingLink}</p>}
            </div>
          )}
        </div>

        {/* Date and Time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Date & Time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <Select
                value={timeZoneOptions.find(tz => tz.value === formData.timeZone)}
                onChange={(selected) => setFormData(prev => ({ ...prev, timeZone: selected.value }))}
                options={timeZoneOptions}
                styles={customSelectStyles}
                placeholder="Select time zone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Additional Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language Requirements</label>
              <Select
                value={formData.languageRequirements}
                onChange={(selected) => setFormData(prev => ({ ...prev, languageRequirements: selected }))}
                options={languageOptions}
                styles={customSelectStyles}
                placeholder="Select languages"
                isMulti
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Participants</label>
              <input
                type="number"
                name="numberOfParticipants"
                value={formData.numberOfParticipants}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.numberOfParticipants ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.numberOfParticipants && <p className="mt-1 text-sm text-red-600">{errors.numberOfParticipants}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
              <Select
                value={priorityOptions.find(p => p.value === formData.priority)}
                onChange={(selected) => setFormData(prev => ({ ...prev, priority: selected.value }))}
                options={priorityOptions}
                styles={customSelectStyles}
                placeholder="Select priority"
                formatOptionLabel={(option) => (
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: option.color }}></div>
                    {option.label}
                  </div>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any special instructions or requirements"
              />
            </div>
          </div>
        </div>

        {/* File Attachments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            Attachments
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="attachments"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <label htmlFor="attachments" className="cursor-pointer">
              <svg className="w-8 h-8 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
              <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG</p>
            </label>
          </div>

          {formData.attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="font-medium text-gray-900">Attached Files:</h3>
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options and Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Options & Settings
          </h2>

          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="conflictCheck"
                checked={formData.conflictCheck}
                onChange={handleInputChange}
                className="mr-3 rounded text-blue-600"
              />
              <span className="text-gray-700">Perform conflict check before posting</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="autoAssignVendor"
                checked={formData.autoAssignVendor}
                onChange={handleInputChange}
                className="mr-3 rounded text-blue-600"
              />
              <span className="text-gray-700">Auto-assign vendor based on criteria</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifyInternalTeam"
                checked={formData.notifyInternalTeam}
                onChange={handleInputChange}
                className="mr-3 rounded text-blue-600"
              />
              <span className="text-gray-700">Notify internal team members</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={(e) => {
                  handleInputChange(e);
                  setShowRecurrence(e.target.checked);
                }}
                className="mr-3 rounded text-blue-600"
              />
              <span className="text-gray-700">This is a recurring job</span>
            </label>

            {showRecurrence && (
              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recurrence Pattern</label>
                  <Select
                    value={recurrenceOptions.find(r => r.value === formData.recurrencePattern)}
                    onChange={(selected) => setFormData(prev => ({ ...prev, recurrencePattern: selected.value }))}
                    options={recurrenceOptions}
                    styles={customSelectStyles}
                    placeholder="Select pattern"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recurrence End Date</label>
                  <input
                    type="date"
                    name="recurrenceEnd"
                    value={formData.recurrenceEnd}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostNewJob;
