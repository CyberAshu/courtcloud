import React, { useState } from 'react';

const vendors = [
  {
    id: 1,
    name: 'Acme Corporation',
    rating: 4.5,
    jobsCompleted: 120,
    feedbackAverage: 4.7,
  },
  {
    id: 2,
    name: 'Globex Inc.',
    rating: 4.2,
    jobsCompleted: 98,
    feedbackAverage: 4.5,
  },
  // Add more vendors as needed
];

const VendorManagement = () => {
  const [vendorData, setVendorData] = useState(vendors);

  const handleRatingChange = (id, newRating) => {
    setVendorData(vendorData.map(v => v.id === id ? { ...v, rating: newRating } : v));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
      <div className="space-y-4">
        {vendorData.map(vendor => (
          <div key={vendor.id} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{vendor.name}</h2>
            <div className="text-sm text-gray-600">
              Rating: <span className="font-semibold">{vendor.rating}</span>
            </div>
            <div className="text-sm text-gray-600">
              Jobs Completed: <span className="font-semibold">{vendor.jobsCompleted}</span>
            </div>
            <div className="text-sm text-gray-600">
              Feedback Average: <span className="font-semibold">{vendor.feedbackAverage}</span>
            </div>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={vendor.rating}
              onChange={(e) => handleRatingChange(vendor.id, parseFloat(e.target.value))}
              className="mt-2 p-1 border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorManagement;
