import React, { useState, useMemo } from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import { GradeCard } from './GradeCard';
import { RemainingCounter } from './RemainingCounter';

export interface GradeAllocation {
  grade: number;
  students: number;
  sections: string[];
}

interface GradeAssignmentPanelProps {
  totalStudentsExpected: number;
  onAllocationChange: (allocations: GradeAllocation[]) => void;
}

export const GradeAssignmentPanel: React.FC<GradeAssignmentPanelProps> = ({
  totalStudentsExpected,
  onAllocationChange
}) => {
  const [allocations, setAllocations] = useState<GradeAllocation[]>([]);
  const [gradeErrors, setGradeErrors] = useState<Record<number, string>>({});
  const [touched, setTouched] = useState(false);

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
  const handleGradeUpdate = (grade: number, students: number, sections: string[]) => {
    setTouched(true);
    setAllocations(prev => {
      const filtered = prev.filter(a => a.grade !== grade);
      if (students > 0) {
        return [...filtered, { grade, students, sections }].sort((a, b) => a.grade - b.grade);
      }
      return filtered;
    });
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
              maxStudents={totalStudentsExpected - (totalAssigned - (allocation?.students || 0))}
              onUpdate={(students, sections) => handleGradeUpdate(grade, students, sections)}
              recommendedSections={getRecommendedSections(allocation?.students || 0)}
              error={gradeErrors[grade]}
            />
          );
        })}
      </div>

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