import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Upload, 
  Shield, 
  Building, 
  Lock, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Sample user data
  const users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@lawfirm.com',
      role: 'Partner',
      department: 'Litigation',
      status: 'Active',
      lastLogin: '2024-01-15 10:30 AM',
      createdBy: 'Admin',
      createdDate: '2023-06-15'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@lawfirm.com',
      role: 'Associate',
      department: 'Corporate',
      status: 'Active',
      lastLogin: '2024-01-15 09:15 AM',
      createdBy: 'Admin',
      createdDate: '2023-08-20'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@lawfirm.com',
      role: 'Paralegal',
      department: 'IP',
      status: 'Active',
      lastLogin: '2024-01-14 04:22 PM',
      createdBy: 'John Doe',
      createdDate: '2023-09-10'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@lawfirm.com',
      role: 'Billing Coordinator',
      department: 'Administration',
      status: 'Inactive',
      lastLogin: '2024-01-10 02:45 PM',
      createdBy: 'Admin',
      createdDate: '2023-07-05'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@lawfirm.com',
      role: 'Admin',
      department: 'IT',
      status: 'Active',
      lastLogin: '2024-01-15 11:00 AM',
      createdBy: 'Super Admin',
      createdDate: '2023-01-15'
    }
  ];

  const roles = ['All', 'Admin', 'Partner', 'Associate', 'Paralegal', 'Billing Coordinator'];
  const statuses = ['All', 'Active', 'Inactive'];
  const departments = ['All', 'Litigation', 'Corporate', 'IP', 'Administration', 'IT'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === '' || roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === '' || statusFilter === 'All' || user.status === statusFilter;
    const matchesDepartment = departmentFilter === '' || departmentFilter === 'All' || user.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const QuickActionCard = ({ title, description, icon: Icon, color, link }) => (
    <Link to={link} className="block">
      <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow ${color}`}>
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${color.replace('hover:', 'bg-').replace('-100', '-100')} mr-4`}>
            <Icon className={`w-6 h-6 ${color.replace('hover:bg-', 'text-').replace('-100', '-600')}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  const UserRow = ({ user }) => {
    const [showActions, setShowActions] = useState(false);
    
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
            user.role === 'Partner' ? 'bg-blue-100 text-blue-800' :
            user.role === 'Associate' ? 'bg-green-100 text-green-800' :
            user.role === 'Paralegal' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {user.role}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {user.department}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {user.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.lastLogin}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.createdBy}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit User
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <Trash2 className="w-4 h-4 mr-2" />
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage users, roles, and permissions</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickActionCard
            title="List All Users"
            description="View and manage all users"
            icon={Users}
            color="hover:bg-blue-100"
            link="/users/list"
          />
          <QuickActionCard
            title="Add New User"
            description="Create a new user account"
            icon={UserPlus}
            color="hover:bg-green-100"
            link="/users/add"
          />
          <QuickActionCard
            title="Bulk Import Users"
            description="Import multiple users at once"
            icon={Upload}
            color="hover:bg-purple-100"
            link="/users/bulk-import"
          />
          <QuickActionCard
            title="Roles & Permissions"
            description="Manage user roles and permissions"
            icon={Shield}
            color="hover:bg-yellow-100"
            link="/roles-permissions"
          />
          <QuickActionCard
            title="Teams & Departments"
            description="Organize users into teams"
            icon={Building}
            color="hover:bg-indigo-100"
            link="/teams-departments"
          />
          <QuickActionCard
            title="Login & Security"
            description="Configure security settings"
            icon={Lock}
            color="hover:bg-red-100"
            link="/login-security"
          />
        </div>

        {/* User List Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">User Directory</h2>
          </div>
          
          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role} Role</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status} Status</option>
                ))}
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept} Department</option>
                ))}
              </select>
              <Link 
                to="/users/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Link>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
