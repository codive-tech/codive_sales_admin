import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown, Menu } from 'lucide-react';
import { RevenueFilters, DateRangeOption, RevenueRecord } from '../../types';
import { ExportReport } from '../export/ExportReport';

interface ReportHeaderProps {
  filters: RevenueFilters;
  onFiltersChange: (filters: RevenueFilters) => void;
  data: RevenueRecord[];
  onExport: () => void;
  isLoading?: boolean;
  onMobileFilterOpen?: () => void;
}

const dateRangeOptions: DateRangeOption[] = [
  {
    label: 'Last 7 Days',
    value: '7days',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  },
  {
    label: '1 Month',
    value: '1month',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  },
  {
    label: 'Custom',
    value: 'custom',
    startDate: new Date(),
    endDate: new Date()
  }
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

export function ReportHeader({ 
  filters, 
  onFiltersChange, 
  data, 
  onExport, 
  isLoading = false,
  onMobileFilterOpen
}: ReportHeaderProps) {
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);

  const handleDateRangeChange = (option: DateRangeOption) => {
    if (option.value === 'custom') {
      setIsCustomDateOpen(true);
    } else {
      onFiltersChange({
        ...filters,
        dateRange: {
          start: option.startDate.toISOString().split('T')[0],
          end: option.endDate.toISOString().split('T')[0]
        }
      });
    }
  };

  const handleCustomDateChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const getCurrentDateRangeLabel = () => {
    const option = dateRangeOptions.find(opt => 
      opt.startDate.toISOString().split('T')[0] === filters.dateRange.start &&
      opt.endDate.toISOString().split('T')[0] === filters.dateRange.end
    );
    return option?.label || 'Custom';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center justify-between lg:justify-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1E2A3B] mb-1">
              Revenue & Enrollment Reports
            </h1>
            <p className="text-[#666] text-sm">
              Track your revenue and enrollment data with detailed insights
            </p>
          </div>
          
          {/* Mobile Filter Button */}
          <button
            onClick={onMobileFilterOpen}
            className="lg:hidden p-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
        
        <div className="hidden lg:block">
          <ExportReport 
            data={data} 
            onExport={onExport} 
            isLoading={isLoading} 
          />
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="relative">
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
            Date Range
          </label>
          <div className="relative">
            <select
              value={getCurrentDateRangeLabel()}
              onChange={(e) => {
                const option = dateRangeOptions.find(opt => opt.label === e.target.value);
                if (option) handleDateRangeChange(option);
              }}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg bg-white text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
          </div>
          
          {isCustomDateOpen && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleCustomDateChange('start', e.target.value)}
                className="px-2 py-1 text-xs border border-[#E0E0E0] rounded"
              />
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleCustomDateChange('end', e.target.value)}
                className="px-2 py-1 text-xs border border-[#E0E0E0] rounded"
              />
            </div>
          )}
        </div>

        {/* Lead Type */}
        <div>
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
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
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
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
          <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
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

      {/* Mobile Export Button */}
      <div className="lg:hidden mt-4">
        <ExportReport 
          data={data} 
          onExport={onExport} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
} 