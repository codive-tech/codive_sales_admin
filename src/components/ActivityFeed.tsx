import React from 'react';
import { format } from 'date-fns';
import type { RecentActivity } from '../types';

interface ActivityFeedProps {
  activities: RecentActivity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="relative flex-none">
              <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2" />
              <div className="absolute top-3 bottom-0 left-1 -ml-px w-px bg-gray-200" />
            </div>
            
            <div>
              <p className="text-sm text-gray-900">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-gray-500">
                  {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-medium text-indigo-600">
                  {activity.schoolName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}