import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginCardProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword: () => void;
  isLoading: boolean;
  error?: string;
}

export function LoginCard({ onSubmit, onForgotPassword, isLoading, error }: LoginCardProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleLogin = async (data: LoginFormData) => {
    try {
      setLocalError('');
      await onSubmit(data);
    } catch (err) {
      setLocalError('Invalid email or password. Please try again.');
    }
  };

  const displayError = error || localError;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E0E0E0]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-[#1E2A3B] mb-2">
            Welcome to Codive Partner Dashboard
          </h1>
          <p className="text-[#666] text-sm">
            Please log in to continue
          </p>
        </div>

        {/* Error Banner */}
        {displayError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{displayError}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-[#1E2A3B]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#666]" />
              </div>
              <input
                id="email"
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
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-[#1E2A3B]">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#666]" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-colors duration-200 ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-[#E0E0E0] hover:border-[#00AEEF]'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#666] hover:text-[#1E2A3B] transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 text-[#00AEEF] focus:ring-[#00AEEF] border-[#E0E0E0] rounded"
              />
              <span className="ml-2 text-sm text-[#666]">Remember me</span>
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-[#00AEEF] hover:text-[#0095D9] font-medium transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#00AEEF] text-white rounded-lg font-medium hover:bg-[#0095D9] focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#E0E0E0] text-center">
          <p className="text-xs text-[#666]">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
} 