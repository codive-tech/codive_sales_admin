import React, { useState } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';
import type { Payment } from '../../types';
import { formatPaymentAmount } from '../../services/paymentService';

interface GeneratePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment;
  onGenerate: (amount: number) => void;
}

export function GeneratePaymentModal({ isOpen, onClose, payment, onGenerate }: GeneratePaymentModalProps) {
  const [amount, setAmount] = useState(payment.amount || 0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="absolute right-4 top-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-full">
                <LinkIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Generate Payment Link</h3>
                <p className="text-sm text-gray-600">{payment.schoolName}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Amount</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0"
                    min="0"
                    step="100"
                    required
                  />
                </div>
              </div>

              {amount > 0 && (
                <div className="text-sm text-gray-600">
                  Amount to be paid: {formatPaymentAmount(amount)}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Generate Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}