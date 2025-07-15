import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Globe, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Key,
  Monitor,
  Wifi,
  MapPin
} from 'lucide-react';

const LoginSecurity = () => {
  const [activeTab, setActiveTab] = useState('mfa');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [mfaEnforcement, setMfaEnforcement] = useState('Mandatory');
  const [mfaMethods, setMfaMethods] = useState(['SMS', 'Authenticator App']);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [ssoProvider, setSsoProvider] = useState('Google');
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [maxSessions, setMaxSessions] = useState(3);
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
    expiration: 90
  });

  // Sample active sessions data
  const activeSessions = [
    {
      id: 1,
      user: 'John Doe',
      device: 'MacBook Pro',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      loginTime: '2024-01-15 09:30 AM',
      lastActivity: '2024-01-15 11:45 AM',
      status: 'Active'
    },
    {
      id: 2,
      user: 'Jane Smith',
      device: 'iPhone 12',
      location: 'Los Angeles, CA',
      ipAddress: '10.0.0.50',
      loginTime: '2024-01-15 08:15 AM',
      lastActivity: '2024-01-15 11:30 AM',
      status: 'Active'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      device: 'Windows PC',
      location: 'Chicago, IL',
      ipAddress: '172.16.0.25',
      loginTime: '2024-01-15 07:45 AM',
      lastActivity: '2024-01-15 10:20 AM',
      status: 'Idle'
    }
  ];

  const handleMfaMethodToggle = (method) => {
    setMfaMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleForceLogout = (sessionId) => {
    console.log('Force logout session:', sessionId);
    // In a real app, this would call an API to terminate the session
  };

  const handleSaveSettings = () => {
    console.log('Saving security settings...');
    // In a real app, this would save settings to backend
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Login & Security Settings</h1>
          <p className="text-gray-600 mt-2">Configure authentication and security policies</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('mfa')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'mfa'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                MFA/SSO Configuration
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'sessions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Session Management
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'password'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Password Policy
              </button>
            </nav>
          </div>

          {/* MFA/SSO Configuration Tab */}
          {activeTab === 'mfa' && (
            <div className="p-6">
              <div className="space-y-8">
                {/* MFA Settings */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Multi-Factor Authentication
                  </h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Enable MFA</label>
                        <p className="text-sm text-gray-500">Require additional verification for user logins</p>
                      </div>
                      <button
                        onClick={() => setMfaEnabled(!mfaEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          mfaEnabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {mfaEnabled && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Enforcement Level</label>
                          <select
                            value={mfaEnforcement}
                            onChange={(e) => setMfaEnforcement(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option>Optional</option>
                            <option>Mandatory</option>
                            <option>Disabled</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Available Methods</label>
                          <div className="space-y-2">
                            {['SMS', 'Authenticator App', 'Email'].map(method => (
                              <div key={method} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={mfaMethods.includes(method)}
                                  onChange={() => handleMfaMethodToggle(method)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">{method}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* SSO Settings */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Single Sign-On (SSO)
                  </h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Enable SSO</label>
                        <p className="text-sm text-gray-500">Allow users to login with external identity providers</p>
                      </div>
                      <button
                        onClick={() => setSsoEnabled(!ssoEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          ssoEnabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          ssoEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {ssoEnabled && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">SSO Provider</label>
                          <select
                            value={ssoProvider}
                            onChange={(e) => setSsoProvider(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option>Google</option>
                            <option>Microsoft Azure AD</option>
                            <option>Okta</option>
                            <option>Auth0</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata URL</label>
                          <input
                            type="url"
                            placeholder="https://example.com/saml/metadata"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Upload</label>
                          <input
                            type="file"
                            accept=".pem,.cer,.crt"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Session Management Tab */}
          {activeTab === 'sessions' && (
            <div className="p-6">
              <div className="space-y-8">
                {/* Session Settings */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Session Configuration
                  </h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={sessionTimeout}
                          onChange={(e) => setSessionTimeout(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Sessions</label>
                        <input
                          type="number"
                          value={maxSessions}
                          onChange={(e) => setMaxSessions(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Active Sessions
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Device & Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Login Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {activeSessions.map(session => (
                            <tr key={session.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                      <span className="text-white font-bold text-sm">
                                        {session.user.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{session.user}</div>
                                    <div className="text-sm text-gray-500">{session.ipAddress}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Monitor className="w-4 h-4 text-gray-400 mr-2" />
                                  <div>
                                    <div className="text-sm text-gray-900">{session.device}</div>
                                    <div className="text-sm text-gray-500 flex items-center">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {session.location}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{session.loginTime}</div>
                                <div className="text-sm text-gray-500">Last: {session.lastActivity}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  session.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {session.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleForceLogout(session.id)}
                                  className="text-red-600 hover:text-red-900 transition-colors"
                                >
                                  Force Logout
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Password Policy Tab */}
          {activeTab === 'password' && (
            <div className="p-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Password Policy
                  </h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                        <input
                          type="number"
                          value={passwordPolicy.minLength}
                          onChange={(e) => setPasswordPolicy({...passwordPolicy, minLength: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiration (days)</label>
                        <input
                          type="number"
                          value={passwordPolicy.expiration}
                          onChange={(e) => setPasswordPolicy({...passwordPolicy, expiration: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Password Requirements</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={passwordPolicy.requireUppercase}
                            onChange={(e) => setPasswordPolicy({...passwordPolicy, requireUppercase: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">Require uppercase letters</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={passwordPolicy.requireNumbers}
                            onChange={(e) => setPasswordPolicy({...passwordPolicy, requireNumbers: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">Require numbers</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={passwordPolicy.requireSymbols}
                            onChange={(e) => setPasswordPolicy({...passwordPolicy, requireSymbols: e.target.checked})}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">Require special characters</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                  >
                    Save Policy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSecurity;
