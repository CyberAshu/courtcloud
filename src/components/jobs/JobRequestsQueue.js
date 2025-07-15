import React, { useState, useEffect } from 'react';
import { AlertTriangle, User, Clock, MapPin, Star, Check, X, Edit } from 'lucide-react';

const JobRequestsQueue = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [jobRequests, setJobRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for job requests
  useEffect(() => {
    const mockJobRequests = [
      {
        id: 'JR-2024-001',
        title: 'Court Hearing Translation',
        matter: 'Smith vs. Johnson',
        client: 'John Smith',
        startTime: '2024-01-15T10:00:00',
        endTime: '2024-01-15T12:00:00',
        location: 'Downtown Court, Room 205',
        priority: 'High',
        status: 'pending',
        language: 'Spanish',
        hasConflict: true,
        conflictDetails: 'Vendor previously worked for opposing counsel',
        suggestedVendors: [
          {
            id: 'V1',
            name: 'Maria Rodriguez',
            rating: 4.8,
            matchScore: 95,
            hourlyRate: 85,
            availability: 'Available',
            specialties: ['Legal Translation', 'Spanish']
          },
          {
            id: 'V2',
            name: 'Carlos Mendez',
            rating: 4.6,
            matchScore: 88,
            hourlyRate: 80,
            availability: 'Available',
            specialties: ['Court Interpretation', 'Spanish']
          },
          {
            id: 'V3',
            name: 'Ana Gutierrez',
            rating: 4.7,
            matchScore: 92,
            hourlyRate: 90,
            availability: 'Limited',
            specialties: ['Legal Translation', 'Spanish', 'Medical']
          }
        ]
      },
      {
        id: 'JR-2024-002',
        title: 'Document Review',
        matter: 'Corporate Merger ABC',
        client: 'ABC Corporation',
        startTime: '2024-01-16T09:00:00',
        endTime: '2024-01-16T17:00:00',
        location: 'Remote',
        priority: 'Medium',
        status: 'pending',
        language: 'English',
        hasConflict: false,
        conflictDetails: null,
        suggestedVendors: [
          {
            id: 'V4',
            name: 'David Chen',
            rating: 4.9,
            matchScore: 97,
            hourlyRate: 120,
            availability: 'Available',
            specialties: ['Document Review', 'Corporate Law']
          },
          {
            id: 'V5',
            name: 'Sarah Wilson',
            rating: 4.5,
            matchScore: 85,
            hourlyRate: 100,
            availability: 'Available',
            specialties: ['Legal Research', 'Contract Review']
          }
        ]
      }
    ];

    setTimeout(() => {
      setJobRequests(mockJobRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setSelectedVendor(null);
    setIsEditMode(false);
  };

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleAssignVendor = () => {
    if (selectedJob && selectedVendor) {
      alert(`Vendor ${selectedVendor.name} assigned to job ${selectedJob.id}`);
      // Update job status
      const updatedRequests = jobRequests.map(job => 
        job.id === selectedJob.id ? { ...job, status: 'assigned' } : job
      );
      setJobRequests(updatedRequests);
    }
  };

  const handleApproveSchedule = () => {
    if (selectedJob) {
      alert(`Job ${selectedJob.id} approved and scheduled`);
      // Update job status
      const updatedRequests = jobRequests.map(job => 
        job.id === selectedJob.id ? { ...job, status: 'approved' } : job
      );
      setJobRequests(updatedRequests);
    }
  };

  const handleRejectModify = () => {
    setIsEditMode(true);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading job requests...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Job Requests Queue</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Requests List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Pending Requests</h2>
            <p className="text-sm text-gray-600 mt-1">{jobRequests.length} requests awaiting review</p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {jobRequests.map((job) => (
              <div
                key={job.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedJob?.id === job.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => handleJobSelect(job)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{job.title}</span>
                      {job.hasConflict && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{job.matter}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDateTime(job.startTime)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Details and Review Form */}
        <div className="bg-white rounded-lg shadow-md">
          {selectedJob ? (
            <div>
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Job Request Review</h2>
                <p className="text-sm text-gray-600 mt-1">Review and process job request</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Job ID and Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Reference ID</label>
                    <div className="p-3 bg-gray-50 rounded-md text-sm font-mono border">{selectedJob.id}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Request Priority Level</label>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedJob.priority)}`}>
                      {selectedJob.priority} Priority
                    </span>
                  </div>
                </div>

                {/* Request Summary */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-4">Job Request Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium text-gray-600">Service Type:</span> <span className="ml-2">{selectedJob.title}</span></div>
                    <div><span className="font-medium text-gray-600">Associated Matter:</span> <span className="ml-2">{selectedJob.matter}</span></div>
                    <div><span className="font-medium text-gray-600">Client Name:</span> <span className="ml-2">{selectedJob.client}</span></div>
                    <div><span className="font-medium text-gray-600">Required Language:</span> <span className="ml-2">{selectedJob.language}</span></div>
                    <div><span className="font-medium text-gray-600">Scheduled Start:</span> <span className="ml-2">{formatDateTime(selectedJob.startTime)}</span></div>
                    <div><span className="font-medium text-gray-600">Scheduled End:</span> <span className="ml-2">{formatDateTime(selectedJob.endTime)}</span></div>
                    <div className="md:col-span-2"><span className="font-medium text-gray-600">Service Location:</span> <span className="ml-2">{selectedJob.location}</span></div>
                  </div>
                </div>

                {/* Conflict Warning */}
                {selectedJob.hasConflict && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-800">Conflict Warning</span>
                    </div>
                    <p className="text-sm text-red-700">{selectedJob.conflictDetails}</p>
                  </div>
                )}

                {/* Suggested Vendors */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Recommended Service Providers</h3>
                  <div className="space-y-3">
                    {selectedJob.suggestedVendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedVendor?.id === vendor.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleVendorSelect(vendor)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium">{vendor.name}</div>
                              <div className="text-sm text-gray-600">${vendor.hourlyRate}/hour</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{vendor.rating}</span>
                            </div>
                            <div className="text-xs text-gray-500">{vendor.matchScore}% match</div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            vendor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {vendor.availability}
                          </span>
                          <div className="flex gap-1">
                            {vendor.specialties.map((specialty, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <button
                    onClick={handleAssignVendor}
                    disabled={!selectedVendor}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <User className="h-4 w-4" />
                    Assign Selected Vendor
                  </button>
                  <button
                    onClick={handleApproveSchedule}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Check className="h-4 w-4" />
                    Approve & Schedule Job
                  </button>
                  <button
                    onClick={handleRejectModify}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    Request Modifications
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Job Request</h3>
                <p className="text-gray-600">Choose a job request from the list to review and process</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Mode Modal */}
      {isEditMode && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Request Modification</h2>
              <p className="text-sm text-gray-600 mt-1">Provide feedback and request changes to this job request</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Modification Request *</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Please explain why this request needs modification or rejection..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recommended Changes</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Provide specific suggestions for improving this job request..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsEditMode(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Job request rejected/modified');
                    setIsEditMode(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Reject Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRequestsQueue;
