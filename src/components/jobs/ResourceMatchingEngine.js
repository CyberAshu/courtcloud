import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, Phone, Mail, Building, Calendar, CheckCircle, AlertCircle, XCircle, Eye, ChevronDown, ChevronUp, User, FileText, Award, DollarSign, Briefcase, TrendingUp } from 'lucide-react';

const ResourceMatchingEngine = () => {
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorDetails, setShowVendorDetails] = useState(null);

  // Mock vendor data with matching scores
  const vendors = [
    {
      id: 1,
      name: "Elite Legal Services",
      rating: 4.8,
      location: "New York, NY",
      expertise: ["Corporate Law", "Litigation", "Document Review"],
      availability: "Available",
      hourlyRate: "$150-200",
      completedJobs: 247,
      matchScore: 95,
      phone: "+1 (555) 123-4567",
      email: "contact@elitelegal.com",
      description: "Premier legal services firm specializing in corporate law and complex litigation matters.",
      certifications: ["ISO 9001", "SOC 2 Type II"],
      languages: ["English", "Spanish", "French"],
      teamSize: "50-100",
      responseTime: "< 2 hours",
      successRate: "98%"
    },
    {
      id: 2,
      name: "DocReview Experts",
      rating: 4.6,
      location: "Chicago, IL",
      expertise: ["Document Review", "eDiscovery", "Paralegal Services"],
      availability: "Available",
      hourlyRate: "$75-125",
      completedJobs: 189,
      matchScore: 87,
      phone: "+1 (555) 987-6543",
      email: "info@docreviewexperts.com",
      description: "Specialized document review and eDiscovery services for law firms and corporations.",
      certifications: ["ACEDS Certified"],
      languages: ["English"],
      teamSize: "25-50",
      responseTime: "< 4 hours",
      successRate: "96%"
    },
    {
      id: 3,
      name: "Legal Research Pro",
      rating: 4.7,
      location: "San Francisco, CA",
      expertise: ["Legal Research", "Brief Writing", "Case Analysis"],
      availability: "Busy (Available in 2 days)",
      hourlyRate: "$100-150",
      completedJobs: 156,
      matchScore: 82,
      phone: "+1 (555) 456-7890",
      email: "hello@legalresearchpro.com",
      description: "Expert legal research and brief writing services with focus on appellate matters.",
      certifications: ["Legal Research Certified"],
      languages: ["English", "Mandarin"],
      teamSize: "10-25",
      responseTime: "< 6 hours",
      successRate: "94%"
    },
    {
      id: 4,
      name: "Virtual Paralegal Solutions",
      rating: 4.4,
      location: "Austin, TX",
      expertise: ["Paralegal Services", "Case Management", "Client Communication"],
      availability: "Available",
      hourlyRate: "$50-100",
      completedJobs: 298,
      matchScore: 78,
      phone: "+1 (555) 321-0987",
      email: "support@virtualparalegal.com",
      description: "Comprehensive virtual paralegal services for small to medium law firms.",
      certifications: ["NALA Certified"],
      languages: ["English", "Spanish"],
      teamSize: "100+",
      responseTime: "< 1 hour",
      successRate: "92%"
    },
    {
      id: 5,
      name: "Court Filing Services",
      rating: 4.5,
      location: "Miami, FL",
      expertise: ["Court Filing", "Process Serving", "Court Reporting"],
      availability: "Available",
      hourlyRate: "$60-120",
      completedJobs: 412,
      matchScore: 75,
      phone: "+1 (555) 654-3210",
      email: "info@courtfilingservices.com",
      description: "Professional court filing and process serving across multiple jurisdictions.",
      certifications: ["NAPPS Certified"],
      languages: ["English", "Spanish"],
      teamSize: "25-50",
      responseTime: "< 3 hours",
      successRate: "99%"
    }
  ];

  const jobTypes = ["Document Review", "Legal Research", "Court Filing", "Paralegal Services", "eDiscovery", "Translation", "Process Serving", "Transcription"];
  const locations = ["New York, NY", "Chicago, IL", "San Francisco, CA", "Austin, TX", "Miami, FL", "Boston, MA", "Seattle, WA", "Denver, CO"];
  const budgetRanges = ["$0-50", "$51-100", "$101-150", "$151-200", "$200+"];
  const ratingOptions = ["4.5+", "4.0+", "3.5+", "3.0+"];
  const expertiseAreas = ["Corporate Law", "Litigation", "Document Review", "Legal Research", "eDiscovery", "Paralegal Services", "Court Filing", "Process Serving"];
  const availabilityOptions = ["Available Now", "Available Soon", "Busy"];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = searchTerm === '' || 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesJobType = selectedJobType === '' || vendor.expertise.includes(selectedJobType);
    const matchesLocation = selectedLocation === '' || vendor.location === selectedLocation;
    const matchesBudget = selectedBudget === '' || (
      selectedBudget === '$0-50' && vendor.hourlyRate.includes('$50') ||
      selectedBudget === '$51-100' && (vendor.hourlyRate.includes('$75') || vendor.hourlyRate.includes('$100')) ||
      selectedBudget === '$101-150' && (vendor.hourlyRate.includes('$100') || vendor.hourlyRate.includes('$150')) ||
      selectedBudget === '$151-200' && (vendor.hourlyRate.includes('$150') || vendor.hourlyRate.includes('$200')) ||
      selectedBudget === '$200+' && vendor.hourlyRate.includes('$200')
    );
    const matchesRating = selectedRating === '' || vendor.rating >= parseFloat(selectedRating);
    const matchesExpertise = selectedExpertise === '' || vendor.expertise.includes(selectedExpertise);
    const matchesAvailability = selectedAvailability === '' || 
      (selectedAvailability === 'Available Now' && vendor.availability === 'Available') ||
      (selectedAvailability === 'Available Soon' && vendor.availability.includes('Available in')) ||
      (selectedAvailability === 'Busy' && vendor.availability.includes('Busy'));

    return matchesSearch && matchesJobType && matchesLocation && matchesBudget && matchesRating && matchesExpertise && matchesAvailability;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAvailabilityColor = (availability) => {
    if (availability === 'Available') return 'text-green-600 bg-green-100';
    if (availability.includes('Available in')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleContactVendor = (vendor) => {
    // Simulate contacting vendor
    alert(`Contacting ${vendor.name} at ${vendor.email}`);
  };

  const handleViewDetails = (vendorId) => {
    setShowVendorDetails(showVendorDetails === vendorId ? null : vendorId);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resource Matching Engine</h1>
        <p className="text-gray-600">Find and connect with the best legal service providers for your needs</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            Advanced Search Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Service Type Category</label>
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Service Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Geographic Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Hourly Rate Range</label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Rate Ranges</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating Level</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Rating Levels</option>
                {ratingOptions.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Area of Expertise</label>
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Expertise Areas</option>
                {expertiseAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Current Availability Status</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Availability Status</option>
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
            {filteredVendors.length} Matching Vendors Found
          </h2>
          <div className="text-sm text-gray-600">
            Results Sorted by Match Score (Highest First)
          </div>
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="space-y-4">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{vendor.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchScoreColor(vendor.matchScore)}`}>
                      {vendor.matchScore}% Match
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {vendor.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {vendor.hourlyRate}/hour
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {vendor.completedJobs} jobs completed
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(vendor.rating)}
                      <span className="text-sm text-gray-600 ml-1">({vendor.rating})</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(vendor.availability)}`}>
                      {vendor.availability}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {vendor.expertise.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleVendorSelect(vendor)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedVendor?.id === vendor.id 
                        ? 'bg-green-600 text-white' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {selectedVendor?.id === vendor.id ? 'Selected Vendor' : 'Select Vendor'}
                  </button>
                  <button
                    onClick={() => handleContactVendor(vendor)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Contact Vendor
                  </button>
                  <button
                    onClick={() => handleViewDetails(vendor.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>

              {/* Vendor Details Expanded */}
              {showVendorDetails === vendor.id && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Contact Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {vendor.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {vendor.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          Team Size: {vendor.teamSize}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          Response Time: {vendor.responseTime}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Qualifications
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Success Rate:</span>
                          <span className="ml-2 font-medium">{vendor.successRate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Certifications:</span>
                          <div className="mt-1">
                            {vendor.certifications.map((cert, index) => (
                              <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-1">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Languages:</span>
                          <span className="ml-2 font-medium">{vendor.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Description
                      </h4>
                      <p className="text-sm text-gray-600">{vendor.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Vendor Summary */}
      {selectedVendor && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-800">{selectedVendor.name} Selected</h3>
                <p className="text-sm text-gray-600">{selectedVendor.matchScore}% match • {selectedVendor.hourlyRate}/hour</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedVendor(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear Vendor Selection
              </button>
              <button
                onClick={() => alert(`Proceeding with ${selectedVendor.name}`)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed with Selected Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No vendors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more vendors.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedJobType('');
                setSelectedLocation('');
                setSelectedBudget('');
                setSelectedRating('');
                setSelectedExpertise('');
                setSelectedAvailability('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset All Search Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceMatchingEngine;
