import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Building, 
  Scale, 
  MapPin, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  Clock, 
  Tag, 
  Users, 
  Shield, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

const CreateMatter = () => {
  const [formData, setFormData] = useState({
    // Required fields
    matterName: '',
    matterNumber: '',
    clientName: '',
    practiceArea: 'Litigation',
    primaryAttorney: '',
    
    // Optional fields
    jurisdiction: '',
    supportTeam: [],
    department: '',
    description: '',
    status: 'Intake',
    
    // Dates
    openDate: '',
    expectedCloseDate: '',
    
    // Budget
    estimatedBudget: '',
    budgetAlert: '',
    
    // Settings
    billable: true,
    conflictCheck: false,
    
    // Internal Notes
    internalNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample data
  const practiceAreas = [
    'Litigation', 'Corporate', 'IP', 'Employment', 'Family Law', 
    'Criminal Defense', 'Real Estate', 'Tax', 'Immigration', 'Bankruptcy'
  ];

  const attorneys = [
    { id: 1, name: 'Jane Doe', department: 'Litigation' },
    { id: 2, name: 'Bob Johnson', department: 'Corporate' },
    { id: 3, name: 'Alice Brown', department: 'IP' },
    { id: 4, name: 'Michael Davis', department: 'Employment' },
    { id: 5, name: 'Sarah Wilson', department: 'Family Law' }
  ];

  const supportStaff = [
    { id: 1, name: 'John Smith', role: 'Paralegal' },
    { id: 2, name: 'Emily Johnson', role: 'Legal Assistant' },
    { id: 3, name: 'David Lee', role: 'Paralegal' },
    { id: 4, name: 'Lisa Chen', role: 'Legal Secretary' }
  ];

  const departments = [
    'Litigation', 'Corporate', 'IP', 'Employment', 'Family Law', 
    'Criminal Defense', 'Real Estate', 'Tax', 'Immigration', 'Bankruptcy'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSupportTeamChange = (staffId, checked) => {
    setFormData(prev => ({
      ...prev,
      supportTeam: checked
        ? [...prev.supportTeam, staffId]
        : prev.supportTeam.filter(id => id !== staffId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.matterName.trim()) {
      newErrors.matterName = 'Matter name is required';
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!formData.primaryAttorney) {
      newErrors.primaryAttorney = 'Primary attorney is required';
    }

    // Matter number validation (if provided)
    if (formData.matterNumber && !/^[A-Z0-9-]+$/.test(formData.matterNumber)) {
      newErrors.matterNumber = 'Matter number must contain only letters, numbers, and hyphens';
    }

    // Budget validation
    if (formData.estimatedBudget && isNaN(Number(formData.estimatedBudget))) {
      newErrors.estimatedBudget = 'Budget must be a valid number';
    }

    if (formData.budgetAlert && isNaN(Number(formData.budgetAlert))) {
      newErrors.budgetAlert = 'Budget alert must be a valid number';
    }

    // Conflict check validation
    if (!formData.conflictCheck) {
      newErrors.conflictCheck = 'Conflict check must be performed before creating matter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Matter created:', formData);
      
      // Reset form or redirect
      alert('Matter created successfully!');
    } catch (error) {
      console.error('Error creating matter:', error);
      alert('Error creating matter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Matter</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Matter Name *
              </label>
              <input
                type="text"
                value={formData.matterName}
                onChange={(e) => handleInputChange('matterName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.matterName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.matterName && (
                <p className="mt-1 text-sm text-red-600">{errors.matterName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline w-4 h-4 mr-1" />
                Matter Number
              </label>
              <input
                type="text"
                value={formData.matterNumber}
                onChange={(e) => handleInputChange('matterNumber', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.matterNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MTR-001"
              />
              {errors.matterNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.matterNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Client Name *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.clientName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.clientName && (
                <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Scale className="inline w-4 h-4 mr-1" />
                Practice Area *
              </label>
              <select
                value={formData.practiceArea}
                onChange={(e) => handleInputChange('practiceArea', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {practiceAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Jurisdiction
              </label>
              <input
                type="text"
                value={formData.jurisdiction}
                onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., New York, NY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Primary Attorney *
              </label>
              <select
                value={formData.primaryAttorney}
                onChange={(e) => handleInputChange('primaryAttorney', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.primaryAttorney ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select Attorney</option>
                {attorneys.map(attorney => (
                  <option key={attorney.id} value={attorney.name}>
                    {attorney.name} ({attorney.department})
                  </option>
                ))}
              </select>
              {errors.primaryAttorney && (
                <p className="mt-1 text-sm text-red-600">{errors.primaryAttorney}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Intake">Intake</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="inline w-4 h-4 mr-1" />
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Support Team */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Support Team
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {supportStaff.map(staff => (
                <div key={staff.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`support-${staff.id}`}
                    checked={formData.supportTeam.includes(staff.id)}
                    onChange={(e) => handleSupportTeamChange(staff.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`support-${staff.id}`} className="ml-2 block text-sm text-gray-900">
                    {staff.name} ({staff.role})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Open Date
              </label>
              <input
                type="date"
                value={formData.openDate}
                onChange={(e) => handleInputChange('openDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Expected Close Date
              </label>
              <input
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => handleInputChange('expectedCloseDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Estimated Budget
              </label>
              <input
                type="number"
                value={formData.estimatedBudget}
                onChange={(e) => handleInputChange('estimatedBudget', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.estimatedBudget ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.estimatedBudget && (
                <p className="mt-1 text-sm text-red-600">{errors.estimatedBudget}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <AlertTriangle className="inline w-4 h-4 mr-1" />
                Budget Alert Threshold
              </label>
              <input
                type="number"
                value={formData.budgetAlert}
                onChange={(e) => handleInputChange('budgetAlert', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.budgetAlert ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.budgetAlert && (
                <p className="mt-1 text-sm text-red-600">{errors.budgetAlert}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-1" />
              Matter Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter matter description..."
            />
          </div>

          {/* Internal Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-1" />
              Internal Notes
            </label>
            <textarea
              value={formData.internalNotes}
              onChange={(e) => handleInputChange('internalNotes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Internal notes (not visible to client)..."
            />
          </div>

          {/* Settings */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.billable}
                onChange={(e) => handleInputChange('billable', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Billable Matter
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.conflictCheck}
                onChange={(e) => handleInputChange('conflictCheck', e.target.checked)}
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  errors.conflictCheck ? 'border-red-500' : ''
                }`}
                required
              />
              <label className="ml-2 block text-sm text-gray-900">
                <Shield className="inline w-4 h-4 mr-1" />
                Conflict Check Performed *
              </label>
            </div>
          </div>
          {errors.conflictCheck && (
            <p className="mt-1 text-sm text-red-600">{errors.conflictCheck}</p>
          )}
          
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Create Matter
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMatter;
