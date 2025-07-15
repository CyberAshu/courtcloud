import React from 'react';
import { 
  FolderOpen, 
  Calendar, 
  CreditCard, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Star,
  DollarSign,
  Building,
  Shield,
  Eye,
  Download,
  Bell,
  ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const mattersByPracticeArea = [
    { name: 'Litigation', value: 45, color: '#3b82f6' },
    { name: 'Corporate', value: 30, color: '#10b981' },
    { name: 'IP', value: 15, color: '#f59e0b' },
    { name: 'Employment', value: 10, color: '#ef4444' }
  ];

  const mattersByStatus = [
    { name: 'Open', value: 35, color: '#10b981' },
    { name: 'In Progress', value: 40, color: '#3b82f6' },
    { name: 'On Hold', value: 15, color: '#f59e0b' },
    { name: 'Closed', value: 10, color: '#6b7280' }
  ];

  const jobsByType = [
    { name: 'Reporting', jobs: 45 },
    { name: 'Translation', jobs: 25 },
    { name: 'Notary', jobs: 20 },
    { name: 'Other', jobs: 15 }
  ];

  const invoiceAging = [
    { name: '0-30 days', amount: 45000 },
    { name: '31-60 days', amount: 25000 },
    { name: '60+ days', amount: 12000 }
  ];

  const upcomingJobs = [
    { id: 1, date: '2024-01-15', type: 'Deposition', matter: 'Smith v. Jones', vendor: 'ABC Court Reporting', status: 'Scheduled' },
    { id: 2, date: '2024-01-16', type: 'Translation', matter: 'Johnson Case', vendor: 'XYZ Translation', status: 'Confirmed' },
    { id: 3, date: '2024-01-17', type: 'Notary', matter: 'Estate Planning', vendor: 'Mobile Notary Plus', status: 'Pending' },
    { id: 4, date: '2024-01-18', type: 'Reporting', matter: 'Wilson Litigation', vendor: 'Court Pros', status: 'Scheduled' },
    { id: 5, date: '2024-01-19', type: 'Deposition', matter: 'Corporate Dispute', vendor: 'Elite Reporting', status: 'Confirmed' }
  ];

  const pendingInvoices = [
    { id: 1, vendor: 'ABC Court Reporting', amount: 2500, dueDate: '2024-01-20', status: 'Pending Approval' },
    { id: 2, vendor: 'XYZ Translation', amount: 1200, dueDate: '2024-01-22', status: 'Approved' },
    { id: 3, vendor: 'Mobile Notary Plus', amount: 350, dueDate: '2024-01-25', status: 'Overdue' },
    { id: 4, vendor: 'Court Pros', amount: 1800, dueDate: '2024-01-28', status: 'Pending Approval' }
  ];

  const topVendors = [
    { name: 'ABC Court Reporting', jobs: 45, rating: 4.8 },
    { name: 'XYZ Translation', jobs: 32, rating: 4.6 },
    { name: 'Elite Reporting', jobs: 28, rating: 4.9 },
    { name: 'Mobile Notary Plus', jobs: 15, rating: 4.7 },
    { name: 'Court Pros', jobs: 12, rating: 4.5 }
  ];

  const complianceAlerts = [
    { type: 'Expired Document', vendor: 'ABC Court Reporting', item: 'Insurance Certificate', severity: 'High' },
    { type: 'Missing W-9', vendor: 'New Vendor Co', item: 'Tax Form', severity: 'Medium' },
    { type: 'License Expiring', vendor: 'XYZ Translation', item: 'Certification', severity: 'Low' }
  ];

  const recentUploads = [
    { filename: 'Deposition_Smith_v_Jones.pdf', matter: 'Smith v. Jones', uploadedBy: 'ABC Court Reporting', time: '2 hours ago' },
    { filename: 'Translation_Contract.docx', matter: 'Johnson Case', uploadedBy: 'XYZ Translation', time: '4 hours ago' },
    { filename: 'Notarized_Document.pdf', matter: 'Estate Planning', uploadedBy: 'Mobile Notary Plus', time: '1 day ago' }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'increase' ? '+' : '-'}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alerts, title, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{alert.type}</p>
              <p className="text-xs text-gray-600">{alert.vendor} - {alert.item}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              alert.severity === 'High' ? 'bg-red-100 text-red-800' :
              alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Law Firm Administrative Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Active Matters" 
            value="127" 
            icon={FolderOpen} 
            color="bg-blue-500"
            change="8"
            changeType="increase"
          />
          <StatCard 
            title="Jobs This Week" 
            value="23" 
            icon={Calendar} 
            color="bg-green-500"
            change="12"
            changeType="increase"
          />
          <StatCard 
            title="Pending Invoices" 
            value="$45,750" 
            icon={CreditCard} 
            color="bg-yellow-500"
            change="3"
            changeType="decrease"
          />
          <StatCard 
            title="Active Vendors" 
            value="45" 
            icon={Building} 
            color="bg-purple-500"
            change="2"
            changeType="increase"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Matters by Practice Area */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Matters by Practice Area</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mattersByPracticeArea}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mattersByPracticeArea.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {mattersByPracticeArea.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jobs by Type */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Jobs */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Jobs (Next 5)</h3>
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{job.type}</p>
                    <p className="text-xs text-gray-600">{job.matter}</p>
                    <p className="text-xs text-gray-500">{job.vendor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{job.date}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      job.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      job.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Invoices */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Invoices</h3>
              <CreditCard className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {pendingInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{invoice.vendor}</p>
                    <p className="text-xs text-gray-600">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${invoice.amount.toLocaleString()}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance & Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Vendors */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top 5 Vendors by Usage</h3>
              <Star className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {topVendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                    <p className="text-xs text-gray-600">{vendor.jobs} jobs completed</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{vendor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Alerts */}
          <AlertCard 
            title="Compliance Alerts" 
            alerts={complianceAlerts} 
            icon={AlertTriangle} 
          />
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Document Uploads */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Document Uploads</h3>
              <FileText className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{upload.filename}</p>
                    <p className="text-xs text-gray-600">{upload.matter}</p>
                    <p className="text-xs text-gray-500">{upload.uploadedBy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{upload.time}</p>
                    <Eye className="w-4 h-4 text-gray-400 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <ArrowRight className="w-5 h-5 text-gray-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-center">
                  <FolderOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-600">New Matter</p>
                </div>
              </button>
              <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-600">Schedule Job</p>
                </div>
              </button>
              <button className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-center">
                  <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-600">Add User</p>
                </div>
              </button>
              <button className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <div className="text-center">
                  <Download className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-yellow-600">Generate Report</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

