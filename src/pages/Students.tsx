import React, { useState } from 'react';
import { Student, CreateStudentData } from '../types';
import { StudentFilters } from '../components/students/StudentFilters';
import { StudentTable } from '../components/students/StudentTable';
import { AddStudentModal } from '../components/students/AddStudentModal';
import { EditStudentModal } from '../components/students/EditStudentModal';
import { StudentProfileModal } from '../components/students/StudentProfileModal';
import { filterData } from '../utils/filters';
import { Plus, Users, Download, GraduationCap, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { generateStudentId, MOCK_SCHOOL_ID } from '../utils/studentUtils';

// Mock data for students with enhanced fields and student IDs
const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'STU-412-G8-1234',
    fullName: 'Aarav Sharma',
    phoneNumber: '9876543210',
    email: 'aarav.sharma@email.com',
    age: 14,
    grade: '8',
    program: 'AI Bootcamp',
    status: 'active',
    paymentStatus: 'paid',
    enrollmentType: 'group',
    leadType: 'Referral',
    notes: 'Excellent progress in AI fundamentals',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    studentId: 'STU-412-G10-5678',
    fullName: 'Zara Patel',
    phoneNumber: '8765432109',
    email: 'zara.patel@email.com',
    age: 16,
    grade: '10',
    program: 'Robotics 101',
    status: 'active',
    paymentStatus: 'unpaid',
    enrollmentType: 'one2one',
    leadType: 'WhatsApp',
    notes: 'Shows great interest in robotics',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    studentId: 'STU-412-G6-9012',
    fullName: 'Rohan Kumar',
    phoneNumber: '7654321098',
    email: 'rohan.kumar@email.com',
    age: 12,
    grade: '6',
    program: 'Coding Fundamentals',
    status: 'completed',
    paymentStatus: 'paid',
    enrollmentType: 'group',
    leadType: 'Website',
    notes: 'Completed course successfully',
    createdAt: '2023-12-01T09:15:00Z',
    updatedAt: '2024-01-10T16:45:00Z'
  },
  {
    id: '4',
    studentId: 'STU-412-G9-3456',
    fullName: 'Ananya Singh',
    phoneNumber: '6543210987',
    email: 'ananya.singh@email.com',
    age: 15,
    grade: '9',
    program: 'Data Science',
    status: 'dropped',
    paymentStatus: 'unpaid',
    enrollmentType: 'one2one',
    leadType: 'Facebook',
    notes: 'Dropped due to schedule conflicts',
    createdAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-25T13:10:00Z'
  },
  {
    id: '5',
    studentId: 'STU-412-G7-7890',
    fullName: 'Vihaan Reddy',
    phoneNumber: '5432109876',
    email: 'vihaan.reddy@email.com',
    age: 13,
    grade: '7',
    program: 'Web Development',
    status: 'active',
    paymentStatus: 'paid',
    enrollmentType: 'group',
    leadType: 'Event',
    notes: 'Making good progress in web development',
    createdAt: '2024-01-12T15:45:00Z',
    updatedAt: '2024-01-12T15:45:00Z'
  }
];

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter students based on all criteria
  const filteredStudents = filterData(
    students,
    searchQuery,
    'fullName',
    ['fullName', 'email']
  ).filter((student) => {
    if (programFilter && student?.program !== programFilter) return false;
    if (statusFilter && student?.status !== statusFilter) return false;
    return true;
  });

  const handleAddStudent = async (studentData: CreateStudentData) => {
    setIsLoading(true);
    try {
      // Generate student ID
      const studentId = generateStudentId(MOCK_SCHOOL_ID, studentData.grade);
      
      const newStudent: Student = {
        id: Date.now().toString(),
        studentId,
        ...studentData,
        status: studentData.status || 'active',
        paymentStatus: studentData.paymentStatus || 'unpaid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setStudents([...students, newStudent]);
      setShowAddModal(false);
      toast.success(`Student ${studentData.fullName} enrolled successfully with ID: ${studentId}`);
    } catch (error) {
      console.error('Error enrolling student:', error);
      toast.error('Failed to enroll student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleUpdateStudent = async (studentData: CreateStudentData & { status?: 'active' | 'completed' | 'dropped'; paymentStatus?: 'paid' | 'unpaid' | 'pending' }) => {
    if (!selectedStudent) return;
    
    setIsLoading(true);
    try {
      const updatedStudent: Student = {
        ...selectedStudent,
        ...studentData,
        updatedAt: new Date().toISOString()
      };
      
      setStudents(students.map(s => s.id === selectedStudent.id ? updatedStudent : s));
      setShowEditModal(false);
      setSelectedStudent(undefined);
      toast.success(`Student ${studentData.fullName} updated successfully!`);
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const handleReassignStudent = (student: Student) => {
    setSelectedStudent(student);
    // For now, we'll just show a toast. You can implement reassign modal later
    toast.info('Program reassignment will be implemented soon!');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setProgramFilter('');
    setStatusFilter('');
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Student ID', 'Student Name', 'Age', 'Grade', 'Program', 'Lead Type', 'Status', 'Payment Status', 'Enrollment Status', 'Email', 'Phone', 'Enrollment Mode'],
      ...filteredStudents.map(student => [
        student.studentId || 'N/A',
        student.fullName || '',
        student.age?.toString() || 'N/A',
        `Grade ${student.grade || 'N/A'}`,
        student.program || 'Not Assigned',
        student.leadType || 'Not specified',
        student.status || '',
        student.paymentStatus || '',
        student.status || '',
        student.email || '',
        student.phoneNumber || '',
        student.enrollmentType === 'group' ? 'Group Class' : 'One-to-One Class'
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Students data exported successfully!');
  };

  // Calculate statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const completedStudents = students.filter(s => s.status === 'completed').length;
  const unpaidStudents = students.filter(s => s.paymentStatus === 'unpaid').length;
  const paidStudents = students.filter(s => s.paymentStatus === 'paid').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#E6F6FB] rounded-lg">
              <GraduationCap className="h-6 w-6 text-[#00AEEF]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1E2A3B]">Student Management</h1>
              <p className="text-sm text-[#666] mt-1">
                {filteredStudents.length} of {totalStudents} students
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Enroll Student
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-[#E0E0E0]">
          <div className="bg-[#E6F6FB] rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#00AEEF]" />
              <span className="text-sm font-medium text-[#1E2A3B]">Total</span>
            </div>
            <p className="text-2xl font-bold text-[#1E2A3B] mt-1">{totalStudents}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#49c57a]"></div>
              <span className="text-sm font-medium text-[#1E2A3B]">Active</span>
            </div>
            <p className="text-2xl font-bold text-[#49c57a] mt-1">{activeStudents}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#00AEEF]"></div>
              <span className="text-sm font-medium text-[#1E2A3B]">Completed</span>
            </div>
            <p className="text-2xl font-bold text-[#00AEEF] mt-1">{completedStudents}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#49c57a]"></div>
              <span className="text-sm font-medium text-[#1E2A3B]">Paid</span>
            </div>
            <p className="text-2xl font-bold text-[#49c57a] mt-1">{paidStudents}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#FFD600]"></div>
              <span className="text-sm font-medium text-[#1E2A3B]">Unpaid</span>
            </div>
            <p className="text-2xl font-bold text-[#FFD600] mt-1">{unpaidStudents}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <StudentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        programFilter={programFilter}
        onProgramChange={setProgramFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Student Table */}
      <StudentTable
        students={filteredStudents}
        onEdit={handleEditStudent}
        onView={handleViewStudent}
        onReassign={handleReassignStudent}
      />

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStudent}
        isLoading={isLoading}
      />

      {/* Edit Student Modal */}
      <EditStudentModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedStudent(undefined);
        }}
        onSubmit={handleUpdateStudent}
        student={selectedStudent}
        isLoading={isLoading}
      />

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedStudent(undefined);
        }}
        student={selectedStudent}
      />
    </div>
  );
};

export default Students; 