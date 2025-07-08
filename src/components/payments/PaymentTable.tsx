import React, { useState } from 'react';
import { Copy, CheckCircle, Clock, XCircle, Search, Edit, BookOpen, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { CountdownBadge } from './CountdownBadge';
import { SendLinkButtons } from './SendLinkButtons';
import { PaymentVerificationModal } from './PaymentVerificationModal';
import { PaymentVerification, PaymentVerificationForm } from '../../types';

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
  error: '#f55a5a',
  warning: '#f59e0b'
};

interface Course {
  id: string;
  title: string;
  type: 'B2B' | 'B2C';
  basePrice: number;
}

interface PaymentTableProps {
  payments: PaymentVerification[];
  courses: Course[];
  onPaymentUpdate: (paymentId: string, formData: PaymentVerificationForm) => void;
  onAssignCourse: (paymentId: string) => void;
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

// Enhanced Status Badge Component with click functionality
const StatusBadge = ({ 
  status, 
  isVerified, 
  onClick 
}: { 
  status: PaymentVerification['status']; 
  isVerified: boolean;
  onClick?: () => void;
}) => {
  const getStatusConfig = (status: PaymentVerification['status']) => {
    switch (status) {
      case 'paid':
        return {
          color: colors.success,
          bgColor: '#f0fdf4',
          icon: CheckCircle,
          text: 'Paid'
        };
      case 'partial':
        return {
          color: colors.warning,
          bgColor: '#fffbeb',
          icon: AlertCircle,
          text: 'Partial'
        };
      case 'pending':
        return {
          color: colors.error,
          bgColor: '#fef2f2',
          icon: Clock,
          text: 'Pending'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className="flex flex-col space-y-1">
      <button
        onClick={onClick}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          onClick ? 'hover:scale-105 cursor-pointer' : 'cursor-default'
        }`}
        style={{ 
          backgroundColor: config.bgColor,
          color: config.color
        }}
        title={onClick ? "Click to update payment status" : undefined}
      >
        <Icon size={14} />
        <span>{config.text}</span>
      </button>
      {isVerified && (
        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
          <CheckCircle size={10} />
          <span>Verified</span>
        </div>
      )}
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

// Assign Course Button Component
const AssignCourseButton = ({ 
  payment, 
  onAssign 
}: { 
  payment: PaymentVerification; 
  onAssign: (paymentId: string) => void;
}) => {
  const isEnabled = (payment.status === 'paid' || payment.status === 'partial') && 
                   payment.isVerified && 
                   !payment.assignedCourse;

  const getButtonConfig = () => {
    if (payment.assignedCourse) {
      return {
        text: 'Course Assigned',
        icon: CheckCircle,
        color: colors.success,
        bgColor: '#f0fdf4',
        disabled: true
      };
    }
    
    if (!isEnabled) {
      return {
        text: 'Verify Payment First',
        icon: AlertCircle,
        color: colors.textDark,
        bgColor: '#f3f4f6',
        disabled: true
      };
    }

    return {
      text: 'Assign Course',
      icon: BookOpen,
      color: colors.textLight,
      bgColor: colors.primary,
      disabled: false
    };
  };

  const config = getButtonConfig();
  const Icon = config.icon;

  return (
    <button
      onClick={() => onAssign(payment.id)}
      disabled={config.disabled}
      className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
      style={{ 
        backgroundColor: config.bgColor,
        color: config.color
      }}
      title={config.disabled ? "Payment must be verified before assigning course" : "Assign course to student"}
    >
      <Icon size={14} />
      <span>{config.text}</span>
    </button>
  );
};

export const PaymentTable: React.FC<PaymentTableProps> = ({ 
  payments, 
  courses, 
  onPaymentUpdate,
  onAssignCourse
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentVerification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success('Payment ID copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error('Failed to copy payment ID');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleStatusClick = (payment: PaymentVerification) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handlePaymentUpdate = async (paymentId: string, formData: PaymentVerificationForm) => {
    await onPaymentUpdate(paymentId, formData);
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleAssignCourse = (paymentId: string) => {
    onAssignCourse(paymentId);
    toast.success('Course assigned successfully!');
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
    <>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student/School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr 
                  key={payment.id} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-gray-900">{payment.paymentIdGenerated}</span>
                      <button
                        onClick={() => copyToClipboard(payment.paymentIdGenerated, payment.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy Payment ID"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {payment.studentId ? `Student: ${payment.studentId}` : `School: ${payment.schoolId}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.studentId ? 'Individual' : 'Institution'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CourseTypeBadge courseTitle={payment.courseTitle} courses={courses} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                    </div>
                    {payment.partialAmount && (
                      <div className="text-xs text-gray-500">
                        Partial: ₹{payment.partialAmount.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={payment.status} 
                      isVerified={payment.isVerified}
                      onClick={() => handleStatusClick(payment)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStatusClick(payment)}
                        className="flex items-center space-x-1 px-2 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Edit payment status"
                      >
                        <Edit size={12} />
                        <span>Edit</span>
                      </button>
                      <AssignCourseButton 
                        payment={payment} 
                        onAssign={handleAssignCourse}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.dateCreated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.dateUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Verification Modal */}
      {selectedPayment && (
        <PaymentVerificationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPayment(null);
          }}
          payment={selectedPayment}
          onUpdate={handlePaymentUpdate}
        />
      )}
    </>
  );
}; 