export interface SchoolAccess {
  id: string;
  schoolId: string;
  isActive: boolean;
  accessLevel: 'full' | 'restricted' | 'suspended';
  suspendedUntil?: string;
  suspensionReason?: string;
  lastModified: string;
  modifiedBy: string;
}

export interface SchoolAdmin {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  role: 'principal' | 'admin' | 'staff';
  isActive: boolean;
  lastLogin?: string;
}

interface Address {
  state: string;
  country: string;
  pincode: string;
}

interface ClassTiming {
  proposedTime: string;  // ISO 8601 date string
  days: string[];
  time: string;
}

export interface Course {
  grade: string;
  section: string;
  classCount: number;
  code: string;
  courseCode?: string;
  classTiming?: ClassTiming;
  zoomlink?: string;
}

interface StudentGrowth {
  [year: string]: number;  // Dynamic key-value pair for different years
}

export interface SchoolData {
  id?: string;
  name: string;
  contactPerson?: string;
  contactEmail: string;
  contactPhone: string;
  address?: Address;
  principalName?: string;
  schoolCode?: string;
  creationDate?: string;  // ISO 8601 date string
  lastEdited?: string;  // ISO 8601 date string
  status?: string;
  studentGrowth?: StudentGrowth;
  course?: Course[];
  salesPersonId?: string;
}
