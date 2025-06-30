import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { RevenueRecord } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';

interface RevenueTableProps {
  data: RevenueRecord[];
  onRowClick?: (record: RevenueRecord) => void;
}

interface Column {
  key: keyof RevenueRecord;
  label: string;
  sortable?: boolean;
  render?: (value: any, record: RevenueRecord) => React.ReactNode;
}

const columns: Column[] = [
  {
    key: 'date',
    label: 'Date',
    sortable: true,
    render: (value: string) => {
      const date = new Date(value);
      return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    }
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true
  },
  {
    key: 'program',
    label: 'Program',
    sortable: true
  },
  {
    key: 'amountCollected',
    label: 'Amount Collected (₹)',
    sortable: true,
    render: (value: number) => `₹${value.toLocaleString('en-IN')}`
  },
  {
    key: 'razorpayReferenceId',
    label: 'Razorpay Reference ID',
    sortable: true
  },
  {
    key: 'partnerId',
    label: 'Partner ID',
    sortable: true
  },
  {
    key: 'paymentStatus',
    label: 'Payment Status',
    sortable: true,
    render: (value: string) => <StatusBadge status={value as any} />
  },
  {
    key: 'convertedBy',
    label: 'Converted By',
    sortable: true,
    render: (value: string) => value || '-'
  }
];

export function RevenueTable({ data, onRowClick }: RevenueTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RevenueRecord;
    direction: 'asc' | 'desc';
  } | null>(null);
  
  const recordsPerPage = 50;

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (key: keyof RevenueRecord) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#E6F6FB] rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#1E2A3B] mb-2">
            No records found for this period
          </h3>
          <p className="text-[#666] text-sm">
            Try adjusting your filters or date range to see more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E0E0E0]">
          <thead className="bg-[#E6F6FB] sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-[#D0F0FA]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortConfig?.key === column.key && (
                      sortConfig.direction === 'asc' ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E0E0E0]">
            {currentData.map((record, index) => (
              <tr
                key={record.id}
                onClick={() => onRowClick?.(record)}
                className="hover:bg-[#E6F6FB] cursor-pointer transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-[#1E2A3B]">
                    {column.render 
                      ? column.render(record[column.key], record)
                      : String(record[column.key] || '-')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stack View */}
      <div className="lg:hidden">
        <div className="p-4">
          <div className="space-y-4">
            {currentData.map((record) => (
              <div
                key={record.id}
                onClick={() => onRowClick?.(record)}
                className="bg-white border border-[#E0E0E0] rounded-lg p-4 hover:bg-[#E6F6FB] cursor-pointer transition-colors duration-150"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#1E2A3B]">
                      {new Date(record.date).toLocaleDateString('en-GB')}
                    </span>
                    <StatusBadge status={record.paymentStatus} />
                  </div>
                  <span className="text-lg font-semibold text-[#00AEEF]">
                    ₹{record.amountCollected.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#666]">Name:</span>
                    <span className="font-medium text-[#1E2A3B]">{record.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Program:</span>
                    <span className="font-medium text-[#1E2A3B]">{record.program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Reference ID:</span>
                    <span className="font-mono text-xs text-[#666]">{record.razorpayReferenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Partner ID:</span>
                    <span className="font-medium text-[#1E2A3B]">{record.partnerId}</span>
                  </div>
                  {record.convertedBy && (
                    <div className="flex justify-between">
                      <span className="text-[#666]">Converted By:</span>
                      <span className="font-medium text-[#1E2A3B]">{record.convertedBy}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-6 py-3 border-t border-[#E0E0E0] flex items-center justify-between">
          <div className="text-sm text-[#666]">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} results
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-[#666] hover:text-[#1E2A3B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === pageNum
                        ? 'bg-[#00AEEF] text-white'
                        : 'text-[#666] hover:bg-[#E6F6FB]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-[#666] hover:text-[#1E2A3B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 