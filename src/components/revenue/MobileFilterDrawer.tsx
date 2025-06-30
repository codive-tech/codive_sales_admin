import React from 'react';
import { X, Filter } from 'lucide-react';
import { RevenueFilters } from '../../types';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: RevenueFilters;
  onFiltersChange: (filters: RevenueFilters) => void;
}

const dateRangeOptions = [
  { label: 'Last 7 Days', value: '7days' },
  { label: '1 Month', value: '1month' },
  { label: 'Custom', value: 'custom' }
];

const leadTypeOptions = [
  { label: 'All Types', value: '' },
  { label: 'School', value: 'School' },
  { label: 'Student', value: 'Student' }
];

const programOptions = [
  { label: 'All Programs', value: '' },
  { label: 'AI Bootcamp', value: 'AI Bootcamp' },
  { label: 'Robotics 101', value: 'Robotics 101' },
  { label: 'Coding Fundamentals', value: 'Coding Fundamentals' },
  { label: 'Data Science', value: 'Data Science' }
];

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Expired', value: 'expired' }
];

export function MobileFilterDrawer({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange 
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#E0E0E0]">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#00AEEF]" />
              <h3 className="text-lg font-semibold text-[#1E2A3B]">Filters</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#E6F6FB] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#666]" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-3">
                Date Range
              </label>
              <div className="space-y-2">
                {dateRangeOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="dateRange"
                      value={option.value}
                      className="mr-3 text-[#00AEEF] focus:ring-[#00AEEF]"
                    />
                    <span className="text-sm text-[#1E2A3B]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lead Type */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-3">
                Lead Type
              </label>
              <select
                value={filters.leadType}
                onChange={(e) => onFiltersChange({ ...filters, leadType: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              >
                {leadTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Program */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-3">
                Program
              </label>
              <select
                value={filters.program}
                onChange={(e) => onFiltersChange({ ...filters, program: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              >
                {programOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-3">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E0E0E0]">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-[#00AEEF] hover:bg-[#0095D9] text-white font-medium rounded-lg transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 