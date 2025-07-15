import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  PlusCircle, 
  ClipboardList, 
  Clock,
  CheckCircle,
  Search,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';

const JobScheduling = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Sample jobs data
  const jobs = [
    {
      id: 1,
      title: 'Deposition for Smith v. Jones',
      type: 'Deposition',
      matter: 'Smith v. Jones',
      vendor: 'ABC Court Reporting',
      status: 'Scheduled',
      date: '2023-07-21'
    },
    {
      id: 2,
      title: 'Translation for Contract Review',
      type: 'Translation',
      matter: 'Johnson Corp. v. XYZ Inc.',
      vendor: 'XYZ Translations',
      status: 'In Progress',
      date: '2023-07-20'
    },
    {
      id: 3,
      title: 'Court Reporting for Preliminary Hearing',
      type: 'Court Reporting',
      matter: 'Wilson v. State',
      vendor: 'Court Reporters United',
      status: 'Completed',
      date: '2023-07-15'
    }
  ];

  const statuses = ['All', 'Scheduled', 'In Progress', 'Completed'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.matter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || statusFilter === 'All' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  const JobRow = ({ job }) => {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{job.title}</div>
          <div className="text-sm text-gray-500">{job.matter}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{job.vendor}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            job.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
            job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {job.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{job.date}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <Link to={`/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-900">
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
          <h1 className="text-3xl font-bold text-gray-900">Job Scheduling</h1>
          <p className="text-gray-600 mt-2">Manage jobs, schedules, and resources here.</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickActionCard
            title="Job Calendar"
            description="View all scheduled jobs"
            icon={Calendar}
            color="hover:bg-blue-100"
            link="/jobs/calendar"
          />
          <QuickActionCard
            title="Post New Job"
            description="Create a new job request"
            icon={PlusCircle}
            color="hover:bg-green-100"
            link="/jobs/post-new"
          />
          <QuickActionCard
            title="Job Requests Queue"
            description="Review and approve job requests"
            icon={ClipboardList}
            color="hover:bg-yellow-100"
            link="/jobs/requests-queue"
          />
          <QuickActionCard
            title="Resource Matching Engine"
            description="Match jobs with available vendors"
            icon={Search}
            color="hover:bg-purple-100"
            link="/jobs/resource-matching"
          />
          <QuickActionCard
            title="Scheduled Jobs"
            description="View all active jobs"
            icon={CheckCircle}
            color="hover:bg-indigo-100"
            link="/jobs/scheduled"
          />
        </div>

        {/* Jobs List Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Jobs Directory</h2>
          </div>
          
          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
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
              <Link 
                to="/jobs/post-new" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Job
              </Link>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map(job => (
                  <JobRow key={job.id} job={job} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredJobs.length} of {jobs.length} jobs
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

export default JobScheduling;
