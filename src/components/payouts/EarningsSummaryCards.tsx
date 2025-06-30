import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Percent } from 'lucide-react';
import { EarningsSummary } from '../../types';

interface EarningsSummaryCardsProps {
  summary: EarningsSummary;
}

const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ 
  value, 
  duration = 2000 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    animate();
  }, [value, duration]);

  return (
    <span className="text-3xl font-bold text-[#1E2A3B]">
      ₹{displayValue.toLocaleString('en-IN')}
    </span>
  );
};

export function EarningsSummaryCards({ summary }: EarningsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Revenue Generated */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-[#E0E0E0] group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-[#E6F6FB] rounded-lg group-hover:bg-[#D0F0FA] transition-colors duration-300">
            <DollarSign className="h-6 w-6 text-[#00AEEF]" />
          </div>
          <TrendingUp className="h-5 w-5 text-[#49c57a]" />
        </div>
        
        <div className="mb-2">
          <AnimatedCounter value={summary.totalRevenue} />
        </div>
        
        <p className="text-[#666] text-sm font-medium">Total Revenue Generated</p>
        <p className="text-[#999] text-xs mt-1">{summary.period}</p>
      </div>

      {/* Total Commission Earned */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-[#E0E0E0] group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-[#E6F6FB] rounded-lg group-hover:bg-[#D0F0FA] transition-colors duration-300">
            <Percent className="h-6 w-6 text-[#00AEEF]" />
          </div>
          <TrendingUp className="h-5 w-5 text-[#49c57a]" />
        </div>
        
        <div className="mb-2">
          <AnimatedCounter value={summary.totalCommission} />
        </div>
        
        <p className="text-[#666] text-sm font-medium">Total Commission Earned</p>
        <p className="text-[#999] text-xs mt-1">{summary.period}</p>
      </div>

      {/* Next Payout Date */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-[#E0E0E0] group relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD600]/5 to-[#FFD600]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#FFD600]/20 rounded-lg group-hover:bg-[#FFD600]/30 transition-colors duration-300">
              <Calendar className="h-6 w-6 text-[#1E2A3B]" />
            </div>
            {summary.nextPayoutDate ? (
              <TrendingUp className="h-5 w-5 text-[#49c57a]" />
            ) : (
              <TrendingDown className="h-5 w-5 text-[#f55a5a]" />
            )}
          </div>
          
          <div className="mb-2">
            {summary.nextPayoutDate ? (
              <span className="text-3xl font-bold text-[#1E2A3B]">
                {new Date(summary.nextPayoutDate).toLocaleDateString('en-GB')}
              </span>
            ) : (
              <span className="text-2xl font-bold text-[#f55a5a]">
                No payout scheduled
              </span>
            )}
          </div>
          
          <p className="text-[#666] text-sm font-medium">Next Payout Date</p>
          <p className="text-[#999] text-xs mt-1">
            {summary.nextPayoutDate ? 'Scheduled payout' : 'Pending approval'}
          </p>
        </div>
      </div>
    </div>
  );
} 