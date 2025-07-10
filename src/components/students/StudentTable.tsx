import React, { useState, useMemo } from 'react';
import { Eye, Edit, RefreshCw, Users, GraduationCap, BookOpen, Phone, Mail, Tag, Hash, MessageCircle, Search, DollarSign } from 'lucide-react';
import { Student } from '../../types';
import { StudentStatusBadge, PaymentStatusBadge, EnrollmentTypeBadge } from './StudentStatusBadge';
import { LeadTypeBadge } from './LeadTypeBadge';
import ReassignProgramModal from './ReassignProgramModal';
import { GroupMembersModal } from './GroupMembersModal';
import { formatPrice } from '../../data/pricingConfig';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
  onReassign: (student: Student) => void;
  onProgramReassign?: (studentId: string, newProgram: string) => void;
}

export function StudentTable({ 
  students, 
  onEdit, 
  onView, 
  onReassign, 
  onProgramReassign 
}: StudentTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isReassigning, setIsReassigning] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedGroupStudents, setSelectedGroupStudents] = useState<Student[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  // Process students to group them and calculate grade ranges
  const processedStudents = useMemo(() => {
    const groupMap = new Map<string, Student[]>();
    const individualStudents: Student[] = [];

    // Group students by groupId
    students.forEach(student => {
      if (student.enrollmentType === 'group' && student.groupId) {
        if (!groupMap.has(student.groupId)) {
          groupMap.set(student.groupId, []);
        }
        groupMap.get(student.groupId)!.push(student);
      } else {
        individualStudents.push(student);
      }
    });

    // Create representative entries for groups
    const groupRepresentatives: Student[] = [];
    groupMap.forEach((groupStudents, groupId) => {
      // Sort by groupMemberIndex to get the first student
      const sortedStudents = groupStudents.sort((a, b) => 
        (a.groupMemberIndex || 0) - (b.groupMemberIndex || 0)
      );
      const representative = sortedStudents[0];
      
      // Calculate grade range
      const grades = groupStudents.map(s => parseInt(s.grade)).sort((a, b) => a - b);
      const minGrade = Math.min(...grades);
      const maxGrade = Math.max(...grades);
      const gradeRange = minGrade === maxGrade ? `G${minGrade}` : `G${minGrade}–G${maxGrade}`;
      
      // Get human-friendly label for grade range
      const getGradeRangeLabel = (min: number, max: number) => {
        if (min === max) return null;
        
        if (min >= 1 && max <= 3) return 'Lower Primary';
        if (min >= 4 && max <= 6) return 'Middle School';
        if (min >= 6 && max <= 8) return 'Upper Middle';
        if (min >= 9 && max <= 10) return 'Secondary';
        return 'Mixed Grades';
      };
      
      const gradeRangeLabel = getGradeRangeLabel(minGrade, maxGrade);
      
      // Create detailed tooltip with all grades
      const allGrades = groupStudents.map(s => `G${s.grade}`).sort();
      const tooltipText = minGrade === maxGrade 
        ? `Grade G${minGrade}`
        : `Grades: ${allGrades.join(', ')}${gradeRangeLabel ? ` (${gradeRangeLabel})` : ''}`;
      
      // Create enhanced representative with grade range info
      const enhancedRepresentative = {
        ...representative,
        gradeRange,
        gradeRangeLabel,
        gradeRangeTooltip: tooltipText,
        totalGroupMembers: groupStudents.length,
        groupStudents
      };
      
      groupRepresentatives.push(enhancedRepresentative);
    });

    return [...groupRepresentatives, ...individualStudents];
  }, [students]);

  const getSourceBadgeColor = (source: string) => {
    const colors: Record<string, string> = {
      'Facebook': 'bg-blue-100 text-blue-800',
      'Instagram': 'bg-pink-100 text-pink-800',
      'WhatsApp': 'bg-green-100 text-green-800',
      'Google Ads': 'bg-red-100 text-red-800',
      'Event': 'bg-purple-100 text-purple-800',
      'Referral': 'bg-orange-100 text-orange-800',
      'Website': 'bg-indigo-100 text-indigo-800',
      'Manual': 'bg-gray-100 text-gray-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  const handleReassignClick = (student: Student) => {
    setSelectedStudent(student);
    setShowReassignModal(true);
  };

  const handleProgramReassign = async (studentId: string, newProgram: string) => {
    setIsReassigning(true);
    try {
      if (onProgramReassign) {
        await onProgramReassign(studentId, newProgram);
      }
      setShowReassignModal(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error reassigning program:', error);
    } finally {
      setIsReassigning(false);
    }
  };

  const handleCloseReassignModal = () => {
    setShowReassignModal(false);
    setSelectedStudent(null);
  };

  // Helper function to get display ID (Group ID or Student ID)
  const getDisplayId = (student: Student) => {
    if (student.enrollmentType === 'group' && student.groupId) {
      return student.groupId;
    }
    return student.studentId || 'N/A';
  };

  // Helper function to get ID type label
  const getIdTypeLabel = (student: Student) => {
    if (student.enrollmentType === 'group' && student.groupId) {
      return 'Group';
    }
    return 'Student';
  };

  // Helper function to get group tooltip text
  const getGroupTooltip = (student: Student) => {
    if (student.enrollmentType === 'group' && student.groupId && student.program) {
      const memberCount = (student as any).totalGroupMembers || 4;
      return `Group Class – ${memberCount} Students Enrolled in ${student.program}`;
    }
    return '';
  };

  // Helper function to open WhatsApp
  const openWhatsApp = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  // Helper function to open group modal
  const openGroupModal = (student: Student) => {
    if (student.enrollmentType === 'group' && student.groupId) {
      const groupStudents = (student as any).groupStudents || [];
      setSelectedGroupStudents(groupStudents);
      setSelectedGroupId(student.groupId);
      setSelectedProgram(student.program || '');
      setShowGroupModal(true);
    }
  };

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#E0E0E0] p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#EAF6FF] rounded-full flex items-center justify-center">
            <Users className="w-12 h-12 text-[#0481FF]" />
          </div>
          <h3 className="text-lg font-medium text-[#003C64] mb-2">
            No students enrolled yet
          </h3>
          <p className="text-[#5D6D7E] text-sm">
            Start by enrolling your first student to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E0E0E0] overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E0E0E0]">
          <thead className="bg-[#EAF6FF] sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                ID Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                Mode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                Package Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#003C64] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E0E0E0]">
            {processedStudents.map((student) => (
              <tr
                key={student.id}
                className={`hover:bg-[#EAF6FF] transition-all duration-200 cursor-pointer ${
                  hoveredRow === student.id ? 'bg-[#EAF6FF]' : ''
                } ${student.enrollmentType === 'group' ? 'bg-[#FDFEFF]' : ''}`}
                onMouseEnter={() => setHoveredRow(student.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-[#0481FF]" />
                    <div className="flex items-center gap-2">
                      <span 
                        className={`text-sm font-mono px-3 py-1 rounded-full border font-medium ${
                          student.enrollmentType === 'group' 
                            ? 'text-[#0481FF] bg-[#EAF6FF] border-[#0481FF]' 
                            : 'text-[#FF9A2C] bg-[#FFF4E6] border-[#FF9A2C]'
                        }`}
                        title={getGroupTooltip(student)}
                      >
                        {getDisplayId(student)}
                      </span>
                      {student.enrollmentType === 'group' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openGroupModal(student);
                          }}
                          className="p-1 text-[#0481FF] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                          title="View Group Members"
                        >
                          <Search className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-[#0481FF] flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.fullName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-[#003C64]">
                          {student.fullName}
                        </div>
                        {student.enrollmentType === 'group' && (student as any).totalGroupMembers > 1 && (
                          <span className="text-xs bg-[#FFD600] text-[#003C64] px-2 py-1 rounded-full font-medium">
                            +{(student as any).totalGroupMembers - 1} more
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-[#5D6D7E] flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email || 'No email'}
                      </div>
                      {student.phoneNumber && (
                        <div className="text-sm text-[#5D6D7E] flex items-center gap-1 mt-1">
                          <div 
                            className="cursor-pointer hover:text-green-600" 
                            onClick={(e) => {
                              e.stopPropagation();
                              openWhatsApp(student.phoneNumber);
                            }}
                            title="Message via WhatsApp"
                          >
                            <MessageCircle className="h-3 w-3 text-green-500" />
                          </div>
                          {student.phoneNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {student.enrollmentType === 'group' ? (
                      <span 
                        className="text-sm bg-[#3FC6FF] text-white px-3 py-1 rounded-full font-medium"
                        title={(student as any).gradeRangeTooltip || `Grade range for ${(student as any).totalGroupMembers} students`}
                      >
                        {(student as any).gradeRange}
                        {(student as any).gradeRangeLabel && (
                          <span className="ml-1 text-xs opacity-90">
                            ({(student as any).gradeRangeLabel})
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-sm text-[#003C64]">
                        Grade {student.grade || 'N/A'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#5D6D7E]" />
                    <span className="text-sm text-[#003C64]">
                      {student.program || 'Not Assigned'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EnrollmentTypeBadge 
                    type={student.enrollmentType || 'one2one'} 
                    size="sm" 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PaymentStatusBadge 
                    status={student.paymentStatus || 'unpaid'} 
                    size="sm" 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-[#003C64]" />
                    <span className="text-sm text-[#003C64]">
                      {student.packagePrice && student.currency && student.currencySymbol 
                        ? formatPrice(student.packagePrice, student.currency, student.currencySymbol)
                        : student.packagePrice 
                          ? `${student.currencySymbol || '₹'}${student.packagePrice.toLocaleString()}`
                          : 'Not set'
                      }
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(student);
                      }}
                      className="p-1 text-[#0481FF] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(student);
                      }}
                      className="p-1 text-[#5D6D7E] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                      title="Edit Student"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReassignClick(student);
                      }}
                      className="p-1 text-[#FFD600] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                      title="Reassign Program"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stack View */}
      <div className="lg:hidden">
        <div className="p-4 space-y-4">
          {processedStudents.map((student) => (
            <div
              key={student.id}
              className={`bg-white border border-[#E0E0E0] rounded-2xl p-4 hover:shadow-md transition-shadow ${
                student.enrollmentType === 'group' ? 'bg-[#FDFEFF]' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0481FF] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {student.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-[#003C64]">{student.fullName}</h3>
                      {student.enrollmentType === 'group' && (student as any).totalGroupMembers > 1 && (
                        <span className="text-xs bg-[#FFD600] text-[#003C64] px-2 py-1 rounded-full font-medium">
                          +{(student as any).totalGroupMembers - 1} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Hash className="h-3 w-3 text-[#0481FF]" />
                      <span 
                        className={`text-xs font-mono px-2 py-1 rounded-full border font-medium ${
                          student.enrollmentType === 'group' 
                            ? 'text-[#0481FF] bg-[#EAF6FF] border-[#0481FF]' 
                            : 'text-[#FF9A2C] bg-[#FFF4E6] border-[#FF9A2C]'
                        }`}
                        title={getGroupTooltip(student)}
                      >
                        {getDisplayId(student)}
                      </span>
                      {student.enrollmentType === 'group' && (
                        <button
                          onClick={() => openGroupModal(student)}
                          className="p-1 text-[#0481FF] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                          title="View Group Members"
                        >
                          <Search className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onView(student)}
                    className="p-1 text-[#0481FF] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="p-1 text-[#5D6D7E] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleReassignClick(student)}
                    className="p-1 text-[#FFD600] hover:bg-[#EAF6FF] rounded-lg transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[#5D6D7E]">Grade:</span>
                  <span className="ml-1 font-medium">
                    {student.enrollmentType === 'group' ? (
                      <span 
                        className="text-xs bg-[#3FC6FF] text-white px-2 py-1 rounded-full font-medium"
                        title={(student as any).gradeRangeTooltip || `Grade range for ${(student as any).totalGroupMembers} students`}
                      >
                        {(student as any).gradeRange}
                        {(student as any).gradeRangeLabel && (
                          <span className="ml-1 text-xs opacity-90">
                            ({(student as any).gradeRangeLabel})
                          </span>
                        )}
                      </span>
                    ) : (
                      `Grade ${student.grade || 'N/A'}`
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-[#5D6D7E]">Program:</span>
                  <span className="ml-1 font-medium">{student.program || 'Not Assigned'}</span>
                </div>
                <div>
                  <span className="text-[#5D6D7E]">Email:</span>
                  <span className="ml-1 font-medium">{student.email || 'No email'}</span>
                </div>
                <div>
                  <span className="text-[#5D6D7E]">Phone:</span>
                  <span className="ml-1 font-medium flex items-center gap-1">
                    {student.phoneNumber}
                    {student.phoneNumber && (
                      <div 
                        className="cursor-pointer hover:text-green-600" 
                        onClick={() => openWhatsApp(student.phoneNumber)}
                        title="Message via WhatsApp"
                      >
                        <MessageCircle className="h-3 w-3 text-green-500" />
                      </div>
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-[#5D6D7E]">Mode:</span>
                  <span className="ml-1">
                    <EnrollmentTypeBadge 
                      type={student.enrollmentType || 'one2one'} 
                      size="sm" 
                    />
                  </span>
                </div>
                <div>
                  <span className="text-[#5D6D7E]">Package Price:</span>
                  <span className="ml-1 font-medium">
                    <DollarSign className="h-3 w-3 text-[#003C64] inline-block mr-1" />
                    {student.packagePrice && student.currency && student.currencySymbol 
                        ? formatPrice(student.packagePrice, student.currency, student.currencySymbol)
                        : student.packagePrice 
                          ? `${student.currencySymbol || '₹'}${student.packagePrice.toLocaleString()}`
                          : 'Not set'
                      }
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E0E0E0]">
                <PaymentStatusBadge status={student.paymentStatus || 'unpaid'} size="sm" />
                {student.leadType && <LeadTypeBadge leadType={student.leadType} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reassign Program Modal */}
      <ReassignProgramModal
        isOpen={showReassignModal}
        onClose={handleCloseReassignModal}
        student={selectedStudent}
        onReassign={handleProgramReassign}
        isLoading={isReassigning}
      />

      {/* Group Members Modal */}
      <GroupMembersModal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        groupStudents={selectedGroupStudents}
        groupId={selectedGroupId}
        program={selectedProgram}
      />
    </div>
  );
} 