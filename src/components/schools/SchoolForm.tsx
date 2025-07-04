// Update the existing SchoolForm.tsx to include admin settings
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {X} from "lucide-react";
import {Course, SchoolData} from "../../types/school";
import {toast} from "react-toastify";

interface SchoolFormProps {
  school?: SchoolData;
  onSubmit: (data: Partial<SchoolData>) => void;
  onCancel: () => void;
}

export function SchoolForm({ school, onSubmit, onCancel }: SchoolFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: school || {
      name: '',
      contactPerson: '',
      contactPersonRole: '',
      contactEmail: '',
      contactPhone: '',
      address: {
        state: '',
        country: '',
        pincode: ''},
      status: 'active',
      course: [],
      section: []
    },
  });
  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10"
  ];
  const classes = [50, 80, 100];
  const alphabet = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i));

  // combination of selected classes
  const [selectedClasses, setSelectedClasses]: Course = useState([]);
  const initialSelection = {
    grade: grades[0],
    section: alphabet[0],
    classCount: classes[0],
    code: `${grades[0]} - ${alphabet[0]} - ${classes[0]} classes`
  }
  const [gradeSelection, setGradeSelections] = useState(initialSelection);

  const handleAddClass = () => {
    const gradeCode = `${gradeSelection.grade} - ${gradeSelection.section} - ${gradeSelection.classCount} classes`;
    const isPresent = selectedClasses.find(gd => gd.code === gradeCode);
    if (!isPresent) {
      setSelectedClasses([...selectedClasses, {...gradeSelection, sectionCode: gradeCode}])
    } else {
      toast.warn('This combination is already selected.')
    }
  }

  const handleGradeSelection = (field) => {
    const value = field?.target?.id === 'classCount' ? parseInt(field.target.value): field.target.value;
    setGradeSelections({...gradeSelection, [field.target.id]: value})
  }

  const handleGradeRemove = (grade) => {
    const isPresent = selectedClasses.filter((gd, i) => gd.sectionCode !== grade.sectionCode);
    setSelectedClasses(isPresent)
  }

  const addSchool = (data: SchoolData) => {
    data.course = selectedClasses;
    data.address = {
      state: 'string',
      country: 'string',
      pincode: 'string',
    };

    data.contactPerson = data.contactPerson;
    data.schoolCode = data.name;
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(addSchool)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Existing fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">School Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Person</label>
          <input
            type="text"
            {...register('contactPerson')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Person Role</label>
          <input
            type="text"
            {...register('contactPersonRole')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('contactEmail')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Person Phone</label>
          <input
            type="tel"
            {...register('contactPhone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* New admin fields */}
        {/*<div>*/}
        {/*  <label className="block text-sm font-medium text-gray-700">Initial Status</label>*/}
        {/*  <select*/}
        {/*    {...register('status')}*/}
        {/*    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"*/}
        {/*  >*/}
        {/*    <option value="active">Active</option>*/}
        {/*    <option value="inactive">Inactive</option>*/}
        {/*    <option value="suspended">Suspended</option>*/}
        {/*  </select>*/}
        {/*</div>*/}

        <div>
          <label className="block text-sm font-medium text-gray-700">Agreement End Date</label>
          <input
            type="date"
            {...register('agreementEndDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            {...register('address.country')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className={'flex justify-between'}>
          <div className={'flex-1'}>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <select
                id={'grade'}
                onChange={handleGradeSelection}
                value={gradeSelection.grade}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {grades.map((item, i) =>
                  <option key={i} value={item}>{item}</option>
              )}
            </select>
          </div>
          <div  className={'flex-1'}>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <select
                id='section'
                value={gradeSelection.section}
                onChange={handleGradeSelection}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {alphabet.map((item, i) =>
                <option key={i} value={item}>{item}</option>
              )}
            </select>
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'flex-1'}>
            <label className="block text-sm font-medium text-gray-700">No. of Classes</label>
            <select
                id='classCount'
                value={gradeSelection.classCount}
                onChange={handleGradeSelection}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {classes.map((item, i) =>
                  <option key={i} value={item}>{item}</option>
              )}
            </select>
          </div>
          <div className={'flex-1 justify-items-end content-center flex justify-end items-end'}>
            <button
                type="button"
                onClick={handleAddClass}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add classes
            </button>
          </div>
        </div>
        {selectedClasses.length > 0 && <div
            className={"md:col-span-2 p-5 bg-[#f0f0f0] rounded-[10px] grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-4"}>
          {selectedClasses.map(classes=> <>
            <div className={'bg-[#a4b3e3] p-5 rounded-lg text-center'}>
              {classes.sectionCode}
              <X className={'float-right'} onClick={() => handleGradeRemove(classes)} />
            </div>
          </>)}
        </div>}
      </div>
      <hr/>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          {school ? 'Update School' : 'Add School'}
        </button>
      </div>
    </form>
  );
}