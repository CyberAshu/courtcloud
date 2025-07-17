import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  CreditCard, 
  Receipt, 
  Settings, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Flag, 
  Download, 
  Upload, 
  Calendar, 
  User, 
  AlertCircle,
  Clock,
  TrendingUp,
  Save,
  X,
  Edit,
  Plus,
  ArrowRight,
  Building,
  Briefcase
} from 'lucide-react';

const BillingFinance = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [showInvoiceReview, setShowInvoiceReview] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filters, setFilters] = useState({
    vendorName: '',
    matter: '',
    status: '',
    dateRange: { start: '', end: '' },
    paymentStatus: ''
  });
  const [paymentFormData, setPaymentFormData] = useState({
    paymentDate: '',
    amountPaid: '',
    paymentMethod: '',
    paymentReference: '',
    notes: '',
    proofOfPayment: null
  });
  const [invoiceReviewData, setInvoiceReviewData] = useState({
    status: '',
    internalComments: ''
  });

  // Mock data for vendor invoices
  const vendorInvoices = [
    {
      id: 'INV-2024-001',
      invoiceNumber: 'VND-001-2024',
      vendorName: 'Elite Court Reporting',
      matter: 'Smith vs. Johnson - Personal Injury',
      jobId: 'JOB-001',
      description: 'Deposition of John Doe',
      serviceDate: '2024-01-15',
      amountClaimed: 475.00,
      status: 'New',
      submittedDate: '2024-01-16',
      attachments: [
        { name: 'invoice.pdf', size: '1.2 MB' },
        { name: 'transcript.pdf', size: '2.8 MB' },
        { name: 'receipt.pdf', size: '0.5 MB' }
      ],
      vendorNotes: 'Certified transcript delivered within 24 hours as requested',
      internalComments: '',
      expenses: [
        { type: 'Travel', amount: 25.00, reimbursable: true, includedInInvoice: true },
        { type: 'Copies', amount: 15.00, reimbursable: true, includedInInvoice: true }
      ]
    },
    {
      id: 'INV-2024-002',
      invoiceNumber: 'VND-002-2024',
      vendorName: 'LinguaLegal Translations',
      matter: 'International Contract Review',
      jobId: 'JOB-002',
      description: 'Spanish to English translation - contract documents',
      serviceDate: '2024-01-16',
      amountClaimed: 340.00,
      status: 'Approved',
      submittedDate: '2024-01-17',
      attachments: [
        { name: 'invoice.pdf', size: '0.8 MB' },
        { name: 'translated_document.pdf', size: '1.5 MB' }
      ],
      vendorNotes: 'Translation includes certification as requested',
      internalComments: 'Approved for payment - quality work',
      expenses: []
    },
    {
      id: 'INV-2024-003',
      invoiceNumber: 'VND-003-2024',
      vendorName: 'Medical Expert Consultants',
      matter: 'Medical Malpractice Case',
      jobId: 'JOB-003',
      description: 'Expert Witness Testimony',
      serviceDate: '2024-01-18',
      amountClaimed: 825.00,
      status: 'Flagged',
      submittedDate: '2024-01-19',
      attachments: [
        { name: 'invoice.pdf', size: '1.0 MB' },
        { name: 'expert_report.pdf', size: '3.2 MB' }
      ],
      vendorNotes: 'Additional research required beyond initial scope',
      internalComments: 'Flagged for review - amount exceeds initial estimate',
      expenses: [
        { type: 'Research Materials', amount: 125.00, reimbursable: true, includedInInvoice: true }
      ]
    }
  ];

  // Mock data for payments
  const payments = [
    {
      id: 'PAY-2024-001',
      vendorName: 'Elite Court Reporting',
      invoiceNumber: 'VND-001-2024',
      paymentDate: '2024-01-20',
      amountPaid: 475.00,
      paymentMethod: 'ACH',
      paymentReference: 'ACH-20240120-001',
      status: 'Paid',
      notes: 'Payment processed successfully'
    },
    {
      id: 'PAY-2024-002',
      vendorName: 'LinguaLegal Translations',
      invoiceNumber: 'VND-002-2024',
      paymentDate: '2024-01-22',
      amountPaid: 340.00,
      paymentMethod: 'Check',
      paymentReference: 'CHK-001234',
      status: 'Pending',
      notes: 'Check mailed to vendor'
    }
  ];

  // Mock billing rules
  const billingRules = [
    {
      id: 'RULE-001',
      name: 'Standard Court Reporting',
      triggerType: 'Pay after client payment',
      gracePeriod: 15,
      appliesTo: 'Court Reporting Services',
      threshold: 500.00
    },
    {
      id: 'RULE-002',
      name: 'Translation Services',
      triggerType: 'Immediate payment',
      gracePeriod: 0,
      appliesTo: 'Translation Services',
      threshold: 1000.00
    }
  ];

  const handleInvoiceReview = (invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceReviewData({
      status: invoice.status,
      internalComments: invoice.internalComments
    });
    setShowInvoiceReview(true);
  };

  const handlePaymentRecord = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentFormData({
      paymentDate: '',
      amountPaid: invoice.amountClaimed.toString(),
      paymentMethod: '',
      paymentReference: '',
      notes: '',
      proofOfPayment: null
    });
    setShowPaymentForm(true);
  };

  const handleSubmitInvoiceReview = () => {
    alert('Invoice review submitted successfully!');
    setShowInvoiceReview(false);
    setSelectedInvoice(null);
  };

  const handleSubmitPayment = () => {
    alert('Payment recorded successfully!');
    setShowPaymentForm(false);
    setSelectedInvoice(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Flagged':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const InvoiceReviewModal = ({ invoice }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Invoice Review & Approval</h2>
            <button
              onClick={() => setShowInvoiceReview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Invoice Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Invoice Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Invoice Number:</span>
                  <span className="ml-2 font-medium">{invoice.invoiceNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Vendor:</span>
                  <span className="ml-2 font-medium">{invoice.vendorName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Matter:</span>
                  <span className="ml-2 font-medium">{invoice.matter}</span>
                </div>
                <div>
                  <span className="text-gray-600">Job ID:</span>
                  <span className="ml-2 font-medium text-blue-600 cursor-pointer hover:underline">{invoice.jobId}</span>
                </div>
                <div>
                  <span className="text-gray-600">Service Date:</span>
                  <span className="ml-2 font-medium">{new Date(invoice.serviceDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Amount Claimed:</span>
                  <span className="ml-2 font-medium">${invoice.amountClaimed.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="text-gray-600">Description:</span>
                <p className="mt-1 text-sm text-gray-900">{invoice.description}</p>
              </div>

              {invoice.vendorNotes && (
                <div className="mt-4">
                  <span className="text-gray-600">Notes from Vendor:</span>
                  <p className="mt-1 text-sm text-gray-900">{invoice.vendorNotes}</p>
                </div>
              )}
            </div>

            {/* Attachments */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Attachments</h3>
              <div className="space-y-2">
                {invoice.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Expenses */}
            {invoice.expenses.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Expense Records</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reimbursable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Included</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {invoice.expenses.map((expense, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${expense.amount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {expense.reimbursable ? 'Yes' : 'No'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {expense.includedInInvoice ? 'Yes' : 'No'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Review Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={invoiceReviewData.status}
                  onChange={(e) => setInvoiceReviewData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="New">New</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Comments</label>
                <textarea
                  value={invoiceReviewData.internalComments}
                  onChange={(e) => setInvoiceReviewData(prev => ({ ...prev, internalComments: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add internal comments (not visible to vendor)"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={() => setShowInvoiceReview(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitInvoiceReview}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentFormModal = ({ invoice }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Record Payment</h2>
            <button
              onClick={() => setShowPaymentForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Payment Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Vendor:</span>
                  <span className="ml-2 font-medium">{invoice.vendorName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Invoice Number:</span>
                  <span className="ml-2 font-medium">{invoice.invoiceNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Invoice Amount:</span>
                  <span className="ml-2 font-medium">${invoice.amountClaimed.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date *</label>
                  <input
                    type="date"
                    value={paymentFormData.paymentDate}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={paymentFormData.amountPaid}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, amountPaid: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                  <select
                    value={paymentFormData.paymentMethod}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select method</option>
                    <option value="ACH">ACH</option>
                    <option value="Check">Check</option>
                    <option value="Wire">Wire Transfer</option>
                    <option value="Card">Credit Card</option>
                    <option value="Platform Wallet">Platform Wallet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Reference</label>
                  <input
                    type="text"
                    value={paymentFormData.paymentReference}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, paymentReference: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Check/Wire number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Proof of Payment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Drop files here or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG files accepted</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={paymentFormData.notes}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional payment notes"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPayment}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Record Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing & Finance</h1>
                <p className="text-gray-600 mt-1">Manage invoices, payments, and financial records</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Pending Invoices" 
            value="$1,640" 
            icon={FileText} 
            color="bg-blue-500"
            subtitle="3 invoices"
          />
          <StatCard 
            title="Approved Invoices" 
            value="$340" 
            icon={CheckCircle} 
            color="bg-green-500"
            subtitle="1 invoice"
          />
          <StatCard 
            title="Payments Made" 
            value="$815" 
            icon={CreditCard} 
            color="bg-purple-500"
            subtitle="2 payments"
          />
          <StatCard 
            title="Outstanding" 
            value="$825" 
            icon={AlertCircle} 
            color="bg-yellow-500"
            subtitle="1 flagged"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'invoices', label: 'Vendor Invoices', icon: FileText },
                { id: 'payments', label: 'Payments', icon: CreditCard },
                { id: 'expenses', label: 'Expense Records', icon: Receipt },
                { id: 'rules', label: 'Billing Rules', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            {/* Filter Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Invoices</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Clear Filters</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
                  <input
                    type="text"
                    value={filters.vendorName}
                    onChange={(e) => setFilters(prev => ({ ...prev, vendorName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search vendors..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Matter</label>
                  <select
                    value={filters.matter}
                    onChange={(e) => setFilters(prev => ({ ...prev, matter: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All matters</option>
                    <option value="Smith vs. Johnson">Smith vs. Johnson</option>
                    <option value="International Contract">International Contract</option>
                    <option value="Medical Malpractice">Medical Malpractice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All statuses</option>
                    <option value="New">New</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Flagged">Flagged</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, start: e.target.value } }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, end: e.target.value } }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-4">
              {vendorInvoices.map((invoice) => (
                <div key={invoice.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <Building className="w-4 h-4 mr-1" />
                              <span>Vendor: {invoice.vendorName}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <Briefcase className="w-4 h-4 mr-1" />
                              <span>Matter: {invoice.matter}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FileText className="w-4 h-4 mr-1" />
                              <span>Job ID: {invoice.jobId}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Service Date: {new Date(invoice.serviceDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span>Amount: ${invoice.amountClaimed.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FileText className="w-4 h-4 mr-1" />
                              <span>{invoice.attachments.length} attachments</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-700 mb-2">{invoice.description}</p>
                            {invoice.vendorNotes && (
                              <p className="text-xs text-gray-500 italic">"{invoice.vendorNotes}"</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleInvoiceReview(invoice)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </button>
                        {invoice.status === 'Approved' && (
                          <button
                            onClick={() => handlePaymentRecord(invoice)}
                            className="flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100"
                          >
                            <CreditCard className="w-4 h-4 mr-1" />
                            Pay
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            {/* Payment Filter Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Payments</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Clear Filters</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search vendors..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All statuses</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All methods</option>
                    <option value="ACH">ACH</option>
                    <option value="Check">Check</option>
                    <option value="Wire">Wire Transfer</option>
                    <option value="Card">Credit Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payments List */}
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{payment.invoiceNumber}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <Building className="w-4 h-4 mr-1" />
                              <span>Vendor: {payment.vendorName}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Payment Date: {new Date(payment.paymentDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <CreditCard className="w-4 h-4 mr-1" />
                              <span>Method: {payment.paymentMethod}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span>Amount: ${payment.amountPaid.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <FileText className="w-4 h-4 mr-1" />
                              <span>Reference: {payment.paymentReference}</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-700">{payment.notes}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Records</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job/Matter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reimbursable</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vendorInvoices.flatMap(invoice => 
                      invoice.expenses.map((expense, index) => (
                        <tr key={`${invoice.id}-${index}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {invoice.vendorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {expense.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${expense.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {invoice.matter}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              expense.reimbursable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {expense.reimbursable ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              expense.includedInInvoice ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {expense.includedInInvoice ? 'Included' : 'Not Included'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Billing Rules Configuration</h3>
                <span className="text-sm text-gray-500">(Read-Only - Managed by Platform Admin)</span>
              </div>
              
              <div className="space-y-4">
                {billingRules.map((rule) => (
                  <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{rule.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Trigger Type:</span>
                            <p className="font-medium">{rule.triggerType}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Grace Period:</span>
                            <p className="font-medium">{rule.gracePeriod} days</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Applies To:</span>
                            <p className="font-medium">{rule.appliesTo}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Threshold:</span>
                            <p className="font-medium">${rule.threshold.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showInvoiceReview && selectedInvoice && <InvoiceReviewModal invoice={selectedInvoice} />}
      {showPaymentForm && selectedInvoice && <PaymentFormModal invoice={selectedInvoice} />}
    </div>
  );
};

export default BillingFinance;
