import React, { useState } from 'react';
import { PaymentList } from '../components/payments/PaymentList';
import { useSchools } from '../contexts/SchoolContext';
import { generatePaymentLink } from '../services/paymentService';
import type { Payment } from '../types';

export function Payments() {
  const { schools } = useSchools();
  const [payments, setPayments] = useState<Payment[]>([]);

  const handleGenerateLink = async (payment: Payment, amount: number) => {
    try {
      const paymentLink = await generatePaymentLink({ ...payment, amount });
      
      setPayments(prev => {
        const existingPayment = prev.find(p => p.id === payment.id);
        if (existingPayment) {
          return prev.map(p =>
            p.id === payment.id
              ? { ...p, amount, paymentLink, status: 'pending' }
              : p
          );
        }
        return [...prev, { ...payment, amount, paymentLink, status: 'pending' }];
      });
    } catch (error) {
      console.error('Error generating payment link:', error);
      alert('Failed to generate payment link. Please try again.');
    }
  };

  // Transform schools into payment records
  const schoolPayments = schools
    .filter(school => !payments.some(p => p.schoolId === school.id))
    .map(school => ({
      id: crypto.randomUUID(),
      schoolId: school.id,
      schoolName: school.name,
      amount: 0,
      status: 'pending' as const,
      date: new Date().toISOString()
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-600 mt-1">
          Track and manage school payments
        </p>
      </div>

      <PaymentList 
        payments={[...payments, ...schoolPayments]} 
        onGenerateLink={handleGenerateLink} 
      />
    </div>
  );
}