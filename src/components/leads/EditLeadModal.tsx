import React, { useState, useEffect } from 'react';
import { X, Save, User, Phone, Mail, BookOpen, Tag, MessageSquare } from 'lucide-react';
import { Lead, CreateLeadData } from '../../types';

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: CreateLeadData) => void;
  lead: Lead | null;
  isLoading?: boolean;
}

const leadTypes = ['School', 'Parent'] as const;
const sources = ['Manual', 'Event', 'WhatsApp', 'Facebook', 'Instagram', 'Referral'] as const;
const programs = [
  'AI Bootcamp',
  'Robotics',
  'Hackathon',
  'Coding Fundamentals',
  'Web Development',
  'Data Science',
  'Cybersecurity'
];

export const EditLeadModal: React.FC<EditLeadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lead,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateLeadData>({
    fullName: '',
    contactNumber: '',
    email: '',
    leadType: 'Parent',
    programOfInterest: '',
    source: 'Manual',
    notes: '',
    status: 'New',
    campaignId: '',
    sellingPrice: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (lead) {
      setFormData({
        fullName: lead.fullName,
        contactNumber: lead.contactNumber,
        email: lead.email || '',
        leadType: lead.leadType,
        programOfInterest: lead.programOfInterest,
        source: lead.source,
        notes: lead.notes || '',
        status: lead.status,
        campaignId: lead.campaignId || '',
        sellingPrice: lead.sellingPrice
      });
    }
  }, [lead]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    if (!formData.programOfInterest.trim()) {
      newErrors.programOfInterest = 'Program of interest is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof CreateLeadData, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <User className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1E2A3B]">Edit Lead</h2>
              <p className="text-sm text-[#666]">Update lead information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F0F0F0] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-[#666]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1E2A3B] flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Full Name <span className="text-[#f55a5a]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] ${
                    errors.fullName ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <p className="text-xs text-[#f55a5a] mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Contact Number <span className="text-[#f55a5a]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] ${
                      errors.contactNumber ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                    }`}
                    placeholder="+1-555-0123"
                  />
                </div>
                {errors.contactNumber && (
                  <p className="text-xs text-[#f55a5a] mt-1">{errors.contactNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] ${
                    errors.email ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="email@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-[#f55a5a] mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Lead Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1E2A3B] flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Lead Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Lead Type
                </label>
                <select
                  value={formData.leadType}
                  onChange={(e) => handleInputChange('leadType', e.target.value as 'School' | 'Parent')}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF]"
                >
                  {leadTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Source
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value as any)}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF]"
                >
                  {sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Program of Interest <span className="text-[#f55a5a]">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
                  <select
                    value={formData.programOfInterest}
                    onChange={(e) => handleInputChange('programOfInterest', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] ${
                      errors.programOfInterest ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                    }`}
                  >
                    <option value="">Select Program</option>
                    {programs.map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>
                </div>
                {errors.programOfInterest && (
                  <p className="text-xs text-[#f55a5a] mt-1">{errors.programOfInterest}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Campaign ID
                </label>
                <input
                  type="text"
                  value={formData.campaignId}
                  onChange={(e) => handleInputChange('campaignId', e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF]"
                  placeholder="e.g., SUMMER2024"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Selling Price (Optional)
              </label>
              <input
                type="number"
                value={formData.sellingPrice || ''}
                onChange={(e) => handleInputChange('sellingPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF]"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1E2A3B] flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Additional Notes
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] resize-none"
                placeholder="Add any additional notes about this lead..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E0E0E0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#F0F0F0] transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 