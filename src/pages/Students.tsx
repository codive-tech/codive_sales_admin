import React, { useState } from 'react';
import { DataTable } from '../components/interactive/DataTable';
import { Student, CreateStudentData } from '../types';
import AddStudentModal from '../components/students/AddStudentModal';
import EditStudentModal from '../components/students/EditStudentModal';
import SuccessModal from '../components/students/SuccessModal';
import { Edit } from 'lucide-react';

// Mock data for students
const mockStudents: Student[] = [];

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [classTypeFilter, setClassTypeFilter] = useState<'all' | 'group' | 'one2one'>('all');
  const [lastAddedStudentEmail, setLastAddedStudentEmail] = useState('');

  const handleAddStudent = (studentData: CreateStudentData) => {

    const newStudent: Student = {
      id: Date.now().toString(),
      ...studentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setStudents([...students, newStudent]);
    setIsModalOpen(false);
    
    // Show success modal
    setLastAddedStudentEmail(studentData.email);
    setIsSuccessModalOpen(true);
  };

  const handleEditStudent = (studentData: CreateStudentData) => {
    if (selectedStudent) {
      const updatedStudents = students.map(student => 
        student.id === selectedStudent.id 
          ? { 
              ...student, 
              ...studentData, 
              updatedAt: new Date().toISOString() 
            }
          : student
      );
      setStudents(updatedStudents);
      setIsEditModalOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleResetPassword = () => {
    // Here you would typically call an API to send password reset email
    console.log('Sending password reset email to:', lastAddedStudentEmail);
    
    // Show a toast or notification
    alert(`Password reset email sent to ${lastAddedStudentEmail}`);
    
    // Close the success modal
    setIsSuccessModalOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setLastAddedStudentEmail('');
  };

  // Filter students based on class type
  const filteredStudents = students.filter(student => {
    if (classTypeFilter === 'all') return true;
    return student.classType === classTypeFilter;
  });

  const columns = [
    { key: 'fullName' as keyof Student, label: 'Full Name' },
    { 
      key: 'phoneNumber' as keyof Student, 
      label: 'Phone Number',
      render: (value: any, item: Student) => (
        <span>+{item.studentCountryCode} {item.phoneNumber}</span>
      )
    },
    { key: 'email' as keyof Student, label: 'Email' },
    { key: 'birthday' as keyof Student, label: 'Birthday' },
    { key: 'country' as keyof Student, label: 'Country' },
    { key: 'school' as keyof Student, label: 'School' },
    { 
      key: 'classType' as keyof Student, 
      label: 'Class Type',
      render: (value: any, item: Student) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.classType === 'group' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {item.classType === 'group' ? 'Group' : 'One-on-One'}
        </span>
      )
    },
    { key: 'parentName' as keyof Student, label: 'Parent/Guardian' },
    { 
      key: 'parentPhone' as keyof Student, 
      label: 'Parent Phone',
      render: (value: any, item: Student) => (
        <span>+{item.parentCountryCode} {item.parentPhone}</span>
      )
    },
    { key: 'parentEmail' as keyof Student, label: 'Parent Email' },
    { 
      key: 'id' as keyof Student, 
      label: 'Actions',
      render: (value: any, item: Student) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(item);
          }}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
        >
          <Edit className="h-4 w-4" />
          Edit
        </button>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Student
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Filter by Class Type:</label>
          <select
            value={classTypeFilter}
            onChange={(e) => setClassTypeFilter(e.target.value as 'all' | 'group' | 'one2one')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Students</option>
            <option value="group">Group Classes</option>
            <option value="one2one">One-on-One Classes</option>
          </select>
          <span className="text-sm text-gray-500">
            {filteredStudents.length} of {students.length} students
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {filteredStudents.length > 0 ? (
          <DataTable
            data={filteredStudents}
            columns={columns}
          />
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-500 text-lg font-medium">No records found</div>
            <div className="text-gray-400 text-sm mt-2">
              {students.length === 0 
                ? "No students have been added yet." 
                : "No students match the selected filter."
              }
            </div>
          </div>
        )}
      </div>

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStudent(null);
        }}
        onSubmit={handleEditStudent}
        student={selectedStudent}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        studentEmail={lastAddedStudentEmail}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default Students; 