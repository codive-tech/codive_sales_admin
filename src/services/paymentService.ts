import type { Payment } from '../types';

export async function generatePaymentLink(payment: Payment): Promise<string> {
  // In production, this would make an API call to your payment gateway
  // For demo purposes, we'll generate a mock link
  const baseUrl = 'https://payment.example.com';
  const params = new URLSearchParams({
    schoolId: payment.schoolId,
    amount: payment.amount.toString(),
    reference: payment.id
  });

  return `${baseUrl}/pay?${params.toString()}`;
}

export function formatPaymentAmount(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}