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
  name: string;
  program: string;
  amountCollected: number;
  razorpayReferenceId: string;
  partnerId: string;
  paymentStatus: 'paid' | 'expired' | 'pending';
  convertedBy?: string;
  leadType: 'School' | 'Student';
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