import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

interface SchoolStatusBadgeProps {
  status: string;
  className?: string;
}

export function SchoolStatusBadge({ status, className = '' }: SchoolStatusBadgeProps) {
  const statusConfig = {
    active: {
      bgColor: 'bg-[#49c57a]',
      textColor: 'text-white',
      borderColor: 'border-[#49c57a]',
      icon: CheckCircle,
      label: 'Active',
      description: 'School is actively enrolled'
    },
    suspended: {
      bgColor: 'bg-[#f55a5a]',
      textColor: 'text-white',
      borderColor: 'border-[#f55a5a]',
      icon: AlertTriangle,
      label: 'Suspended',
      description: 'Access temporarily suspended'
    },
    inactive: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-300',
      icon: XCircle,
      label: 'Inactive',
      description: 'School is not currently active'
    },
    pending: {
      bgColor: 'bg-[#ffa726]',
      textColor: 'text-white',
      borderColor: 'border-[#ffa726]',
      icon: Clock,
      label: 'Pending',
      description: 'Awaiting activation'
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
  const IconComponent = config.icon;

  return (
    <div className={`group relative ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 cursor-default ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        <IconComponent className="h-3 w-3" />
        {config.label}
      </span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#1E2A3B] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
        {config.description}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1E2A3B]"></div>
      </div>
    </div>
  );
} 