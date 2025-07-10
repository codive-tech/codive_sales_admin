import React from 'react';
import { Search, Filter, X, Users, BookOpen, Hash } from 'lucide-react';
import { getProgramOptions } from '../../data/programConfig';

interface StudentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  programFilter: string;
  onProgramChange: (program: string) => void;
  enrollmentModeFilter: string;
  onEnrollmentModeChange: (mode: string) => void;
  idTypeFilter: string;
  onIdTypeChange: (type: string) => void;
  onClearFilters: () => void;
}

// Use the new program configuration
const programs = [
  { label: 'All Programs', value: '' },
  ...getProgramOptions().slice(1) // Skip the "Select Program" option, start from index 1
];

const enrollmentModeOptions = [
  { label: 'All', value: '' },
  { label: 'Group Class', value: 'group' },
  { label: 'One-to-One Class', value: 'one2one' }
];

const idTypeOptions = [
  { label: 'All', value: '' },
  { label: 'Group ID', value: 'group' },
  { label: 'Student ID', value: 'student' }
];

export function StudentFilters({
  searchQuery,
  onSearchChange,
  programFilter,
  onProgramChange,
  enrollmentModeFilter,
  onEnrollmentModeChange,
  idTypeFilter,
  onIdTypeChange,
  onClearFilters
}: StudentFiltersProps) {
  const hasActiveFilters = programFilter || enrollmentModeFilter || idTypeFilter;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E0E0E0] p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#0481FF]" />
          <h3 className="text-lg font-semibold text-[#003C64]">Student Filters</h3>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5D6D7E]" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-xl bg-white text-[#003C64] focus:outline-none focus:ring-2 focus:ring-[#0481FF] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Program Filter */}
        <div>
          <label className="block text-sm font-medium text-[#003C64] mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Program Enrolled
          </label>
          <select
            value={programFilter}
            onChange={(e) => onProgramChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-xl bg-white text-[#003C64] focus:outline-none focus:ring-2 focus:ring-[#0481FF] focus:border-transparent"
          >
            {programs.map(program => (
              <option key={program.value} value={program.value}>
                {program.label}
              </option>
            ))}
          </select>
        </div>

        {/* Enrollment Mode Filter */}
        <div>
          <label className="block text-sm font-medium text-[#003C64] mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Enrollment Mode
          </label>
          <select
            value={enrollmentModeFilter}
            onChange={(e) => onEnrollmentModeChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-xl bg-white text-[#003C64] focus:outline-none focus:ring-2 focus:ring-[#0481FF] focus:border-transparent"
          >
            {enrollmentModeOptions.map(mode => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        {/* ID Type Filter */}
        <div>
          <label className="block text-sm font-medium text-[#003C64] mb-2 flex items-center gap-2">
            <Hash className="h-4 w-4" />
            ID Type
          </label>
          <select
            value={idTypeFilter}
            onChange={(e) => onIdTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-xl bg-white text-[#003C64] focus:outline-none focus:ring-2 focus:ring-[#0481FF] focus:border-transparent"
          >
            {idTypeOptions.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
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
            className="inline-flex items-center gap-2 px-3 py-1 text-sm text-[#5D6D7E] hover:text-[#003C64] hover:bg-[#EAF6FF] rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
} 