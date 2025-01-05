import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { CourseCard } from '../components/courses/CourseCard';
import { SchoolSearch } from '../components/courses/SchoolSearch';
import { AssignCourseModal } from '../components/courses/AssignCourseModal';
import { AssignmentOptions } from '../components/courses/AssignmentOptions';
import { SchoolStatus } from '../components/courses/SchoolStatus';
import { CreateProgramModal } from '../components/courses/CreateProgramModal';
import { courseLevels } from '../data/courseData';
import type { CourseLevel } from '../data/courseData';
import type { School } from '../types';

// Mock schools for demo
const mockSchools: School[] = [
  {
    id: '1',
    name: 'Springfield Elementary',
    principalName: 'John Smith',
    contactEmail: 'john@springfield.edu',
    contactPhone: '555-0123',
    address: '123 School St',
    status: 'active',
    enrollmentDate: '2024-01-01',
    agreementEndDate: '2025-01-01',
    coursesEnrolled: []
  }
];

export default function Courses() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseLevel | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  const handleAssignCourse = (course: CourseLevel) => {
    if (!selectedSchool) {
      alert('Please select a school first');
      return;
    }
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCreateProgram = (programData: any) => {
    console.log('Creating custom program:', programData);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Programs</h1>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive learning programs for different grade levels
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="h-4 w-4" />
          Create Custom Program
        </button>
      </div>

      <SchoolSearch
        schools={mockSchools}
        onSelect={setSelectedSchool}
        selectedSchool={selectedSchool}
      />

      {selectedSchool && (
        <SchoolStatus
          school={selectedSchool}
          isOnHold={isOnHold}
          holdUntil="2024-12-31"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseLevels.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onAssign={handleAssignCourse}
          />
        ))}
      </div>

      {selectedSchool && selectedCourse && (
        <AssignmentOptions
          school={selectedSchool}
          onAssign={() => setShowModal(true)}
          onHold={() => setIsOnHold(!isOnHold)}
          isOnHold={isOnHold}
        />
      )}

      {selectedSchool && selectedCourse && showModal && (
        <AssignCourseModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
          school={selectedSchool}
          onAssign={(masterKey) => {
            console.log('Assigning course with key:', masterKey);
            setShowModal(false);
            setSelectedCourse(null);
          }}
        />
      )}

      <CreateProgramModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateProgram={handleCreateProgram}
      />
    </div>
  );
}