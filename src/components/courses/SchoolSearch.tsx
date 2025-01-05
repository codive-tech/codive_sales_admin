import React from 'react';
import { Search } from 'lucide-react';
import type { School } from '../../types';

interface SchoolSearchProps {
  schools: School[];
  onSelect: (school: School) => void;
  selectedSchool: School | null;
}

export function SchoolSearch({ schools, onSelect, selectedSchool }: SchoolSearchProps) {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(query.toLowerCase()) ||
    school.principalName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search schools..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {selectedSchool && (
          <div className="flex-shrink-0 px-4 py-2 bg-indigo-50 rounded-md">
            <p className="text-sm font-medium text-indigo-700">{selectedSchool.name}</p>
            <p className="text-xs text-indigo-600">{selectedSchool.principalName}</p>
          </div>
        )}
      </div>

      {isOpen && filteredSchools.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {filteredSchools.map((school) => (
              <li
                key={school.id}
                onClick={() => {
                  onSelect(school);
                  setIsOpen(false);
                  setQuery('');
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="text-sm font-medium text-gray-900">{school.name}</div>
                <div className="text-xs text-gray-500">{school.principalName}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}