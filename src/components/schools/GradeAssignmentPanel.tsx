import React, { useState, useMemo } from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import { GradeCard } from './GradeCard';
import { RemainingCounter } from './RemainingCounter';
import { SectionSelector } from './SectionSelector';

export interface GradeAllocation {
  grade: number;
  students: number;
  sections: string[];
  course?: string;
}

interface GradeAssignmentPanelProps {
  totalStudentsExpected: number;
  onAllocationChange: (allocations: GradeAllocation[]) => void;
}

// Course options for each grade
const courseOptions = [
  { label: 'Select Course', value: '' },
  { label: 'AI Bootcamp', value: 'AI Bootcamp' },
  { label: 'Robotics Junior', value: 'Robotics Junior' },
  { label: 'Robotics Senior', value: 'Robotics Senior' },
  { label: 'Coding Explorer', value: 'Coding Explorer' },
  { label: 'Coding Challenger', value: 'Coding Challenger' },
  { label: 'Coding Innovator', value: 'Coding Innovator' },
  { label: 'Coding Early Level', value: 'Coding Early Level' },
  { label: 'Complete Java', value: 'Complete Java' },
  { label: 'Web-development', value: 'Web-development' },
  { label: 'Financial Literacy', value: 'Financial Literacy' },
  { label: 'Coding Mastery', value: 'Coding Mastery' },
  { label: 'Starter pack', value: 'Starter pack' },
  { label: 'Hackathon preparation', value: 'Hackathon preparation' },
  { label: 'Bootcamp adventure', value: 'Bootcamp adventure' },
  { label: 'Not Assigned', value: 'Not Assigned' }
];

