import React from 'react';
import { X, User, Phone, Mail, GraduationCap, BookOpen, Calendar, FileText, Users, MapPin, Clock, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { Student } from '../../types';
import { StudentStatusBadge, PaymentStatusBadge, EnrollmentTypeBadge } from './StudentStatusBadge';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: Student;
}

export function StudentProfileModal({ isOpen, onClose, student }: StudentProfileModalProps) {
  if (!isOpen || !student) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEnrollmentDuration = () => {
    if (!student.createdAt) return 'N/A';
    const created = new Date(student.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const getProgressPercentage = () => {
    // Mock progress based on status
    switch (student.status) {
      case 'completed': return 100;
      case 'dropped': return 25;
      case 'active': return 65;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <User className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">Student Profile</h2>
              <p className="text-sm text-[#666]">Detailed information about {student.fullName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Overview */}
          <div className="bg-gradient-to-r from-[#E6F6FB] to-[#D0F0FA] rounded-lg p-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-[#00AEEF] flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {student.fullName?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1E2A3B] mb-2">{student.fullName}</h3>
                <p className="text-[#666] mb-3">{student.email}</p>
                <div className="flex items-center gap-3">
                  <StudentStatusBadge status={student.status || 'active'} size="md" />
                  <PaymentStatusBadge status={student.paymentStatus || 'unpaid'} size="md" />
                  <EnrollmentTypeBadge type={student.enrollmentType || 'b2c'} size="md" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#666]">Enrolled for</div>
                <div className="text-lg font-semibold text-[#1E2A3B]">{getEnrollmentDuration()}</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-[#1E2A3B]">Course Progress</h4>
              <span className="text-sm text-[#666]">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#00AEEF] h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </h4>
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="h-4 w-4 text-[#666]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Full Name</p>
                    <p className="font-medium text-[#1E2A3B]">{student.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Phone className="h-4 w-4 text-[#666]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Phone Number</p>
                    <p className="font-medium text-[#1E2A3B]">
                      {student.studentCountryCode && `+${student.studentCountryCode} `}{student.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Mail className="h-4 w-4 text-[#666]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Email Address</p>
                    <p className="font-medium text-[#1E2A3B]">{student.email}</p>
                  </div>
                </div>
                {student.birthday && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-[#666]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Date of Birth</p>
                      <p className="font-medium text-[#1E2A3B]">{formatDate(student.birthday)}</p>
                    </div>
                  </div>
                )}
                {student.country && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-[#666]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Country</p>
                      <p className="font-medium text-[#1E2A3B]">{student.country}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Academic Information
              </h4>
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <GraduationCap className="h-4 w-4 text-[#666]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Grade</p>
                    <p className="font-medium text-[#1E2A3B]">Grade {student.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <BookOpen className="h-4 w-4 text-[#666]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Program</p>
                    <p className="font-medium text-[#1E2A3B]">{student.program || 'Not Assigned'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users className="h-4 w-4 text-[#666]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">School</p>
                    <p className="font-medium text-[#1E2A3B]">{student.school || 'Direct Enrollment'}</p>
                  </div>
                </div>
                {student.classType && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Users className="h-4 w-4 text-[#666]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Class Type</p>
                      <p className="font-medium text-[#1E2A3B]">
                        {student.classType === 'group' ? 'Group Class' : 'One-on-One'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          {student.parentName && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                <User className="h-4 w-4" />
                Parent/Guardian Information
              </h4>
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#666]">Name</p>
                    <p className="font-medium text-[#1E2A3B]">{student.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Phone</p>
                    <p className="font-medium text-[#1E2A3B]">
                      {student.parentCountryCode && `+${student.parentCountryCode} `}{student.parentPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Email</p>
                    <p className="font-medium text-[#1E2A3B]">{student.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666]">Relation</p>
                    <p className="font-medium text-[#1E2A3B]">{student.relation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enrollment Timeline */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Enrollment Timeline
            </h4>
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#00AEEF] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E2A3B]">Enrolled</p>
                    <p className="text-sm text-[#666]">{formatDate(student.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#49c57a] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E2A3B]">Program Started</p>
                    <p className="text-sm text-[#666]">{formatDate(student.createdAt)}</p>
                  </div>
                </div>
                {student.status === 'completed' && (
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#49c57a] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E2A3B]">Course Completed</p>
                      <p className="text-sm text-[#666]">{formatDate(student.updatedAt)}</p>
                    </div>
                  </div>
                )}
                {student.status === 'dropped' && (
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#f55a5a] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1E2A3B]">Course Dropped</p>
                      <p className="text-sm text-[#666]">{formatDate(student.updatedAt)}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E2A3B]">Last Updated</p>
                    <p className="text-sm text-[#666]">{formatDate(student.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {student.notes && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Additional Notes
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-[#1E2A3B]">{student.notes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E0E0E0]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 