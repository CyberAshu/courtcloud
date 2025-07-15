import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const DeadlinesCourtDates = () => {
  const [formData, setFormData] = useState({
    title: '',
    matter: '',
    type: '',
    courtName: '',
    date: '',
    time: '',
    jurisdictionalRule: '',
    responsibleAttorney: '',
    notes: '',
    reminder: false,
    addToCalendar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.matter && formData.date && formData.responsibleAttorney) {
      console.log('Submitted:', formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <form className="p-8 space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Deadlines & Court Dates</h1>

      <div>
        <label className="block font-bold mb-1" htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="matter">Matter *</label>
        <input
          type="text"
          id="matter"
          name="matter"
          value={formData.matter}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search and select matter"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select type</option>
          <option value="Hearing">Hearing</option>
          <option value="Filing Deadline">Filing Deadline</option>
          <option value="Conference">Conference</option>
        </select>
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="courtName">Court Name</label>
        <input
          type="text"
          id="courtName"
          name="courtName"
          value={formData.courtName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="date">Date *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="jurisdictionalRule">Jurisdictional Rule</label>
        <input
          type="text"
          id="jurisdictionalRule"
          name="jurisdictionalRule"
          value={formData.jurisdictionalRule}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="responsibleAttorney">Responsible Attorney *</label>
        <input
          type="text"
          id="responsibleAttorney"
          name="responsibleAttorney"
          value={formData.responsibleAttorney}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1" htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="reminder"
            name="reminder"
            checked={formData.reminder}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="reminder">Send Reminder</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="addToCalendar"
            name="addToCalendar"
            checked={formData.addToCalendar}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="addToCalendar">Add to Calendar</label>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default DeadlinesCourtDates;
