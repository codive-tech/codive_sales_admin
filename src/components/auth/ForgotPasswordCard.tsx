import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordCardProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  onBack: () => void;
}

export function ForgotPasswordCard({ onSubmit, onBack }: ForgotPasswordCardProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await onSubmit(data);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E0E0E0]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl font-bold text-[#1E2A3B] mb-2">
              Check Your Email
            </h1>
            <p className="text-[#666] text-sm">
              We've sent a password reset link
            </p>
          </div>

          {/* Success Content */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#1E2A3B]">
                Reset link sent successfully
              </h3>
              <p className="text-sm text-[#666] leading-relaxed">
                We've sent a password reset link to your email address. 
                Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>

            <div className="bg-[#E6F6FB] p-4 rounded-lg border border-[#D0F0FA]">
              <p className="text-xs text-[#1E2A3B]">
                <strong>Note:</strong> The reset link will expire in 24 hours for security reasons.
              </p>
            </div>

            <button
              onClick={onBack}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#00AEEF] text-white rounded-lg font-medium hover:bg-[#0095D9] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E0E0E0]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-[#1E2A3B] mb-2">
            Reset Your Password
          </h1>
          <p className="text-[#666] text-sm">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Reset Form */}
        <form onSubmit={handleSubmit(handleReset)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="reset-email" className="block text-sm font-medium text-[#1E2A3B]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#666]" />
              </div>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className={`block w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-colors duration-200 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-[#E0E0E0] hover:border-[#00AEEF]'
                }`}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#00AEEF] text-white rounded-lg font-medium hover:bg-[#0095D9] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending reset link...</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  <span>Send reset link</span>
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-[#E0E0E0] text-[#666] rounded-lg font-medium hover:bg-[#E6F6FB] hover:text-[#1E2A3B] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:ring-offset-2 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-[#E6F6FB] rounded-lg border border-[#D0F0FA]">
          <p className="text-xs text-[#1E2A3B] text-center">
            <strong>Need help?</strong> Contact our support team if you're having trouble accessing your account.
          </p>
        </div>
      </div>
    </div>
  );
} 