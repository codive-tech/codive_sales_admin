import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

// Brand colors
const colors = {
  primary: '#00AEEF',
  accentYellow: '#FFD600',
  error: '#f55a5a',
  success: '#49c57a'
};

interface CountdownBadgeProps {
  expiryDate: string;
  status: 'paid' | 'pending' | 'expired';
}

export const CountdownBadge: React.FC<CountdownBadgeProps> = ({ expiryDate, status }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiryDate).getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  // Don't show countdown for paid or expired payments
  if (status === 'paid' || status === 'expired') {
    return null;
  }

  // If expired but status is still pending
  if (isExpired) {
    return (
      <div 
        className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 opacity-100"
        style={{ 
          backgroundColor: '#fef2f2',
          color: colors.error
        }}
      >
        <AlertTriangle size={12} />
        <span>Expired</span>
      </div>
    );
  }

  // Show countdown for pending payments
  const getCountdownText = () => {
    if (timeLeft.days > 0) {
      return `${timeLeft.days}d ${timeLeft.hours}h`;
    } else if (timeLeft.hours > 0) {
      return `${timeLeft.hours}h ${timeLeft.minutes}m`;
    } else if (timeLeft.minutes > 0) {
      return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
    } else {
      return `${timeLeft.seconds}s`;
    }
  };

  const getBadgeStyle = () => {
    if (timeLeft.days <= 1) {
      return {
        backgroundColor: '#fef3c7',
        color: colors.accentYellow
      };
    } else if (timeLeft.days <= 3) {
      return {
        backgroundColor: '#fef7e0',
        color: '#f59e0b'
      };
    } else {
      return {
        backgroundColor: '#f0fdf4',
        color: colors.success
      };
    }
  };

  return (
    <div 
      className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
      style={getBadgeStyle()}
    >
      <Clock size={12} />
      <span>Expires in {getCountdownText()}</span>
    </div>
  );
}; 