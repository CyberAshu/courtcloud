import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Menu, 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  Calendar, 
  Building, 
  CreditCard, 
  BarChart3, 
  Bell, 
  FileText, 
  Settings,
  ChevronDown,
  UserPlus,
  Shield,
  Lock,
  Plus,
  Search,
  Scale,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';

const TopNavbar = ({ activeModule, setActiveModule }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRefs = useRef({});
  const userDropdownRef = useRef(null);

  const menuItems = [
    { 
      path: '/dashboard', 
      name: 'Dashboard', 
      icon: LayoutDashboard,
      hasSubmenu: false
    },
    { 
      path: '/user-management', 
      name: 'User Management', 
      icon: Users,
      hasSubmenu: true,
      submenu: [
        { path: '/users/list', name: 'List All Users', icon: Users },
        { path: '/users/add', name: 'Add New User', icon: UserPlus },
        { path: '/users/bulk-import', name: 'Bulk Import Users', icon: Users },
        { path: '/roles-permissions', name: 'Roles & Permissions', icon: Shield },
        { path: '/teams-departments', name: 'Teams & Departments', icon: Building },
        { path: '/login-security', name: 'Login & Security', icon: Lock }
      ]
    },
    { 
      path: '/matters', 
      name: 'Matters', 
      icon: FolderOpen,
      hasSubmenu: true,
      submenu: [
        { path: '/matters/all', name: 'All Matters', icon: FolderOpen },
        { path: '/matters/create', name: 'Create New Matter', icon: Plus },
        { path: '/matters/templates', name: 'Matter Templates', icon: FileText },
        { path: '/matters/deadlines', name: 'Deadlines & Court Dates', icon: Calendar },
        { path: '/matters/conflict-check', name: 'Conflict Check', icon: Search },
        { path: '/matters/ethical-walls', name: 'Ethical Walls', icon: Scale }
      ]
    },
    { 
      path: '/job-scheduling', 
      name: 'Job Scheduling', 
      icon: Calendar,
      hasSubmenu: true,
      submenu: [
        { path: '/jobs/calendar', name: 'Job Calendar', icon: Calendar },
        { path: '/jobs/post-new', name: 'Post New Job', icon: Plus },
        { path: '/jobs/requests-queue', name: 'Job Requests Queue', icon: Clock },
        { path: '/jobs/resource-matching', name: 'Resource Matching Engine', icon: Search },
        { path: '/jobs/scheduled', name: 'Scheduled Jobs', icon: CheckCircle },
        { path: '/jobs/in-progress', name: 'In Progress Jobs', icon: Clock },
        { path: '/jobs/completed', name: 'Completed Jobs', icon: CheckCircle }
      ]
    },
    { path: '/vendor-management', name: 'Vendor Management', icon: Building, hasSubmenu: false },
    { path: '/billing-finance', name: 'Billing & Finance', icon: CreditCard, hasSubmenu: false },
    { path: '/reports-analytics', name: 'Reports & Analytics', icon: BarChart3, hasSubmenu: false },
    { path: '/notifications', name: 'Notifications', icon: Bell, hasSubmenu: false },
    { path: '/documents', name: 'Documents', icon: FileText, hasSubmenu: false },
    { path: '/settings', name: 'Settings', icon: Settings, hasSubmenu: false },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown
      const isClickOutsideDropdown = Object.values(dropdownRefs.current).every(
        (ref) => !ref || !ref.contains(event.target)
      );
      if (isClickOutsideDropdown) {
        setOpenDropdown(null);
      }
      
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚖️</span>
              </div>
              <span className="ml-3 text-white font-bold text-xl hidden sm:block whitespace-nowrap">CourtCloud</span>
              <span className="ml-3 text-white font-bold text-lg sm:hidden">CC</span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex lg:items-center flex-1 justify-center">
            <div className="flex items-center space-x-2 flex-wrap justify-center">
              {menuItems.map((item, index) => {
                if (item.hasSubmenu) {
                  return (
                    <div className="relative" key={index} ref={(el) => (dropdownRefs.current[index] = el)}>
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
                      >
                        <span>{item.name.split(' ')[0]}</span>
                        <ChevronDown className="ml-1 w-3 h-3" />
                      </button>
                      {openDropdown === index && (
                        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {item.submenu.map((subItem, subIndex) => (
                              <NavLink
                                key={subIndex}
                                to={subItem.path}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                role="menuitem"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <subItem.icon className="w-4 h-4 mr-2" /> {subItem.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                  >
                    <span>{item.name.split(' ')[0]}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Right side container for mobile menu button and user menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* User menu */}
            <div className="hidden lg:flex lg:items-center">
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-1"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-300" />
                </button>
                {userDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150" role="menuitem">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150" role="menuitem">Account Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150" role="menuitem">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              if (item.hasSubmenu) {
                return (
                  <div key={index} className="relative">
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className="w-full flex justify-between items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      <span className="flex items-center">
                        <IconComponent className="w-5 h-5 mr-3" />
                        <span>{item.name}</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === index && (
                      <div className="mt-2 space-y-1 bg-gray-700 rounded-md">
                        {item.submenu.map((subItem, subIndex) => (
                          <NavLink
                            to={subItem.path}
                            key={subIndex}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white rounded-md"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            <subItem.icon className="inline-block w-4 h-4 mr-2" /> {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) =>
                    `flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-gray-900 text-white' : ''
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IconComponent className="inline-block w-5 h-5 mr-3" /> {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;

