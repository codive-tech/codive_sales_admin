import React from 'react';
import Icon from '../../../codive_logo.ico';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative group`}>
        <img 
          src={Icon} 
          alt="Codive" 
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-[#00AEEF] opacity-0 group-hover:opacity-10 rounded-full blur-sm transition-opacity duration-300"></div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-[#1E2A3B] ${textSizes[size]} leading-tight`}>
            Codive
          </span>
          <span className="text-xs text-[#666] font-medium">
            Partner Dashboard
          </span>
        </div>
      )}
    </div>
  );
} 