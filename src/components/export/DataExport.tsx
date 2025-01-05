import React from 'react';
import { FileSpreadsheet, FileText } from 'lucide-react';

interface ExportOption {
  label: string;
  value: 'csv' | 'pdf';
  icon: React.ElementType;
}

interface DataExportProps {
  onExport: (format: 'csv' | 'pdf') => void;
}

const exportOptions: ExportOption[] = [
  { label: 'Export as CSV', value: 'csv', icon: FileSpreadsheet },
  { label: 'Export as PDF', value: 'pdf', icon: FileText },
];

export function DataExport({ onExport }: DataExportProps) {
  return (
    <div className="flex gap-3">
      {exportOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            onClick={() => onExport(option.value)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}