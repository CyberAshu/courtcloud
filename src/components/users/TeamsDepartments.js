import React, { useState } from 'react';
import { Building, Users, Plus, Edit, Trash2, UserPlus, Search, Crown } from 'lucide-react';

const TeamsDepartments = () => {
  const [activeTab, setActiveTab] = useState('departments');
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDepartment, setNewTeamDepartment] = useState('');
  const [newTeamLead, setNewTeamLead] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');

  // Sample departments data
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Legal',
      userCount: 45,
      teamCount: 6,
      description: 'Core legal practice and case management',
      head: 'Jane Smith'
    },
    {
      id: 2,
      name: 'Administration',
      userCount: 12,
      teamCount: 3,
      description: 'Administrative operations and support',
      head: 'John Doe'
    },
    {
      id: 3,
      name: 'IT',
      userCount: 8,
      teamCount: 2,
      description: 'Information technology and systems',
      head: 'Mike Johnson'
    },
    {
      id: 4,
      name: 'Finance',
      userCount: 6,
      teamCount: 1,
      description: 'Financial management and accounting',
      head: 'Sarah Wilson'
    }
  ]);

  // Sample teams data
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Litigation Team A',
      department: 'Legal',
      lead: 'Alice Brown',
      memberCount: 8,
      description: 'Complex commercial litigation cases',
      members: ['Alice Brown', 'Bob Smith', 'Carol Davis', 'David Wilson']
    },
    {
      id: 2,
      name: 'Corporate Law',
      department: 'Legal',
      lead: 'Robert Johnson',
      memberCount: 12,
      description: 'Corporate transactions and compliance',
      members: ['Robert Johnson', 'Emma Davis', 'Frank Miller', 'Grace Lee']
    },
    {
      id: 3,
      name: 'IP & Patents',
      department: 'Legal',
      lead: 'Diana Prince',
      memberCount: 6,
      description: 'Intellectual property and patent law',
      members: ['Diana Prince', 'Tony Stark', 'Natasha Romanoff']
    },
    {
      id: 4,
      name: 'Family Law',
      department: 'Legal',
      lead: 'Peter Parker',
      memberCount: 4,
      description: 'Family law and domestic relations',
      members: ['Peter Parker', 'Mary Jane', 'Gwen Stacy']
    },
    {
      id: 5,
      name: 'Support Staff',
      department: 'Administration',
      lead: 'May Parker',
      memberCount: 6,
      description: 'General administrative support',
      members: ['May Parker', 'Happy Hogan', 'Pepper Potts']
    },
    {
      id: 6,
      name: 'Systems Team',
      department: 'IT',
      lead: 'Bruce Banner',
      memberCount: 4,
      description: 'System administration and maintenance',
      members: ['Bruce Banner', 'Tony Stark', 'Peter Parker']
    }
  ]);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDept = {
        id: Math.max(...departments.map(d => d.id)) + 1,
        name: newDepartmentName,
        userCount: 0,
        teamCount: 0,
        description: 'New department',
        head: 'TBD'
      };
      setDepartments([...departments, newDept]);
      setShowCreateDepartment(false);
      setNewDepartmentName('');
    }
  };

  const handleCreateTeam = () => {
    if (newTeamName.trim() && newTeamDepartment && newTeamLead) {
      const newTeam = {
        id: Math.max(...teams.map(t => t.id)) + 1,
        name: newTeamName,
        department: newTeamDepartment,
        lead: newTeamLead,
        memberCount: 1,
        description: newTeamDescription,
        members: [newTeamLead]
      };
      setTeams([...teams, newTeam]);
      setShowCreateTeam(false);
      setNewTeamName('');
      setNewTeamDepartment('');
      setNewTeamLead('');
      setNewTeamDescription('');
    }
  };

  const handleDeleteDepartment = (deptId) => {
    setDepartments(departments.filter(d => d.id !== deptId));
  };

  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter(t => t.id !== teamId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teams & Departments</h1>
          <p className="text-gray-600 mt-2">Organize users into teams and departments</p>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateDepartment(true)}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
            >
              <Building className="w-4 h-4 mr-2" />
              Add Department
            </button>
            <button
              onClick={() => setShowCreateTeam(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              Create Team
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('departments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'departments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Department Directory
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'teams'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Teams
              </button>
            </nav>
          </div>

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDepartments.map(department => (
                  <div key={department.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <Building className="w-8 h-8 text-green-600 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                          <p className="text-sm text-gray-600">{department.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2" />
                        <span>Head: {department.head}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{department.userCount} users</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{department.teamCount} teams</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teams Tab */}
          {activeTab === 'teams' && (
            <div className="p-6">
              <div className="space-y-4">
                {filteredTeams.map(team => (
                  <div key={team.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Users className="w-6 h-6 text-blue-600 mr-3" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                            <p className="text-sm text-gray-600">{team.department} Department</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{team.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Crown className="w-4 h-4 mr-1" />
                            <span>Lead: {team.lead}</span>
                          </div>
                          <div className="flex items-center">
                            <UserPlus className="w-4 h-4 mr-1" />
                            <span>{team.memberCount} members</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(team.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Team Members */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-2">Team Members:</div>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map((member, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Create Department Modal */}
        {showCreateDepartment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Department</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                  <input
                    type="text"
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter department name"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateDepartment(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDepartment}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  Create Department
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Team Modal */}
        {showCreateTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Team</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={newTeamDepartment}
                    onChange={(e) => setNewTeamDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Lead</label>
                  <input
                    type="text"
                    value={newTeamLead}
                    onChange={(e) => setNewTeamLead(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter team lead name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTeamDescription}
                    onChange={(e) => setNewTeamDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter team description"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateTeam(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTeam}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsDepartments;
