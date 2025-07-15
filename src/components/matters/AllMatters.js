import React, { useState } from 'react';
import { 
  PlusCircle,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  User,
  FileText,
  MapPin,
  Scale,
  Clock,
  X,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const AllMatters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    status: '',
    practiceArea: '',
    attorney: '',
    dateRange: '',
    jurisdiction: ''
  });

  // Sample matters data with extended fields
  const matters = [
    { 
      id: 1, 
      name: 'Smith v. Jones', 
      matterNumber: 'MT-2024-001',
      client: 'John Smith', 
      status: 'Open', 
      attorney: 'Jane Doe',
      practiceArea: 'Litigation',
      jurisdiction: 'New York',
      dateCreated: '2024-01-15',
      lastActivity: '2024-01-20',
      description: 'Personal injury case involving vehicle accident'
    },
    { 
      id: 2, 
      name: 'Johnson Corp. Merger', 
      matterNumber: 'MT-2024-002',
      client: 'Johnson Corp.', 
      status: 'In Progress', 
      attorney: 'Bob Johnson',
      practiceArea: 'Corporate',
      jurisdiction: 'California',
      dateCreated: '2024-01-10',
      lastActivity: '2024-01-22',
      description: 'Corporate merger and acquisition'
    },
    { 
      id: 3, 
      name: 'Wilson v. State', 
      matterNumber: 'MT-2024-003',
      client: 'Wilson Estate', 
      status: 'Closed', 
      attorney: 'Alice Brown',
      practiceArea: 'Criminal Defense',
      jurisdiction: 'Texas',
      dateCreated: '2024-01-05',
      lastActivity: '2024-01-18',
      description: 'Criminal defense case'
    },
    { 
      id: 4, 
      name: 'Tech IP Patent', 
      matterNumber: 'MT-2024-004',
      client: 'Tech Innovations LLC', 
      status: 'Open', 
      attorney: 'Michael Davis',
      practiceArea: 'IP',
      jurisdiction: 'Delaware',
      dateCreated: '2024-01-12',
      lastActivity: '2024-01-21',
      description: 'Patent application and IP protection'
    },
    { 
      id: 5, 
      name: 'Employment Dispute', 
      matterNumber: 'MT-2024-005',
      client: 'Global Industries', 
      status: 'On Hold', 
      attorney: 'Sarah Wilson',
      practiceArea: 'Employment',
      jurisdiction: 'Florida',
      dateCreated: '2024-01-08',
      lastActivity: '2024-01-19',
      description: 'Employment discrimination case'
    }
  ];

  const practiceAreas = ['Litigation', 'Corporate', 'IP', 'Employment', 'Family Law', 'Criminal Defense'];
  const attorneys = ['Jane Doe', 'Bob Johnson', 'Alice Brown', 'Michael Davis', 'Sarah Wilson'];
  const statuses = ['Open', 'In Progress', 'On Hold', 'Closed', 'Intake'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      practiceArea: '',
      attorney: '',
      dateRange: '',
      jurisdiction: ''
    });
    setSearchTerm('');
  };

  const filteredMatters = matters.filter(matter => {
    const matchesSearch = 
      matter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matter.matterNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matter.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matter.attorney.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matter.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || matter.status === filters.status;
    const matchesPracticeArea = !filters.practiceArea || matter.practiceArea === filters.practiceArea;
    const matchesAttorney = !filters.attorney || matter.attorney === filters.attorney;
    const matchesJurisdiction = !filters.jurisdiction || matter.jurisdiction.toLowerCase().includes(filters.jurisdiction.toLowerCase());

    return matchesSearch && matchesStatus && matchesPracticeArea && matchesAttorney && matchesJurisdiction;
  });

  const sortedMatters = [...filteredMatters].sort((a, b) => {
    let aValue, bValue;
    
    switch(sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'client':
        aValue = a.client;
        bValue = b.client;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'attorney':
        aValue = a.attorney;
        bValue = b.attorney;
        break;
      case 'dateCreated':
        aValue = new Date(a.dateCreated);
        bValue = new Date(b.dateCreated);
        break;
      case 'practiceArea':
        aValue = a.practiceArea;
        bValue = b.practiceArea;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Intake': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? 
      <SortAsc className="w-4 h-4 ml-1" /> : 
      <SortDesc className="w-4 h-4 ml-1" />;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Matters</h1>
          <p className="text-gray-600 mt-2">View and manage all legal matters.</p>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by matter name, number, client, attorney, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  showFilters ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Matter
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Scale className="w-4 h-4 inline mr-1" />
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Practice Area
                  </label>
                  <select
                    value={filters.practiceArea}
                    onChange={(e) => handleFilterChange('practiceArea', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Practice Areas</option>
                    {practiceAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Attorney
                  </label>
                  <select
                    value={filters.attorney}
                    onChange={(e) => handleFilterChange('attorney', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Attorneys</option>
                    {attorneys.map(attorney => (
                      <option key={attorney} value={attorney}>{attorney}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Jurisdiction
                  </label>
                  <input
                    type="text"
                    placeholder="Enter jurisdiction..."
                    value={filters.jurisdiction}
                    onChange={(e) => handleFilterChange('jurisdiction', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {sortedMatters.length} of {matters.length} matters
          </p>
        </div>

        {/* Matters Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center">
                      Matter Name
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matter Number
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('client')}
                  >
                    <div className="flex items-center">
                      Client
                      <SortIcon field="client" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      <SortIcon field="status" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('practiceArea')}
                  >
                    <div className="flex items-center">
                      Practice Area
                      <SortIcon field="practiceArea" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('attorney')}
                  >
                    <div className="flex items-center">
                      Attorney
                      <SortIcon field="attorney" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('dateCreated')}
                  >
                    <div className="flex items-center">
                      Date Created
                      <SortIcon field="dateCreated" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedMatters.map(matter => (
                  <tr key={matter.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{matter.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{matter.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {matter.matterNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {matter.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(matter.status)}`}>
                        {matter.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {matter.practiceArea}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {matter.attorney}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(matter.dateCreated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {sortedMatters.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matters found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Matter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMatters;
