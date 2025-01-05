import React, { useState } from 'react';
import { useSchools } from '../contexts/SchoolContext';
import { SchoolList } from '../components/schools/SchoolList';
import { SchoolForm } from '../components/schools/SchoolForm';
import { DataFilter } from '../components/filters/DataFilter';
import { filterData } from '../utils/filters';
import type { School } from '../types';

const filterOptions = [
  { label: 'All Schools', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
];

export function Schools() {
  const { schools, addSchool, updateSchool } = useSchools();
  const [showForm, setShowForm] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSchools = filterData(
    schools,
    searchQuery,
    'name',
    ['name', 'principalName', 'contactEmail']
  ).filter((school) => statusFilter === 'all' || school.status === statusFilter);

  const handleSubmit = (data: Partial<School>) => {
    if (selectedSchool) {
      updateSchool(selectedSchool.id, data);
    } else {
      const newSchool: School = {
        id: crypto.randomUUID(),
        status: 'active',
        enrollmentDate: new Date().toISOString(),
        agreementEndDate: data.agreementEndDate || new Date().toISOString(),
        coursesEnrolled: [],
        ...data as Omit<School, 'id' | 'enrollmentDate' | 'coursesEnrolled'>
      };
      addSchool(newSchool);
    }
    
    setShowForm(false);
    setSelectedSchool(undefined);
  };

  const handleEdit = (school: School) => {
    setSelectedSchool(school);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and track all enrolled schools
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedSchool(undefined);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add School
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {selectedSchool ? 'Edit School' : 'Add New School'}
          </h2>
          <SchoolForm
            school={selectedSchool}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedSchool(undefined);
            }}
          />
        </div>
      ) : (
        <>
          <DataFilter
            onSearch={setSearchQuery}
            onFilter={setStatusFilter}
            filterOptions={filterOptions}
            searchPlaceholder="Search schools..."
          />
          <SchoolList schools={filteredSchools} onEdit={handleEdit} />
        </>
      )}
    </div>
  );
}