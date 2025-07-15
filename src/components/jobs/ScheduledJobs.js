import React, { useState } from 'react';
import { Calendar, Clock, User, Edit, AlertCircle, CheckCircle, XCircle, RotateCcw, Bell, FileText, MapPin, Phone, Mail, Star, Users, Briefcase, DollarSign, Timer, Save, X } from 'lucide-react';

const ScheduledJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Mock data for scheduled jobs
  const scheduledJobs = [
    {
      id: 'JOB-001',
      title: 'Deposition Recording',
      matter: 'Smith vs. Johnson',
      client: 'ABC Law Firm',
      assignedVendor: {
        id: 'V001',
        name: 'Sarah Johnson',
        company: 'Elite Court Reporting',
        rating: 4.8,
        phone: '(555) 123-4567',
        email: 'sarah@elitecourt.com'
      },
      startDateTime: '2024-01-15T10:00:00',
      endDateTime: '2024-01-15T15:00:00',
      status: 'Scheduled',
      location: '123 Main St, Suite 200, City, State 12345',
      jobType: 'Court Reporting',
      priority: 'High',
      estimatedBudget: '$450',
      notes: 'Client requires certified transcript within 24 hours',
      createdDate: '2024-01-10T09:00:00',
      timezone: 'America/New_York'
    },
    {
      id: 'JOB-002',
      title: 'Document Translation',
      matter: 'International Contract Review',
      client: 'Global Legal Services',
      assignedVendor: {
        id: 'V002',
        name: 'Maria Rodriguez',
        company: 'LinguaLegal Translations',
        rating: 4.9,
        phone: '(555) 987-6543',
        email: 'maria@lingualegal.com'
      },
      startDateTime: '2024-01-16T09:00:00',
      endDateTime: '2024-01-16T17:00:00',
      status: 'In Progress',
      location: 'Remote',
      jobType: 'Translation',
      priority: 'Medium',
      estimatedBudget: '$320',
      notes: 'Spanish to English translation - contract documents',
      createdDate: '2024-01-12T14:30:00',
      timezone: 'America/New_York'
    },
    {
      id: 'JOB-003',
      title: 'Expert Witness Testimony',
      matter: 'Medical Malpractice Case',
      client: 'Healthcare Legal Group',
      assignedVendor: {
        id: 'V003',
        name: 'Dr. Michael Chen',
        company: 'Medical Expert Consultants',
        rating: 4.7,
        phone: '(555) 456-7890',
        email: 'mchen@medexperts.com'
      },
      startDateTime: '2024-01-18T14:00:00',
      endDateTime: '2024-01-18T16:00:00',
      status: 'Completed',
      location: 'Federal Courthouse, Room 304',
      jobType: 'Expert Witness',
      priority: 'High',
      estimatedBudget: '$800',
      notes: 'Testimony completed successfully. Report pending.',
      createdDate: '2024-01-08T11:15:00',
      timezone: 'America/New_York'
    },
    {
      id: 'JOB-004',
      title: 'Process Service',
      matter: 'Landlord Tenant Dispute',
      client: 'Property Management Legal',
      assignedVendor: {
        id: 'V004',
        name: 'James Wilson',
        company: 'Swift Process Services',
        rating: 4.6,
        phone: '(555) 321-9876',
        email: 'jwilson@swiftprocess.com'
      },
      startDateTime: '2024-01-20T11:00:00',
      endDateTime: '2024-01-20T13:00:00',
      status: 'Cancelled',
      location: '456 Oak Avenue, Apartment 2B',
      jobType: 'Process Service',
      priority: 'Low',
      estimatedBudget: '$75',
      notes: 'Cancelled due to settlement reached',
      createdDate: '2024-01-14T16:45:00',
      timezone: 'America/New_York'
    }
  ];

  // Mock vendor data for reassignment
  const availableVendors = [
    {
      id: 'V005',
      name: 'Lisa Anderson',
      company: 'Premier Court Solutions',
      rating: 4.9,
      specialties: ['Court Reporting', 'Video Conferencing'],
      availability: 'Available',
      phone: '(555) 555-0001',
      email: 'lisa@premiercourt.com'
    },
    {
      id: 'V006',
      name: 'Robert Martinez',
      company: 'Legal Process Experts',
      rating: 4.7,
      specialties: ['Process Service', 'Document Delivery'],
      availability: 'Available',
      phone: '(555) 555-0002',
      email: 'robert@legalprocess.com'
    },
    {
      id: 'V007',
      name: 'Dr. Emily Foster',
      company: 'Forensic Analysis Group',
      rating: 4.8,
      specialties: ['Expert Witness', 'Forensic Analysis'],
      availability: 'Limited',
      phone: '(555) 555-0003',
      email: 'efoster@forensicgroup.com'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 flex text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 flex text-yellow-800 border-yellow-200';
      case 'Completed':
        return 'bg-green-100 flex text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 flex text-red-800 border-red-200';
      default:
        return 'bg-gray-100 flex text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Scheduled':
        return <Calendar className="w-4 h-4" />;
      case 'In Progress':
        return <Timer className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setFormData({
      assignedVendor: job.assignedVendor.id,
      startDateTime: job.startDateTime.slice(0, 16),
      endDateTime: job.endDateTime.slice(0, 16),
      status: job.status,
      internalNotes: job.notes || '',
      notifyClient: false,
      notifyVendor: false,
      notifyTeam: false
    });
    setShowEditForm(true);
  };

  const handleReassignVendor = (job) => {
    setSelectedJob(job);
    setShowReassignModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowEditForm(false);
    setSelectedJob(null);
  };

  const handleReassignConfirm = async (newVendorId) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowReassignModal(false);
    setSelectedJob(null);
  };

  const EditJobForm = ({ job }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Scheduled Job</h2>
            <button
              onClick={() => setShowEditForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Job Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Job Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Job ID:</span>
                  <span className="ml-2 font-medium">{job.id}</span>
                </div>
                <div>
                  <span className="text-gray-600">Title:</span>
                  <span className="ml-2 font-medium">{job.title}</span>
                </div>
                <div>
                  <span className="text-gray-600">Matter:</span>
                  <span className="ml-2 font-medium">{job.matter}</span>
                </div>
                <div>
                  <span className="text-gray-600">Client:</span>
                  <span className="ml-2 font-medium">{job.client}</span>
                </div>
              </div>
            </div>

            {/* Assigned Vendor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Vendor *
              </label>
              <select
                value={formData.assignedVendor}
                onChange={(e) => handleInputChange('assignedVendor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={job.assignedVendor.id}>
                  {job.assignedVendor.name} - {job.assignedVendor.company}
                </option>
                {availableVendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name} - {vendor.company}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleReassignVendor(job)}
                className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reassign Vendor
              </button>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDateTime}
                  onChange={(e) => handleInputChange('startDateTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={(e) => handleInputChange('endDateTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internal Notes
              </label>
              <textarea
                value={formData.internalNotes}
                onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any internal notes or updates..."
              />
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Send Notifications
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notifyClient}
                    onChange={(e) => handleInputChange('notifyClient', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Notify Client</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notifyVendor}
                    onChange={(e) => handleInputChange('notifyVendor', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Notify Vendor</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.notifyTeam}
                    onChange={(e) => handleInputChange('notifyTeam', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Notify Team Members</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={() => setShowEditForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ReassignModal = ({ job }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Reassign Vendor</h2>
            <button
              onClick={() => setShowReassignModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Select a new vendor to assign to this job:
          </p>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {availableVendors.map(vendor => (
              <div
                key={vendor.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleReassignConfirm(vendor.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                    <p className="text-sm text-gray-600">{vendor.company}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{vendor.rating}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        vendor.availability === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vendor.availability}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowReassignModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Scheduled Jobs</h1>
                <p className="text-gray-600 mt-1">Manage and edit your scheduled legal service jobs</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {scheduledJobs.length} jobs scheduled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {scheduledJobs.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled jobs</h3>
            <p className="text-gray-600">Your scheduled jobs will appear here when you have them.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {scheduledJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          <span className="ml-1">{job.status}</span>
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Briefcase className="w-4 h-4 mr-1" />
                            <span>Matter: {job.matter}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Users className="w-4 h-4 mr-1" />
                            <span>Client: {job.client}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>Budget: {job.estimatedBudget}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Start: {formatDateTime(job.startDateTime)}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>End: {formatDateTime(job.endDateTime)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <User className="w-4 h-4 mr-1" />
                            <span>{job.assignedVendor.name}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <span className="ml-5 text-sm">{job.assignedVendor.company}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            <span>{job.assignedVendor.rating}</span>
                          </div>
                        </div>
                      </div>

                      {job.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <div className="flex items-start">
                            <FileText className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                            <p className="text-sm text-gray-700">{job.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleReassignVendor(job)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100"
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reassign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showEditForm && selectedJob && <EditJobForm job={selectedJob} />}
      {showReassignModal && selectedJob && <ReassignModal job={selectedJob} />}
    </div>
  );
};

export default ScheduledJobs;
