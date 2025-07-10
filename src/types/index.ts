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

// Enhanced Payment Verification Types
export interface PaymentVerification {
  id: string;
  paymentId: string;
  schoolId: string;
  studentId: string;
  status: 'paid' | 'partial' | 'pending';
  amount: number;
  partialAmount?: number;
  courseTitle: string;
  paymentNotes?: string;
  receiptFile?: File;
  proofImage?: File;
  isVerified: boolean;
  paymentIdGenerated: string;
  dateCreated: string;
  dateUpdated: string;
  assignedCourse?: boolean;
  currency?: string; // Currency code (INR, USD, AED, ZAR)
  paymentMethod?: 'razorpay' | 'manual' | 'bank_transfer' | 'cash'; // Payment method
}

export interface PaymentVerificationForm {
  status: 'paid' | 'partial' | 'pending';
  paymentNotes: string;
  receiptFile?: File;
  proofImage?: File;
}

export interface Student {
  id: string;
  studentId: string; // Auto-generated student ID
  fullName: string;
  phoneNumber: string;
  studentCountryCode?: string;
  email: string;
  birthday?: string;
  age?: number;
  country?: string;
  parentName?: string;
  parentPhone?: string;
  parentCountryCode?: string;
  parentEmail?: string;
  relation?: string;
  grade: string;
  secretPin?: string;
  classType?: 'group' | 'one2one';
  // New fields for premium student management
  program?: string;
  status?: 'active' | 'completed' | 'dropped';
  paymentStatus?: 'paid' | 'unpaid' | 'pending';
  enrollmentType?: 'group' | 'one2one';
  leadType?: 'Referral' | 'WhatsApp' | 'Facebook' | 'Website' | 'Event' | 'School Fair' | 'Other';
  notes?: string;
  // New fields for CRM pipeline
  campaignId?: string;
  sellingPrice?: number;
  convertedFromLead?: string; // Lead ID that was converted
  // Group class fields
  groupId?: string; // Unique group identifier
  groupMemberIndex?: number; // Position in the group (1, 2, 3, etc.)
  // Pricing fields
  packagePrice?: number;
  basePrice?: number;
  discountPercent?: number;
  currency?: string;
  currencySymbol?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  fullName: string;
  phoneNumber: string;
  studentCountryCode?: string;
  email: string;
  birthday?: string;
  age?: number;
  country?: string;
  parentName?: string;
  parentPhone?: string;
  parentCountryCode?: string;
  parentEmail?: string;
  relation?: string;
  secretPin?: string;
  confirmSecretPin?: string;
  grade: string;
  classType?: 'group' | 'one2one';
  // New fields for premium student management
  program?: string;
  enrollmentType?: 'group' | 'one2one';
  leadType?: 'Referral' | 'WhatsApp' | 'Facebook' | 'Website' | 'Event' | 'School Fair' | 'Other';
  notes?: string;
  // New fields for CRM pipeline
  campaignId?: string;
  sellingPrice?: number;
  status?: 'active' | 'completed' | 'dropped';
  paymentStatus?: 'paid' | 'unpaid' | 'pending';
  // Pricing fields
  packagePrice?: number;
  basePrice?: number;
  discountPercent?: number;
  currency?: string;
  currencySymbol?: string;
}

// Lead types
export interface Lead {
  id: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  leadType: 'School' | 'Parent';
  programOfInterest: string;
  source: 'Manual' | 'Event' | 'WhatsApp' | 'Facebook' | 'Instagram' | 'Referral';
  notes?: string;
  status: 'New' | 'Contacted' | 'Follow-Up' | 'Converted' | 'Cold';
  campaignId?: string;
  // New fields for enhanced CRM
  sellingPrice?: number;
  convertedToStudent?: string; // Student ID if converted
  // Demo assignment fields
  demoDate?: string;
  demoInstructor?: string;
  demoNotes?: string;
  demoStatus?: 'scheduled' | 'completed' | 'cancelled';
  // Admin validation fields
  adminValidation?: 'pending' | 'eligible' | 'not_eligible';
  adminValidationDate?: string;
  adminValidationNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadData {
  fullName: string;
  contactNumber: string;
  email?: string;
  leadType: 'School' | 'Parent';
  programOfInterest: string;
  source: 'Manual' | 'Event' | 'WhatsApp' | 'Facebook' | 'Instagram' | 'Referral';
  notes?: string;
  status: 'New' | 'Contacted' | 'Follow-Up' | 'Converted' | 'Cold';
  campaignId?: string;
  sellingPrice?: number;
}

// New interface for converting lead to student
export interface ConvertLeadData {
  enrollmentStatus: 'active' | 'completed' | 'dropped';
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  sellingPrice?: number;
  grade: string;
  age?: number;
  notes?: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  type: 'contact' | 'followup' | 'admin' | 'conversion';
  createdAt: string;
  createdBy?: string;
}

export interface LeadFilters {
  search: string;
  leadType: string;
  status: string;
  program: string;
  source: string;
  campaignId: string;
  dateRange: {
    start: string;
    end: string;
  };
}

// Import campaign types
export interface ImportCampaign {
  id: string;
  name: string;
  source: 'Facebook' | 'Google Ads' | 'WhatsApp' | 'Manual';
  leads: CreateLeadData[];
}

// Revenue Report Types
export interface RevenueRecord {
  id: string;
  date: string;
  // Updated fields for B2B/B2C display
  userType: 'B2B' | 'B2C'; // B2B for schools, B2C for students
  userId: string; // School ID or Student ID
  userName: string; // School name or Student name
  program: string;
  amountCollected: number;
  razorpayReferenceId?: string; // Optional - only for Razorpay payments
  paymentMethod: 'razorpay' | 'manual'; // Payment method
  paymentStatus: 'paid' | 'expired' | 'pending';
  // Removed fields: partnerId, convertedBy
  leadType: 'School' | 'Student';
  // Currency support
  currency?: string;
  currencySymbol?: string;
}

export interface RevenueFilters {
  dateRange: {
    start: string;
    end: string;
  };
  leadType: string;
  program: string;
  status: string;
}

export interface DateRangeOption {
  label: string;
  value: string;
  startDate: Date;
  endDate: Date;
}

// Payout Tracker Types
export interface PayoutRecord {
  id: string;
  month: string;
  totalRevenue: number;
  commissionRate: number;
  commissionEarned: number;
  payoutStatus: 'paid' | 'pending';
  payoutDate?: string;
  remarks?: string;
  generatedByRazorpay: boolean;
  trend: 'up' | 'down' | 'stable';
  previousMonthRevenue?: number;
}

export interface EarningsSummary {
  totalRevenue: number;
  totalCommission: number;
  nextPayoutDate?: string;
  period: string;
}

export interface PayoutFilters {
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
  showRazorpayOnly: boolean;
}

// Group class types
export interface GroupStudentData {
  fullName: string;
  age: number;
  grade: string;
  phoneNumber: string;
}

export interface GroupEnrollmentData {
  groupId: string;
  program: string;
  totalMembers: number;
  groupEnrollmentDate: string;
  students: GroupStudentData[];
  leadType: string;
  status: 'active' | 'completed' | 'dropped';
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  notes?: string;
  // Pricing fields
  packagePrice?: number;
  basePrice?: number;
  discountPercent?: number;
  currency?: string;
  currencySymbol?: string;
}