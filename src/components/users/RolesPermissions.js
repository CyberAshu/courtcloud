import React, { useState } from 'react';
import { Shield, Plus, Edit, Trash2, Users, CheckCircle, X, Copy } from 'lucide-react';

const RolesPermissions = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [inheritFrom, setInheritFrom] = useState('');

  // Sample roles data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access',
      userCount: 5,
      permissions: {
        matters: { create: true, read: true, update: true, delete: true },
        users: { create: true, read: true, update: true, delete: true },
        billing: { create: true, read: true, update: true, delete: true },
        reports: { create: true, read: true, update: true, delete: true },
        settings: { create: true, read: true, update: true, delete: true }
      }
    },
    {
      id: 2,
      name: 'Partner',
      description: 'Senior attorney with management access',
      userCount: 12,
      permissions: {
        matters: { create: true, read: true, update: true, delete: false },
        users: { create: false, read: true, update: false, delete: false },
        billing: { create: true, read: true, update: true, delete: false },
        reports: { create: true, read: true, update: false, delete: false },
        settings: { create: false, read: true, update: false, delete: false }
      }
    },
    {
      id: 3,
      name: 'Associate',
      description: 'Attorney with limited access',
      userCount: 25,
      permissions: {
        matters: { create: true, read: true, update: true, delete: false },
        users: { create: false, read: false, update: false, delete: false },
        billing: { create: false, read: true, update: false, delete: false },
        reports: { create: false, read: true, update: false, delete: false },
        settings: { create: false, read: false, update: false, delete: false }
      }
    },
    {
      id: 4,
      name: 'Paralegal',
      description: 'Support staff with case access',
      userCount: 18,
      permissions: {
        matters: { create: false, read: true, update: true, delete: false },
        users: { create: false, read: false, update: false, delete: false },
        billing: { create: false, read: false, update: false, delete: false },
        reports: { create: false, read: true, update: false, delete: false },
        settings: { create: false, read: false, update: false, delete: false }
      }
    },
    {
      id: 5,
      name: 'Billing Coordinator',
      description: 'Financial and billing management',
      userCount: 3,
      permissions: {
        matters: { create: false, read: true, update: false, delete: false },
        users: { create: false, read: false, update: false, delete: false },
        billing: { create: true, read: true, update: true, delete: false },
        reports: { create: false, read: true, update: false, delete: false },
        settings: { create: false, read: false, update: false, delete: false }
      }
    }
  ]);

  const modules = [
    { key: 'matters', name: 'Matters', description: 'Legal matters and cases' },
    { key: 'users', name: 'User Management', description: 'User accounts and profiles' },
    { key: 'billing', name: 'Billing & Finance', description: 'Invoicing and payments' },
    { key: 'reports', name: 'Reports & Analytics', description: 'Data reporting and analytics' },
    { key: 'settings', name: 'Platform Settings', description: 'System configuration' }
  ];

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      const newRole = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        name: newRoleName,
        description: newRoleDescription,
        userCount: 0,
        permissions: inheritFrom 
          ? roles.find(r => r.name === inheritFrom)?.permissions || {}
          : modules.reduce((acc, module) => {
              acc[module.key] = { create: false, read: false, update: false, delete: false };
              return acc;
            }, {})
      };
      setRoles([...roles, newRole]);
      setShowCreateRole(false);
      setNewRoleName('');
      setNewRoleDescription('');
      setInheritFrom('');
    }
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(r => r.id !== roleId));
  };

  const handlePermissionChange = (roleId, module, permission, value) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [module]: {
              ...role.permissions[module],
              [permission]: value
            }
          }
        };
      }
      return role;
    }));
  };

  const PermissionIcon = ({ granted }) => (
    granted ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <X className="w-5 h-5 text-red-400" />
    )
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-gray-600 mt-2">Manage user roles and access permissions</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('roles')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'roles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Role Templates
              </button>
              <button
                onClick={() => setActiveTab('matrix')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'matrix'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Access Matrix
              </button>
            </nav>
          </div>

          {/* Role Templates Tab */}
          {activeTab === 'roles' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Role Templates</h2>
                <button
                  onClick={() => setShowCreateRole(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map(role => (
                  <div key={role.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <Shield className="w-8 h-8 text-blue-600 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRole(role)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {role.userCount} users assigned
                    </div>
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">Permissions summary:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(role.permissions).map(([module, perms]) => {
                          const hasPermissions = Object.values(perms).some(p => p);
                          return (
                            <div key={module} className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                hasPermissions ? 'bg-green-500' : 'bg-gray-300'
                              }`}></div>
                              <span className="capitalize">{module}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Access Matrix Tab */}
          {activeTab === 'matrix' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Access Matrix</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                      {modules.map(module => (
                        <th key={module.key} className="text-center py-3 px-4 font-medium text-gray-900">
                          <div className="text-sm">{module.name}</div>
                          <div className="text-xs text-gray-500 mt-1">C R U D</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map(role => (
                      <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Shield className="w-5 h-5 text-blue-600 mr-3" />
                            <div>
                              <div className="font-medium text-gray-900">{role.name}</div>
                              <div className="text-sm text-gray-500">{role.userCount} users</div>
                            </div>
                          </div>
                        </td>
                        {modules.map(module => (
                          <td key={module.key} className="py-4 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handlePermissionChange(role.id, module.key, 'create', !role.permissions[module.key]?.create)}
                                title="Create"
                              >
                                <PermissionIcon granted={role.permissions[module.key]?.create} />
                              </button>
                              <button
                                onClick={() => handlePermissionChange(role.id, module.key, 'read', !role.permissions[module.key]?.read)}
                                title="Read"
                              >
                                <PermissionIcon granted={role.permissions[module.key]?.read} />
                              </button>
                              <button
                                onClick={() => handlePermissionChange(role.id, module.key, 'update', !role.permissions[module.key]?.update)}
                                title="Update"
                              >
                                <PermissionIcon granted={role.permissions[module.key]?.update} />
                              </button>
                              <button
                                onClick={() => handlePermissionChange(role.id, module.key, 'delete', !role.permissions[module.key]?.delete)}
                                title="Delete"
                              >
                                <PermissionIcon granted={role.permissions[module.key]?.delete} />
                              </button>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Create Role Modal */}
        {showCreateRole && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Role</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter role description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inherit From (Optional)</label>
                  <select
                    value={inheritFrom}
                    onChange={(e) => setInheritFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Create from scratch</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateRole(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRole}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Create Role
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesPermissions;
