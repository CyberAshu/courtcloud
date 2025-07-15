import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

const BulkImportUsers = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    // Simulate API call
    setTimeout(() => {
      setImportResults({
        total: 100,
        success: 95,
        failed: 5,
        errors: [
          { row: 12, error: 'Invalid email format' },
          { row: 34, error: 'Duplicate email address' },
          { row: 67, error: 'Missing required field: First Name' },
          { row: 89, error: 'Invalid role specified' },
          { row: 92, error: 'Invalid department' }
        ]
      });
      setUploading(false);
    }, 2000);
  };

  const downloadTemplate = () => {
    // Simulate template download
    const csvContent = 'First Name,Last Name,Email,Role,Department,Phone\nJohn,Doe,john.doe@example.com,User,Legal,555-0123\nJane,Smith,jane.smith@example.com,Admin,IT,555-0124';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bulk Import Users</h1>
          <p className="text-gray-600 mt-2">Import multiple users at once using CSV file</p>
        </div>

        {/* Template Download */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Download Template</h2>
          <p className="text-gray-600 mb-4">
            Download the CSV template to ensure your data is formatted correctly before importing.
          </p>
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </button>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload CSV File</h2>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your CSV file here, or click to browse
            </p>
            <p className="text-gray-500 mb-4">Supports CSV files up to 10MB</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md cursor-pointer transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Select File
            </label>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Selected file:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
                >
                  {uploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  {uploading ? 'Importing...' : 'Import Users'}
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="inline-flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-md transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Import Results */}
        {importResults && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Results</h2>
            
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{importResults.total}</p>
                    <p className="text-sm text-gray-600">Total Records</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{importResults.success}</p>
                    <p className="text-sm text-gray-600">Successfully Imported</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">{importResults.failed}</p>
                    <p className="text-sm text-gray-600">Failed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Errors */}
            {importResults.errors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Import Errors</h3>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {importResults.errors.map((error, index) => (
                      <div key={index} className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-800">
                          <strong>Row {error.row}:</strong> {error.error}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={() => {
                  setImportResults(null);
                  setFile(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Import Another File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkImportUsers;
