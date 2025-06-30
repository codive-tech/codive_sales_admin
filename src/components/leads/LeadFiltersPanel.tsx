import React from 'react';
import { LeadFilters } from '../../types';
import { leadPrograms, leadSources, leadStatuses } from '../../data/mockData';

interface LeadFiltersPanelProps {
  filters: LeadFilters;
  onFiltersChange: (filters: LeadFilters) => void;
  onResetFilters: () => void;
}

const LeadFiltersPanel: React.FC<LeadFiltersPanelProps> = ({
  filters,
  onFiltersChange,
  onResetFilters
}) => {
  const handleFilterChange = (field: keyof LeadFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E0E0E0]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-[#1E2A3B]">Filters</h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-[#00AEEF] hover:text-[#0095D9] transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Search by Name or Contact
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search leads..."
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          />
        </div>

        {/* Lead Type */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Lead Type
          </label>
          <select
            value={filters.leadType}
            onChange={(e) => handleFilterChange('leadType', e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Parent">Parent</option>
            <option value="School">School</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            <option value="">All Statuses</option>
            {leadStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Program */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Program
          </label>
          <select
            value={filters.program}
            onChange={(e) => handleFilterChange('program', e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            <option value="">All Programs</option>
            {leadPrograms.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Source
          </label>
          <select
            value={filters.source}
            onChange={(e) => handleFilterChange('source', e.target.value)}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          >
            <option value="">All Sources</option>
            {leadSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        {/* Campaign ID */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Campaign ID
          </label>
          <input
            type="text"
            value={filters.campaignId}
            onChange={(e) => handleFilterChange('campaignId', e.target.value)}
            placeholder="Filter by campaign ID..."
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          />
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-[#E0E0E0]">
          <h4 className="text-sm font-medium text-[#333333] mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button
              onClick={() => handleFilterChange('status', 'New')}
              className="w-full text-left px-3 py-2 text-sm text-[#333333] hover:bg-[#E6F6FB] rounded-md transition-colors"
            >
              Show New Leads
            </button>
            <button
              onClick={() => handleFilterChange('status', 'Follow-Up')}
              className="w-full text-left px-3 py-2 text-sm text-[#333333] hover:bg-[#E6F6FB] rounded-md transition-colors"
            >
              Show Follow-ups
            </button>
            <button
              onClick={() => handleFilterChange('status', 'Converted')}
              className="w-full text-left px-3 py-2 text-sm text-[#333333] hover:bg-[#E6F6FB] rounded-md transition-colors"
            >
              Show Converted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadFiltersPanel; 