import React from 'react';

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  enrolledSchools: number;
}

interface CourseListProps {
  courses: Course[];
  onAssign: (course: Course) => void;
}

export function CourseList({ courses, onAssign }: CourseListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <div>Duration: {course.duration}</div>
              <div>Schools: {course.enrolledSchools}</div>
            </div>
            <button
              onClick={() => onAssign(course)}
              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
            >
              Assign Course
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}