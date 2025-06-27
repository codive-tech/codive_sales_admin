import React, { useState } from 'react';
import { DataTable } from '../components/interactive/DataTable';
import { Student, CreateStudentData } from '../types';
import AddStudentModal from '../components/students/AddStudentModal';
import EditStudentModal from '../components/students/EditStudentModal';
import { Edit } from 'lucide-react';

// Mock data for students
const mockStudents: Student[] = [
];

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleAddStudent = (studentData: CreateStudentData) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      ...studentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setStudents([...students, newStudent]);
    setIsModalOpen(false);
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

  const columns = [
    { key: 'fullName' as keyof Student, label: 'Full Name' },
    { key: 'phoneNumber' as keyof Student, label: 'Phone Number' },
    { key: 'email' as keyof Student, label: 'Email' },
    { key: 'birthday' as keyof Student, label: 'Birthday' },
    { key: 'country' as keyof Student, label: 'Country' },
    { key: 'school' as keyof Student, label: 'School' },
    { key: 'parentName' as keyof Student, label: 'Parent/Guardian' },
    { key: 'parentPhone' as keyof Student, label: 'Parent Phone' },
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

      <div className="bg-white rounded-lg shadow">
        {students.length > 0 ? (
          <DataTable
            data={students}
            columns={columns}
          />
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-500 text-lg font-medium">No records found</div>
            <div className="text-gray-400 text-sm mt-2">No students have been added yet.</div>
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
    </div>
  );
};

export default Students; 