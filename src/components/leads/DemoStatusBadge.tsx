import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface DemoStatusBadgeProps {
  demoDate?: string;
  adminValidation?: 'pending' | 'eligible' | 'not_eligible';
  className?: string;
}

export const DemoStatusBadge: React.FC<DemoStatusBadgeProps> = ({
  demoDate,
  adminValidation,
  className = ''
}) => {
  // If no demo is scheduled, don't show anything
  if (!demoDate) {
    return null;
  }

  const demoDateTime = new Date(demoDate);
  const now = new Date();
  const isDemoPassed = demoDateTime < now;

  // If demo hasn't passed yet, show "Awaiting Demo"
  if (!isDemoPassed) {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-md border border-yellow-200 ${className}`}>
        <Clock className="h-3 w-3" />
        Awaiting Demo
      </div>
    );
  }

  // If demo has passed but no validation, show "Admin Validation Required"
  if (isDemoPassed && !adminValidation) {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-md border border-orange-200 ${className}`}>
        <Clock className="h-3 w-3" />
        Admin Validation Required
      </div>
    );
  }

  // If validated as eligible
  if (adminValidation === 'eligible') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-md border border-green-200 ${className}`}>
        <CheckCircle className="h-3 w-3" />
        Validated: Eligible
      </div>
    );
  }

  // If validated as not eligible
  if (adminValidation === 'not_eligible') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-md border border-red-200 ${className}`}>
        <XCircle className="h-3 w-3" />
        Demo Rejected
      </div>
    );
  }

  return null;
}; 