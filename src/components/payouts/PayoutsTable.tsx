import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus, Eye, Download } from 'lucide-react';
import { PayoutRecord } from '../../types';
import { StatusPill } from '../ui/StatusPill';

interface PayoutsTableProps {
  data: PayoutRecord[];
  onRowClick?: (record: PayoutRecord) => void;
  showRazorpayColumn?: boolean;
}

interface Column {
  key: keyof PayoutRecord;
  label: string;
  sortable?: boolean;
  render?: (value: any, record: PayoutRecord) => React.ReactNode;
}

export function PayoutsTable({ data, onRowClick, showRazorpayColumn = false }: PayoutsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PayoutRecord;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const columns: Column[] = [
    {
      key: 'month',
      label: 'Month',
      sortable: true,
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString('en-GB', { 
          year: 'numeric', 
          month: 'long' 
        });
      }
    },
    {
      key: 'totalRevenue',
      label: 'Total Revenue (₹)',
      sortable: true,
      render: (value: number, record: PayoutRecord) => (
        <div className="flex items-center gap-2">
          <span>₹{value.toLocaleString('en-IN')}</span>
          {record.trend === 'up' && <TrendingUp className="h-4 w-4 text-[#49c57a]" />}
          {record.trend === 'down' && <TrendingDown className="h-4 w-4 text-[#f55a5a]" />}
          {record.trend === 'stable' && <Minus className="h-4 w-4 text-[#666]" />}
        </div>
      )
    },
    {
      key: 'commissionRate',
      label: 'Commission Rate (%)',
      sortable: true,
      render: (value: number) => `${value}%`
    },
    {
      key: 'commissionEarned',
      label: 'Commission Earned (₹)',
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString('en-IN')}`
    },
    {
      key: 'payoutStatus',
      label: 'Payout Status',
      sortable: true,
      render: (value: string) => <StatusPill status={value as any} />
    },
    {
      key: 'payoutDate',
      label: 'Payout Date',
      sortable: true,
      render: (value: string) => value ? new Date(value).toLocaleDateString('en-GB') : '-'
    },
    {
      key: 'remarks',
      label: 'Remarks',
      sortable: false,
      render: (value: string) => value || '-'
    }
  ];

  // Add Razorpay column if enabled
  if (showRazorpayColumn) {
    columns.push({
      key: 'generatedByRazorpay',
      label: 'Razorpay',
      sortable: true,
      render: (value: boolean) => value ? 'Yes' : 'No'
    });
  }

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

  const handleSort = (key: keyof PayoutRecord) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#E6F6FB] rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#1E2A3B] mb-2">
            No payout records found
          </h3>
          <p className="text-[#666] text-sm">
            Your commission history will appear here once you start earning.
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
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E0E0E0]">
            {sortedData.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-[#E6F6FB] transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-[#1E2A3B]">
                    {column.render 
                      ? column.render(record[column.key], record)
                      : String(record[column.key] || '-')
                    }
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRowClick?.(record)}
                      className="p-1 text-[#00AEEF] hover:bg-[#E6F6FB] rounded transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#666] hover:bg-[#E6F6FB] rounded transition-colors"
                      title="Download Statement"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stack View */}
      <div className="lg:hidden">
        <div className="p-4 space-y-4">
          {sortedData.map((record) => (
            <div
              key={record.id}
              className="bg-white border border-[#E0E0E0] rounded-lg p-4 hover:bg-[#E6F6FB] transition-colors duration-150"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#1E2A3B]">
                    {new Date(record.month).toLocaleDateString('en-GB', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </span>
                  <StatusPill status={record.payoutStatus} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#00AEEF]">
                    ₹{record.commissionEarned.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => toggleRowExpansion(record.id)}
                    className="p-1 text-[#666] hover:bg-[#E6F6FB] rounded transition-colors"
                  >
                    {expandedRows.has(record.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              {expandedRows.has(record.id) && (
                <div className="space-y-2 text-sm border-t border-[#E0E0E0] pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-[#666]">Total Revenue:</span>
                    <span className="font-medium text-[#1E2A3B]">
                      ₹{record.totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Commission Rate:</span>
                    <span className="font-medium text-[#1E2A3B]">{record.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Payout Date:</span>
                    <span className="font-medium text-[#1E2A3B]">
                      {record.payoutDate ? new Date(record.payoutDate).toLocaleDateString('en-GB') : '-'}
                    </span>
                  </div>
                  {record.remarks && (
                    <div className="flex justify-between">
                      <span className="text-[#666]">Remarks:</span>
                      <span className="font-medium text-[#1E2A3B]">{record.remarks}</span>
                    </div>
                  )}
                  {showRazorpayColumn && (
                    <div className="flex justify-between">
                      <span className="text-[#666]">Razorpay:</span>
                      <span className="font-medium text-[#1E2A3B]">
                        {record.generatedByRazorpay ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#666]">Trend:</span>
                    <div className="flex items-center gap-1">
                      {record.trend === 'up' && <TrendingUp className="h-4 w-4 text-[#49c57a]" />}
                      {record.trend === 'down' && <TrendingDown className="h-4 w-4 text-[#f55a5a]" />}
                      {record.trend === 'stable' && <Minus className="h-4 w-4 text-[#666]" />}
                      <span className="text-xs capitalize">{record.trend}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 