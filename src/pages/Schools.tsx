import React, { useState } from 'react';
import { useSchools } from '../contexts/SchoolContext';
import { SchoolList } from '../components/schools/SchoolList';
import { SchoolForm } from '../components/schools/SchoolForm';
import { DataFilter } from '../components/filters/DataFilter';
import { filterData } from '../utils/filters';
import {SchoolData} from "../types/school";
import apiClient from "../config/axios";
import {useAuth} from "../contexts/AuthContext";
import {toast} from "react-toastify";

const filterOptions = [
  { label: 'All Schools', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
];

export function Schools() {
  const { schools, addSchool, updateSchool } = useSchools();
  const [showForm, setShowForm] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { user } = useAuth();
  const filteredSchools = filterData(
    schools,
    searchQuery,
    'name',
    ['name', 'principalName', 'contactEmail']
  ).filter((school) => statusFilter === 'all' || school?.status === statusFilter);

  const handleSubmit = (data: Partial<SchoolData>) => {
    if (selectedSchool) {
      updateSchool(selectedSchool?.id, data);
    } else {
      try {
        const newSchool: SchoolData = {
          status: 'active',
          ...data as Omit<SchoolData, 'id' | 'enrollmentDate' | 'coursesEnrolled'>
        };
        data.section = data?.course;
        data.salesPersonId = user?.data?._id;
        const url = `${import.meta.env.VITE_API_URL}/school`;
        apiClient.post(url, data).then(res => {
          toast.success('School Added.');
          setShowForm(false);
          setSelectedSchool(undefined);
          addSchool(newSchool);
        }).catch(e => {
              toast.warn('OOPS! Something went wrong.');
              console.log(e)
            }
        )

      } catch (e) {
        console.log(e)
      }

    }
    

  };

  const handleEdit = (school: SchoolData) => {
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