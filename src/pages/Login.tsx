import React, { useState, useEffect } from 'react';
import { LoginCard } from '../components/auth/LoginCard';
import { ForgotPasswordCard } from '../components/auth/ForgotPasswordCard';
import { LoginBackground } from '../components/auth/LoginBackground';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { login, forgotPassword, isLoading } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');

  // Fade-in animation on page load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      setError('');
      await login(data);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleForgotPassword = async ({ email }: { email: string }) => {
    try {
    await forgotPassword(email);
    } catch (err) {
      // Error handling is done within the ForgotPasswordCard component
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      <LoginBackground />
      
      {/* Main Content */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          className={`transition-all duration-700 ease-out transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {showForgotPassword ? (
            <ForgotPasswordCard
              onSubmit={handleForgotPassword}
              onBack={() => setShowForgotPassword(false)}
            />
          ) : (
            <LoginCard
              onSubmit={handleLogin}
              onForgotPassword={() => setShowForgotPassword(true)}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 text-center">
        <div 
          className={`transition-all duration-700 ease-out delay-300 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-[#666]">
            © 2024 Codive. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6 text-xs text-[#666]">
            <a href="#" className="hover:text-[#00AEEF] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#00AEEF] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#00AEEF] transition-colors duration-200">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}