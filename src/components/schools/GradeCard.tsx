import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface GradeCardProps {
  grade: number;
  allocation?: {
    students: number;
    sections: string[];
  };
  expanded: boolean;
  onExpand: (grade: number) => void;
}

export const GradeCard: React.FC<GradeCardProps> = ({
  grade,
  allocation,
  expanded,
  onExpand
}) => {
  return (
    <button
      type="button"
      onClick={() => onExpand(grade)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-md border border-[#00AEEF] bg-[#D0F0FA] text-[#1E2A3B] font-medium transition-all ${expanded ? 'shadow-md' : 'hover:bg-[#B8E8F5]'}`}
      aria-expanded={expanded}
    >
      <span>Grade {grade}</span>
      <span className="flex items-center gap-2">
        {allocation?.students ? (
          <span className="bg-[#FFD600] text-[#1E2A3B] rounded px-2 py-0.5 text-xs font-semibold">{allocation.students} assigned</span>
        ) : null}
        {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </span>
    </button>
  );
}; 