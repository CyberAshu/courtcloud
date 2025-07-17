import React, { useState } from 'react';
import { 
  FolderOpen, 
  Upload, 
  Tags, 
  History, 
  Share, 
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import UploadNewDocumentForm from './documents/UploadNewDocumentForm';
import DocumentLibrary from './documents/DocumentLibrary';
import TagsMetadataManagement from './documents/TagsMetadataManagement';
import FileVersionHistory from './documents/FileVersionHistory';
import SharedAccessSettings from './documents/SharedAccessSettings';

const DocumentsFiles = () => {
  const [activeTab, setActiveTab] = useState('library');

  const tabs = [
    { id: 'library', name: 'Document Library', icon: FolderOpen },
    { id: 'upload', name: 'Upload New', icon: Upload },
    { id: 'tags', name: 'Tags & Metadata Management', icon: Tags },
    { id: 'history', name: 'File Version History', icon: History },
    { id: 'shared', name: 'Shared Access & Expiry Settings', icon: Share }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'library':
        return <DocumentLibrary />;
      case 'upload':
        return <UploadNewDocumentForm />;
      case 'tags':
        return <TagsMetadataManagement />;
      case 'history':
        return <FileVersionHistory />;
      case 'shared':
        return <SharedAccessSettings />;
      default:
        return <DocumentLibrary />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Documents & Files</h1>
          <p className="text-gray-600 mt-2">Manage all documents, files, and access settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsFiles;
