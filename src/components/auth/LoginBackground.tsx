import React from 'react';

export function LoginBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main background */}
      <div className="absolute inset-0 bg-[#E6F6FB]"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D0F0FA] rounded-full -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#007EA7] rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-[#00AEEF] rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-[#FFD600] rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-[#1E2A3B] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#D0F0FA] opacity-30"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1E2A3B 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
} 