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
  studentCountryCode?: string;
  email: string;
  birthday?: string;
  country?: string;
  school: string;
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
  enrollmentType?: 'b2b' | 'b2c';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  fullName: string;
  phoneNumber: string;
  studentCountryCode?: string;
  email: string;
  birthday?: string;
  country?: string;
  school: string;
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
  enrollmentType?: 'b2b' | 'b2c';
  notes?: string;
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
}

export interface LeadFilters {
  search: string;
  leadType: string;
  status: string;
  program: string;
  source: string;
  dateRange: {
    start: string;
    end: string;
  };
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