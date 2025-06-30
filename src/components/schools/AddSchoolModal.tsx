import React, { useState } from 'react';
import { X, Building, User, Phone, Mail, MapPin, BookOpen, FileText } from 'lucide-react';
import { SchoolData } from '../../types/school';

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

export function AddSchoolModal({ isOpen, onClose, onSubmit, school, isLoading = false }: AddSchoolModalProps) {
  const [formData, setFormData] = useState<Partial<SchoolData>>({
    name: school?.name || '',
    principalName: school?.principalName || '',
    contactNumber: school?.contactNumber || '',
    contactEmail: school?.contactEmail || '',
    country: school?.country || '',
    city: school?.city || '',
    course: school?.course || '',
    notes: school?.notes || ''
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof SchoolData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
            onClick={onClose}
            className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* School Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <Building className="h-4 w-4" />
              School Information
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
                  Program Assigned
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                >
                  {programs.map(program => (
                    <option key={program.value} value={program.value}>
                      {program.label}
                    </option>
                  ))}
                </select>
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

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#1E2A3B] flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.country ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                >
                  {countries.map(country => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E2A3B] mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent ${
                    errors.city ? 'border-[#f55a5a]' : 'border-[#E0E0E0]'
                  }`}
                  placeholder="Enter city name"
                />
                {errors.city && (
                  <p className="text-sm text-[#f55a5a] mt-1">{errors.city}</p>
                )}
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
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
                placeholder="Add any additional notes about the school..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E0E0E0]">
            <button
              type="button"
              onClick={onClose}
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