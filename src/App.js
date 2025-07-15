import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TopNavbar from './components/TopNavbar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import MattersModule from './components/MattersModule';
import JobScheduling from './components/JobScheduling';
import VendorManagement from './components/VendorManagement';
import BillingFinance from './components/BillingFinance';
import ReportsAnalytics from './components/ReportsAnalytics';
import NotificationsAlerts from './components/NotificationsAlerts';
import DocumentsFiles from './components/DocumentsFiles';
import PlatformSettings from './components/PlatformSettings';

// User Management Components
import ListAllUsers from './components/users/ListAllUsers';
import AddNewUser from './components/users/AddNewUser';
import BulkImportUsers from './components/users/BulkImportUsers';
import RolesPermissions from './components/users/RolesPermissions';
import TeamsDepartments from './components/users/TeamsDepartments';
import LoginSecurity from './components/users/LoginSecurity';

// Matters Components
import AllMatters from './components/matters/AllMatters';
import CreateMatter from './components/matters/CreateMatter';
import MatterTemplates from './components/matters/MatterTemplates';
import DeadlinesCourtDates from './components/matters/DeadlinesCourtDates';
import ConflictCheck from './components/matters/ConflictCheck';
import EthicalWalls from './components/matters/EthicalWalls';

// Job Scheduling Components
import JobCalendar from './components/jobs/JobCalendar';
import PostNewJob from './components/jobs/PostNewJob';
import JobRequestsQueue from './components/jobs/JobRequestsQueue';
import ResourceMatchingEngine from './components/jobs/ResourceMatchingEngine';
import ScheduledJobs from './components/jobs/ScheduledJobs';
import InProgressJobs from './components/jobs/InProgressJobs';
import CompletedJobs from './components/jobs/CompletedJobs';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopNavbar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/matters" element={<MattersModule />} />
            <Route path="/job-scheduling" element={<JobScheduling />} />
            <Route path="/vendor-management" element={<VendorManagement />} />
            <Route path="/billing-finance" element={<BillingFinance />} />
            <Route path="/reports-analytics" element={<ReportsAnalytics />} />
            <Route path="/notifications" element={<NotificationsAlerts />} />
            <Route path="/documents" element={<DocumentsFiles />} />
            <Route path="/settings" element={<PlatformSettings />} />
            
            {/* User Management Routes */}
            <Route path="/users/list" element={<ListAllUsers />} />
            <Route path="/users/add" element={<AddNewUser />} />
            <Route path="/users/bulk-import" element={<BulkImportUsers />} />
            <Route path="/roles-permissions" element={<RolesPermissions />} />
            <Route path="/teams-departments" element={<TeamsDepartments />} />
            <Route path="/login-security" element={<LoginSecurity />} />
            
            {/* Matters Routes */}
            <Route path="/matters/all" element={<AllMatters />} />
            <Route path="/matters/create" element={<CreateMatter />} />
            <Route path="/matters/templates" element={<MatterTemplates />} />
            <Route path="/matters/deadlines" element={<DeadlinesCourtDates />} />
            <Route path="/matters/conflict-check" element={<ConflictCheck />} />
            <Route path="/matters/ethical-walls" element={<EthicalWalls />} />
            
            {/* Job Scheduling Routes */}
            <Route path="/jobs/calendar" element={<JobCalendar />} />
            <Route path="/jobs/post-new" element={<PostNewJob />} />
            <Route path="/jobs/requests-queue" element={<JobRequestsQueue />} />
            <Route path="/jobs/resource-matching" element={<ResourceMatchingEngine />} />
            <Route path="/jobs/scheduled" element={<ScheduledJobs />} />
            <Route path="/jobs/in-progress" element={<InProgressJobs />} />
            <Route path="/jobs/completed" element={<CompletedJobs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
