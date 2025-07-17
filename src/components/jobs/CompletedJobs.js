import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, FileText, Star, Upload, DollarSign, Save, X, Phone, Mail, MapPin, Briefcase, Users, AlertCircle, Download } from 'lucide-react';

const CompletedJobs = () => {
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [completionFormData, setCompletionFormData] = useState({
    markAsCompleted: false,
    deliverables: [],
    vendorFeedbackScore: 0,
    vendorFeedbackNotes: '',
    internalNotes: '',
    billingTrigger: false
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for completed jobs
  const completedJobs = [
    {
      id: 'JOB-001',
      title: 'Deposition Recording',
      matter: 'Smith vs. Johnson - Personal Injury',
      client: 'ABC Law Firm',
      vendor: {
        name: 'Sarah Johnson',
        company: 'Elite Court Reporting',
        rating: 4.8,
        phone: '(555) 123-4567',
        email: 'sarah@elitecourt.com'
      },
      startDateTime: '2024-01-15T10:00:00',
      endDateTime: '2024-01-15T15:00:00',
      location: '123 Main St, Suite 200, City, State 12345',
      jobType: 'Court Reporting',
      priority: 'High',
      actualCost: '$475',
      estimatedBudget: '$450',
      completedDate: '2024-01-15T15:30:00',
      status: 'Completed',
      deliverables: [
        { name: 'Certified Transcript.pdf', size: '2.3 MB', uploadDate: '2024-01-15T16:00:00' },
        { name: 'Audio Recording.mp3', size: '45.2 MB', uploadDate: '2024-01-15T16:15:00' }
      ],
      vendorFeedback: {
        score: 5,
        notes: 'Excellent work, delivered on time with high quality'
      },
      internalNotes: 'Client satisfied with transcript quality and turnaround time',
      billingStatus: 'Invoiced',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: 'JOB-002',
      title: 'Document Translation',
      matter: 'International Contract Review',
      client: 'Global Legal Services',
      vendor: {
        name: 'Maria Rodriguez',
        company: 'LinguaLegal Translations',
        rating: 4.9,
        phone: '(555) 987-6543',
        email: 'maria@lingualegal.com'
      },
      startDateTime: '2024-01-16T09:00:00',
      endDateTime: '2024-01-16T17:00:00',
      location: 'Remote',
      jobType: 'Translation',
      priority: 'Medium',
      actualCost: '$340',
      estimatedBudget: '$320',
      completedDate: '2024-01-16T16:45:00',
      status: 'Completed',
      deliverables: [
        { name: 'Translated Contract - English.pdf', size: '1.8 MB', uploadDate: '2024-01-16T17:00:00' },
        { name: 'Translation Certificate.pdf', size: '0.5 MB', uploadDate: '2024-01-16T17:05:00' }
      ],
      vendorFeedback: {
        score: 4,
        notes: 'Good quality translation, minor formatting issues'
      },
      internalNotes: 'Translation accurate, client approved final version',
      billingStatus: 'Pending',
      invoiceNumber: null
    },
    {
      id: 'JOB-003',
      title: 'Expert Witness Testimony',
      matter: 'Medical Malpractice Case',
      client: 'Healthcare Legal Group',
      vendor: {
        name: 'Dr. Michael Chen',
        company: 'Medical Expert Consultants',
        rating: 4.7,
        phone: '(555) 456-7890',
        email: 'mchen@medexperts.com'
      },
      startDateTime: '2024-01-18T14:00:00',
      endDateTime: '2024-01-18T16:00:00',
      location: 'Federal Courthouse, Room 304',
      jobType: 'Expert Witness',
      priority: 'High',
      actualCost: '$825',
      estimatedBudget: '$800',
      completedDate: '2024-01-18T16:30:00',
      status: 'Completed',
      deliverables: [
        { name: 'Expert Report.pdf', size: '3.2 MB', uploadDate: '2024-01-18T17:00:00' },
        { name: 'Testimony Transcript.pdf', size: '2.1 MB', uploadDate: '2024-01-18T17:30:00' }
      ],
      vendorFeedback: {
        score: 5,
        notes: 'Exceptional expertise and presentation'
      },
      internalNotes: 'Expert testimony was crucial for case outcome',
      billingStatus: 'Invoiced',
      invoiceNumber: 'INV-2024-002'
    }
  ];

  const handleCompletionReview = (job) => {
    setSelectedJob(job);
    setCompletionFormData({
      markAsCompleted: true,
      deliverables: job.deliverables || [],
      vendorFeedbackScore: job.vendorFeedback?.score || 0,
      vendorFeedbackNotes: job.vendorFeedback?.notes || '',
      internalNotes: job.internalNotes || '',
      billingTrigger: job.billingStatus === 'Invoiced'
    });
    setShowCompletionForm(true);
  };

  const handleInputChange = (field, value) => {
    setCompletionFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDeliverables = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString(),
      file: file
    }));
    setCompletionFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, ...newDeliverables]
    }));
  };

  const removeDeliverable = (index) => {
    setCompletionFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitCompletion = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowCompletionForm(false);
    setSelectedJob(null);
    // Show success message
    alert('Job completion review submitted successfully!');
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

  const getBillingStatusColor = (status) => {
    switch (status) {
      case 'Invoiced':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Paid':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const CompletionReviewForm = ({ job }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Job Completion Review</h2>
            <button
              onClick={() => setShowCompletionForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Job Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Job Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
                  <span className="text-gray-600">Vendor:</span>
                  <span className="ml-2 font-medium">{job.vendor.name} - {job.vendor.company}</span>
                </div>
                <div>
                  <span className="text-gray-600">Start Date:</span>
                  <span className="ml-2 font-medium">{formatDateTime(job.startDateTime)}</span>
                </div>
                <div>
                  <span className="text-gray-600">End Date:</span>
                  <span className="ml-2 font-medium">{formatDateTime(job.endDateTime)}</span>
                </div>
              </div>
            </div>

            {/* Completion Status */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={completionFormData.markAsCompleted}
                  onChange={(e) => handleInputChange('markAsCompleted', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Mark as Completed</span>
                <span className="ml-2 text-xs text-gray-500">(This will trigger the billing flow)</span>
              </label>
            </div>

            {/* Upload Deliverables */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Upload Deliverables *</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="deliverables"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4"
                />
                <label htmlFor="deliverables" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500">All file types supported</p>
                </label>
              </div>

              {completionFormData.deliverables.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-gray-900">Uploaded Deliverables:</h4>
                  {completionFormData.deliverables.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {formatDateTime(file.uploadDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeDeliverable(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vendor Feedback */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Vendor Feedback Score</h3>
              <div className="flex items-center space-x-2 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleInputChange('vendorFeedbackScore', i + 1)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      i < completionFormData.vendorFeedbackScore
                        ? 'bg-yellow-400 border-yellow-400'
                        : 'border-gray-300 hover:border-yellow-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 mx-auto ${
                      i < completionFormData.vendorFeedbackScore ? 'text-white' : 'text-gray-400'
                    }`} />
                  </button>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {completionFormData.vendorFeedbackScore} out of 5 stars
                </span>
              </div>
              <textarea
                value={completionFormData.vendorFeedbackNotes}
                onChange={(e) => handleInputChange('vendorFeedbackNotes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add feedback notes about vendor performance (optional)"
              />
            </div>

            {/* Internal Notes */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Internal Notes</h3>
              <textarea
                value={completionFormData.internalNotes}
                onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any internal notes or observations (optional)"
              />
            </div>

            {/* Billing Trigger */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={completionFormData.billingTrigger}
                  onChange={(e) => handleInputChange('billingTrigger', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Billing Trigger</span>
                <span className="ml-2 text-xs text-gray-500">(Initiates invoice draft generation)</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={() => setShowCompletionForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitCompletion}
              disabled={isLoading || !completionFormData.markAsCompleted || completionFormData.deliverables.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Submit Completion Review
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
                <h1 className="text-2xl font-bold text-gray-900">Completed Jobs</h1>
                <p className="text-gray-600 mt-1">Review and manage completed legal service jobs</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {completedJobs.length} completed jobs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {completedJobs.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No completed jobs</h3>
            <p className="text-gray-600">Completed jobs will appear here once you finish them.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {completedJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full border bg-green-100 text-green-800 border-green-200 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBillingStatusColor(job.billingStatus)}`}>
                          {job.billingStatus}
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
                            <span>Cost: {job.actualCost} (Est: {job.estimatedBudget})</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Start: {formatDateTime(job.startDateTime)}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Completed: {formatDateTime(job.completedDate)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <User className="w-4 h-4 mr-1" />
                            <span>{job.vendor.name}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <span className="ml-5 text-sm">{job.vendor.company}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <div className="flex items-center ml-5">
                              {renderStars(job.vendorFeedback?.score || 0)}
                              <span className="ml-1 text-sm">{job.vendorFeedback?.score || 0}/5</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Deliverables */}
                      {job.deliverables && job.deliverables.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Deliverables ({job.deliverables.length}):</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.deliverables.map((file, index) => (
                              <div key={index} className="flex items-center bg-gray-50 rounded-md px-3 py-1 text-sm">
                                <FileText className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{file.name}</span>
                                <span className="ml-2 text-xs text-gray-500">({file.size})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {job.internalNotes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <div className="flex items-start">
                            <FileText className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Internal Notes:</p>
                              <p className="text-sm text-gray-700">{job.internalNotes}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Vendor Feedback */}
                      {job.vendorFeedback?.notes && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-md">
                          <div className="flex items-start">
                            <Star className="w-4 h-4 mr-2 text-blue-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-900">Vendor Feedback:</p>
                              <p className="text-sm text-blue-700">{job.vendorFeedback.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleCompletionReview(job)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Review
                      </button>
                      {job.invoiceNumber && (
                        <span className="text-xs text-gray-500">
                          {job.invoiceNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completion Review Modal */}
      {showCompletionForm && selectedJob && <CompletionReviewForm job={selectedJob} />}
    </div>
  );
};

export default CompletedJobs;
