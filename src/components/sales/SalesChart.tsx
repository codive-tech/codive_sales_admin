import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SalesMetric } from '../../types';

interface SalesChartProps {
  data: SalesMetric[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            fill="#EEF2FF"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}