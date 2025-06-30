import React from 'react';

interface LeadTypeBadgeProps {
  leadType: string;
}

export const LeadTypeBadge: React.FC<LeadTypeBadgeProps> = ({ leadType }) => {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'Referral':
        return 'bg-[#E6F6FB] text-[#00AEEF] border border-[#00AEEF]';
      case 'WhatsApp':
        return 'bg-green-50 text-green-600 border border-green-200';
      case 'Facebook':
        return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'Website':
        return 'bg-purple-50 text-purple-600 border border-purple-200';
      case 'Event':
        return 'bg-[#FFD600] text-[#1E2A3B] border border-[#FFD600]';
      case 'School Fair':
        return 'bg-orange-50 text-orange-600 border border-orange-200';
      case 'Other':
        return 'bg-gray-50 text-gray-600 border border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyle(leadType)}`}>
      {leadType}
    </span>
  );
}; 