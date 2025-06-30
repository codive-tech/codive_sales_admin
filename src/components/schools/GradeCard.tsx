import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SectionSelector } from './SectionSelector';

export interface GradeCardProps {
  grade: number;
  allocation?: {
    students: number;
    sections: string[];
  };
  maxStudents: number;
  onUpdate: (students: number, sections: string[]) => void;
  recommendedSections?: string[];
  error?: string;
}

export const GradeCard: React.FC<GradeCardProps> = ({
  grade,
  allocation,
  maxStudents,
  onUpdate,
  recommendedSections = [],
  error
}) => {
  // Controlled input state
  const [expanded, setExpanded] = useState(false);
  const [students, setStudents] = useState<number>(allocation?.students || 0);
  const [sections, setSections] = useState<string[]>(allocation?.sections || []);
  const [inputError, setInputError] = useState<string | null>(null);

  // Keep local state in sync with allocation prop
  useEffect(() => {
    setStudents(allocation?.students || 0);
    setSections(allocation?.sections || []);
  }, [allocation?.students, allocation?.sections]);

  // Call onUpdate whenever students or sections change
  useEffect(() => {
    onUpdate(students, sections.length > 0 ? sections : ['Single Class']);
  }, [students, sections, onUpdate]);

  // Validate input boundaries
  useEffect(() => {
    if (students < 0) {
      setInputError('Value must be 0 or more');
    } else if (students > maxStudents) {
      setInputError('You've exceeded the total students');
    } else {
      setInputError(null);
    }
  }, [students, maxStudents]);

  // Handle input change
  const handleStudentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setStudents(0);
      return;
    }
    const num = Number(value);
    if (!isNaN(num)) {
      setStudents(num);
    }
  };

  // Section logic
  const handleSectionChange = (selected: string[]) => {
    setSections(selected);
  };

  // Recommendation logic
  const recommendedCount = students > 0 ? Math.max(1, Math.round(students / 25)) : 0;
  const recommendedLabel = students > 0
    ? `Based on ${students} students, ${recommendedCount} section${recommendedCount > 1 ? 's' : ''} recommended (${Math.ceil(students / recommendedCount)} each)`
    : '';

  return (
    <div className={`transition-all ease-in-out ${expanded ? 'bg-[#D0F0FA] p-4 rounded-md shadow' : ''}`}>
      {/* Grade Toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-md border border-[#00AEEF] bg-[#D0F0FA] text-[#1E2A3B] font-medium transition-all ${expanded ? 'shadow-md' : 'hover:bg-[#B8E8F5]'}`}
      >
        <span>Grade {grade}</span>
        <span className="flex items-center gap-2">
          {allocation?.students ? (
            <span className="bg-[#FFD600] text-[#1E2A3B] rounded px-2 py-0.5 text-xs font-semibold">{allocation.students} assigned</span>
          ) : null}
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>
      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Number of Students */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Number of Students <span className="text-[#f55a5a]">*</span></label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={maxStudents}
                  value={students === 0 ? '' : students}
                  onChange={handleStudentsChange}
                  placeholder={`Enter number of students for Grade ${grade}`}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] hover:shadow transition-all h-11 ${inputError ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'}`}
                  autoComplete="off"
                  inputMode="numeric"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#666]">Max: {maxStudents}</div>
              </div>
              {(inputError || error) && <p className="text-xs text-[#f55a5a] mt-1">{inputError || error}</p>}
            </div>
            {/* Section Selector */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Sections</label>
              <SectionSelector
                selectedSections={sections}
                onSectionChange={handleSectionChange}
                studentCount={students}
                recommendedSections={recommendedSections}
                disabled={students === 0}
              />
            </div>
          </div>
          {/* Recommendation */}
          {students > 0 && (
            <div className="text-xs text-[#00AEEF] font-medium mt-2">
              {recommendedLabel}
            </div>
          )}
          {/* Placeholder if no section selected */}
          {students > 0 && (!sections || sections.length === 0) && (
            <div className="text-xs text-[#666] italic mt-1">No section selected (Single Class)</div>
          )}
        </div>
      )}
    </div>
  );
}; 