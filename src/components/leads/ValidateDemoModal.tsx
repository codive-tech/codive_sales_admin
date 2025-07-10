import React, { useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Save } from 'lucide-react';
import { Lead } from '../../types';

interface ValidateDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (validationData: {
    adminValidation: 'eligible' | 'not_eligible';
    adminValidationNotes: string;
  }) => void;
  lead?: Lead | null;
  isLoading?: boolean;
}

export const ValidateDemoModal: React.FC<ValidateDemoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lead,
  isLoading = false
}) => {
  const [validation, setValidation] = useState<'eligible' | 'not_eligible' | null>(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validation) {
      onSubmit({
        adminValidation: validation,
        adminValidationNotes: notes
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setValidation(null);
    setNotes('');
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
              <AlertTriangle className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                Validate Demo
              </h2>
              <p className="text-sm text-[#666]">
                Review demo for {lead?.fullName}
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

        {/* Demo Info */}
        <div className="p-6 border-b border-[#E0E0E0] bg-[#F8F9FA]">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666]">Demo Date:</span>
              <span className="font-medium text-[#1E2A3B]">
                {lead?.demoDate ? new Date(lead.demoDate).toLocaleString() : 'Not scheduled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Instructor:</span>
              <span className="font-medium text-[#1E2A3B]">
                {lead?.demoInstructor || 'Not assigned'}
              </span>
            </div>
            {lead?.demoNotes && (
              <div className="flex justify-between">
                <span className="text-[#666]">Demo Notes:</span>
                <span className="font-medium text-[#1E2A3B] max-w-xs truncate">
                  {lead.demoNotes}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Validation Options */}
          <div>
            <label className="block text-sm font-medium text-[#1E2A3B] mb-3">
              Demo Validation *
            </label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setValidation('eligible')}
                className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-colors ${
                  validation === 'eligible'
                    ? 'border-green-500 bg-green-50'
                    : 'border-[#E0E0E0] hover:border-green-300 hover:bg-green-25'
                }`}
              >
                <CheckCircle className={`h-5 w-5 ${validation === 'eligible' ? 'text-green-600' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-medium text-[#1E2A3B]">Mark as Eligible</div>
                  <div className="text-sm text-[#666]">Lead is qualified and ready for conversion</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setValidation('not_eligible')}
                className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-colors ${
                  validation === 'not_eligible'
                    ? 'border-red-500 bg-red-50'
                    : 'border-[#E0E0E0] hover:border-red-300 hover:bg-red-25'
                }`}
              >
                <XCircle className={`h-5 w-5 ${validation === 'not_eligible' ? 'text-red-600' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-medium text-[#1E2A3B]">Mark as Not Eligible</div>
                  <div className="text-sm text-[#666]">Lead is not interested or not qualified</div>
                </div>
              </button>
            </div>
          </div>

          {/* Validation Notes */}
          <div>
            <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
              Validation Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              placeholder="Add notes about the demo validation..."
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
              disabled={isLoading || !validation}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Validate Demo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 