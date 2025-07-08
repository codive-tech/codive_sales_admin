// Utility function to generate student ID
export const generateStudentId = (schoolId: string, grade: string): string => {
  const random4Digit = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `STU-${schoolId}-G${grade}-${random4Digit}`;
};

// Mock school ID for demo purposes
export const MOCK_SCHOOL_ID = '412'; 