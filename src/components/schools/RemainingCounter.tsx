import React from 'react';
import { Users } from 'lucide-react';

interface RemainingCounterProps {
  remaining: number;
  total: number;
  hasExceeded: boolean;
}

export const RemainingCounter: React.FC<RemainingCounterProps> = ({
  remaining,
  total,
  hasExceeded
}) => {
  const getBadgeColor = () => {
    if (hasExceeded) {
      return 'bg-[#f55a5a] text-white';
    }
    if (remaining === 0) {
      return 'bg-[#FFD600] text-[#1E2A3B]';
    }
    if (remaining <= total * 0.1) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    return 'bg-[#E6F6FB] text-[#1E2A3B] border-[#00AEEF]';
  };

  const getIconColor = () => {
    if (hasExceeded) {
      return 'text-white';
    }
    if (remaining === 0) {
      return 'text-[#1E2A3B]';
    }
    return 'text-[#00AEEF]';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${getBadgeColor()}`}>
      <Users className={`h-4 w-4 ${getIconColor()}`} />
      <span className="text-sm font-medium">
        {hasExceeded ? (
          <>
            Exceeded by {Math.abs(remaining)}
          </>
        ) : remaining === 0 ? (
          <>
            All {total} students allocated
          </>
        ) : (
          <>
            {remaining} of {total} remaining
          </>
        )}
      </span>
    </div>
  );
}; 