export const GradeAssignmentPanel: React.FC<GradeAssignmentPanelProps> = ({
  totalStudentsExpected,
  onAllocationChange
}) => {
  const [allocations, setAllocations] = useState<GradeAllocation[]>([]);
  const [gradeErrors, setGradeErrors] = useState<Record<number, string>>({});
  const [touched, setTouched] = useState(false);
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);
  const [inputState, setInputState] = useState<{ 
    students: number; 
    sections: string[]; 
    course: string;
    error: string | null 
  }>({ 
    students: 0, 
    sections: [], 
    course: '',
    error: null 
  });

  const grades = Array.from({ length: 10 }, (_, i) => i + 1);

  const totalAssigned = useMemo(() => {
    return allocations.reduce((sum, allocation) => sum + allocation.students, 0);
  }, [allocations]);

  const remainingStudents = totalStudentsExpected - totalAssigned;
  const hasExceeded = remainingStudents < 0;

  // Recommended sections logic for each grade
  const getRecommendedSections = (students: number) => {
    if (students <= 0) return [];
    const count = Math.max(1, Math.round(students / 25));
    return ['A', 'B', 'C', 'D'].slice(0, count);
  };

  // Handle update from each grade
  const handleGradeUpdate = (grade: number, students: number, sections: string[], course?: string) => {
    setTouched(true);
    setAllocations(prev => {
      const filtered = prev.filter(a => a.grade !== grade);
      if (students > 0) {
        return [...filtered, { grade, students, sections, course }].sort((a, b) => a.grade - b.grade);
      }
      return filtered;
    });
  };

  // When a grade card is expanded, load its state
  const handleExpand = (grade: number) => {
    if (expandedGrade === grade) {
      setExpandedGrade(null);
      return;
    }
    setExpandedGrade(grade);
    const allocation = allocations.find(a => a.grade === grade);
    setInputState({
      students: allocation?.students || 0,
      sections: allocation?.sections || [],
      course: allocation?.course || '',
      error: null
    });
  };

  // Handle input change for expanded grade
  const handleStudentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let students = 0;
    if (value !== '') {
      const num = Number(value);
      if (!isNaN(num)) students = num;
    }
    // Validate
    let error = null;
    const allocation = allocations.find(a => a.grade === expandedGrade);
    const maxStudents = totalStudentsExpected - (totalAssigned - (allocation?.students || 0));
    if (students < 0) {
      error = 'Value must be 0 or more';
    } else if (students > maxStudents) {
      error = "You've exceeded the total student limit";
    }
    setInputState(prev => ({ ...prev, students, error }));
  };

  const handleSectionChange = (sections: string[]) => {
    setInputState(prev => ({ ...prev, sections }));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputState(prev => ({ ...prev, course: e.target.value }));
  };

  // Save expanded grade changes
  const handleSave = () => {
    if (expandedGrade == null) return;
    handleGradeUpdate(
      expandedGrade, 
      inputState.students, 
      inputState.sections.length > 0 ? inputState.sections : ['Single Class'],
      inputState.course
    );
    setExpandedGrade(null);
  };

  // Sync up to parent
  React.useEffect(() => {
    onAllocationChange(allocations);
  }, [allocations, onAllocationChange]);

  // Validate on submit (parent will call this, but we can show errors live)
  React.useEffect(() => {
    if (!touched) return;
    const errors: Record<number, string> = {};
    let runningTotal = 0;
    allocations.forEach(a => {
      runningTotal += a.students;
      if (a.students > totalStudentsExpected) {
        errors[a.grade] = 'Exceeds available students';
      }
    });
    setGradeErrors(errors);
  }, [allocations, totalStudentsExpected, touched]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
          <Users className="h-4 w-4" />
          Grade & Section Allocation
        </h3>
        <RemainingCounter 
          remaining={remainingStudents} 
          total={totalStudentsExpected}
          hasExceeded={hasExceeded}
        />
      </div>

      {/* Error if over-allocated */}
      {hasExceeded && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-[#f55a5a]" />
          <span className="text-sm text-[#f55a5a] font-medium">
            You have exceeded available student count
          </span>
        </div>
      )}

      {/* Grade Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {grades.map(grade => {
          const allocation = allocations.find(a => a.grade === grade);
          return (
            <GradeCard
              key={grade}
              grade={grade}
              allocation={allocation}
              expanded={expandedGrade === grade}
              onExpand={handleExpand}
            />
          );
        })}
      </div>

      {/* Expanded Content for selected grade */}
      {expandedGrade !== null && (
        <div className="mt-4 space-y-4 bg-[#D0F0FA] p-4 rounded-md shadow">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-[#1E2A3B]">Grade {expandedGrade}</span>
            <span className="text-xs text-[#00AEEF]">Section & Student Allocation</span>
          </div>
          {/* Add a drop down to select the courses*/}
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Course</label>
            <select 
              value={inputState.course}
              onChange={handleCourseChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] hover:shadow transition-all h-11"
            >
              {courseOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Number of Students */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Number of Students <span className="text-[#f55a5a]">*</span></label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={totalStudentsExpected}
                  value={inputState.students === 0 ? '' : inputState.students}
                  onChange={handleStudentsChange}
                  placeholder={`Enter number of students for Grade ${expandedGrade}`}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] hover:shadow transition-all h-11 ${inputState.error ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'}`}
                  autoComplete="off"
                  inputMode="numeric"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#666]">Max: {totalStudentsExpected - (allocations.find(a => a.grade === expandedGrade)?.students || 0) + (inputState.students || 0)}</div>
              </div>
              {inputState.error && <p className="text-xs text-[#f55a5a] mt-1">{inputState.error}</p>}
            </div>
            {/* Section Selector */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Sections</label>
              <SectionSelector
                selectedSections={inputState.sections}
                onSectionChange={handleSectionChange}
                studentCount={inputState.students}
                recommendedSections={getRecommendedSections(inputState.students)}
              />
            </div>
          </div>
          {/* Recommendation */}
          {inputState.students > 0 && (
            <div className="text-xs text-[#00AEEF] font-medium mt-2">
              {(() => {
                const count = Math.max(1, Math.round(inputState.students / 25));
                return `Based on ${inputState.students} students, ${count} section${count > 1 ? 's' : ''} recommended (${Math.ceil(inputState.students / count)} each)`;
              })()}
            </div>
          )}
          {/* Placeholder if no section selected */}
          {inputState.students > 0 && (!inputState.sections || inputState.sections.length === 0) && (
            <div className="text-xs text-[#666] italic mt-1">No section selected (Single Class)</div>
          )}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              className="bg-[#00AEEF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0095D9] transition-all"
              onClick={handleSave}
              disabled={!!inputState.error}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-white border border-[#E0E0E0] text-[#1E2A3B] px-4 py-2 rounded-lg font-medium hover:bg-[#F0F0F0] transition-all"
              onClick={() => setExpandedGrade(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      {allocations.length > 0 && (
        <div className="bg-[#E6F6FB] rounded-lg p-4 mt-2">
          <h4 className="font-medium text-[#1E2A3B] mb-2">Allocation Summary</h4>
          <div className="space-y-1 text-sm text-[#666]">
            {allocations.map(allocation => (
              <div key={allocation.grade} className="flex justify-between">
                <span>Grade {allocation.grade}:</span>
                <span className="font-medium">
                  {allocation.students} students
                  {allocation.sections.length > 0 && (
                    <span className="ml-2 text-[#00AEEF]">
                      (Sections: {allocation.sections.join(', ')})
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 