import React, { useState } from 'react';
import { Eye, Edit, RefreshCw, Users, GraduationCap, BookOpen, Phone, Mail } from 'lucide-react';
import { Student } from '../../types';
import { StudentStatusBadge, PaymentStatusBadge, EnrollmentTypeBadge } from './StudentStatusBadge';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
  onReassign: (student: Student) => void;
}

export function StudentTable({ students, onEdit, onView, onReassign }: StudentTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#E6F6FB] rounded-full flex items-center justify-center">
            <Users className="w-12 h-12 text-[#00AEEF]" />
          </div>
          <h3 className="text-lg font-medium text-[#1E2A3B] mb-2">
            No students enrolled yet
          </h3>
          <p className="text-[#666] text-sm">
            Start by enrolling your first student to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E0E0E0]">
          <thead className="bg-[#E6F6FB] sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                School
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E0E0E0]">
            {students.map((student) => (
              <tr
                key={student.id}
                className={`hover:bg-[#E6F6FB] transition-all duration-200 cursor-pointer ${
                  hoveredRow === student.id ? 'bg-[#E6F6FB]' : ''
                }`}
                onMouseEnter={() => setHoveredRow(student.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-[#00AEEF] flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.fullName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[#1E2A3B]">
                        {student.fullName}
                      </div>
                      <div className="text-sm text-[#666] flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#1E2A3B]">
                    Grade {student.grade || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-[#1E2A3B]">
                    <GraduationCap className="h-4 w-4 text-[#666] mr-2" />
                    {student.school || 'Direct Enrollment'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#666]" />
                    <span className="text-sm text-[#1E2A3B]">
                      {student.program || 'Not Assigned'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StudentStatusBadge 
                    status={student.status || 'active'} 
                    size="sm" 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PaymentStatusBadge 
                    status={student.paymentStatus || 'unpaid'} 
                    size="sm" 
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(student);
                      }}
                      className="p-1 text-[#00AEEF] hover:bg-[#E6F6FB] rounded transition-colors"
                      title="View Profile"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(student);
                      }}
                      className="p-1 text-[#666] hover:bg-[#E6F6FB] rounded transition-colors"
                      title="Edit Student"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReassign(student);
                      }}
                      className="p-1 text-[#FFD600] hover:bg-[#E6F6FB] rounded transition-colors"
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
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-[#E0E0E0] rounded-lg p-4 hover:bg-[#E6F6FB] transition-colors duration-150"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#00AEEF] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {student.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1E2A3B]">{student.fullName}</h3>
                    <p className="text-sm text-[#666]">{student.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StudentStatusBadge status={student.status || 'active'} size="sm" />
                  <PaymentStatusBadge status={student.paymentStatus || 'unpaid'} size="sm" />
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Grade:</span>
                  <span className="font-medium text-[#1E2A3B]">
                    Grade {student.grade || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">School:</span>
                  <span className="font-medium text-[#1E2A3B]">
                    {student.school || 'Direct Enrollment'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Program:</span>
                  <span className="font-medium text-[#1E2A3B]">
                    {student.program || 'Not Assigned'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Type:</span>
                  <EnrollmentTypeBadge type={student.enrollmentType || 'b2c'} size="sm" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[#E0E0E0]">
                <button
                  onClick={() => onView(student)}
                  className="p-2 text-[#00AEEF] hover:bg-[#E6F6FB] rounded transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit(student)}
                  className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onReassign(student)}
                  className="p-2 text-[#FFD600] hover:bg-[#E6F6FB] rounded transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 