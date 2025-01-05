import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link as LinkIcon, Copy, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { GeneratePaymentModal } from './GeneratePaymentModal';
import { formatPaymentAmount } from '../../services/paymentService';
import type { Payment } from '../../types';

interface PaymentListProps {
  payments: Payment[];
  onGenerateLink: (payment: Payment, amount: number) => void;
}

export function PaymentList({ payments, onGenerateLink }: PaymentListProps) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = async (payment: Payment) => {
    if (payment.paymentLink) {
      await navigator.clipboard.writeText(payment.paymentLink);
      setCopiedId(payment.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.schoolName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatPaymentAmount(payment.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={payment.status === 'paid' ? 'active' : payment.status === 'pending' ? 'pending' : 'closed'}>
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(payment.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {payment.paymentLink ? (
                        <button
                          onClick={() => handleCopyLink(payment)}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          {copiedId === payment.id ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy Link
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          <LinkIcon className="h-4 w-4" />
                          Generate Link
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPayment && (
        <GeneratePaymentModal
          isOpen={true}
          onClose={() => setSelectedPayment(null)}
          payment={selectedPayment}
          onGenerate={(amount) => {
            onGenerateLink(selectedPayment, amount);
            setSelectedPayment(null);
          }}
        />
      )}
    </>
  );
}