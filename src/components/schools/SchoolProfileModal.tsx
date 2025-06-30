import React from 'react';
import { X, Building, User, Phone, Mail, MapPin, BookOpen, Users, Calendar, TrendingUp, ExternalLink } from 'lucide-react';
import { SchoolData } from '../../types/school';
import { SchoolStatusBadge } from './SchoolStatusBadge';
import { SchoolTag } from './SchoolTag';

interface SchoolProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  school?: SchoolData;
}

export function SchoolProfileModal({ isOpen, onClose, school }: SchoolProfileModalProps) {
  if (!isOpen || !school) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStudentGrowthPercentage = () => {
    if (!school.studentGrowth || !school.studentGrowth['2023'] || !school.studentGrowth['2024']) {
      return null;
    }
    const growth = ((school.studentGrowth['2024'] - school.studentGrowth['2023']) / school.studentGrowth['2023']) * 100;
    return growth.toFixed(1);
  };

  const growthPercentage = getStudentGrowthPercentage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <Building className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                {school.name}
              </h2>
              <p className="text-sm text-[#666]">
                School Profile & Details
              </p>
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
          {/* School Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-[#1E2A3B]">School Information</h3>
                <SchoolStatusBadge status={school.status || 'inactive'} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#666]">School Code</label>
                  <p className="text-sm text-[#1E2A3B] font-medium">{school.schoolCode || 'Not assigned'}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#666]">Program Assigned</label>
                  <SchoolTag program={school.course || 'Not Assigned'} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#666]">Total Students</label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#666]" />
                    <span className="text-sm text-[#1E2A3B] font-medium">{school.totalStudents || 0} students</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#666]">Enrollment Date</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#666]" />
                    <span className="text-sm text-[#1E2A3B] font-medium">
                      {formatDate(school.enrollmentDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1E2A3B]">Quick Stats</h3>
              <div className="space-y-3">
                <div className="bg-[#E6F6FB] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-[#00AEEF]" />
                    <span className="text-sm font-medium text-[#1E2A3B]">Student Growth</span>
                  </div>
                  {growthPercentage ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#00AEEF]">
                        +{growthPercentage}%
                      </span>
                      <span className="text-xs text-[#666]">
                        {school.studentGrowth?.['2023']} → {school.studentGrowth?.['2024']}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-[#666]">No growth data available</span>
                  )}
                </div>

                <div className="bg-[#E6F6FB] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-[#00AEEF]" />
                    <span className="text-sm font-medium text-[#1E2A3B]">Active Classes</span>
                  </div>
                  <span className="text-lg font-bold text-[#00AEEF]">
                    {school.section?.filter(s => s.status === 'active').length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#666]">Contact Person</label>
                <p className="text-sm text-[#1E2A3B] font-medium">{school.principalName || 'Not specified'}</p>
                <p className="text-xs text-[#666]">{school.contactPersonRole || 'Not specified'}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#666]">Contact Number</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#666]" />
                  <span className="text-sm text-[#1E2A3B] font-medium">{school.contactNumber || 'Not specified'}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#666]">Email Address</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#666]" />
                  <span className="text-sm text-[#1E2A3B] font-medium">{school.contactEmail}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#666]">Location</label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#666]" />
                  <span className="text-sm text-[#1E2A3B] font-medium">
                    {school.city}, {school.country}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {school.notes && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1E2A3B]">Notes</h3>
              <div className="bg-[#E6F6FB] p-4 rounded-lg">
                <p className="text-sm text-[#1E2A3B] whitespace-pre-wrap">{school.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E0E0E0]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 