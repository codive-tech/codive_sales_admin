import React from 'react';
import { BookOpen, Users, Clock } from 'lucide-react';
import type { CourseLevel } from '../../data/courseData';

interface CourseCardProps {
  course: CourseLevel;
  onAssign: (course: CourseLevel) => void;
}

export function CourseCard({ course, onAssign }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
            <p className="text-sm text-indigo-600 font-medium">{course.grades}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {course.classesCount} Classes
          </span>
        </div>
        
        <p className="mt-2 text-sm text-gray-500">{course.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            Duration: {course.duration}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            {course.enrolledSchools} Schools Enrolled
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Subjects</h4>
          <div className="flex flex-wrap gap-2">
            {course.subjects.slice(0, 3).map((subject) => (
              <span
                key={subject}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {subject}
              </span>
            ))}
            {course.subjects.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{course.subjects.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => onAssign(course)}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <BookOpen className="h-4 w-4" />
          Assign Course
        </button>
      </div>
    </div>
  );
}