import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, GraduationCap, BookOpen, Building, FileText, Edit, RefreshCw, Hash, DollarSign, Percent } from 'lucide-react';
import { Student, CreateStudentData } from '../../types';
import { StudentStatusBadge, PaymentStatusBadge, EnrollmentTypeBadge } from './StudentStatusBadge';
import { getProgramOptions, getProgramConfig } from '../../data/programConfig';
import { 
  getBasePrice, 
  getCurrencyInfo, 
  calculateFinalPrice, 
  formatPrice, 
  discountOptions 
} from '../../data/pricingConfig';

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

export function EditStudentModal({ isOpen, onClose, onSubmit, student, isLoading = false }: EditStudentModalProps) {
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pricing state
  const [pricingData, setPricingData] = useState({
    country: 'India', // Default country
    basePrice: 0,
    discountPercent: 0,
    finalPrice: 0,
    currency: 'INR',
    currencySymbol: '₹'
  });

  // Get selected program configuration
  const selectedProgramConfig = formData.program ? getProgramConfig(formData.program) : null;

  // Populate form when student data changes
  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || '',
        phoneNumber: student.phoneNumber || '',
        email: student.email || '',
        age: student.age,
        grade: student.grade || '',
        program: student.program || '',
        enrollmentType: student.enrollmentType || 'group',
        leadType: student.leadType,
        status: student.status || 'active',
        paymentStatus: student.paymentStatus || 'unpaid',
        notes: student.notes || '',
        // Pricing data
        packagePrice: student.packagePrice,
        basePrice: student.basePrice,
        discountPercent: student.discountPercent,
        currency: student.currency,
        currencySymbol: student.currencySymbol
      });

      // Set pricing data
      setPricingData({
        country: 'India', // Default, could be enhanced to detect from student data
        basePrice: student.basePrice || 0,
        discountPercent: student.discountPercent || 0,
        finalPrice: student.packagePrice || 0,
        currency: student.currency || 'INR',
        currencySymbol: student.currencySymbol || '₹'
      });
    }
  }, [student]);

  // Calculate pricing when program, country, or enrollment type changes
  useEffect(() => {
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
    } else if (field === 'country' && typeof value === 'string' && formData.program) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedData: CreateStudentData = {
        ...formData,
        // Pricing data
        packagePrice: pricingData.finalPrice,
        basePrice: pricingData.basePrice,
        discountPercent: pricingData.discountPercent,
        currency: pricingData.currency,
        currencySymbol: pricingData.currencySymbol
      };
      onSubmit(updatedData);
    }
  };

  const handleInputChange = (field: keyof CreateStudentData, value: string | number) => {
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
      age: undefined,
      grade: '',
      program: '',
      enrollmentType: 'group',
      leadType: undefined,
      status: 'active',
      paymentStatus: 'unpaid',
      notes: ''
    });
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student ID Display */}
          {student?.studentId && (
            <div className="bg-[#E6F6FB] rounded-lg p-4 border border-[#00AEEF]">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-[#00AEEF]" />
                <span className="text-sm font-medium text-[#1E2A3B]">Student ID:</span>
                <span className="text-sm font-mono text-[#00AEEF] bg-white px-2 py-1 rounded border">
                  {student.studentId}
                </span>
              </div>
              <p className="text-xs text-[#666] mt-1">
                This ID cannot be changed
              </p>
            </div>
          )}

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

          {/* Program & Enrollment Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Program & Enrollment Type
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

            {/* Enrollment Mode */}
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

          {/* Package Pricing Section */}
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
                    <div className="flex gap-2">
                      <select
                        value={pricingData.discountPercent}
                        onChange={(e) => handlePricingChange('discountPercent', parseInt(e.target.value))}
                        className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                      >
                        {discountOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={pricingData.discountPercent}
                        onChange={(e) => {
                          const discount = parseInt(e.target.value) || 0;
                          handlePricingChange('discountPercent', discount);
                        }}
                        className="w-20 px-2 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent text-center"
                        placeholder="%"
                      />
                    </div>
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

export default EditStudentModal; 