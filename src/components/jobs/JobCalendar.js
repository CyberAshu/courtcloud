import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Select from 'react-select';
import { Filter, X, Calendar as CalendarIcon, Clock, Users, FileText, User, ChevronDown, ChevronUp } from 'lucide-react';

const JobCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());
  
  const [filters, setFilters] = useState({
    dateRange: {
      start: moment().startOf('week').toDate(),
      end: moment().endOf('week').toDate()
    },
    status: [],
    vendor: null,
    matter: null,
    jobType: null,
    createdBy: null,
  });

  // Mock data for dropdowns
  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled', color: '#3B82F6' },
    { value: 'in-progress', label: 'In Progress', color: '#F59E0B' },
    { value: 'completed', label: 'Completed', color: '#10B981' },
    { value: 'cancelled', label: 'Cancelled', color: '#EF4444' },
  ];

  const vendorOptions = [
    { value: 'vendor-a', label: 'Legal Services Inc.' },
    { value: 'vendor-b', label: 'Document Solutions LLC' },
    { value: 'vendor-c', label: 'Court Reporting Co.' },
    { value: 'vendor-d', label: 'Process Services Ltd.' },
  ];

  const matterOptions = [
    { value: 'matter-1', label: 'Smith vs. Johnson - Personal Injury' },
    { value: 'matter-2', label: 'ABC Corp Merger - Corporate Law' },
    { value: 'matter-3', label: 'Estate Planning - Williams Family' },
    { value: 'matter-4', label: 'Criminal Defense - State vs. Brown' },
  ];

  const jobTypeOptions = [
    { value: 'deposition', label: 'Deposition' },
    { value: 'court-appearance', label: 'Court Appearance' },
    { value: 'client-meeting', label: 'Client Meeting' },
    { value: 'document-review', label: 'Document Review' },
    { value: 'research', label: 'Legal Research' },
    { value: 'filing', label: 'Court Filing' },
  ];

  const createdByOptions = [
    { value: 'john-smith', label: 'John Smith' },
    { value: 'jane-doe', label: 'Jane Doe' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-williams', label: 'Sarah Williams' },
  ];

  // Sample events with more comprehensive data
  const allEvents = [
    {
      id: 1,
      title: 'Smith Deposition',
      start: moment().add(1, 'day').hour(10).minute(0).toDate(),
      end: moment().add(1, 'day').hour(12).minute(0).toDate(),
      status: 'scheduled',
      vendor: 'vendor-a',
      matter: 'matter-1',
      jobType: 'deposition',
      createdBy: 'john-smith',
      priority: 'high',
      description: 'Deposition of key witness in Smith vs. Johnson case'
    },
    {
      id: 2,
      title: 'ABC Corp Due Diligence',
      start: moment().add(2, 'days').hour(14).minute(0).toDate(),
      end: moment().add(2, 'days').hour(16).minute(30).toDate(),
      status: 'in-progress',
      vendor: 'vendor-b',
      matter: 'matter-2',
      jobType: 'document-review',
      createdBy: 'jane-doe',
      priority: 'medium',
      description: 'Review merger documents for ABC Corp acquisition'
    },
    {
      id: 3,
      title: 'Court Hearing - State vs. Brown',
      start: moment().add(3, 'days').hour(9).minute(0).toDate(),
      end: moment().add(3, 'days').hour(11).minute(0).toDate(),
      status: 'scheduled',
      vendor: 'vendor-c',
      matter: 'matter-4',
      jobType: 'court-appearance',
      createdBy: 'mike-johnson',
      priority: 'high',
      description: 'Criminal defense hearing for State vs. Brown'
    },
    {
      id: 4,
      title: 'Williams Estate Planning',
      start: moment().subtract(1, 'day').hour(15).minute(0).toDate(),
      end: moment().subtract(1, 'day').hour(17).minute(0).toDate(),
      status: 'completed',
      vendor: 'vendor-d',
      matter: 'matter-3',
      jobType: 'client-meeting',
      createdBy: 'sarah-williams',
      priority: 'low',
      description: 'Estate planning consultation with Williams family'
    },
    {
      id: 5,
      title: 'Legal Research - Patent Law',
      start: moment().hour(13).minute(0).toDate(),
      end: moment().hour(15).minute(0).toDate(),
      status: 'cancelled',
      vendor: 'vendor-a',
      matter: 'matter-2',
      jobType: 'research',
      createdBy: 'john-smith',
      priority: 'medium',
      description: 'Patent law research for ABC Corp merger'
    },
    {
      id: 6,
      title: 'Document Filing - Family Court',
      start: moment().add(4, 'days').hour(11).minute(0).toDate(),
      end: moment().add(4, 'days').hour(12).minute(0).toDate(),
      status: 'scheduled',
      vendor: 'vendor-b',
      matter: 'matter-3',
      jobType: 'filing',
      createdBy: 'jane-doe',
      priority: 'medium',
      description: 'File estate planning documents with family court'
    },
  ];

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      // Date range filter
      const eventDate = moment(event.start);
      const startDate = moment(filters.dateRange.start);
      const endDate = moment(filters.dateRange.end);
      
      if (!eventDate.isBetween(startDate, endDate, 'day', '[]')) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0) {
        const statusValues = filters.status.map(s => s.value);
        if (!statusValues.includes(event.status)) {
          return false;
        }
      }

      // Other filters
      if (filters.vendor && event.vendor !== filters.vendor.value) return false;
      if (filters.matter && event.matter !== filters.matter.value) return false;
      if (filters.jobType && event.jobType !== filters.jobType.value) return false;
      if (filters.createdBy && event.createdBy !== filters.createdBy.value) return false;

      return true;
    });
  }, [allEvents, filters]);

  const handleFilterChange = (selectedOption, { name }) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: selectedOption }));
  };

  const handleDateRangeChange = (start, end) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      dateRange: { start, end }
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: {
        start: moment().startOf('week').toDate(),
        end: moment().endOf('week').toDate()
      },
      status: [],
      vendor: null,
      matter: null,
      jobType: null,
      createdBy: null,
    });
  };

  const getEventStyle = (event) => {
    const statusColor = statusOptions.find(s => s.value === event.status)?.color || '#6B7280';
    const priorityOpacity = event.priority === 'high' ? '1' : event.priority === 'medium' ? '0.8' : '0.6';
    
    return {
      style: {
        backgroundColor: statusColor,
        opacity: priorityOpacity,
        border: 'none',
        borderRadius: '6px',
        color: 'white',
        fontSize: '12px',
        padding: '2px 6px'
      }
    };
  };

  const CustomEvent = ({ event }) => {
    return (
      <div className="flex flex-col h-full">
        <div className="font-medium text-xs truncate">{event.title}</div>
        <div className="text-xs opacity-90 truncate">{event.description}</div>
        <div className="text-xs opacity-75 mt-auto">
          {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
        </div>
      </div>
    );
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#D1D5DB',
      '&:hover': {
        borderColor: '#9CA3AF'
      },
      '&:focus-within': {
        borderColor: '#3B82F6',
        boxShadow: '0 0 0 1px #3B82F6'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#EEF2FF',
      color: '#3730A3'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#3730A3'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#3730A3',
      '&:hover': {
        backgroundColor: '#C7D2FE',
        color: '#1E1B4B'
      }
    })
  };

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Calendar</h1>
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['day', 'week', 'month'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-colors ${
                  view === viewType
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
          
          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter size={16} />
            <span>Filters</span>
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={14} />
              <span>Clear All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon size={16} className="inline mr-2" />
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={moment(filters.dateRange.start).format('YYYY-MM-DD')}
                  onChange={(e) => handleDateRangeChange(new Date(e.target.value), filters.dateRange.end)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={moment(filters.dateRange.end).format('YYYY-MM-DD')}
                  onChange={(e) => handleDateRangeChange(filters.dateRange.start, new Date(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-2" />
                Status
              </label>
              <Select
                options={statusOptions}
                isMulti
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                placeholder="Select Status"
                styles={customSelectStyles}
                className="text-sm"
              />
            </div>

            {/* Vendor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users size={16} className="inline mr-2" />
                Vendor
              </label>
              <Select
                options={vendorOptions}
                name="vendor"
                value={filters.vendor}
                onChange={handleFilterChange}
                placeholder="Select Vendor"
                isClearable
                styles={customSelectStyles}
                className="text-sm"
              />
            </div>

            {/* Matter Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="inline mr-2" />
                Matter
              </label>
              <Select
                options={matterOptions}
                name="matter"
                value={filters.matter}
                onChange={handleFilterChange}
                placeholder="Select Matter"
                isClearable
                styles={customSelectStyles}
                className="text-sm"
              />
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="inline mr-2" />
                Job Type
              </label>
              <Select
                options={jobTypeOptions}
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                placeholder="Select Job Type"
                isClearable
                styles={customSelectStyles}
                className="text-sm"
              />
            </div>

            {/* Created By Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Created By
              </label>
              <Select
                options={createdByOptions}
                name="createdBy"
                value={filters.createdBy}
                onChange={handleFilterChange}
                placeholder="Select User"
                isClearable
                styles={customSelectStyles}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Legend</h4>
        <div className="flex flex-wrap gap-4">
          {statusOptions.map((status) => (
            <div key={status.value} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: status.color }}
              />
              <span className="text-sm text-gray-700">{status.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <strong>Priority:</strong> High (100% opacity) • Medium (80% opacity) • Low (60% opacity)
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          eventPropGetter={getEventStyle}
          components={{
            event: CustomEvent
          }}
          style={{ height: 600 }}
          className="p-4"
          formats={{
            dayFormat: 'ddd D',
            dayHeaderFormat: 'dddd, MMMM D',
            dayRangeHeaderFormat: ({ start, end }) => 
              `${moment(start).format('MMMM D')} - ${moment(end).format('MMMM D, YYYY')}`,
            monthHeaderFormat: 'MMMM YYYY',
            weekdayFormat: 'ddd',
            timeGutterFormat: 'h A',
            eventTimeRangeFormat: ({ start, end }) => 
              `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`
          }}
          step={30}
          timeslots={2}
          min={moment().hour(6).minute(0).toDate()}
          max={moment().hour(22).minute(0).toDate()}
          dayLayoutAlgorithm="no-overlap"
          showMultiDayTimes
          popup
          popupOffset={30}
        />
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredEvents.length} of {allEvents.length} jobs
      </div>
    </div>
  );
};

export default JobCalendar;
