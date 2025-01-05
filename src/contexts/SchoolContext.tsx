import React, { createContext, useContext, useState } from 'react';
import type { School } from '../types';

interface SchoolContextType {
  schools: School[];
  addSchool: (school: School) => void;
  updateSchool: (id: string, data: Partial<School>) => void;
  getSchool: (id: string) => School | undefined;
}

const SchoolContext = createContext<SchoolContextType | null>(null);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [schools, setSchools] = useState<School[]>([]);

  const addSchool = (school: School) => {
    setSchools(prev => [...prev, school]);
  };

  const updateSchool = (id: string, data: Partial<School>) => {
    setSchools(prev => 
      prev.map(school => 
        school.id === id ? { ...school, ...data } : school
      )
    );
  };

  const getSchool = (id: string) => {
    return schools.find(school => school.id === id);
  };

  return (
    <SchoolContext.Provider value={{ schools, addSchool, updateSchool, getSchool }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchools() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchools must be used within a SchoolProvider');
  }
  return context;
}