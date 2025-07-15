import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';

const ConflictCheck = () => {
  const [formData, setFormData] = useState({
    matterName: '',
    clientName: '',
    opposingParties: [''],
    relatedContacts: [''],
    startDate: '',
    endDate: '',
    searchAllMatters: true,
    searchArchivedMatters: false,
    searchInProgressMatters: true,
    attachReportToMatter: false,
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleArrayChange = (index, value, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [arrayName]: newArray,
    });
  };

  const addArrayItem = (arrayName) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], ''],
    });
  };

  const removeArrayItem = (index, arrayName) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [arrayName]: newArray,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.matterName && formData.clientName) {
      // Simulate conflict check results
      const mockResults = {
        conflicts: [
          {
            matter: 'Smith vs. Johnson',
            client: 'ABC Corp',
            opposingParty: 'XYZ Inc',
            severity: 'High',
          },
          {
            matter: 'Contract Review - DEF Ltd',
            client: 'DEF Ltd',
            opposingParty: 'GHI Corp',
            severity: 'Medium',
          },
        ],
        potentialConflicts: [
          {
            matter: 'Employment Law Case',
            client: 'JKL Company',
            reason: 'Related contact found',
            severity: 'Low',
          },
        ],
      };
      setResults(mockResults);
    } else {
      alert('Please fill in Matter Name and Client Name.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Conflict Check</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-bold mb-1" htmlFor="matterName">Matter Name *</label>
          <input
            type="text"
            id="matterName"
            name="matterName"
            value={formData.matterName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter matter name"
          />
        </div>

        <div>
          <label className="block font-bold mb-1" htmlFor="clientName">Client Name *</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter client name"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Opposing Parties</label>
          {formData.opposingParties.map((party, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={party}
                onChange={(e) => handleArrayChange(index, e.target.value, 'opposingParties')}
                className="flex-1 p-2 border border-gray-300 rounded mr-2"
                placeholder="Enter opposing party name"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'opposingParties')}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('opposingParties')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Opposing Party
          </button>
        </div>

        <div>
          <label className="block font-bold mb-1">Related Contacts</label>
          {formData.relatedContacts.map((contact, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={contact}
                onChange={(e) => handleArrayChange(index, e.target.value, 'relatedContacts')}
                className="flex-1 p-2 border border-gray-300 rounded mr-2"
                placeholder="Enter related contact name"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'relatedContacts')}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('relatedContacts')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Related Contact
          </button>
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block font-bold mb-1" htmlFor="startDate">Start Date (Optional)</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-bold mb-1" htmlFor="endDate">End Date (Optional)</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-2">Search Scope</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="searchAllMatters"
                name="searchAllMatters"
                checked={formData.searchAllMatters}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="searchAllMatters">All Matters</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="searchArchivedMatters"
                name="searchArchivedMatters"
                checked={formData.searchArchivedMatters}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="searchArchivedMatters">Archived Matters</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="searchInProgressMatters"
                name="searchInProgressMatters"
                checked={formData.searchInProgressMatters}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="searchInProgressMatters">In-Progress Matters</label>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="attachReportToMatter"
            name="attachReportToMatter"
            checked={formData.attachReportToMatter}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="attachReportToMatter">Attach Report to Matter</label>
        </div>

        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Search className="mr-2 h-4 w-4" />
          Run Conflict Check
        </button>
      </form>

      {results && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Conflict Check Results</h2>
          
          {results.conflicts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-red-600 mb-2 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Direct Conflicts ({results.conflicts.length})
              </h3>
              <div className="space-y-2">
                {results.conflicts.map((conflict, index) => (
                  <div key={index} className="p-3 border border-red-300 bg-red-50 rounded">
                    <div className="font-medium">{conflict.matter}</div>
                    <div className="text-sm text-gray-600">Client: {conflict.client}</div>
                    <div className="text-sm text-gray-600">Opposing Party: {conflict.opposingParty}</div>
                    <div className={`text-sm font-medium ${
                      conflict.severity === 'High' ? 'text-red-600' : 
                      conflict.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      Severity: {conflict.severity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.potentialConflicts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                Potential Conflicts ({results.potentialConflicts.length})
              </h3>
              <div className="space-y-2">
                {results.potentialConflicts.map((conflict, index) => (
                  <div key={index} className="p-3 border border-yellow-300 bg-yellow-50 rounded">
                    <div className="font-medium">{conflict.matter}</div>
                    <div className="text-sm text-gray-600">Client: {conflict.client}</div>
                    <div className="text-sm text-gray-600">Reason: {conflict.reason}</div>
                    <div className={`text-sm font-medium ${
                      conflict.severity === 'High' ? 'text-red-600' : 
                      conflict.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      Severity: {conflict.severity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.conflicts.length === 0 && results.potentialConflicts.length === 0 && (
            <div className="p-4 border border-green-300 bg-green-50 rounded">
              <div className="text-green-700 font-medium">No conflicts found!</div>
              <div className="text-sm text-green-600">You can proceed with this matter.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConflictCheck;
