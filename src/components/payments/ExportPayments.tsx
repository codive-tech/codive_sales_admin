import React from 'react';
import { Download } from 'lucide-react';
import { toast } from 'react-toastify';

// Brand colors
const colors = {
  primary: '#00AEEF',
  hoverBlue: '#0095D9'
};

interface Payment {
  id: string;
  name: string;
  courseTitle: string;
  amount: number;
  discount?: number;
  finalAmount: number;
  status: 'paid' | 'pending' | 'expired';
  razorpayLink?: string;
  dateCreated: string;
  paymentDate?: string;
  expiryDate: string;
  type: 'student' | 'school';
}

interface ExportPaymentsProps {
  payments: Payment[];
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
      'Name',
      'Program',
      'Amount',
      'Discount',
      'Final Amount',
      'Status',
      'Razorpay ID',
      'Created Date',
      'Payment Date',
      'Expiry Date',
      'Type'
    ];

    // Convert payments to CSV rows
    const csvRows = payments.map(payment => [
      payment.name,
      payment.courseTitle,
      payment.amount.toString(),
      payment.discount?.toString() || '0',
      payment.finalAmount.toString(),
      payment.status,
      payment.razorpayLink?.split('/').pop() || '',
      new Date(payment.dateCreated).toLocaleDateString('en-IN'),
      payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString('en-IN') : '',
      new Date(payment.expiryDate).toLocaleDateString('en-IN'),
      payment.type
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
    const filename = `codive-payments-${courseType || 'all'}-${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Payment report exported successfully!');
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