import React from 'react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: 'paid' | 'expired' | 'pending';
  children?: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusConfig = {
    paid: {
      bgColor: 'bg-[#49c57a]',
      textColor: 'text-white',
      label: 'Paid'
    },
    expired: {
      bgColor: 'bg-[#f55a5a]',
      textColor: 'text-white',
      label: 'Expired'
    },
    pending: {
      bgColor: 'bg-[#FFD600]',
      textColor: 'text-[#1E2A3B]',
      label: 'Pending'
    }
  };

  const config = statusConfig[status];

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        config.bgColor,
        config.textColor
      )}
    >
      {children || config.label}
    </span>
  );
} 