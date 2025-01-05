import React from 'react';
import { RevenueChart } from '../analytics/RevenueChart';
import { ActivityFeed } from '../ActivityFeed';
import type { SalesMetric, RecentActivity } from '../../types';

interface AnalyticsSectionProps {
  salesData: SalesMetric[];
  activities: RecentActivity[];
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export function AnalyticsSection({ salesData, activities, timeframe }: AnalyticsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <RevenueChart 
          data={salesData} 
          timeframe={timeframe}
        />
      </div>
      <ActivityFeed activities={activities} />
    </div>
  );
}