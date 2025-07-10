import { PaymentVerification } from '../types';

// Helper function to generate Payment ID
const generatePaymentId = (schoolId: string, studentId: string): string => {
  const timestamp = Math.floor(Date.now() / 1000);
  return `PAY-${schoolId}-${studentId}-${timestamp}`;
};

// Mock Payment Verification Data
export const mockPaymentVerifications: PaymentVerification[] = [
  {
    id: '1',
    paymentId: 'pay_001',
    schoolId: '412',
    studentId: 'S032',
    status: 'paid',
    amount: 5000,
    courseTitle: 'Advanced Swimming Techniques',
    paymentNotes: 'Full payment received via bank transfer',
    isVerified: true,
    paymentIdGenerated: generatePaymentId('412', 'S032'),
    dateCreated: '2024-01-15T10:30:00Z',
    dateUpdated: '2024-01-16T14:20:00Z',
    assignedCourse: true,
    currency: 'INR',
    paymentMethod: 'bank_transfer'
  },
  {
    id: '2',
    paymentId: 'pay_002',
    schoolId: '415',
    studentId: 'S045',
    status: 'partial',
    amount: 7500,
    partialAmount: 4000,
    courseTitle: 'Competitive Swimming',
    paymentNotes: 'Partial payment received. Balance pending due to financial constraints.',
    isVerified: true,
    paymentIdGenerated: generatePaymentId('415', 'S045'),
    dateCreated: '2024-01-20T09:15:00Z',
    dateUpdated: '2024-01-22T16:45:00Z',
    assignedCourse: false,
    currency: 'INR',
    paymentMethod: 'manual'
  },
  {
    id: '3',
    paymentId: 'pay_003',
    schoolId: '418',
    studentId: 'S078',
    status: 'pending',
    amount: 3000,
    courseTitle: 'Water Safety & Rescue',
    paymentNotes: 'Payment link sent, awaiting confirmation',
    isVerified: false,
    paymentIdGenerated: generatePaymentId('418', 'S078'),
    dateCreated: '2024-01-25T11:00:00Z',
    dateUpdated: '2024-01-25T11:00:00Z',
    assignedCourse: false,
    currency: 'INR',
    paymentMethod: 'razorpay'
  },
  {
    id: '4',
    paymentId: 'pay_004',
    schoolId: '420',
    studentId: 'S091',
    status: 'paid',
    amount: 12000,
    courseTitle: 'Lifeguard Training',
    paymentNotes: 'Payment completed via UPI. Receipt uploaded.',
    isVerified: true,
    paymentIdGenerated: generatePaymentId('420', 'S091'),
    dateCreated: '2024-01-28T13:45:00Z',
    dateUpdated: '2024-01-29T10:30:00Z',
    assignedCourse: true,
    currency: 'INR',
    paymentMethod: 'manual'
  },
  {
    id: '5',
    paymentId: 'pay_005',
    schoolId: '422',
    studentId: 'S105',
    status: 'partial',
    amount: 6000,
    partialAmount: 3000,
    courseTitle: 'Beginner Swimming',
    paymentNotes: 'First installment received. Second installment due next week.',
    isVerified: false,
    paymentIdGenerated: generatePaymentId('422', 'S105'),
    dateCreated: '2024-01-30T08:20:00Z',
    dateUpdated: '2024-02-01T15:10:00Z',
    assignedCourse: false,
    currency: 'INR',
    paymentMethod: 'manual'
  },
  {
    id: '6',
    paymentId: 'pay_006',
    schoolId: '425',
    studentId: 'S118',
    status: 'pending',
    amount: 4500,
    courseTitle: 'Advanced Swimming Techniques',
    paymentNotes: 'Payment link expired. Need to regenerate.',
    isVerified: false,
    paymentIdGenerated: 'RZP-425-S118-1706887800',
    dateCreated: '2024-02-02T12:30:00Z',
    dateUpdated: '2024-02-02T12:30:00Z',
    assignedCourse: false,
    currency: 'INR',
    paymentMethod: 'razorpay'
  },
  {
    id: '7',
    paymentId: 'pay_007',
    schoolId: '428',
    studentId: 'S132',
    status: 'paid',
    amount: 8000,
    courseTitle: 'Competitive Swimming',
    paymentNotes: 'Full payment via credit card. Course access granted.',
    isVerified: true,
    paymentIdGenerated: 'RZP-428-S132-1707144900',
    dateCreated: '2024-02-05T14:15:00Z',
    dateUpdated: '2024-02-06T09:45:00Z',
    assignedCourse: true,
    currency: 'INR',
    paymentMethod: 'razorpay'
  },
  {
    id: '8',
    paymentId: 'pay_008',
    schoolId: '430',
    studentId: 'S145',
    status: 'partial',
    amount: 9000,
    partialAmount: 6000,
    courseTitle: 'Lifeguard Training',
    paymentNotes: 'Two-thirds payment received. Final installment pending.',
    isVerified: true,
    paymentIdGenerated: generatePaymentId('430', 'S145'),
    dateCreated: '2024-02-08T10:00:00Z',
    dateUpdated: '2024-02-10T11:20:00Z',
    assignedCourse: false,
    currency: 'INR',
    paymentMethod: 'manual'
  },
  {
    id: '9',
    paymentId: 'pay_009',
    schoolId: '432',
    studentId: 'S158',
    status: 'paid',
    amount: 250,
    courseTitle: 'Advanced Swimming Techniques',
    paymentNotes: 'International student payment via Razorpay',
    isVerified: true,
    paymentIdGenerated: 'RZP-432-S158-1707235200',
    dateCreated: '2024-02-07T09:00:00Z',
    dateUpdated: '2024-02-07T09:30:00Z',
    assignedCourse: true,
    currency: 'USD',
    paymentMethod: 'razorpay'
  },
  {
    id: '10',
    paymentId: 'pay_010',
    schoolId: '435',
    studentId: 'S171',
    status: 'paid',
    amount: 1200,
    courseTitle: 'Water Safety & Rescue',
    paymentNotes: 'UAE student payment completed',
    isVerified: true,
    paymentIdGenerated: 'RZP-435-S171-1707321600',
    dateCreated: '2024-02-08T10:00:00Z',
    dateUpdated: '2024-02-08T10:15:00Z',
    assignedCourse: true,
    currency: 'AED',
    paymentMethod: 'razorpay'
  },
  {
    id: '11',
    paymentId: 'pay_011',
    schoolId: '438',
    studentId: 'S184',
    status: 'partial',
    amount: 5000,
    partialAmount: 3000,
    courseTitle: 'Competitive Swimming',
    paymentNotes: 'South African student partial payment',
    isVerified: false,
    paymentIdGenerated: 'RZP-438-S184-1707408000',
    dateCreated: '2024-02-09T11:00:00Z',
    dateUpdated: '2024-02-09T11:45:00Z',
    assignedCourse: false,
    currency: 'ZAR',
    paymentMethod: 'razorpay'
  }
];

