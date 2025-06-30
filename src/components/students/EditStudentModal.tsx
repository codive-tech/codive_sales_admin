import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, GraduationCap, BookOpen, Building, FileText, Edit, RefreshCw } from 'lucide-react';
import { Student, CreateStudentData } from '../../types';
import { StudentStatusBadge, PaymentStatusBadge, EnrollmentTypeBadge } from './StudentStatusBadge';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentData) => void;
  student?: Student;
  isLoading?: boolean;
}

const grades = [
  { label: 'Select Grade', value: '' },
  { label: 'Grade 1', value: '1' },
  { label: 'Grade 2', value: '2' },
  { label: 'Grade 3', value: '3' },
  { label: 'Grade 4', value: '4' },
  { label: 'Grade 5', value: '5' },
  { label: 'Grade 6', value: '6' },
  { label: 'Grade 7', value: '7' },
  { label: 'Grade 8', value: '8' },
  { label: 'Grade 9', value: '9' },
  { label: 'Grade 10', value: '10' },
  { label: 'Grade 11', value: '11' },
  { label: 'Grade 12', value: '12' }
];

const programs = [
  { label: 'Select Program', value: '' },
  { label: 'AI Bootcamp', value: 'AI Bootcamp' },
  { label: 'Robotics 101', value: 'Robotics 101' },
  { label: 'Coding Fundamentals', value: 'Coding Fundamentals' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Web Development', value: 'Web Development' },
  { label: 'Mobile App Development', value: 'Mobile App Development' }
];

const schools = [
  { label: 'Direct Enrollment (B2C)', value: '' },
  { label: 'Delhi Public School', value: 'Delhi Public School' },
  { label: 'St. Mary\'s Academy', value: 'St. Mary\'s Academy' },
  { label: 'Modern School', value: 'Modern School' },
  { label: 'Kendriya Vidyalaya', value: 'Kendriya Vidyalaya' },
  { label: 'DPS International', value: 'DPS International' },
  { label: 'The British School', value: 'The British School' },
  { label: 'American Embassy School', value: 'American Embassy School' }
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Dropped', value: 'dropped' }
];

const paymentStatusOptions = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Pending', value: 'pending' }
];

export function EditStudentModal({ isOpen, onClose, onSubmit, student, isLoading = false }: EditStudentModalProps) {
  const [formData, setFormData] = useState<CreateStudentData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    grade: '',
    program: '',
    school: '',
    enrollmentType: 'b2c',
    notes: ''
  });

  const [status, setStatus] = useState<'active' | 'completed' | 'dropped'>('active');
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid' | 'pending'>('unpaid');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when student data changes
  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || '',
        phoneNumber: student.phoneNumber || '',
        email: student.email || '',
        grade: student.grade || '',
        program: student.program || '',
        school: student.school || '',
        enrollmentType: student.enrollmentType || 'b2c',
        notes: student.notes || ''
      });
      setStatus(student.status || 'active');
      setPaymentStatus(student.paymentStatus || 'unpaid');
    }
  }, [student]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.grade?.trim()) {
      newErrors.grade = 'Grade is required';
    }

    if (!formData.program?.trim()) {
      newErrors.program = 'Program is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Include status and payment status in the submission
      const submissionData = {
        ...formData,
        status,
        paymentStatus
      };
      onSubmit(submissionData);
    }
  };

  const handleInputChange = (field: keyof CreateStudentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      grade: '',
      program: '',
      school: '',
      enrollmentType: 'b2c',
      notes: ''
    });
    setStatus('active');
    setPaymentStatus('unpaid');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <Edit className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                Edit Student
              </h2>
              <p className="text-sm text-[#666]">
                Update information for {student?.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Status Display */}
        {student && (
          <div className="p-6 bg-gray-50 border-b border-[#E0E0E0]">
            <h3 className="text-sm font-medium text-[#1E2A3B] mb-3">Current Status</h3>
            <div className="flex items-center gap-4">
              <StudentStatusBadge status={student.status || 'active'} size="md" />
              <PaymentStatusBadge status={student.paymentStatus || 'unpaid'} size="md" />
              <EnrollmentTypeBadge type={student.enrollmentType || 'b2c'} size="md" />
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <User className="h-4 w-4" />
              Student Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.fullName ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter student's full name"
                />
                {errors.fullName && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Grade *
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.grade ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                >
                  {grades.map(grade => (
                    <option key={grade.value} value={grade.value}>
                      {grade.label}
                    </option>
                  ))}
                </select>
                {errors.grade && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.grade}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.phoneNumber ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.email ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Program & School */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Program & School
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Assigned Program *
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.program ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                >
                  {programs.map(program => (
                    <option key={program.value} value={program.value}>
                      {program.label}
                    </option>
                  ))}
                </select>
                {errors.program && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.program}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  School (Optional)
                </label>
                <select
                  value={formData.school}
                  onChange={(e) => handleInputChange('school', e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                >
                  {schools.map(school => (
                    <option key={school.value} value={school.value}>
                      {school.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Enrollment Type */}
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Enrollment Type
              </label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="enrollmentType"
                    value="b2c"
                    checked={formData.enrollmentType === 'b2c'}
                    onChange={(e) => handleInputChange('enrollmentType', e.target.value)}
                    className="text-[#00AEEF] focus:ring-[#00AEEF]"
                  />
                  <span className="text-sm text-[#1E2A3B]">B2C (Direct)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="enrollmentType"
                    value="b2b"
                    checked={formData.enrollmentType === 'b2b'}
                    onChange={(e) => handleInputChange('enrollmentType', e.target.value)}
                    className="text-[#00AEEF] focus:ring-[#00AEEF]"
                  />
                  <span className="text-sm text-[#1E2A3B]">B2B (School)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Status Management
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Enrollment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'active' | 'completed' | 'dropped')}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as 'paid' | 'unpaid' | 'pending')}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                >
                  {paymentStatusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Additional Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Notes (Internal Only)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                placeholder="Add any internal notes about the student..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E0E0E0]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 