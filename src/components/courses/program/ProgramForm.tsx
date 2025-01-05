import React from 'react';
import type { ProgramDetails } from '../../../types/programs';

interface ProgramFormProps {
  details: ProgramDetails;
  onChange: (details: ProgramDetails) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProgramForm({ details, onChange, onBack, onSubmit }: ProgramFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Program Name</label>
          <input
            type="text"
            value={details.name}
            onChange={(e) => onChange({ ...details, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            value={details.duration}
            onChange={(e) => onChange({ ...details, duration: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Classes</label>
          <input
            type="number"
            value={details.classCount}
            onChange={(e) => onChange({ ...details, classCount: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={details.description}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back to Templates
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Create Program
        </button>
      </div>
    </form>
  );
}