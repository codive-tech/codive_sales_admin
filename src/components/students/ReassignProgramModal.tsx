import React, { useState } from 'react';
import { X, RefreshCw, BookOpen, Check } from 'lucide-react';
import { Student } from '../../types';
import { courseOptions, getProgramConfig } from '../../data/programConfig';

interface ReassignProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onReassign: (studentId: string, newProgram: string) => void;
  isLoading?: boolean;
}

export function ReassignProgramModal({ 
  isOpen, 
  onClose, 
  student, 
  onReassign, 
  isLoading = false 
}: ReassignProgramModalProps) {
  const [selectedProgram, setSelectedProgram] = useState<string>('');

  // Set initial program when modal opens
  React.useEffect(() => {
    if (student && isOpen) {
      setSelectedProgram(student.program || '');
    }
  }, [student, isOpen]);

  const handleClose = () => {
    setSelectedProgram('');
    onClose();
  };

  const handleConfirm = () => {
    if (student && selectedProgram) {
      onReassign(student.id, selectedProgram);
      handleClose();
    }
  };

  const isSameProgram = student?.program === selectedProgram;
  const canConfirm = selectedProgram && !isSameProgram && !isLoading;

  if (!isOpen || !student) return null;

  const selectedProgramConfig = selectedProgram ? getProgramConfig(selectedProgram) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <RefreshCw className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                Reassign Student Program
              </h2>
              <p className="text-sm text-[#666]">
                Change program for {student.fullName}
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Program Display */}
          <div className="bg-[#E6F6FB] rounded-lg p-4 border border-[#00AEEF]">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-[#00AEEF]" />
              <span className="text-sm font-medium text-[#1E2A3B]">Current Program:</span>
            </div>
            <span className="text-sm text-[#00AEEF] font-medium">
              {student.program || 'Not Assigned'}
            </span>
          </div>

          {/* Program Selection */}
          <div>
            <label className="block text-sm font-medium text-[#1E2A3B] mb-3">
              Select New Program *
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            >
              <option value="">Select a program...</option>
              {courseOptions.map(program => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Program Description */}
          {selectedProgramConfig && selectedProgram && (
            <div className={`p-3 rounded-lg border ${selectedProgramConfig.borderColor} ${selectedProgramConfig.bgColor}`}>
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-md ${selectedProgramConfig.bgColor}`}>
                  <selectedProgramConfig.icon className={`h-4 w-4 ${selectedProgramConfig.textColor}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${selectedProgramConfig.textColor}`}>
                    {selectedProgram}
                  </p>
                  <p className={`text-xs mt-1 ${selectedProgramConfig.textColor} opacity-80`}>
                    {selectedProgramConfig.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warning if same program */}
          {isSameProgram && selectedProgram && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  This is the same program. No changes will be made.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E0E0E0]">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="px-6 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Reassigning...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Reassign Program
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReassignProgramModal; 