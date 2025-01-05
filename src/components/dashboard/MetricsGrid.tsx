import React from 'react';
import { School, TrendingUp, Users, CreditCard } from 'lucide-react';
import { MetricsCard } from '../analytics/MetricsCard';
import { calculateGrowth } from '../../utils/analytics';
import type { DashboardMetrics } from '../../types';

interface MetricsGridProps {
  metrics: DashboardMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsCard
        title="Total Schools"
        value={metrics.schools.current}
        change={calculateGrowth(metrics.schools.current, metrics.schools.previous)}
        changeLabel="vs. last month"
        icon={School}
      />
      <MetricsCard
        title="Monthly Revenue"
        value={metrics.revenue.current}
        change={calculateGrowth(metrics.revenue.current, metrics.revenue.previous)}
        changeLabel="vs. last month"
        icon={TrendingUp}
      />
      <MetricsCard
        title="Total Students"
        value={metrics.students.current}
        change={calculateGrowth(metrics.students.current, metrics.students.previous)}
        changeLabel="vs. last month"
        icon={Users}
      />
      <MetricsCard
        title="Payments Collected"
        value={metrics.payments.current}
        change={calculateGrowth(metrics.payments.current, metrics.payments.previous)}
        changeLabel="vs. last month"
        icon={CreditCard}
      />
    </div>
  );
}