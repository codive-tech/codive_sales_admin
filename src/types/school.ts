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