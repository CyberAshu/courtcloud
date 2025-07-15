import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  PlusCircle, 
  ClipboardList, 
  CalendarDays, 
  Search, 
  Scale,
  Filter,
  Edit,
  Trash2
} from 'lucide-react';

const MattersModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [practiceAreaFilter, setPracticeAreaFilter] = useState('');

  // Sample matters data
  const matters = [
    {
      id: 1,
      name: 'Smith v. Jones',
      number: 'MTR-001',
      client: 'John Smith',
      practiceArea: 'Litigation',
      status: 'Open',
      responsibleAttorney: 'Jane Doe',
      dateCreated: '2023-06-15'
    },
    {
      id: 2,
      name: 'Johnson Corporate Case',
      number: 'MTR-002',
      client: 'ACME Corp.',
      practiceArea: 'Corporate',
      status: 'In Progress',
      responsibleAttorney: 'John Doe',
      dateCreated: '2023-07-01'
    },
    {
      id: 3,
      name: 'Wilson v. State',
      number: 'MTR-003',
      client: 'Anna Wilson',
      practiceArea: 'Criminal Defense',
      status: 'Closed',
      responsibleAttorney: 'Robert Brown',
      dateCreated: '2023-05-20'
    }
  ];

  const practiceAreas = ['All', 'Litigation', 'Corporate', 'Criminal Defense'];
  const statuses = ['All', 'Open', 'In Progress', 'Closed'];

  const filteredMatters = matters.filter(matter => {
    const matchesSearch = matter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matter.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || statusFilter === 'All' || matter.status === statusFilter;
    const matchesPracticeArea = practiceAreaFilter === '' || practiceAreaFilter === 'All' || matter.practiceArea === practiceAreaFilter;
    
    return matchesSearch && matchesStatus && matchesPracticeArea;
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

  const MatterRow = ({ matter }) => {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{matter.name}</div>
              <div className="text-sm text-gray-500">{matter.client}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{matter.number}</td>
        <td className="px-6 py-4 whitespace-nowrap">{matter.practiceArea}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            matter.status === 'Open' ? 'bg-green-100 text-green-800' :
            matter.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {matter.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{matter.responsibleAttorney}</td>
        <td className="px-6 py-4 whitespace-nowrap">{matter.dateCreated}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <Link to={`/matters/${matter.id}`} className="text-indigo-600 hover:text-indigo-900">
            Edit
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Matters Module</h1>
          <p className="text-gray-600 mt-2">Manage all matters pertaining to the law firm</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickActionCard
            title="Create New Matter"
            description="Start a new legal matter"
            icon={PlusCircle}
            color="hover:bg-blue-100"
            link="/matters/create"
          />
          <QuickActionCard
            title="Matter Templates"
            description="Customize matter templates"
            icon={ClipboardList}
            color="hover:bg-green-100"
            link="/matters/templates"
          />
          <QuickActionCard
            title="Deadlines & Court Dates"
            description="Manage important dates"
            icon={CalendarDays}
            color="hover:bg-red-100"
            link="/matters/deadlines"
          />
          <QuickActionCard
            title="Conflict Check"
            description="Ensure no conflicts"
            icon={Search}
            color="hover:bg-yellow-100"
            link="/matters/conflict-check"
          />
          <QuickActionCard
            title="Ethical Walls"
            description="Manage access restrictions"
            icon={Scale}
            color="hover:bg-purple-100"
            link="/matters/ethical-walls"
          />
        </div>

        {/* Matters List Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Matters Directory</h2>
          </div>
          
          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search matters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                value={practiceAreaFilter}
                onChange={(e) => setPracticeAreaFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {practiceAreas.map(area => (
                  <option key={area} value={area}>{area} Area</option>
                ))}
              </select>
              <Link 
                to="/matters/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Matter
              </Link>
            </div>
          </div>

          {/* Matters Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Practice Area
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Responsible Attorney
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMatters.map(matter => (
                  <MatterRow key={matter.id} matter={matter} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredMatters.length} of {matters.length} matters
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

export default MattersModule;
