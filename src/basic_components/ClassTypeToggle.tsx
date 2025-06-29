import React from 'react';

interface ClassTypeToggleProps {
  value: 'group' | 'one2one';
  onChange: (value: 'group' | 'one2one') => void;
  error?: string;
  required?: boolean;
}

const ClassTypeToggle: React.FC<ClassTypeToggleProps> = ({ 
  value, 
  onChange, 
  error, 
  required = false 
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Class Type {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => onChange('group')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            value === 'group'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Group
        </button>
        <button
          type="button"
          onClick={() => onChange('one2one')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            value === 'one2one'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          One-on-One
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ClassTypeToggle; 