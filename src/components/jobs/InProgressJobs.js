import React from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const mockJobs = [
  {
    id: '123',
    title: 'Job Title 1',
    matter: 'Matter 1',
    client: 'Client 1',
    vendor: 'Vendor 1',
    startDate: '2023-09-01T10:00:00Z',
    expectedEndDate: '2023-09-08T17:00:00Z',
  },
  {
    id: '456',
    title: 'Job Title 2',
    matter: 'Matter 2',
    client: 'Client 2',
    vendor: 'Vendor 2',
    startDate: '2023-09-03T09:00:00Z',
    expectedEndDate: '2023-09-10T13:00:00Z',
  },
];

const InProgressJobs = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">In Progress Jobs</h1>
      <div className="space-y-4">
        {mockJobs.map((job) => (
          <div key={job.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-500">Matter: {job.matter}</p>
                <p className="text-sm text-gray-500">Client: {job.client}</p>
                <p className="text-sm text-gray-500">Vendor: {job.vendor}</p>
                <p className="text-sm text-gray-500">
                  Start Date: {new Date(job.startDate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Expected End: {new Date(job.expectedEndDate).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="text-green-500 hover:text-green-700">
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button className="text-blue-500 hover:text-blue-700">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressJobs;
