import React, { useState } from 'react';
import { X, Calendar, User, FileText, Save } from 'lucide-react';
import { Lead } from '../../types';

interface AssignDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (demoData: {
    demoDate: string;
    demoInstructor: string;
    demoNotes: string;
  }) => void;
  lead?: Lead | null;
  isLoading?: boolean;
}

const demoInstructors = [
  { label: 'Select Instructor', value: '' },
  { label: 'Sarah Johnson', value: 'Sarah Johnson' },
  { label: 'Michael Chen', value: 'Michael Chen' },
  { label: 'Emma Rodriguez', value: 'Emma Rodriguez' },
  { label: 'David Wilson', value: 'David Wilson' },
  { label: 'Priya Patel', value: 'Priya Patel' },
  { label: 'Alex Thompson', value: 'Alex Thompson' }
];

export const AssignDemoModal: React.FC<AssignDemoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lead,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    demoDate: '',
    demoInstructor: '',
    demoNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.demoDate) {
      newErrors.demoDate = 'Demo date is required';
    }

    if (!formData.demoInstructor) {
      newErrors.demoInstructor = 'Demo instructor is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      demoDate: '',
      demoInstructor: '',
      demoNotes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-md max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <Calendar className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                Assign Demo
              </h2>
              <p className="text-sm text-[#666]">
                Schedule a demo for {lead?.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Demo Date */}
          <div>
            <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
              Demo Date & Time *
            </label>
            <input
              type="datetime-local"
              value={formData.demoDate}
              onChange={(e) => setFormData(prev => ({ ...prev, demoDate: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                errors.demoDate ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
              }`}
              min={new Date().toISOString().slice(0, 16)}
            />
            {errors.demoDate && (
              <p className="text-sm text-[#f55a5a] mt-1">{errors.demoDate}</p>
            )}
          </div>

          {/* Demo Instructor */}
          <div>
            <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
              Demo Instructor *
            </label>
            <select
              value={formData.demoInstructor}
              onChange={(e) => setFormData(prev => ({ ...prev, demoInstructor: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                errors.demoInstructor ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
              }`}
            >
              {demoInstructors.map(instructor => (
                <option key={instructor.value} value={instructor.value}>
                  {instructor.label}
                </option>
              ))}
            </select>
            {errors.demoInstructor && (
              <p className="text-sm text-[#f55a5a] mt-1">{errors.demoInstructor}</p>
            )}
          </div>

          {/* Demo Notes */}
          <div>
            <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
              Demo Notes (Optional)
            </label>
            <textarea
              value={formData.demoNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, demoNotes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              placeholder="Add any special instructions or notes for the demo..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E0E0E0]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#F0F0F0] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Assign Demo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 