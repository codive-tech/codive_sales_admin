import React, { useState } from 'react';
import { X, Building, User, Phone, Mail, MapPin, BookOpen, FileText, DollarSign, Users } from 'lucide-react';
import { SchoolData, GradeAllocation } from '../../types/school';
import { InfoTooltip } from '../ui/Tooltip';
import { GradeAssignmentPanel } from './GradeAssignmentPanel';

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<SchoolData>) => void;
  school?: SchoolData;
  isLoading?: boolean;
}

const programs = [
  { label: 'Select a program', value: '' },
  { label: 'AI Bootcamp', value: 'AI Bootcamp' },
  { label: 'Robotics 101', value: 'Robotics 101' },
  { label: 'Coding Fundamentals', value: 'Coding Fundamentals' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Web Development', value: 'Web Development' },
  { label: 'Mobile App Development', value: 'Mobile App Development' }
];

const countries = [
  { label: 'Select a country', value: '' },
  { label: 'India', value: 'India' },
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Germany', value: 'Germany' },
  { label: 'France', value: 'France' },
  { label: 'Singapore', value: 'Singapore' },
  { label: 'UAE', value: 'UAE' }
];

const currencies = [
  { label: 'Select Currency', value: '' },
  { label: 'Indian Rupee (₹)', value: 'INR' },
  { label: 'US Dollar ($)', value: 'USD' },
  { label: 'UAE Dirham (AED)', value: 'AED' },
  { label: 'South African Rand (R)', value: 'ZAR' },
  { label: 'Euro (€)', value: 'EUR' },
  { label: 'British Pound (£)', value: 'GBP' },
  { label: 'Canadian Dollar (C$)', value: 'CAD' },
  { label: 'Australian Dollar (A$)', value: 'AUD' }
];

export function AddSchoolModal({ isOpen, onClose, onSubmit, school, isLoading = false }: AddSchoolModalProps) {
  const [formData, setFormData] = useState<Partial<SchoolData>>({
    name: school?.name || '',
    principalName: school?.principalName || '',
    contactNumber: school?.contactNumber || '',
    contactEmail: school?.contactEmail || '',
    country: school?.country || '',
    city: school?.city || '',
    course: school?.course || '',
    totalStudentsExpected: school?.totalStudentsExpected || undefined,
    lockedDealAmount: school?.lockedDealAmount || undefined,
    lockedDealCurrency: school?.lockedDealCurrency || '',
    notes: school?.notes || '',
    gradeAllocations: school?.gradeAllocations || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'School name is required';
    }

    if (!formData.principalName?.trim()) {
      newErrors.principalName = 'Contact person name is required';
    }

    if (!formData.contactNumber?.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    if (!formData.contactEmail?.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    if (!formData.country?.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.course?.trim()) {
      newErrors.course = 'Program assignment is required';
    }

    if (!formData.totalStudentsExpected || formData.totalStudentsExpected < 1) {
      newErrors.totalStudentsExpected = 'Total students expected must be at least 1';
    }

    // Validate deal amount if currency is selected
    if (formData.lockedDealCurrency && (!formData.lockedDealAmount || formData.lockedDealAmount <= 0)) {
      newErrors.lockedDealAmount = 'Deal amount must be greater than 0 when currency is selected';
    }

    // Validate grade allocations
    if (formData.gradeAllocations && formData.gradeAllocations.length > 0) {
      const totalAllocated = formData.gradeAllocations.reduce((sum, allocation) => sum + allocation.students, 0);
      if (totalAllocated > (formData.totalStudentsExpected || 0)) {
        newErrors.gradeAllocations = 'Total allocated students cannot exceed expected students';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof SchoolData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGradeAllocationChange = (allocations: GradeAllocation[]) => {
    setFormData(prev => ({ ...prev, gradeAllocations: allocations }));
    
    // Clear grade allocation error when user makes changes
    if (errors.gradeAllocations) {
      setErrors(prev => ({ ...prev, gradeAllocations: '' }));
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      principalName: '',
      contactNumber: '',
      contactEmail: '',
      country: '',
      city: '',
      course: '',
      totalStudentsExpected: undefined,
      lockedDealAmount: undefined,
      lockedDealCurrency: '',
      notes: '',
      gradeAllocations: []
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-md max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <Building className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2A3B]">
                {school ? 'Edit School' : 'Add New School'}
              </h2>
              <p className="text-sm text-[#666]">
                {school ? 'Update school information' : 'Enter school details to add to your network'}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <Building className="h-4 w-4" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.name ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter school name"
                />
                {errors.name && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.city ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter city/location"
                />
                {errors.city && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  value={formData.principalName}
                  onChange={(e) => handleInputChange('principalName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.principalName ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter contact person name"
                />
                {errors.principalName && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.principalName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.contactNumber ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter contact number"
                />
                {errors.contactNumber && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.contactNumber}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Email ID *
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.contactEmail ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.contactEmail}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Assigned Program */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Assigned Program
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Program Assigned *
              </label>
              <select
                value={formData.course}
                onChange={(e) => handleInputChange('course', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                  errors.course ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                }`}
              >
                {programs.map(program => (
                  <option key={program.value} value={program.value}>
                    {program.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-[#666] mt-1">
                Select the tech program assigned to this school
              </p>
              {errors.course && (
                <p className="text-sm text-[#f55a5a] mt-1">{errors.course}</p>
              )}
            </div>
          </div>

          {/* Section 3: Total Students */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Students
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2 flex items-center gap-2">
                Total Students Expected to Enroll *
                <InfoTooltip content="Estimate number of students enrolled for this school's program" />
              </label>
              <input
                type="number"
                min="1"
                value={formData.totalStudentsExpected || ''}
                onChange={(e) => handleInputChange('totalStudentsExpected', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                  errors.totalStudentsExpected ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                }`}
                placeholder="Enter expected number of students"
              />
              {errors.totalStudentsExpected && (
                <p className="text-sm text-[#f55a5a] mt-1">{errors.totalStudentsExpected}</p>
              )}
            </div>
          </div>

          {/* Section 4: Grade & Section Allocation */}
          {formData.totalStudentsExpected && formData.totalStudentsExpected > 0 && (
            <div className="space-y-4">
              <GradeAssignmentPanel
                totalStudentsExpected={formData.totalStudentsExpected}
                onAllocationChange={handleGradeAllocationChange}
              />
              {errors.gradeAllocations && (
                <p className="text-sm text-[#f55a5a] mt-1">{errors.gradeAllocations}</p>
              )}
            </div>
          )}

          {/* Section 5: Revenue Deal */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue Deal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2 flex items-center gap-2">
                  Currency
                  <InfoTooltip content="Select the currency for the deal amount" />
                </label>
                <select
                  value={formData.lockedDealCurrency}
                  onChange={(e) => handleInputChange('lockedDealCurrency', e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                >
                  {currencies.map(currency => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2 flex items-center gap-2">
                  Locked Deal Amount
                  <InfoTooltip content="Enter the deal value closed with this school. Can be updated later." />
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.lockedDealAmount || ''}
                  onChange={(e) => handleInputChange('lockedDealAmount', parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.lockedDealAmount ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter deal amount"
                />
                {errors.lockedDealAmount && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.lockedDealAmount}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 6: Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Additional Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                placeholder="Add any additional notes, tags, or admin-only remarks about the school..."
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
              {isLoading ? 'Saving...' : (school ? 'Update School' : 'Add School')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 