// Helper function to update payment verification
export const updatePaymentVerification = (
  payments: PaymentVerification[],
  paymentId: string,
  formData: {
    status: 'paid' | 'partial' | 'pending';
    paymentNotes: string;
    receiptFile?: File;
    proofImage?: File;
  }
): PaymentVerification[] => {
  return payments.map(payment => {
    if (payment.id === paymentId) {
      const isVerified = formData.receiptFile && formData.proofImage;
      
      return {
        ...payment,
        status: formData.status,
        paymentNotes: formData.paymentNotes,
        receiptFile: formData.receiptFile,
        proofImage: formData.proofImage,
        isVerified: isVerified || payment.isVerified,
        dateUpdated: new Date().toISOString()
      };
    }
    return payment;
  });
};

// Helper function to assign course
export const assignCourse = (
  payments: PaymentVerification[],
  paymentId: string
): PaymentVerification[] => {
  return payments.map(payment => {
    if (payment.id === paymentId) {
      return {
        ...payment,
        assignedCourse: true,
        dateUpdated: new Date().toISOString()
      };
    }
    return payment;
  });
};

// Helper function to filter payments
export const filterPayments = (
  payments: PaymentVerification[],
  filters: {
    status?: string;
    isVerified?: boolean;
    assignedCourse?: boolean;
  }
): PaymentVerification[] => {
  return payments.filter(payment => {
    if (filters.status && payment.status !== filters.status) return false;
    if (filters.isVerified !== undefined && payment.isVerified !== filters.isVerified) return false;
    if (filters.assignedCourse !== undefined && payment.assignedCourse !== filters.assignedCourse) return false;
    return true;
  });
}; 