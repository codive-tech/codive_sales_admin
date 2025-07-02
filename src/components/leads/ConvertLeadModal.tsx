import React, { useState } from 'react';
import { X, Save, GraduationCap, User } from 'lucide-react';
import { Lead, CreateStudentData } from '../../types';

interface ConvertLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: CreateStudentData) => void;
  lead: Lead | null;
  isLoading?: boolean;
}

export const ConvertLeadModal: React.FC<ConvertLeadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lead,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateStudentData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    grade: '9',
    program: '',
    status: 'active',
    paymentStatus: 'unpaid',
    enrollmentType: 'group',
    leadType: 'Referral',
    source: '',
    campaignId: '',
    notes: ''
  });

  React.useEffect(() => {
    if (lead) {
      setFormData({
        fullName: lead.fullName,
        phoneNumber: lead.contactNumber,
        email: lead.email || '',
        grade: '9',
        program: lead.programOfInterest,
        status: 'active',
        paymentStatus: 'unpaid',
        enrollmentType: 'group',
        leadType: 'Referral',
        source: lead.source,
        campaignId: lead.campaignId || '',
        notes: lead.notes || ''
      });
    }
  }, [lead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <GraduationCap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1E2A3B]">Convert Lead to Student</h2>
              <p className="text-sm text-[#666]">Enroll {lead.fullName} as a student</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F0F0F0] rounded-lg">
            <X className="h-5 w-5 text-[#666]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-[#E6F6FB] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#1E2A3B] mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Lead Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-[#666]">Name:</span> <span className="font-medium">{lead.fullName}</span></div>
              <div><span className="text-[#666]">Contact:</span> <span className="font-medium">{lead.contactNumber}</span></div>
              <div><span className="text-[#666]">Email:</span> <span className="font-medium">{lead.email || 'N/A'}</span></div>
              <div><span className="text-[#666]">Program:</span> <span className="font-medium">{lead.programOfInterest}</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Enrollment Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentStatus: e.target.value as any }))}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E0E0E0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#F0F0F0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Converting...' : 'Convert to Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 