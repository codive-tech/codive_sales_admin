import React from 'react';
import { School } from '../../types';
import { Badge } from '../ui/Badge';
import { format } from 'date-fns';

interface SchoolListProps {
  schools: School[];
  onEdit: (school: School) => void;
}

export function SchoolList({ schools, onEdit }: SchoolListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{school.name}</div>
                    <div className="text-sm text-gray-500">{school.contactEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={school.status}>{school.status}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{school.principalName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(school.enrollmentDate), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(school)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}