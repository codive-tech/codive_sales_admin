import { RevenueRecord } from '../types';

export function exportToCSV(data: any[], filename: string = 'report.csv') {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle different data types and escape special characters
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Specific export function for revenue data
export function exportRevenueToCSV(data: RevenueRecord[], filename: string = 'revenue-report.csv') {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  // Define headers
  const headers = [
    'Date',
    'User Type',
    'User ID',
    'User Name',
    'Assigned Program',
    'Amount Collected',
    'Payment Method',
    'Razorpay Reference ID',
    'Payment Status',
    'Lead Type',
    'Currency'
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...data.map(record => [
      new Date(record.date).toLocaleDateString('en-GB'),
      record.userType,
      `"${record.userId}"`,
      `"${record.userName}"`,
      `"${record.program}"`,
      record.amountCollected,
      record.paymentMethod,
      record.razorpayReferenceId || '',
      record.paymentStatus,
      record.leadType,
      record.currency || 'INR'
    ].join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export async function exportToPDF(data: any[], filename: string) {
  // Note: In a real app, you'd use a PDF library like jspdf
  console.log('Exporting to PDF:', { data, filename });
}