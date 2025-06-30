import React from 'react';
import { Search, Filter, X, Users, BookOpen } from 'lucide-react';

interface StudentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  programFilter: string;
  onProgramChange: (program: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onClearFilters: () => void;
}

const programs = [
  { label: 'All Programs', value: '' },
  { label: 'AI Bootcamp', value: 'AI Bootcamp' },
  { label: 'Robotics 101', value: 'Robotics 101' },
  { label: 'Coding Fundamentals', value: 'Coding Fundamentals' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Web Development', value: 'Web Development' },
  { label: 'Mobile App Development', value: 'Mobile App Development' }
];

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Dropped', value: 'dropped' }
];

export function StudentFilters({
  searchQuery,
  onSearchChange,
  programFilter,
  onProgramChange,
  statusFilter,
  onStatusChange,
  onClearFilters
}: StudentFiltersProps) {
  const hasActiveFilters = programFilter || statusFilter;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#00AEEF]" />
          <h3 className="text-lg font-semibold text-[#1E2A3B]">Student Filters</h3>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Program Filter */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Program Enrolled
          </label>
          <select
            value={programFilter}
            onChange={(e) => onProgramChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            {programs.map(program => (
              <option key={program.value} value={program.value}>
                {program.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Enrollment Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-[#E0E0E0]">
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm text-[#666] hover:text-[#1E2A3B] hover:bg-[#E6F6FB] rounded-md transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
} 