import React from 'react';
import { SalesChart } from '../components/sales/SalesChart';
import type { SalesMetric } from '../types';

const mockSalesData: SalesMetric[] = [
  { month: 'Jan', revenue: 320000, schools: 12 },
  { month: 'Feb', revenue: 450000, schools: 15 },
  { month: 'Mar', revenue: 520000, schools: 18 },
  // Add more mock data
];

export function Sales() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Overview</h1>
        <p className="text-sm text-gray-600 mt-1">
          Track your sales performance and revenue
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h2>
        <SalesChart data={mockSalesData} />
      </div>
    </div>
  );
}