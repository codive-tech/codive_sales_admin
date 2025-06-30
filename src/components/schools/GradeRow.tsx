import React, { useState, useEffect } from 'react';
import { SectionSelector } from './SectionSelector';

interface GradeAllocation {
  grade: number;
  students: number;
  sections: string[];
}

interface GradeRowProps {
  grade: number;
  currentAllocation?: GradeAllocation;
  maxStudents: number;
  onUpdate: (students: number, sections: string[]) => void;
}

export const GradeRow: React.FC<GradeRowProps> = ({
  grade,
  currentAllocation,
  maxStudents,
  onUpdate
}) => {
  const [students, setStudents] = useState(currentAllocation?.students || 0);
  const [sections, setSections] = useState<string[]>(currentAllocation?.sections || []);

  useEffect(() => {
    onUpdate(students, sections);
  }, [students, sections, onUpdate]);

  const handleStudentsChange = (value: number) => {
    const newValue = Math.max(0, Math.min(value, maxStudents));
    setStudents(newValue);
  };

  const handleSectionChange = (selectedSections: string[]) => {
    setSections(selectedSections);
  };

  const isExceeded = students > maxStudents;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[#1E2A3B]">Grade {grade} Allocation</h4>
        {isExceeded && (
          <span className="text-xs text-[#f55a5a] font-medium">
            Exceeds available students
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Number of Students */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
            Number of Students
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max={maxStudents}
              value={students}
              onChange={(e) => handleStudentsChange(parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                isExceeded ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
              }`}
              placeholder="Enter number of students"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#666]">
              Max: {maxStudents}
            </div>
          </div>
          {isExceeded && (
            <p className="text-xs text-[#f55a5a] mt-1">
              Cannot assign more than {maxStudents} students
            </p>
          )}
        </div>

        {/* Section Selection */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
            Sections
          </label>
          <SectionSelector
            selectedSections={sections}
            onSectionChange={handleSectionChange}
            studentCount={students}
          />
        </div>
      </div>

      {/* Preview */}
      {students > 0 && (
        <div className="bg-[#F8F9FA] rounded-lg p-3">
          <div className="text-sm text-[#666]">
            <span className="font-medium text-[#1E2A3B]">
              Grade {grade}: {students} students
            </span>
            {sections.length > 0 && (
              <span className="ml-2 text-[#00AEEF]">
                in Sections {sections.join(', ')}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 