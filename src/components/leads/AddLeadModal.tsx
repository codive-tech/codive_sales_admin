import React, { useState } from 'react';
import { CreateLeadData } from '../../types';
import { leadPrograms, leadSources, leadStatuses } from '../../data/mockData';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: CreateLeadData) => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CreateLeadData>({
    fullName: '',
    contactNumber: '',
    email: '',
    leadType: 'Parent',
    programOfInterest: '',
    source: 'Manual',
    notes: '',
    status: 'New',
    campaignId: ''
  });

  const handleInputChange = (field: keyof CreateLeadData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      fullName: '',
      contactNumber: '',
      email: '',
      leadType: 'Parent',
      programOfInterest: '',
      source: 'Manual',
      notes: '',
      status: 'New',
      campaignId: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#1E2A3B]">Add New Lead</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              required
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              placeholder="+1-555-0123"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>

          {/* Lead Type */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Lead Type *
            </label>
            <select
              required
              value={formData.leadType}
              onChange={(e) => handleInputChange('leadType', e.target.value as 'School' | 'Parent')}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            >
              <option value="Parent">Parent</option>
              <option value="School">School</option>
            </select>
          </div>

          {/* Program of Interest */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Program of Interest *
            </label>
            <select
              required
              value={formData.programOfInterest}
              onChange={(e) => handleInputChange('programOfInterest', e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            >
              <option value="">Select a program</option>
              {leadPrograms.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Source *
            </label>
            <select
              required
              value={formData.source}
              onChange={(e) => handleInputChange('source', e.target.value as any)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            >
              {leadSources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Campaign ID */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Campaign ID (Optional)
            </label>
            <input
              type="text"
              value={formData.campaignId}
              onChange={(e) => handleInputChange('campaignId', e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              placeholder="e.g., SUMMER2024, FACEBOOK_ADS"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Status *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as any)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            >
              {leadStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Notes or Follow-up Remarks
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent resize-none"
              placeholder="Add any additional notes or follow-up remarks..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#E0E0E0] text-[#333333] rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#00AEEF] text-white rounded-md hover:bg-[#0095D9] transition-colors"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal; 