import React from 'react';

interface StudentStatusBadgeProps {
  status: 'active' | 'completed' | 'dropped';
  size?: 'sm' | 'md' | 'lg';
}

export function StudentStatusBadge({ status, size = 'md' }: StudentStatusBadgeProps) {
  const statusConfig = {
    active: {
      bgColor: 'bg-[#00AEEF]',
      textColor: 'text-white',
      label: 'Active',
      icon: '🟢'
    },
    completed: {
      bgColor: 'bg-[#49c57a]',
      textColor: 'text-white',
      label: 'Completed',
      icon: '✅'
    },
    dropped: {
      bgColor: 'bg-[#f55a5a]',
      textColor: 'text-white',
      label: 'Dropped',
      icon: '❌'
    }
  };

  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200 ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
    >
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </span>
  );
}

interface PaymentStatusBadgeProps {
  status: 'paid' | 'unpaid' | 'pending';
  size?: 'sm' | 'md' | 'lg';
}

export function PaymentStatusBadge({ status, size = 'md' }: PaymentStatusBadgeProps) {
  const statusConfig = {
    paid: {
      bgColor: 'bg-[#49c57a]',
      textColor: 'text-white',
      label: 'Paid',
      icon: '💳'
    },
    unpaid: {
      bgColor: 'bg-[#FFD600]',
      textColor: 'text-[#1E2A3B]',
      label: 'Unpaid',
      icon: '⚠️'
    },
    pending: {
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      label: 'Pending',
      icon: '⏳'
    }
  };

  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200 ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
    >
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </span>
  );
}

interface EnrollmentTypeBadgeProps {
  type: 'b2b' | 'b2c';
  size?: 'sm' | 'md' | 'lg';
}

export function EnrollmentTypeBadge({ type, size = 'md' }: EnrollmentTypeBadgeProps) {
  const typeConfig = {
    b2b: {
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200',
      label: 'B2B',
      icon: '🏢'
    },
    b2c: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      label: 'B2C',
      icon: '👤'
    }
  };

  const config = typeConfig[type];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-medium border transition-all duration-200 ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses[size]}`}
    >
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </span>
  );
} 