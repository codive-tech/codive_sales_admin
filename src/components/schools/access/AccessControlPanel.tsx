import React from 'react';
import { Shield, AlertTriangle, Clock } from 'lucide-react';
import type { School } from '../../../types';
import type { SchoolAccess } from '../../../types/school';

interface AccessControlPanelProps {
  school: School;
  access: SchoolAccess;
  onUpdateAccess: (access: Partial<SchoolAccess>) => void;
  onSuspend: () => void;
}

export function AccessControlPanel({ school, access, onUpdateAccess, onSuspend }: AccessControlPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Access Control</h3>
        <div className={`px-3 py-1 rounded-full text-sm ${
          access.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {access.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-gray-900">Access Level</span>
            </div>
            <select
              value={access.accessLevel}
              onChange={(e) => onUpdateAccess({ accessLevel: e.target.value as SchoolAccess['accessLevel'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="full">Full Access</option>
              <option value="restricted">Restricted Access</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-gray-900">Access Duration</span>
            </div>
            <div className="text-sm text-gray-600">
              Valid until: {new Date(school.agreementEndDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={onSuspend}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100"
          >
            <AlertTriangle className="h-5 w-5" />
            Suspend Access
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Suspending access will immediately prevent the school from accessing any resources
          </p>
        </div>
      </div>
    </div>
  );
}