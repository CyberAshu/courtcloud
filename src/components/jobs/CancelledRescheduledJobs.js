import React, { useState } from 'react';
import { XCircle, RotateCcw, Calendar, X, CheckCircle } from 'lucide-react';

const CancelledRescheduledJobs = () => {
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [cancelFormData, setCancelFormData] = useState({
    reason: '',
    customReason: '',
    notifyVendor: false,
    notifyTeam: false
  });
  const [rescheduleFormData, setRescheduleFormData] = useState({
    newStartDateTime: '',
    newEndDateTime: '',
    notifyStakeholders: false,
    conflictRecheck: true
  });
  const [conflictCheckStatus, setConflictCheckStatus] = useState(null);
  const [isCheckingConflicts, setIsCheckingConflicts] = useState(false);

  const cancelledJobs = [
    {
      id: 'JOB-005',
      title: 'Court Hearing Representation',
      matter: 'State vs. Thompson',
      client: 'Justice Legal Group',
      cancelledDate: '2024-01-25T14:00:00',
      cancellationReason: 'Client requested rescheduling'
    }
  ];

  const rescheduledJobs = [
    {
      id: 'JOB-006',
      title: 'Client Consultation',
      matter: 'Business Advisory',
      client: 'Elite Consultation Hub',
      originalStartDateTime: '2024-01-28T09:00:00',
      newStartDateTime: '2024-02-02T09:00:00',
      originalEndDateTime: '2024-01-28T10:00:00',
      newEndDateTime: '2024-02-02T10:00:00'
    }
  ];

  const reasonsForCancellation = [
    'Client requested cancellation',
    'Vendor unavailable',
    'Weather conditions',
    'Technical difficulties',
    'Other'
  ];

  const handleCancelJob = (job) => {
    setSelectedJob(job);
    setCancelFormData({
      reason: '',
      customReason: '',
      notifyVendor: false,
      notifyTeam: false
    });
    setShowCancelForm(true);
  };

  const handleRescheduleJob = (job) => {
    setSelectedJob(job);
    setRescheduleFormData({
      newStartDateTime: job.originalStartDateTime,
      newEndDateTime: job.originalEndDateTime,
      notifyStakeholders: false,
      conflictRecheck: true
    });
    setConflictCheckStatus(null);
    setShowRescheduleForm(true);
  };

  const handleInputChange = (form, field, value) => {
    if (form === 'cancel') {
      setCancelFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setRescheduleFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmitCancel = async () => {
    // Simulate API call
    alert('Job cancellation submitted successfully!');
    setShowCancelForm(false);
    setSelectedJob(null);
  };

  const handleConflictCheck = async () => {
    setIsCheckingConflicts(true);
    setConflictCheckStatus(null);
    
    // Simulate API call for conflict checking
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock conflict check result
    const hasConflicts = Math.random() > 0.7; // 30% chance of conflicts
    setConflictCheckStatus(hasConflicts ? 'conflict' : 'clear');
    setIsCheckingConflicts(false);
  };

  const handleSubmitReschedule = async () => {
    // Auto-trigger conflict check if enabled
    if (rescheduleFormData.conflictRecheck && !conflictCheckStatus) {
      await handleConflictCheck();
    }
    
    // Simulate API call
    alert('Job reschedule submitted successfully!');
    setShowRescheduleForm(false);
    setSelectedJob(null);
    setConflictCheckStatus(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cancelled / Rescheduled Jobs</h1>
                <p className="text-gray-600 mt-1">Manage cancelled and rescheduled jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cancelled Jobs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Cancelled Jobs</h2>
          {cancelledJobs.length === 0 ? (
            <div className="text-center py-12">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cancelled jobs</h3>
              <p className="text-gray-600">Cancelled jobs will appear here once there are any.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cancelledJobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full border bg-red-100 text-red-800 border-red-200 flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancelled
                          </span>
                        </div>
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Cancelled Date: {new Date(job.cancelledDate).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="ml-5">Reason: {job.cancellationReason}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <button
                          onClick={() => handleCancelJob(job)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rescheduled Jobs */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Rescheduled Jobs</h2>
          {rescheduledJobs.length === 0 ? (
            <div className="text-center py-12">
              <RotateCcw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rescheduled jobs</h3>
              <p className="text-gray-600">Rescheduled jobs will appear here once there are any.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {rescheduledJobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full border bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center">
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Rescheduled
                          </span>
                        </div>
                        <div className="text-sm">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Original Start: {new Date(job.originalStartDateTime).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>New Start: {new Date(job.newStartDateTime).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="ml-5">Matter: {job.matter}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <button
                          onClick={() => handleRescheduleJob(job)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Reschedule Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Job Form Modal */}
      {showCancelForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cancel Job</h2>
                <button
                  onClick={() => setShowCancelForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Cancellation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Job ID:</span>
                      <span className="ml-2 font-medium">{selectedJob.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Title:</span>
                      <span className="ml-2 font-medium">{selectedJob.title}</span>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Cancellation *</label>
                      <select
                        value={cancelFormData.reason}
                        onChange={(e) => handleInputChange('cancel', 'reason', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select reason</option>
                        {reasonsForCancellation.map((reason, index) => (
                          <option key={index} value={reason}>{reason}</option>
                        ))}
                      </select>
                      {cancelFormData.reason === 'Other' && (
                        <textarea
                          value={cancelFormData.customReason}
                          onChange={(e) => handleInputChange('cancel', 'customReason', e.target.value)}
                          rows={3}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Provide custom reason"
                        />
                      )}
                    </div>
                    <div className="md:col-span-2 space-y-2 mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={cancelFormData.notifyVendor}
                          onChange={(e) => handleInputChange('cancel', 'notifyVendor', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Notify Vendor</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={cancelFormData.notifyTeam}
                          onChange={(e) => handleInputChange('cancel', 'notifyTeam', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Notify Team</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => setShowCancelForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitCancel}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Submit Cancellation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Job Form Modal */}
      {showRescheduleForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Reschedule Job</h2>
                <button
                  onClick={() => setShowRescheduleForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Reschedule Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Start Date & Time *</label>
                      <input
                        type="datetime-local"
                        value={rescheduleFormData.newStartDateTime}
                        onChange={(e) => handleInputChange('reschedule', 'newStartDateTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New End Date & Time *</label>
                      <input
                        type="datetime-local"
                        value={rescheduleFormData.newEndDateTime}
                        onChange={(e) => handleInputChange('reschedule', 'newEndDateTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={rescheduleFormData.conflictRecheck}
                          onChange={(e) => handleInputChange('reschedule', 'conflictRecheck', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Conflict Re-check (Triggers auto-validation)</span>
                      </label>
                      
                      {rescheduleFormData.conflictRecheck && (
                        <div className="ml-6 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={handleConflictCheck}
                              disabled={isCheckingConflicts}
                              className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 disabled:opacity-50"
                            >
                              {isCheckingConflicts ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                              ) : (
                                <CheckCircle className="w-4 h-4 mr-2" />
                              )}
                              {isCheckingConflicts ? 'Checking...' : 'Check for Conflicts'}
                            </button>
                            
                            {conflictCheckStatus && (
                              <div className={`flex items-center px-3 py-2 rounded-md text-sm ${
                                conflictCheckStatus === 'clear' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {conflictCheckStatus === 'clear' ? (
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                ) : (
                                  <X className="w-4 h-4 mr-2" />
                                )}
                                {conflictCheckStatus === 'clear' ? 'No conflicts found' : 'Conflicts detected'}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={rescheduleFormData.notifyStakeholders}
                          onChange={(e) => handleInputChange('reschedule', 'notifyStakeholders', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Notify Stakeholders (Vendor, Attorney, Admin)</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => setShowRescheduleForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReschedule}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CancelledRescheduledJobs;

