import React from 'react';
import { Download } from 'lucide-react';
import { toast } from 'react-toastify';
import { PaymentVerification } from '../../types';

// Brand colors
const colors = {
  primary: '#00AEEF',
  hoverBlue: '#0095D9'
};

interface ExportPaymentsProps {
  payments: PaymentVerification[];
  courseType?: string;
}

export const ExportPayments: React.FC<ExportPaymentsProps> = ({ payments, courseType }) => {
  const exportToCSV = () => {
    if (payments.length === 0) {
      toast.warning('No payments to export');
      return;
    }

    // Define CSV headers
    const headers = [
      'Payment ID',
      'School ID',
      'Student ID',
      'Course Title',
      'Amount',
      'Partial Amount',
      'Status',
      'Verification Status',
      'Course Assigned',
      'Payment Notes',
      'Created Date',
      'Updated Date'
    ];

    // Convert payments to CSV rows
    const csvRows = payments.map(payment => [
      payment.paymentIdGenerated,
      payment.schoolId,
      payment.studentId || '',
      payment.courseTitle,
      payment.amount.toString(),
      payment.partialAmount?.toString() || '',
      payment.status,
      payment.isVerified ? 'Verified' : 'Not Verified',
      payment.assignedCourse ? 'Yes' : 'No',
      payment.paymentNotes || '',
      new Date(payment.dateCreated).toLocaleDateString('en-IN'),
      new Date(payment.dateUpdated).toLocaleDateString('en-IN')
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `codive-payment-verifications-${courseType || 'all'}-${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Payment verification report exported successfully!');
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: colors.primary }}
    >
      <Download size={16} />
      <span>Export CSV</span>
    </button>
  );
}; 