import React from 'react';
import { Download } from 'lucide-react';
import { RevenueRecord } from '../../types';

interface ExportReportProps {
  data: RevenueRecord[];
  onExport: () => void;
  isLoading?: boolean;
}

export function ExportReport({ data, onExport, isLoading = false }: ExportReportProps) {
  const handleExport = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }
    onExport();
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExport}
        disabled={isLoading || data.length === 0}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#00AEEF] hover:bg-[#0095D9] active:bg-[#0074B7] text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="h-4 w-4" />
        {isLoading ? 'Exporting...' : 'Export CSV'}
      </button>
      
      <button
        className="inline-flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] hover:bg-[#E6F6FB] text-[#1E2A3B] font-medium rounded-lg transition-colors duration-200"
      >
        Download Invoice
      </button>
    </div>
  );
} 