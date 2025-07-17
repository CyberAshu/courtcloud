import React from 'react';

const DocumentLibrary = () => {
  const documentLibrary = [
    {
      "id": 1,
      "filename": "Deposition_Smith_v_Jones.pdf",
      "fileType": "PDF",
      "fileSize": "2.4 MB",
      "matter": "Smith v. Jones",
      "matterNumber": "MT-2024-001",
      "uploadedBy": "ABC Court Reporting",
      "uploadedDate": "2024-01-20",
      "category": "Deposition",
      "tags": ["deposition", "testimony", "litigation"],
      "status": "Final",
      "version": "1.0",
      "description": "Complete deposition transcript of John Smith",
      "confidentiality": "Attorney-Client Privileged"
    },
    {
      "id": 2,
      "filename": "Translation_Contract.docx",
      "fileType": "DOCX",
      "fileSize": "156 KB",
      "matter": "Johnson Case",
      "matterNumber": "MT-2024-002",
      "uploadedBy": "XYZ Translation",
      "uploadedDate": "2024-01-19",
      "category": "Translation",
      "tags": ["translation", "contract", "foreign language"],
      "status": "Final",
      "version": "2.1",
      "description": "Translated contract documents from Spanish to English",
      "confidentiality": "Confidential"
    },
    {
      "id": 3,
      "filename": "Notarized_Document.pdf",
      "fileType": "PDF",
      "fileSize": "892 KB",
      "matter": "Estate Planning",
      "matterNumber": "MT-2024-006",
      "uploadedBy": "Mobile Notary Plus",
      "uploadedDate": "2024-01-18",
      "category": "Notarization",
      "tags": ["notarized", "estate", "will"],
      "status": "Final",
      "version": "1.0",
      "description": "Notarized will and testament documents",
      "confidentiality": "Attorney-Client Privileged"
    },
    {
      "id": 4,
      "filename": "Court_Filing_Wilson_State.pdf",
      "fileType": "PDF",
      "fileSize": "1.8 MB",
      "matter": "Wilson v. State",
      "matterNumber": "MT-2024-003",
      "uploadedBy": "Alice Brown",
      "uploadedDate": "2024-01-15",
      "category": "Court Filing",
      "tags": ["court filing", "criminal defense", "motion"],
      "status": "Final",
      "version": "1.0",
      "description": "Motion to suppress evidence filed with the court",
      "confidentiality": "Attorney-Client Privileged"
    },
    {
      "id": 5,
      "filename": "Patent_Application_TechIP.pdf",
      "fileType": "PDF",
      "fileSize": "3.2 MB",
      "matter": "Tech IP Patent",
      "matterNumber": "MT-2024-004",
      "uploadedBy": "Michael Davis",
      "uploadedDate": "2024-01-12",
      "category": "Patent Application",
      "tags": ["patent", "intellectual property", "technology"],
      "status": "Under Review",
      "version": "1.2",
      "description": "Patent application for innovative software algorithm",
      "confidentiality": "Confidential"
    },
    {
      "id": 6,
      "filename": "Employment_Contract_Analysis.docx",
      "fileType": "DOCX",
      "fileSize": "245 KB",
      "matter": "Employment Dispute",
      "matterNumber": "MT-2024-005",
      "uploadedBy": "Sarah Wilson",
      "uploadedDate": "2024-01-10",
      "category": "Contract Analysis",
      "tags": ["employment", "contract", "analysis"],
      "status": "Draft",
      "version": "0.9",
      "description": "Legal analysis of employment contract terms and conditions",
      "confidentiality": "Attorney-Client Privileged"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900">Document Library</h2>
      <p className="text-gray-600 mt-2">List of documents and files available in the system.</p>

      <div className="mt-4">
        {documentLibrary.map((doc) => (
          <div key={doc.id} className="py-3 border-b border-gray-100 last:border-b-0">
            <p className="text-sm font-medium text-gray-900">{doc.filename}</p>
            <p className="text-xs text-gray-600">Matter: {doc.matter} ({doc.matterNumber})</p>
            <p className="text-xs text-gray-600">Uploaded By: {doc.uploadedBy} on {doc.uploadedDate}</p>
            <p className="text-xs text-gray-600">Category: {doc.category} | File Size: {doc.fileSize} | Version: {doc.version}</p>
            <p className="text-xs text-gray-600">Tags: {doc.tags.join(', ')}</p>
            <p className="text-xs text-gray-600">Confidentiality: {doc.confidentiality}</p>
            <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentLibrary;

