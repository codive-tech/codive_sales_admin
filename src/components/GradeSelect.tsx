import React from 'react';
import Select from '../basic_components/Select';

interface GradeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const grades = [
  { value: 'G1', label: 'Grade 1' },
  { value: 'G2', label: 'Grade 2' },
  { value: 'G3', label: 'Grade 3' },
  { value: 'G4', label: 'Grade 4' },
  { value: 'G5', label: 'Grade 5' },
  { value: 'G6', label: 'Grade 6' },
  { value: 'G7', label: 'Grade 7' },
  { value: 'G8', label: 'Grade 8' },
  { value: 'G9', label: 'Grade 9' },
  { value: 'G10', label: 'Grade 10' },
  { value: 'G11', label: 'Grade 11' },
  { value: 'G12', label: 'Grade 12' },
  { value: 'K', label: 'Kindergarten' },
  { value: 'PK', label: 'Pre-Kindergarten' },
  { value: 'N', label: 'Nursery' },
  { value: 'UG', label: 'University/College' },
  { value: 'PG', label: 'Post Graduate' },
  { value: 'OTHER', label: 'Other' }
];

const GradeSelect: React.FC<GradeSelectProps> = ({
  value,
  onChange,
  error,
  placeholder = 'Select grade level'
}) => {
  return (
    <Select
      label="Grade/Year Level"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={grades}
      placeholder={placeholder}
      error={error}
      required={false}
    />
  );
};

export default GradeSelect; 