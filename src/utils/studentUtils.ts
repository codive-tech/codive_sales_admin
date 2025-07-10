// Utility function to generate student ID
export const generateStudentId = (schoolId: string, grade: string): string => {
  const random4Digit = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `STU-${schoolId}-G${grade}-${random4Digit}`;
};

// Mock school ID for demo purposes
export const MOCK_SCHOOL_ID = '412';

// Generate group ID based on program
export const generateGroupId = (program: string): string => {
  const programCode = getProgramCode(program);
  const randomDigits = Math.floor(Math.random() * 900) + 100; // 3-digit random number
  return `GRP-${programCode}-${randomDigits}`;
};

// Get program code for group ID generation
const getProgramCode = (program: string): string => {
  const programCodes: Record<string, string> = {
    'AI Bootcamp': 'AIB',
    'Robotics Junior': 'RBJ',
    'Robotics Senior': 'RBS',
    'Coding Explorer': 'CDE',
    'Coding Mastery': 'CDM',
    'Coding Challenger': 'CDC',
    'Coding Innovator': 'CDI',
    'Web-development': 'WEB',
    'Complete Java': 'JAV',
    'Financial Literacy': 'FIN',
    'Hackathon preparation': 'HAC',
    'Bootcamp adventure': 'BCA',
    'Junior-Intermediate': 'JUN',
    'Data Science': 'DAT'
  };
  
  return programCodes[program] || 'GEN';
}; 