import React from 'react';
import { clsx } from 'clsx';

interface StatusPillProps {
  status: 'paid' | 'pending';
  children?: React.ReactNode;
}

export function StatusPill({ status, children }: StatusPillProps) {
  const statusConfig = {
    paid: {
      bgColor: 'bg-[#49c57a]',
      textColor: 'text-white',
      label: 'Paid'
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