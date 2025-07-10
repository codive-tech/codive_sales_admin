import React, { useState } from 'react';
import { X, User, Phone, Mail, GraduationCap, BookOpen, Building, FileText, Plus, Hash, Users, Trash2, DollarSign, Percent } from 'lucide-react';
import { CreateStudentData, GroupStudentData, GroupEnrollmentData } from '../../types';
import { generateStudentId, generateGroupId, MOCK_SCHOOL_ID } from '../../utils/studentUtils';
import Input from '../../basic_components/Input';
import CountrySelect from '../CountrySelect';
import GradeSelect from '../GradeSelect';
import RelationSelect from '../RelationSelect';
import ClassTypeToggle from '../../basic_components/ClassTypeToggle';
import { getProgramOptions, getProgramConfig } from '../../data/programConfig';
import { 
  getBasePrice, 
  getCurrencyInfo, 
  calculateFinalPrice, 
  formatPrice, 
  discountOptions 
} from '../../data/pricingConfig';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentData | GroupEnrollmentData) => void;
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

// Use the new program configuration
const programs = getProgramOptions();

const leadTypes = [
  { label: 'Select Lead Type', value: '' },
  { label: 'Referral', value: 'Referral' },
  { label: 'WhatsApp', value: 'WhatsApp' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Website', value: 'Website' },
  { label: 'Event', value: 'Event' },
  { label: 'School Fair', value: 'School Fair' },
  { label: 'Other', value: 'Other' }
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

export function AddStudentModal({ isOpen, onClose, onSubmit, isLoading = false }: AddStudentModalProps) {
  const [formData, setFormData] = useState<CreateStudentData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    age: undefined,
    grade: '',
    program: '',
    enrollmentType: 'group',
    leadType: undefined,
    status: 'active',
    paymentStatus: 'unpaid',
    notes: ''
  });

  // Group class state
  const [groupStudents, setGroupStudents] = useState<GroupStudentData[]>([
    { fullName: '', age: 0, grade: '', phoneNumber: '' }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [groupErrors, setGroupErrors] = useState<Record<string, string>>({});

  // Pricing state
  const [pricingData, setPricingData] = useState({
    country: 'India', // Default country
    basePrice: 0,
    discountPercent: 0,
    finalPrice: 0,
    currency: 'INR',
    currencySymbol: '₹'
  });

  // Generate student ID when grade changes
  const studentId = formData.grade ? generateStudentId(MOCK_SCHOOL_ID, formData.grade) : '';

  // Generate group ID when program changes
  const groupId = formData.program ? generateGroupId(formData.program) : '';

  // Conditional ID generation - only after both mode and program are selected
  const shouldShowId = formData.program && formData.enrollmentType;
  const displayId = shouldShowId ? (formData.enrollmentType === 'group' ? groupId : studentId) : '';

  // Get selected program configuration
  const selectedProgramConfig = formData.program ? getProgramConfig(formData.program) : null;

  // Calculate pricing when program, country, or enrollment type changes
  React.useEffect(() => {
    if (formData.program && formData.enrollmentType && pricingData.country) {
      const basePrice = getBasePrice(pricingData.country, formData.program, formData.enrollmentType);
      const currencyInfo = getCurrencyInfo(pricingData.country);
      const finalPrice = calculateFinalPrice(basePrice, pricingData.discountPercent);
      
      setPricingData(prev => ({
        ...prev,
        basePrice,
        finalPrice,
        currency: currencyInfo?.currency || 'INR',
        currencySymbol: currencyInfo?.symbol || '₹'
      }));
    }
  }, [formData.program, formData.enrollmentType, pricingData.country, pricingData.discountPercent]);

  // Handle pricing changes
  const handlePricingChange = (field: string, value: string | number) => {
    if (field === 'discountPercent' && typeof value === 'number') {
      const finalPrice = calculateFinalPrice(pricingData.basePrice, value);
      setPricingData(prev => ({
        ...prev,
        discountPercent: value,
        finalPrice
      }));
    } else if (field === 'country' && typeof value === 'string' && formData.program && formData.enrollmentType) {
      const basePrice = getBasePrice(value, formData.program, formData.enrollmentType);
      const currencyInfo = getCurrencyInfo(value);
      const finalPrice = calculateFinalPrice(basePrice, pricingData.discountPercent);
      
      setPricingData(prev => ({
        ...prev,
        country: value,
        basePrice,
        finalPrice,
        currency: currencyInfo?.currency || 'INR',
        currencySymbol: currencyInfo?.symbol || '₹'
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.enrollmentType === 'group') {
      // Validate group enrollment
      if (!formData.program?.trim()) {
        newErrors.program = 'Program is required for group enrollment';
      }

      if (!formData.leadType?.trim()) {
        newErrors.leadType = 'Lead type is required';
      }

      // Validate group students
      if (groupStudents.length < 2) {
        newErrors.groupStudents = 'Minimum 2 students required for group enrollment';
      }

      if (groupStudents.length > 6) {
        newErrors.groupStudents = 'Maximum 6 students allowed for group enrollment';
      }

      // Validate each student in group
      const groupStudentErrors: Record<string, string> = {};
      const ages: number[] = [];

      groupStudents.forEach((student, index) => {
        if (!student.fullName?.trim()) {
          groupStudentErrors[`student${index}Name`] = 'Full name is required';
        }

        if (!student.age || student.age < 1) {
          groupStudentErrors[`student${index}Age`] = 'Age is required and must be at least 1';
        } else {
          ages.push(student.age);
        }

        if (!student.grade?.trim()) {
          groupStudentErrors[`student${index}Grade`] = 'Grade is required';
        }

        if (!student.phoneNumber?.trim()) {
          groupStudentErrors[`student${index}Phone`] = 'Phone number is required';
        }
      });

      // Check age gap validation
      if (ages.length > 1) {
        const minAge = Math.min(...ages);
        const maxAge = Math.max(...ages);
        if (maxAge - minAge > 2) {
          newErrors.ageGap = 'Age gap between students must be within ±2 years';
        }
      }

      setGroupErrors(groupStudentErrors);
      if (Object.keys(groupStudentErrors).length > 0) {
        newErrors.groupValidation = 'Please fix student information errors';
      }
    } else {
      // Validate individual enrollment
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

      if (!formData.age || formData.age < 1) {
        newErrors.age = 'Age is required and must be at least 1';
      }

      if (!formData.grade?.trim()) {
        newErrors.grade = 'Grade is required';
      }

      if (!formData.program?.trim()) {
        newErrors.program = 'Program is required';
      }

      if (!formData.leadType?.trim()) {
        newErrors.leadType = 'Lead type is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (formData.enrollmentType === 'group') {
        // Submit group enrollment
        const groupEnrollmentData: GroupEnrollmentData = {
          groupId,
          program: formData.program!,
          totalMembers: groupStudents.length,
          groupEnrollmentDate: new Date().toISOString(),
          students: groupStudents,
          leadType: formData.leadType!,
          status: formData.status!,
          paymentStatus: formData.paymentStatus!,
          notes: formData.notes,
          // Pricing data
          packagePrice: pricingData.finalPrice,
          basePrice: pricingData.basePrice,
          discountPercent: pricingData.discountPercent,
          currency: pricingData.currency,
          currencySymbol: pricingData.currencySymbol
        };
        onSubmit(groupEnrollmentData);
      } else {
        // Submit individual enrollment
        const individualData: CreateStudentData = {
          ...formData,
          // Pricing data
          packagePrice: pricingData.finalPrice,
          basePrice: pricingData.basePrice,
          discountPercent: pricingData.discountPercent,
          currency: pricingData.currency,
          currencySymbol: pricingData.currencySymbol
        };
        onSubmit(individualData);
      }
    }
  };

  const handleInputChange = (field: keyof CreateStudentData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGroupStudentChange = (index: number, field: keyof GroupStudentData, value: string | number) => {
    setGroupStudents(prev => 
      prev.map((student, i) => 
        i === index ? { ...student, [field]: value } : student
      )
    );

    // Clear group errors when user starts typing
    const errorKey = `student${index}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (groupErrors[errorKey]) {
      setGroupErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addGroupStudent = () => {
    if (groupStudents.length < 6) {
      setGroupStudents(prev => [...prev, { fullName: '', age: 0, grade: '', phoneNumber: '' }]);
    }
  };

  const removeGroupStudent = (index: number) => {
    if (groupStudents.length > 1) {
      setGroupStudents(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      age: undefined,
      grade: '',
      program: '',
      enrollmentType: 'group',
      leadType: undefined,
      status: 'active',
      paymentStatus: 'unpaid',
      notes: ''
    });
    setGroupStudents([{ fullName: '', age: 0, grade: '', phoneNumber: '' }]);
    setErrors({});
    setGroupErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <Plus className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                Enroll New Student{formData.enrollmentType === 'group' ? 's' : ''}
              </h2>
              <p className="text-sm text-[#666]">
                {formData.enrollmentType === 'group' 
                  ? `Add new group class (${groupStudents.length} student${groupStudents.length !== 1 ? 's' : ''})`
                  : 'Add a new student to your program'
                }
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Enrollment Mode - Moved to TOP */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Enrollment Mode
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Enrollment Mode *
              </label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="enrollmentType"
                    value="group"
                    checked={formData.enrollmentType === 'group'}
                    onChange={(e) => handleInputChange('enrollmentType', e.target.value)}
                    className="text-[#00AEEF] focus:ring-[#00AEEF]"
                  />
                  <span className="text-sm text-[#1E2A3B]">Group Class</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="enrollmentType"
                    value="one2one"
                    checked={formData.enrollmentType === 'one2one'}
                    onChange={(e) => handleInputChange('enrollmentType', e.target.value)}
                    className="text-[#00AEEF] focus:ring-[#00AEEF]"
                  />
                  <span className="text-sm text-[#1E2A3B]">One-to-One Class</span>
                </label>
              </div>
            </div>
          </div>

          {/* Program & Lead Type - Only show after enrollment mode is selected */}
          {formData.enrollmentType && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Program & Lead Type
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
                  
                  {/* Program Description */}
                  {selectedProgramConfig && (
                    <div className={`mt-3 p-3 rounded-lg border ${selectedProgramConfig.borderColor} ${selectedProgramConfig.bgColor}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-md ${selectedProgramConfig.bgColor}`}>
                          <selectedProgramConfig.icon className={`h-4 w-4 ${selectedProgramConfig.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${selectedProgramConfig.textColor}`}>
                            {formData.program}
                          </p>
                          <p className={`text-xs mt-1 ${selectedProgramConfig.textColor} opacity-80`}>
                            {selectedProgramConfig.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                    Lead Type *
                  </label>
                  <select
                    value={formData.leadType}
                    onChange={(e) => handleInputChange('leadType', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                      errors.leadType ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                    }`}
                  >
                    {leadTypes.map(leadType => (
                      <option key={leadType.value} value={leadType.value}>
                        {leadType.label}
                      </option>
                    ))}
                  </select>
                  {errors.leadType && (
                    <p className="text-sm text-[#f55a5a] mt-1">{errors.leadType}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Individual Student Information (only for one2one) */}
          {formData.enrollmentType === 'one2one' && (
            <>
              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Age *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="25"
                      value={formData.age || ''}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                        errors.age ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                      }`}
                      placeholder="Enter age"
                    />
                    {errors.age && (
                      <p className="text-sm text-[#f55a5a] mt-1">{errors.age}</p>
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
            </>
          )}

          {/* Group Class Details */}
          {formData.enrollmentType === 'group' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Group Class Details
                </h3>
                <button
                  type="button"
                  onClick={addGroupStudent}
                  disabled={groupStudents.length >= 6}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AEEF] text-white text-sm rounded-lg hover:bg-[#0095D9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  Add Student
                </button>
              </div>

              {/* Group validation errors */}
              {errors.groupStudents && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errors.groupStudents}</p>
                </div>
              )}

              {errors.ageGap && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errors.ageGap}</p>
                </div>
              )}

              {/* Group students list */}
              <div className="space-y-4">
                {groupStudents.map((student, index) => (
                  <div key={index} className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E0E0E0]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-[#1E2A3B]">
                        Student {index + 1}
                      </h4>
                      {groupStudents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGroupStudent(index)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#1E2A3B] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={student.fullName}
                          onChange={(e) => handleGroupStudentChange(index, 'fullName', e.target.value)}
                          className={`w-full px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-[#00AEEF] ${
                            groupErrors[`student${index}Name`] ? 'border-red-300' : 'border-[#E0E0E0]'
                          }`}
                          placeholder="Enter full name"
                        />
                        {groupErrors[`student${index}Name`] && (
                          <p className="text-xs text-red-500 mt-1">{groupErrors[`student${index}Name`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#1E2A3B] mb-1">
                          Age *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="25"
                          value={student.age || ''}
                          onChange={(e) => handleGroupStudentChange(index, 'age', parseInt(e.target.value) || 0)}
                          className={`w-full px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-[#00AEEF] ${
                            groupErrors[`student${index}Age`] ? 'border-red-300' : 'border-[#E0E0E0]'
                          }`}
                          placeholder="Age"
                        />
                        {groupErrors[`student${index}Age`] && (
                          <p className="text-xs text-red-500 mt-1">{groupErrors[`student${index}Age`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#1E2A3B] mb-1">
                          Grade *
                        </label>
                        <select
                          value={student.grade}
                          onChange={(e) => handleGroupStudentChange(index, 'grade', e.target.value)}
                          className={`w-full px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-[#00AEEF] ${
                            groupErrors[`student${index}Grade`] ? 'border-red-300' : 'border-[#E0E0E0]'
                          }`}
                        >
                          <option value="">Select Grade</option>
                          {grades.slice(1).map(grade => (
                            <option key={grade.value} value={grade.value}>
                              {grade.label}
                            </option>
                          ))}
                        </select>
                        {groupErrors[`student${index}Grade`] && (
                          <p className="text-xs text-red-500 mt-1">{groupErrors[`student${index}Grade`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#1E2A3B] mb-1">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          value={student.phoneNumber}
                          onChange={(e) => handleGroupStudentChange(index, 'phoneNumber', e.target.value)}
                          className={`w-full px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-[#00AEEF] ${
                            groupErrors[`student${index}Phone`] ? 'border-red-300' : 'border-[#E0E0E0]'
                          }`}
                          placeholder="Enter phone number"
                        />
                        {groupErrors[`student${index}Phone`] && (
                          <p className="text-xs text-red-500 mt-1">{groupErrors[`student${index}Phone`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Package Pricing Section - Moved here after student/group info */}
          {formData.program && formData.enrollmentType && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Package Pricing
              </h3>
              
              <div className="bg-[#E8F4FF] rounded-lg p-4 border border-[#00AEEF]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Country Selection */}
                  <div>
                    <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                      Country *
                    </label>
                    <select
                      value={pricingData.country}
                      onChange={(e) => handlePricingChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>

                  {/* Currency Display */}
                  <div>
                    <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                      Currency
                    </label>
                    <div className="px-3 py-2 bg-white border border-[#E0E0E0] rounded-lg text-sm font-medium text-[#003C64]">
                      {pricingData.currency} {pricingData.currencySymbol}
                    </div>
                  </div>

                  {/* Base Price Display */}
                  <div>
                    <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                      Base Price
                    </label>
                    <div className="px-3 py-2 bg-white border border-[#E0E0E0] rounded-lg text-sm font-medium text-[#003C64]">
                      {formatPrice(pricingData.basePrice, pricingData.currency, pricingData.currencySymbol)}
                    </div>
                  </div>

                  {/* Discount Selection */}
                  <div>
                    <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                      Discount
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={pricingData.discountPercent}
                      onChange={(e) => {
                        const discount = parseInt(e.target.value) || 0;
                        handlePricingChange('discountPercent', discount);
                      }}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                      placeholder="Enter discount %"
                    />
                  </div>
                </div>

                {/* Final Price Display - Now Editable */}
                <div className="mt-4 pt-4 border-t border-[#00AEEF]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1E2A3B]">Final Package Price:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={pricingData.finalPrice}
                        onChange={(e) => {
                          const newPrice = parseFloat(e.target.value) || 0;
                          setPricingData(prev => ({
                            ...prev,
                            finalPrice: newPrice
                          }));
                        }}
                        className="text-lg font-bold text-[#00AEEF] bg-white px-4 py-2 rounded-lg border border-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] w-32 text-right"
                      />
                      <span className="text-sm text-[#666]">{pricingData.currencySymbol}</span>
                    </div>
                  </div>
                  {pricingData.discountPercent > 0 && (
                    <p className="text-xs text-[#666] mt-1">
                      {pricingData.discountPercent}% discount applied (Saved: {formatPrice(pricingData.basePrice - pricingData.finalPrice, pricingData.currency, pricingData.currencySymbol)})
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ID Display - Just before Status Information */}
          {shouldShowId && (
            <div className="bg-[#E6F6FB] rounded-lg p-4 border border-[#00AEEF]">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-[#00AEEF]" />
                <span className="text-sm font-medium text-[#1E2A3B]">
                  {formData.enrollmentType === 'group' ? 'Group ID' : 'Student ID'}:
                </span>
                <span className="text-sm font-mono text-[#00AEEF] bg-white px-2 py-1 rounded border">
                  {displayId}
                </span>
              </div>
              <p className="text-xs text-[#666] mt-1">
                This ID will be automatically generated and cannot be changed
              </p>
            </div>
          )}

          {/* Status Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <Building className="h-4 w-4" />
              Status Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Enrollment Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
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
                  Payment Status *
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                >
                  {paymentStatusOptions.map(paymentStatus => (
                    <option key={paymentStatus.value} value={paymentStatus.value}>
                      {paymentStatus.label}
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
                placeholder="Add any internal notes about the student(s)..."
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
              {isLoading ? 'Enrolling...' : `Enroll ${formData.enrollmentType === 'group' ? 'Group' : 'Student'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal; 