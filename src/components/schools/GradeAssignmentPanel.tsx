import React, { useState, useMemo } from 'react';
import { Users, AlertTriangle, Plus, X } from 'lucide-react';
import { GradeCard } from './GradeCard';
import { RemainingCounter } from './RemainingCounter';
import { SectionSelector } from './SectionSelector';

export interface GradeAllocation {
  grade: number;
  students: number;
  sections: string[];
  course?: string;
}

// New interface for section-level allocations
export interface SectionAllocation {
  id: string;
  grade: number;
  students: number;
  section: string;
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
  // New state for section-level allocations
  const [sectionAllocations, setSectionAllocations] = useState<SectionAllocation[]>([]);
  const [gradeErrors, setGradeErrors] = useState<Record<number, string>>({});
  const [touched, setTouched] = useState(false);
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);
  const [inputState, setInputState] = useState<{ 
    students: number; 
    section: string; 
    course: string;
    error: string | null 
  }>({ 
    students: 0, 
    section: '',
    course: '',
    error: null 
  });

  const grades = Array.from({ length: 10 }, (_, i) => i + 1);

  // Calculate total assigned students
  const totalAssigned = useMemo(() => {
    return sectionAllocations.reduce((sum, allocation) => sum + allocation.students, 0);
  }, [sectionAllocations]);

  const remainingStudents = totalStudentsExpected - totalAssigned;
  const hasExceeded = remainingStudents < 0;

  // Calculate remaining students per grade
  const getRemainingForGrade = (grade: number) => {
    const gradeAllocations = sectionAllocations.filter(a => a.grade === grade);
    const gradeTotal = gradeAllocations.reduce((sum, a) => sum + a.students, 0);
    return totalStudentsExpected - gradeTotal;
  };

  // Convert section allocations to the old format for backward compatibility
  const convertToGradeAllocations = (sectionAllocs: SectionAllocation[]): GradeAllocation[] => {
    const gradeMap = new Map<number, GradeAllocation>();
    
    sectionAllocs.forEach(sectionAlloc => {
      if (!gradeMap.has(sectionAlloc.grade)) {
        gradeMap.set(sectionAlloc.grade, {
          grade: sectionAlloc.grade,
          students: 0,
          sections: [],
          course: sectionAlloc.course
        });
      }
      
      const gradeAlloc = gradeMap.get(sectionAlloc.grade)!;
      gradeAlloc.students += sectionAlloc.students;
      if (!gradeAlloc.sections.includes(sectionAlloc.section)) {
        gradeAlloc.sections.push(sectionAlloc.section);
      }
    });
    
    return Array.from(gradeMap.values()).sort((a, b) => a.grade - b.grade);
  };

  // When a grade card is expanded, reset input state
  const handleExpand = (grade: number) => {
    if (expandedGrade === grade) {
      setExpandedGrade(null);
      return;
    }
    setExpandedGrade(grade);
    setInputState({
      students: 0,
      section: '',
      course: '',
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
    
    // Validate against remaining quota for this grade
    let error = null;
    const remainingForGrade = getRemainingForGrade(expandedGrade!);
    
    if (students < 0) {
      error = 'Value must be 0 or more';
    } else if (students > remainingForGrade) {
      error = `Cannot allocate more than ${remainingForGrade} students for Grade ${expandedGrade}`;
    }
    
    setInputState(prev => ({ ...prev, students, error }));
  };

  const handleSectionChange = (sections: string[]) => {
    setInputState(prev => ({ ...prev, section: sections[0] || '' }));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputState(prev => ({ ...prev, course: e.target.value }));
  };

  // Save new section allocation
  const handleSave = () => {
    if (expandedGrade == null || inputState.error) return;
    
    if (!inputState.section) {
      setInputState(prev => ({ ...prev, error: 'Please select a section' }));
      return;
    }
    
    if (inputState.students <= 0) {
      setInputState(prev => ({ ...prev, error: 'Please enter number of students' }));
      return;
    }
    
    const newAllocation: SectionAllocation = {
      id: `${expandedGrade}-${inputState.section}-${Date.now()}`,
      grade: expandedGrade,
      students: inputState.students,
      section: inputState.section,
      course: inputState.course
    };
    
    setSectionAllocations(prev => [...prev, newAllocation]);
    setTouched(true);
    
    // Reset input state
    setInputState({
      students: 0,
      section: '',
      course: '',
      error: null
    });
  };

  // Remove a section allocation
  const handleRemoveAllocation = (allocationId: string) => {
    setSectionAllocations(prev => prev.filter(a => a.id !== allocationId));
    setTouched(true);
  };

  // Sync up to parent with converted format
  React.useEffect(() => {
    const gradeAllocations = convertToGradeAllocations(sectionAllocations);
    onAllocationChange(gradeAllocations);
  }, [sectionAllocations, onAllocationChange]);

  // Validate on submit
  React.useEffect(() => {
    if (!touched) return;
    const errors: Record<number, string> = {};
    
    // Check if any grade exceeds total
    const gradeTotals = new Map<number, number>();
    sectionAllocations.forEach(a => {
      gradeTotals.set(a.grade, (gradeTotals.get(a.grade) || 0) + a.students);
    });
    
    gradeTotals.forEach((total, grade) => {
      if (total > totalStudentsExpected) {
        errors[grade] = 'Exceeds available students';
      }
    });
    
    setGradeErrors(errors);
  }, [sectionAllocations, totalStudentsExpected, touched]);

  // Get allocations for a specific grade
  const getGradeAllocations = (grade: number) => {
    return sectionAllocations.filter(a => a.grade === grade);
  };

  // Get total students for a grade
  const getGradeTotal = (grade: number) => {
    return getGradeAllocations(grade).reduce((sum, a) => sum + a.students, 0);
  };

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
          const gradeTotal = getGradeTotal(grade);
          const gradeAllocations = getGradeAllocations(grade);
          return (
            <GradeCard
              key={grade}
              grade={grade}
              allocation={gradeTotal > 0 ? {
                students: gradeTotal,
                sections: gradeAllocations.map(a => a.section)
              } : undefined}
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
            <span className="text-xs text-[#00AEEF]">Add Section Allocation</span>
          </div>
          
          {/* Course Selection */}
          <div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Number of Students */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Number of Students <span className="text-[#f55a5a]">*</span></label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  value={inputState.students === 0 ? '' : inputState.students}
                  onChange={handleStudentsChange}
                  placeholder={`Enter number of students`}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] hover:shadow transition-all h-11 ${inputState.error ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'}`}
                  autoComplete="off"
                  inputMode="numeric"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#666]">
                  Remaining: {getRemainingForGrade(expandedGrade)}
                </div>
              </div>
              {inputState.error && <p className="text-xs text-[#f55a5a] mt-1">{inputState.error}</p>}
            </div>
            
            {/* Section Selection */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">Section <span className="text-[#f55a5a]">*</span></label>
              <SectionSelector
                selectedSections={inputState.section ? [inputState.section] : []}
                onSectionChange={handleSectionChange}
                studentCount={inputState.students}
                recommendedSections={[]} // Disable recommendations
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              className="bg-[#00AEEF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0095D9] transition-all flex items-center gap-2"
              onClick={handleSave}
              disabled={!!inputState.error || inputState.students <= 0 || !inputState.section}
            >
              <Plus className="h-4 w-4" />
              Add Section
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

      {/* Current Allocations for Expanded Grade */}
      {expandedGrade !== null && getGradeAllocations(expandedGrade).length > 0 && (
        <div className="bg-[#E6F6FB] rounded-lg p-4">
          <h4 className="font-medium text-[#1E2A3B] mb-3">Current Allocations for Grade {expandedGrade}</h4>
          <div className="space-y-2">
            {getGradeAllocations(expandedGrade).map(allocation => (
              <div key={allocation.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-[#1E2A3B]">
                    Section {allocation.section}
                  </span>
                  <span className="text-sm text-[#666]">
                    {allocation.students} students
                  </span>
                  {allocation.course && (
                    <span className="text-xs bg-[#00AEEF] text-white px-2 py-1 rounded">
                      {allocation.course}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAllocation(allocation.id)}
                  className="text-[#f55a5a] hover:text-[#d32f2f] p-1"
                  title="Remove allocation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {sectionAllocations.length > 0 && (
        <div className="bg-[#E6F6FB] rounded-lg p-4 mt-2">
          <h4 className="font-medium text-[#1E2A3B] mb-2">Allocation Summary</h4>
          <div className="space-y-2 text-sm text-[#666]">
            {Array.from(new Set(sectionAllocations.map(a => a.grade))).sort().map(grade => {
              const gradeAllocs = getGradeAllocations(grade);
              const gradeTotal = getGradeTotal(grade);
              return (
                <div key={grade}>
                  <div className="flex justify-between font-medium text-[#1E2A3B] mb-1">
                    <span>Grade {grade}:</span>
                    <span>{gradeTotal} students total</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {gradeAllocs.map(allocation => (
                      <div key={allocation.id} className="flex justify-between text-xs">
                        <span>Section {allocation.section}:</span>
                        <span>{allocation.students} students</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}; 