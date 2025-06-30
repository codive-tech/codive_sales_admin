import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SchoolFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  countryFilter: string;
  onCountryChange: (country: string) => void;
  programFilter: string;
  onProgramChange: (program: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onClearFilters: () => void;
  countries?: string[];
  programs?: string[];
}

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Inactive', value: 'inactive' }
];

export function SchoolFilters({
  searchQuery,
  onSearchChange,
  countryFilter,
  onCountryChange,
  programFilter,
  onProgramChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
  countries = [],
  programs = []
}: SchoolFiltersProps) {
  const hasActiveFilters = countryFilter || programFilter || statusFilter;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#00AEEF]" />
          <h3 className="text-lg font-semibold text-[#1E2A3B]">Filters</h3>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
          <input
            type="text"
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
            Country
          </label>
          <select
            value={countryFilter}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Program Filter */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
            Program Assigned
          </label>
          <select
            value={programFilter}
            onChange={(e) => onProgramChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            <option value="">All Programs</option>
            {programs.map(program => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
            Status
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