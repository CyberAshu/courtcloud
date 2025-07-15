import React, { useState } from 'react';
import { Shield, Plus, Search, X, Edit2, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

const EthicalWalls = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [selectedMatter, setSelectedMatter] = useState('');
  const [excludedUsers, setExcludedUsers] = useState([]);
  const [reason, setReason] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [enforcementScope, setEnforcementScope] = useState({
    documents: true,
    tasks: true,
    communications: true
  });
  const [notifyAdmins, setNotifyAdmins] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock data for matters
  const matters = [
    { id: 1, name: 'Smith vs Johnson', number: 'M-2024-001' },
    { id: 2, name: 'Corporate Merger - ABC Corp', number: 'M-2024-002' },
    { id: 3, name: 'Patent Infringement Case', number: 'M-2024-003' },
    { id: 4, name: 'Employment Dispute - XYZ Inc', number: 'M-2024-004' },
    { id: 5, name: 'Real Estate Transaction', number: 'M-2024-005' }
  ];

  // Mock data for users
  const allUsers = [
    { id: 1, name: 'John Smith', email: 'john.smith@firm.com', role: 'Partner' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@firm.com', role: 'Senior Associate' },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@firm.com', role: 'Associate' },
    { id: 4, name: 'Emily Brown', email: 'emily.brown@firm.com', role: 'Paralegal' },
    { id: 5, name: 'David Wilson', email: 'david.wilson@firm.com', role: 'Junior Associate' },
    { id: 6, name: 'Lisa Martinez', email: 'lisa.martinez@firm.com', role: 'Legal Assistant' }
  ];

  // Mock data for existing ethical walls
  const [existingWalls, setExistingWalls] = useState([
    {
      id: 1,
      matter: 'Smith vs Johnson',
      excludedUsers: ['John Smith', 'Sarah Johnson'],
      reason: 'Conflict of interest - previous representation of opposing party',
      expiryDate: '2024-12-31',
      enforcementScope: ['Documents', 'Tasks', 'Communications'],
      notifyAdmins: true,
      status: 'Active',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      matter: 'Corporate Merger - ABC Corp',
      excludedUsers: ['Mike Davis'],
      reason: 'Personal relationship with opposing counsel',
      expiryDate: '2024-06-30',
      enforcementScope: ['Documents', 'Communications'],
      notifyAdmins: false,
      status: 'Active',
      createdDate: '2024-02-01'
    }
  ]);

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredWalls = existingWalls.filter(wall =>
    wall.matter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wall.excludedUsers.some(user => user.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddUser = (user) => {
    if (!excludedUsers.find(u => u.id === user.id)) {
      setExcludedUsers([...excludedUsers, user]);
    }
    setUserSearch('');
  };

  const handleRemoveUser = (userId) => {
    setExcludedUsers(excludedUsers.filter(user => user.id !== userId));
  };

  const handleEnforcementChange = (scope) => {
    setEnforcementScope(prev => ({
      ...prev,
      [scope]: !prev[scope]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedMatter) {
      newErrors.matter = 'Matter selection is required';
    }

    if (excludedUsers.length === 0) {
      newErrors.users = 'At least one user must be excluded';
    }

    if (!reason.trim()) {
      newErrors.reason = 'Reason for ethical wall is required';
    }

    if (!enforcementScope.documents && !enforcementScope.tasks && !enforcementScope.communications) {
      newErrors.enforcement = 'At least one enforcement scope must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedMatterObj = matters.find(m => m.id === parseInt(selectedMatter));
    const enforcementScopeArray = [];
    if (enforcementScope.documents) enforcementScopeArray.push('Documents');
    if (enforcementScope.tasks) enforcementScopeArray.push('Tasks');
    if (enforcementScope.communications) enforcementScopeArray.push('Communications');

    const newWall = {
      id: Date.now(),
      matter: selectedMatterObj.name,
      excludedUsers: excludedUsers.map(u => u.name),
      reason: reason.trim(),
      expiryDate: expiryDate || null,
      enforcementScope: enforcementScopeArray,
      notifyAdmins,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setExistingWalls([...existingWalls, newWall]);
    
    // Reset form
    setSelectedMatter('');
    setExcludedUsers([]);
    setReason('');
    setExpiryDate('');
    setEnforcementScope({ documents: true, tasks: true, communications: true });
    setNotifyAdmins(false);
    setErrors({});
    setShowCreateForm(false);
  };

  const handleDeleteWall = (wallId) => {
    setExistingWalls(existingWalls.filter(wall => wall.id !== wallId));
  };

  const handleToggleStatus = (wallId) => {
    setExistingWalls(existingWalls.map(wall => 
      wall.id === wallId 
        ? { ...wall, status: wall.status === 'Active' ? 'Inactive' : 'Active' }
        : wall
    ));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Ethical Walls</h1>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Ethical Wall
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Ethical Wall</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Matter Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matter Name *
              </label>
              <select
                value={selectedMatter}
                onChange={(e) => setSelectedMatter(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.matter ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a matter...</option>
                {matters.map(matter => (
                  <option key={matter.id} value={matter.id}>
                    {matter.name} ({matter.number})
                  </option>
                ))}
              </select>
              {errors.matter && (
                <p className="mt-1 text-sm text-red-600">{errors.matter}</p>
              )}
            </div>

            {/* Excluded Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excluded Users *
              </label>
              
              {/* Selected Users */}
              {excludedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {excludedUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <span>{user.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* User Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users to exclude..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.users ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              
              {/* User Dropdown */}
              {userSearch && (
                <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-sm">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleAddUser(user)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email} • {user.role}</div>
                        </div>
                        {excludedUsers.find(u => u.id === user.id) && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">No users found</div>
                  )}
                </div>
              )}
              
              {errors.users && (
                <p className="mt-1 text-sm text-red-600">{errors.users}</p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Ethical Wall *
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Enter the reason for creating this ethical wall (for compliance log)..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reason ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">Leave empty for permanent wall</p>
            </div>

            {/* Enforcement Scope */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enforcement Scope *
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enforcementScope.documents}
                    onChange={() => handleEnforcementChange('documents')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Documents</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enforcementScope.tasks}
                    onChange={() => handleEnforcementChange('tasks')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Tasks</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enforcementScope.communications}
                    onChange={() => handleEnforcementChange('communications')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Communications</span>
                </label>
              </div>
              {errors.enforcement && (
                <p className="mt-1 text-sm text-red-600">{errors.enforcement}</p>
              )}
            </div>

            {/* Notify Admins */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={notifyAdmins}
                  onChange={(e) => setNotifyAdmins(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Notify Admins</span>
              </label>
              <p className="mt-1 text-sm text-gray-500">Alert compliance team when this wall is created</p>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Ethical Wall
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Walls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Existing Ethical Walls</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search walls..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Excluded Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWalls.map(wall => (
                <tr key={wall.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{wall.matter}</div>
                    <div className="text-sm text-gray-500">Created: {wall.createdDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {wall.excludedUsers.map((user, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {user}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={wall.reason}>
                      {wall.reason}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Scope: {wall.enforcementScope.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {wall.expiryDate || 'Permanent'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      wall.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {wall.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(wall.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title={wall.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        {wall.status === 'Active' ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteWall(wall.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredWalls.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ethical walls found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'Create your first ethical wall to get started.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EthicalWalls;
