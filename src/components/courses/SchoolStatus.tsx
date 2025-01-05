import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { School } from '../../types';

interface SchoolStatusProps {
  school: School;
  isOnHold: boolean;
  holdUntil?: string;
}

export function SchoolStatus({ school, isOnHold, holdUntil }: SchoolStatusProps) {
  return (
    <div className="px-4 py-3 bg-gray-50 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">{school.name}</p>
          <p className="text-xs text-gray-600">{school.principalName}</p>
        </div>
        {isOnHold && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            On Hold
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Enrolled: {new Date(school.enrollmentDate).toLocaleDateString()}</span>
        </div>
        {isOnHold && holdUntil && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Hold until: {new Date(holdUntil).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}