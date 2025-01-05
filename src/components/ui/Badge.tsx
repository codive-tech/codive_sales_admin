import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'inactive' | 'closed' | 'pending';
}

export function Badge({ children, variant = 'active' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-green-100 text-green-800': variant === 'active',
          'bg-yellow-100 text-yellow-800': variant === 'pending',
          'bg-gray-100 text-gray-800': variant === 'inactive',
          'bg-red-100 text-red-800': variant === 'closed',
        }
      )}
    >
      {children}
    </span>
  );
}