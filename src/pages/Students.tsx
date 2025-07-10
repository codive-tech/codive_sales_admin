import React, { useState } from 'react';
import { Student, CreateStudentData, GroupEnrollmentData } from '../types';
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
    groupId: 'GRP-AIB-123',
    groupMemberIndex: 1,
    // Pricing data
    packagePrice: 9600,
    basePrice: 12000,
    discountPercent: 20,
    currency: 'INR',
    currencySymbol: '₹',
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
    // Pricing data
    packagePrice: 18000,
    basePrice: 18000,
    discountPercent: 0,
    currency: 'INR',
    currencySymbol: '₹',
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
    program: 'Junior-Intermediate',
    status: 'completed',
    paymentStatus: 'paid',
    enrollmentType: 'group',
    leadType: 'Website',
    notes: 'Completed course successfully',
    groupId: 'GRP-JNI-789',
    groupMemberIndex: 1,
    // Pricing data
    packagePrice: 6000,
    basePrice: 6000,
    discountPercent: 0,
    currency: 'INR',
    currencySymbol: '₹',
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
    // Pricing data
    packagePrice: 13500,
    basePrice: 15000,
    discountPercent: 10,
    currency: 'INR',
    currencySymbol: '₹',
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
    groupId: 'GRP-WBD-456',
    groupMemberIndex: 1,
    // Pricing data
    packagePrice: 8100,
    basePrice: 9000,
    discountPercent: 10,
    currency: 'INR',
    currencySymbol: '₹',
    createdAt: '2024-01-12T15:45:00Z',
    updatedAt: '2024-01-12T15:45:00Z'
  },
  // Group class students for testing
  {
    id: '6',
    studentId: 'STU-412-G8-1111',
    fullName: 'Priya Mehta',
    phoneNumber: '9876543211',
    email: 'priya.mehta@email.com',
    age: 14,
    grade: '8',
    program: 'AI Bootcamp',
    status: 'active',
    paymentStatus: 'paid',
    enrollmentType: 'group',
    leadType: 'Referral',
    notes: 'Part of AI Bootcamp group',
    groupId: 'GRP-AIB-123',
    groupMemberIndex: 2,
    // Pricing data (same as group leader)
    packagePrice: 9600,
    basePrice: 12000,
    discountPercent: 20,
    currency: 'INR',
    currencySymbol: '₹',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    studentId: 'STU-412-G8-2222',
    fullName: 'Arjun Singh',
    phoneNumber: '9876543212',
    email: 'arjun.singh@email.com',
    age: 14,
    grade: '8',
    program: 'AI Bootcamp',
    status: 'active',
    paymentStatus: 'paid',
    enrollmentType: 'group',
    leadType: 'Referral',
    notes: 'Part of AI Bootcamp group',
    groupId: 'GRP-AIB-123',
    groupMemberIndex: 3,
    // Pricing data (same as group leader)
    packagePrice: 9600,
    basePrice: 12000,
    discountPercent: 20,
    currency: 'INR',
    currencySymbol: '₹',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    studentId: 'STU-412-G8-3333',
    fullName: 'Kavya Patel',
    phoneNumber: '9876543213',
    email: 'kavya.patel@email.com',
    age: 15,
    grade: '8',
    program: 'AI Bootcamp',
    status: 'active',
    paymentStatus: 'paid',
    enrollmentType: 'group',
    leadType: 'Referral',
    notes: 'Part of AI Bootcamp group',
    groupId: 'GRP-AIB-123',
    groupMemberIndex: 4,
    // Pricing data (same as group leader)
    packagePrice: 9600,
    basePrice: 12000,
    discountPercent: 20,
    currency: 'INR',
    currencySymbol: '₹',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '9',
    studentId: 'STU-412-G9-4444',
    fullName: 'Riya Sharma',
    phoneNumber: '9876543214',
    email: 'riya.sharma@email.com',
    age: 15,
    grade: '9',
    program: 'Robotics Junior',
    status: 'active',
    paymentStatus: 'unpaid',
    enrollmentType: 'group',
    leadType: 'WhatsApp',
    notes: 'Part of Robotics Junior group',
    groupId: 'GRP-RBJ-456',
    groupMemberIndex: 1,
    // Pricing data
    packagePrice: 7200,
    basePrice: 8000,
    discountPercent: 10,
    currency: 'INR',
    currencySymbol: '₹',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '10',
    studentId: 'STU-412-G9-5555',
    fullName: 'Aditya Kumar',
    phoneNumber: '9876543215',
    email: 'aditya.kumar@email.com',
    age: 15,
    grade: '9',
    program: 'Robotics Junior',
    status: 'active',
    paymentStatus: 'unpaid',
    enrollmentType: 'group',
    leadType: 'WhatsApp',
    notes: 'Part of Robotics Junior group',
    groupId: 'GRP-RBJ-456',
    groupMemberIndex: 2,
    // Pricing data (same as group leader)
    packagePrice: 7200,
    basePrice: 8000,
    discountPercent: 10,
    currency: 'INR',
    currencySymbol: '₹',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
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
  const [enrollmentModeFilter, setEnrollmentModeFilter] = useState('');
  const [idTypeFilter, setIdTypeFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter students based on all criteria
  const filteredStudents = filterData(
    students,
    searchQuery,
    'fullName',
    ['fullName', 'email']
  ).filter((student) => {
    if (programFilter && student?.program !== programFilter) return false;
    if (enrollmentModeFilter && student?.enrollmentType !== enrollmentModeFilter) return false;
    if (idTypeFilter) {
      if (idTypeFilter === 'group' && student?.enrollmentType !== 'group') return false;
      if (idTypeFilter === 'student' && student?.enrollmentType !== 'one2one') return false;
    }
    return true;
  });

  const handleAddStudent = async (studentData: CreateStudentData | GroupEnrollmentData) => {
    setIsLoading(true);
    try {
      if ('groupId' in studentData) {
        // Handle group enrollment
        const groupEnrollmentData = studentData as GroupEnrollmentData;
        const newStudents: Student[] = [];

        // Create individual student records for each group member
        groupEnrollmentData.students.forEach((groupStudent, index) => {
          const studentId = generateStudentId(MOCK_SCHOOL_ID, groupStudent.grade);
          
          const newStudent: Student = {
            id: Date.now().toString() + index,
            studentId,
            fullName: groupStudent.fullName,
            phoneNumber: groupStudent.phoneNumber,
            email: '', // Group students don't have email in the form
            age: groupStudent.age,
            grade: groupStudent.grade,
            program: groupEnrollmentData.program,
            status: groupEnrollmentData.status,
            paymentStatus: groupEnrollmentData.paymentStatus,
            enrollmentType: 'group',
            leadType: groupEnrollmentData.leadType as any,
            notes: groupEnrollmentData.notes,
            // Group class fields
            groupId: groupEnrollmentData.groupId,
            groupMemberIndex: index + 1,
            // Pricing data from group enrollment
            packagePrice: groupEnrollmentData.packagePrice,
            basePrice: groupEnrollmentData.basePrice,
            discountPercent: groupEnrollmentData.discountPercent,
            currency: groupEnrollmentData.currency,
            currencySymbol: groupEnrollmentData.currencySymbol,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          newStudents.push(newStudent);
        });

        setStudents([...students, ...newStudents]);
        setShowAddModal(false);
        toast.success(`${newStudents.length} students enrolled successfully in group ${groupEnrollmentData.groupId}!`);
      } else {
        // Handle individual enrollment
        const individualStudentData = studentData as CreateStudentData;
        const studentId = generateStudentId(MOCK_SCHOOL_ID, individualStudentData.grade);
        
        const newStudent: Student = {
          id: Date.now().toString(),
          studentId,
          ...individualStudentData,
          status: individualStudentData.status || 'active',
          paymentStatus: individualStudentData.paymentStatus || 'unpaid',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setStudents([...students, newStudent]);
        setShowAddModal(false);
        toast.success(`Student ${individualStudentData.fullName} enrolled successfully with ID: ${studentId}`);
      }
    } catch (error) {
      console.error('Error enrolling student(s):', error);
      toast.error('Failed to enroll student(s). Please try again.');
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

  const handleProgramReassign = async (studentId: string, newProgram: string) => {
    setIsLoading(true);
    try {
      // Update the student's program in the local state
      setStudents(students.map(student => 
        student.id === studentId 
          ? { ...student, program: newProgram, updatedAt: new Date().toISOString() }
          : student
      ));
      
      // Show success toast
      toast.success('Student program reassigned successfully');
      
      // Optional: Add a brief highlight effect to the updated row
      // This could be implemented with a temporary CSS class or state
      
    } catch (error) {
      console.error('Error reassigning program:', error);
      toast.error('Failed to reassign program. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setProgramFilter('');
    setEnrollmentModeFilter('');
    setIdTypeFilter('');
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Student ID', 'Student Name', 'Age', 'Grade', 'Program', 'Lead Type', 'Status', 'Payment Status', 'Enrollment Mode', 'Package Price', 'Base Price', 'Discount %', 'Currency', 'Email', 'Phone'],
      ...filteredStudents.map(student => [
        student.studentId || 'N/A',
        student.fullName || '',
        student.age?.toString() || 'N/A',
        `Grade ${student.grade || 'N/A'}`,
        student.program || 'Not Assigned',
        student.leadType || 'Not specified',
        student.status || '',
        student.paymentStatus || '',
        student.enrollmentType === 'group' ? 'Group Class' : 'One-to-One Class',
        student.packagePrice ? `${student.currencySymbol || '₹'}${student.packagePrice.toLocaleString()}` : 'Not set',
        student.basePrice ? `${student.currencySymbol || '₹'}${student.basePrice.toLocaleString()}` : 'Not set',
        student.discountPercent ? `${student.discountPercent}%` : '0%',
        student.currency || 'INR',
        student.email || '',
        student.phoneNumber || ''
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
      <div className="bg-white rounded-2xl shadow-sm border border-[#E0E0E0] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#EAF6FF] rounded-lg">
              <GraduationCap className="h-6 w-6 text-[#0481FF]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#003C64]">Student Management</h1>
              <p className="text-sm text-[#5D6D7E] mt-1">
                {filteredStudents.length} of {totalStudents} students
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 text-[#5D6D7E] border border-[#E0E0E0] rounded-xl hover:bg-[#EAF6FF] transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#FF9A2C] text-white rounded-full hover:bg-[#E68A1A] transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              Enroll Student
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-[#E0E0E0]">
          <div className="bg-[#EAF6FF] rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#0481FF]" />
              <span className="text-sm font-medium text-[#003C64]">Total</span>
            </div>
            <p className="text-2xl font-bold text-[#003C64] mt-1">{totalStudents}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#49c57a]"></div>
              <span className="text-sm font-medium text-[#003C64]">Active</span>
            </div>
            <p className="text-2xl font-bold text-[#49c57a] mt-1">{activeStudents}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#0481FF]"></div>
              <span className="text-sm font-medium text-[#003C64]">Completed</span>
            </div>
            <p className="text-2xl font-bold text-[#0481FF] mt-1">{completedStudents}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#49c57a]"></div>
              <span className="text-sm font-medium text-[#003C64]">Paid</span>
            </div>
            <p className="text-2xl font-bold text-[#49c57a] mt-1">{paidStudents}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#FFD600]"></div>
              <span className="text-sm font-medium text-[#003C64]">Unpaid</span>
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
        enrollmentModeFilter={enrollmentModeFilter}
        onEnrollmentModeChange={setEnrollmentModeFilter}
        idTypeFilter={idTypeFilter}
        onIdTypeChange={setIdTypeFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Student Table */}
      <StudentTable
        students={filteredStudents}
        onEdit={handleEditStudent}
        onView={handleViewStudent}
        onReassign={handleReassignStudent}
        onProgramReassign={handleProgramReassign}
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