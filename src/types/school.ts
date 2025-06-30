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
  timezone: string;  // ISO 8601 date string
  isAdminProposed:  Record<string, [string[]]>;  // ISO 8601 date string
  adminProposedTime:  Record<string, [string[]]>;  // ISO 8601 date string
  proposedTime:  Record<string, [string[]]>;  // ISO 8601 date string
  acceptedTime: string;  // ISO 8601 date string
  startDate: string[];
  endDate: string;
  comment: string;
}

export interface Course {
  status?: string;
  grade: string;
  section: string;
  classCount: number;
  courseName?: string;
  sectionCode?: string;
  courseCode?: string;
  classTiming?: ClassTiming;
  zoomLink?: string;
}

interface StudentGrowth {
  [year: string]: number;  // Dynamic key-value pair for different years
}

export interface SchoolData {
  id?: string;
  name: string;
  contactPerson?: string;
  contactEmail: string;
  contactPhone?: string;
  contactPersonRole: string;
  address?: Address;
  principalName?: string;
  schoolCode?: string;
  creationDate?: string;  // ISO 8601 date string
  lastEdited?: string;  // ISO 8601 date string
  status?: string;
  studentGrowth?: StudentGrowth;
  section?: Course[];
  salesPersonId?: string;
  course?: string;
  // Additional properties for enhanced functionality
  contactNumber?: string;
  country?: string;
  city?: string;
  totalStudents?: number;
  enrollmentDate?: string;
  notes?: string;
}
