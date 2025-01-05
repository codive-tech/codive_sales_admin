import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { login, forgotPassword, isLoading } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = async ({ email }: { email: string }) => {
    await forgotPassword(email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {showForgotPassword ? (
            <ForgotPasswordForm
              onSubmit={handleForgotPassword}
              onBack={() => setShowForgotPassword(false)}
            />
          ) : (
            <>
              <LoginForm onSubmit={login} isLoading={isLoading} />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}