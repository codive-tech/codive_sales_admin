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
  type: 'group' | 'one2one';
  size?: 'sm' | 'md' | 'lg';
}

export function EnrollmentTypeBadge({ type, size = 'md' }: EnrollmentTypeBadgeProps) {
  const typeConfig = {
    group: {
      bgColor: 'bg-[#E6F6FB]',
      textColor: 'text-[#00AEEF]',
      borderColor: 'border-[#00AEEF]',
      label: 'Group',
      icon: '👥'
    },
    one2one: {
      bgColor: 'bg-[#FFD600]',
      textColor: 'text-[#1E2A3B]',
      borderColor: 'border-[#FFD600]',
      label: 'One-to-One',
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