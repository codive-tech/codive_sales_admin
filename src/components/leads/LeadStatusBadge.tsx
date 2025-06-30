import React from 'react';

interface LeadStatusBadgeProps {
  status: 'New' | 'Contacted' | 'Follow-Up' | 'Converted' | 'Cold';
  className?: string;
}

const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'New':
        return {
          bgColor: 'bg-[#FFD600]',
          textColor: 'text-[#333333]',
          borderColor: 'border-[#FFD600]'
        };
      case 'Contacted':
        return {
          bgColor: 'bg-[#00AEEF]',
          textColor: 'text-white',
          borderColor: 'border-[#00AEEF]'
        };
      case 'Follow-Up':
        return {
          bgColor: 'bg-[#0074B7]',
          textColor: 'text-white',
          borderColor: 'border-[#0074B7]'
        };
      case 'Converted':
        return {
          bgColor: 'bg-[#49c57a]',
          textColor: 'text-white',
          borderColor: 'border-[#49c57a]'
        };
      case 'Cold':
        return {
          bgColor: 'bg-[#f55a5a]',
          textColor: 'text-white',
          borderColor: 'border-[#f55a5a]'
        };
      default:
        return {
          bgColor: 'bg-gray-200',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        border transition-all duration-200 hover:scale-105
        ${className}
      `}
    >
      {status}
    </span>
  );
};

export default LeadStatusBadge; 