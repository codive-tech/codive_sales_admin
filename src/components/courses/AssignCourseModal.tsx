import React from 'react';
import { X } from 'lucide-react';
import type { School } from '../../types';
import type { CourseLevel } from '../../data/courseData';

interface AssignCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseLevel;
  school: School;
  onAssign: (masterKey: string) => void;
}

export function AssignCourseModal({ isOpen, onClose, course, school, onAssign }: AssignCourseModalProps) {
  const [masterKey, setMasterKey] = React.useState('');
  const [error, setError] = React.useState('');

  if (!isOpen || !school || !course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!masterKey) {
      setError('Master key is required');
      return;
    }
    onAssign(masterKey);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign Course
            </h3>

            <div className="mb-4">
              <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-900">Course: {course.name}</p>
                <p className="text-sm text-gray-600">{course.grades}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900">School: {school.name}</p>
                <p className="text-sm text-gray-600">Principal: {school.principalName}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Master Key
                </label>
                <input
                  type="password"
                  value={masterKey}
                  onChange={(e) => {
                    setMasterKey(e.target.value);
                    setError('');
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter master key"
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Assign Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}