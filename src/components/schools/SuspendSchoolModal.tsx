import React, { useState } from 'react';
import { X, AlertTriangle, AlertCircle } from 'lucide-react';
import { SchoolData } from '../../types/school';

interface SuspendSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  school?: SchoolData;
  isLoading?: boolean;
}

export function SuspendSchoolModal({ isOpen, onClose, onConfirm, school, isLoading = false }: SuspendSchoolModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      setError('Please provide a reason for suspension');
      return;
    }
    
    setError('');
    onConfirm(reason);
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-200 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-[#f55a5a]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                Suspend School Access
              </h2>
              <p className="text-sm text-[#666]">
                This action will temporarily suspend the school's access
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

        {/* Warning Message */}
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-[#f55a5a] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-[#1E2A3B] mb-1">
                  Warning: This action will suspend access for
                </h3>
                <p className="text-sm text-[#666]">
                  <strong>{school?.name}</strong> and all associated students will lose access to their assigned programs until the suspension is lifted.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Reason for Suspension *
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (error) setError('');
                }}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f55a5a] focus:border-transparent ${
                  error ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                }`}
                placeholder="Please provide a detailed reason for suspending this school's access..."
              />
              {error && (
                <p className="text-sm text-[#f55a5a] mt-1">{error}</p>
              )}
            </div>

            {/* School Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#1E2A3B] mb-2">School Details</h4>
              <div className="space-y-1 text-sm text-[#666]">
                <p><span className="font-medium">Name:</span> {school?.name}</p>
                <p><span className="font-medium">Location:</span> {school?.city}, {school?.country}</p>
                <p><span className="font-medium">Contact:</span> {school?.principalName}</p>
                <p><span className="font-medium">Program:</span> {school?.course || 'Not Assigned'}</p>
                <p><span className="font-medium">Students:</span> {school?.totalStudents || 0} enrolled</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#f55a5a] text-white rounded-lg hover:bg-[#e04a4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Suspending...' : 'Suspend Access'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 