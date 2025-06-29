import React from 'react';
import Select from '../basic_components/Select';

interface RelationSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const relations = [
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'legal_guardian', label: 'Legal Guardian' },
  { value: 'other', label: 'Other' }
];

const RelationSelect: React.FC<RelationSelectProps> = ({
  value,
  onChange,
  error,
  required = false,
  placeholder = 'Select relationship'
}) => {
  return (
    <Select
      label="Relation to Student"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={relations}
      placeholder={placeholder}
      error={error}
      required={required}
    />
  );
};

export default RelationSelect; 