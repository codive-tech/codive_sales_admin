import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { formatCurrency } from '../../utils/analytics';

interface MetricBreakdown {
  category: string;
  value: number;
  change: number;
}

interface DetailedMetricsProps {
  data: MetricBreakdown[];
  title: string;
  onExport: () => void;
}

export function DetailedMetrics({ data, title, onExport }: DetailedMetricsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onExport}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <Download className="h-4 w-4" />
          Export Data
        </button>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.category} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">{item.category}</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {formatCurrency(item.value)}
            </p>
            <p className={`text-sm mt-1 ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {item.change >= 0 ? '+' : ''}{item.change}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}