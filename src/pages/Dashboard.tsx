import React, { useState } from 'react';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { AnalyticsSection } from '../components/dashboard/AnalyticsSection';
import { DetailedMetrics } from '../components/analytics/DetailedMetrics';
import { DataExport } from '../components/export/DataExport';
import { exportToCSV, exportToPDF } from '../utils/export';
import { mockMetrics, mockSalesData, mockActivities } from '../data/mockData';

const mockBreakdown = [
  { category: 'Primary Schools', value: 180000, change: 12 },
  { category: 'Secondary Schools', value: 150000, change: 8 },
  { category: 'Higher Secondary', value: 90000, change: -3 },
];

export function Dashboard() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  const handleExport = async (format: 'csv' | 'pdf') => {
    const data = [...mockSalesData];
    if (format === 'csv') {
      await exportToCSV(data, 'sales-report');
    } else {
      await exportToPDF(data, 'sales-report');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Overview of your school management metrics
          </p>
        </div>
        <DataExport onExport={handleExport} />
      </div>

      <MetricsGrid metrics={mockMetrics} />
      
      <AnalyticsSection 
        salesData={mockSalesData}
        activities={mockActivities}
        timeframe={timeframe}
      />

      <DetailedMetrics
        title="Revenue Breakdown by School Type"
        data={mockBreakdown}
        onExport={() => handleExport('csv')}
      />
    </div>
  );
}