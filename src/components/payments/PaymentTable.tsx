import React, { useState } from 'react';
import { Copy, CheckCircle, Clock, XCircle, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { CountdownBadge } from './CountdownBadge';
import { SendLinkButtons } from './SendLinkButtons';

// Brand colors
const colors = {
  primary: '#00AEEF',
  navy: '#1E2A3B',
  background: '#E6F6FB',
  accentLightBlue: '#D0F0FA',
  accentYellow: '#FFD600',
  textDark: '#333333',
  textLight: '#FFFFFF',
  borderGrey: '#E0E0E0',
  hoverBlue: '#0095D9',
  activeBlue: '#0074B7',
  success: '#49c57a',
  error: '#f55a5a'
};

interface Payment {
  id: string;
  name: string;
  courseTitle: string;
  amount: number;
  discount?: number;
  finalAmount: number;
  status: 'paid' | 'pending' | 'expired';
  razorpayLink?: string;
  dateCreated: string;
  paymentDate?: string;
  expiryDate: string;
  type: 'student' | 'school';
}

interface Course {
  id: string;
  title: string;
  type: 'B2B' | 'B2C';
  basePrice: number;
}

interface PaymentTableProps {
  payments: Payment[];
  courses: Course[];
}

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>₹{count.toLocaleString()}</span>;
};

// Status Badge Component
const StatusBadge = ({ status }: { status: Payment['status'] }) => {
  const getStatusConfig = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return {
          color: colors.success,
          bgColor: '#f0fdf4',
          icon: CheckCircle,
          text: 'Paid'
        };
      case 'pending':
        return {
          color: colors.primary,
          bgColor: colors.accentLightBlue,
          icon: Clock,
          text: 'Pending'
        };
      case 'expired':
        return {
          color: colors.error,
          bgColor: '#fef2f2',
          icon: XCircle,
          text: 'Expired'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div 
      className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium"
      style={{ 
        backgroundColor: config.bgColor,
        color: config.color
      }}
    >
      <Icon size={14} />
      <span>{config.text}</span>
    </div>
  );
};

// Course Type Badge Component
const CourseTypeBadge = ({ courseTitle, courses }: { courseTitle: string; courses: Course[] }) => {
  const course = courses.find(c => c.title === courseTitle);
  const courseType = course?.type || 'Unknown';

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'B2B':
        return {
          color: colors.primary,
          bgColor: colors.accentLightBlue,
          text: 'B2B'
        };
      case 'B2C':
        return {
          color: colors.success,
          bgColor: '#f0fdf4',
          text: 'B2C'
        };
      default:
        return {
          color: colors.textDark,
          bgColor: '#f3f4f6',
          text: 'Unknown'
        };
    }
  };

  const config = getTypeConfig(courseType);

  return (
    <div className="flex flex-col space-y-1">
      <div className="text-sm text-gray-900">{courseTitle}</div>
      <div 
        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit"
        style={{ 
          backgroundColor: config.bgColor,
          color: config.color
        }}
      >
        {config.text}
      </div>
    </div>
  );
};

export const PaymentTable: React.FC<PaymentTableProps> = ({ payments, courses }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success('Payment link copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (payments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accentLightBlue }}>
          <Search size={32} style={{ color: colors.primary }} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
        <p className="text-gray-600">No payments match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr 
                key={payment.id} 
                className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: 'transparent' }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payment.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{payment.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CourseTypeBadge courseTitle={payment.courseTitle} courses={courses} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <AnimatedCounter value={payment.finalAmount} />
                  </div>
                  {payment.discount && (
                    <div className="text-xs text-gray-500">
                      {payment.discount}% off
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CountdownBadge expiryDate={payment.expiryDate} status={payment.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.razorpayLink && (
                    <button
                      onClick={() => copyToClipboard(payment.razorpayLink!, payment.id)}
                      className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Copy size={14} />
                      <span>{copiedId === payment.id ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.razorpayLink && payment.status === 'pending' && (
                    <SendLinkButtons
                      paymentLink={payment.razorpayLink}
                      paymentName={payment.name}
                      courseTitle={payment.courseTitle}
                      amount={payment.finalAmount}
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(payment.dateCreated)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.paymentDate ? formatDate(payment.paymentDate) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 