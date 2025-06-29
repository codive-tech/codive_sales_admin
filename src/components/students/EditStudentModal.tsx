import React, { useState, useEffect } from 'react';
import { Student, CreateStudentData } from '../../types';
import Input from '../../basic_components/Input';
import CountrySelect from '../CountrySelect';
import GradeSelect from '../GradeSelect';
import RelationSelect from '../RelationSelect';
import ClassTypeToggle from '../../basic_components/ClassTypeToggle';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentData) => void;
  student: Student | null;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, onSubmit, student }) => {
  const [formData, setFormData] = useState<CreateStudentData>({
    fullName: '',
    phoneNumber: '',
    studentCountryCode: '+1',
    email: '',
    birthday: '',
    country: '',
    school: '',
    parentName: '',
    parentPhone: '',
    parentCountryCode: '+1',
    parentEmail: '',
    relation: '',
    secretPin: '',
    confirmSecretPin: '',
    grade: '',
    classType: 'group',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [studentCountryCode, setStudentCountryCode] = useState('+1');
  const [parentCountryCode, setParentCountryCode] = useState('+1');

  // Populate form when student data is available
  useEffect(() => {
    if (student) {
      // Extract country code from phone numbers
      const studentPhoneMatch = student.phoneNumber.match(/^\+(\d+)/);
      const parentPhoneMatch = student.parentPhone.match(/^\+(\d+)/);
      
      setStudentCountryCode(studentPhoneMatch ? `+${studentPhoneMatch[1]}` : '+1');
      setParentCountryCode(parentPhoneMatch ? `+${parentPhoneMatch[1]}` : '+1');
      
      // Remove country code from phone numbers for form display
      const studentPhoneWithoutCode = student.phoneNumber.replace(/^\+\d+/, '');
      const parentPhoneWithoutCode = student.parentPhone.replace(/^\+\d+/, '');

      setFormData({
        fullName: student.fullName,
        phoneNumber: studentPhoneWithoutCode,
        studentCountryCode: student.studentCountryCode,
        email: student.email,
        birthday: student.birthday,
        country: student.country,
        school: student.school,
        parentName: student.parentName,
        parentPhone: parentPhoneWithoutCode,
        parentCountryCode: student.parentCountryCode,
        parentEmail: student.parentEmail,
        relation: student.relation,
        secretPin: '****', // Don't show actual PIN for security
        confirmSecretPin: '****',
        grade: student.grade,
        classType: student.classType,
      });
    }
  }, [student]);

  const handleInputChange = (field: keyof CreateStudentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.school.trim()) {
      newErrors.school = 'School is required';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent/Guardian name is required';
    }

    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Parent/Guardian phone is required';
    }

    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Parent/Guardian email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Please enter a valid email';
    }

    if (!formData.classType) {
      newErrors.classType = 'Class type is required';
    }

    // Only validate PIN if user changed it
    if (formData.secretPin !== '****') {
      if (!formData.secretPin.trim()) {
        newErrors.secretPin = 'Secret PIN is required';
      } else if (formData.secretPin.length < 4) {
        newErrors.secretPin = 'Secret PIN must be at least 4 characters';
      }

      if (!formData.confirmSecretPin.trim()) {
        newErrors.confirmSecretPin = 'Please confirm your secret PIN';
      } else if (formData.secretPin !== formData.confirmSecretPin) {
        newErrors.confirmSecretPin = 'Secret PINs do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add country codes to phone numbers
      const dataWithCountryCodes = {
        ...formData,
        studentCountryCode: studentCountryCode,
        parentCountryCode: parentCountryCode,
        // Keep original PIN if not changed
        secretPin: formData.secretPin === '****' ? (student?.secretPin || '') : formData.secretPin
      };
      
      onSubmit(dataWithCountryCodes);
      onClose();
    }
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Student</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Student Information</h3>
            </div>

            <Input
              label="Student Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              required
            />

            <Input
              label="Student Phone Number"
              name="phoneNo"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              error={errors.phoneNumber}
              phoneNo={true}
              setCountryCode={setStudentCountryCode}
              required
            />

            <Input
              label="Student Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Student Birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={(e) => handleInputChange('birthday', e.target.value)}
              error={errors.birthday}
              required
            />

            <CountrySelect
              value={formData.country}
              onChange={(value) => handleInputChange('country', value)}
              error={errors.country}
              required
            />

            <Input
              label="School"
              name="school"
              value={formData.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
              error={errors.school}
              required
            />

            <GradeSelect
              value={formData.grade}
              onChange={(value) => handleInputChange('grade', value)}
              error={errors.grade}
            />

            <ClassTypeToggle
              value={formData.classType}
              onChange={(value) => handleInputChange('classType', value)}
              error={errors.classType}
              required
            />

            {/* Parent/Guardian Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Parent/Guardian Information</h3>
            </div>

            <Input
              label="Parent/Guardian Name"
              name="parentName"
              value={formData.parentName}
              onChange={(e) => handleInputChange('parentName', e.target.value)}
              error={errors.parentName}
              required
            />

            <Input
              label="Parent/Guardian Phone Number"
              name="phoneNo"
              value={formData.parentPhone}
              onChange={(e) => handleInputChange('parentPhone', e.target.value)}
              error={errors.parentPhone}
              phoneNo={true}
              setCountryCode={setParentCountryCode}
              required
            />

            <Input
              label="Parent/Guardian Email"
              name="parentEmail"
              type="email"
              value={formData.parentEmail}
              onChange={(e) => handleInputChange('parentEmail', e.target.value)}
              error={errors.parentEmail}
              required
            />

            <RelationSelect
              value={formData.relation}
              onChange={(value) => handleInputChange('relation', value)}
              error={errors.relation}
              required
            />

          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal; 