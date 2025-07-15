import React, { useState } from 'react';
import { Save } from 'lucide-react';

const MatterTemplates = () => {
  const [formData, setFormData] = useState({
    templateName: '',
    practiceArea: '',
    defaultJurisdiction: '',
    defaultDepartment: '',
    defaultStatus: 'Intake',
    prefilledDescription: '',
    checklistItems: {
      documentCollection: false,
      conflictCheck: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      checklistItems: {
        ...formData.checklistItems,
        [name]: checked,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Add submission logic here
  };

  return (
    <form className="p-8 space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Matter Templates</h1>

      <div>
        <label className="block font-bold mb-1" htmlFor="templateName">Template Name *</label>
        <input
          type="text"
          id="templateName"
          name="templateName"
          value={formData.templateName}
          onChange={handleChange}
          placeholder="Enter template name"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="practiceArea">Practice Area *</label>
        <select
          id="practiceArea"
          name="practiceArea"
          value={formData.practiceArea}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>Select practice area</option>
          <option value="Litigation">Litigation</option>
          <option value="Corporate Law">Corporate Law</option>
          <option value="Family Law">Family Law</option>
          {/* Add more options as necessary */}
        </select>
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="defaultJurisdiction">Default Jurisdiction</label>
        <input
          type="text"
          id="defaultJurisdiction"
          name="defaultJurisdiction"
          value={formData.defaultJurisdiction}
          onChange={handleChange}
          placeholder="Enter default jurisdiction"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="defaultDepartment">Default Department</label>
        <input
          type="text"
          id="defaultDepartment"
          name="defaultDepartment"
          value={formData.defaultDepartment}
          onChange={handleChange}
          placeholder="Enter default department"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="defaultStatus">Default Status</label>
        <select
          id="defaultStatus"
          name="defaultStatus"
          value={formData.defaultStatus}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Intake">Intake</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="prefilledDescription">Pre-filled Description</label>
        <textarea
          id="prefilledDescription"
          name="prefilledDescription"
          value={formData.prefilledDescription}
          onChange={handleChange}
          placeholder="Enter pre-filled description"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-2">Auto-add Checklist Items</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="documentCollection"
              name="documentCollection"
              checked={formData.checklistItems.documentCollection}
              onChange={handleChecklistChange}
              className="mr-2"
            />
            <label htmlFor="documentCollection">Document Collection</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="conflictCheck"
              name="conflictCheck"
              checked={formData.checklistItems.conflictCheck}
              onChange={handleChecklistChange}
              className="mr-2"
            />
            <label htmlFor="conflictCheck">Conflict Check</label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <Save className="mr-2" />
        Save Template
      </button>
    </form>
  );
};

export default MatterTemplates;
