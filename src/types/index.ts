// Add Payment type to existing types
export interface Payment {
  id: string;
  schoolId: string;
  schoolName: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  paymentLink?: string;
}

export interface Student {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  country: string;
  school: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  secretPin: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  fullName: string;
  phoneNumber: string;
  email: string;
  birthday: string;
  country: string;
  school: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  secretPin: string;
  confirmSecretPin: string;
}