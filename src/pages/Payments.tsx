import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Filter, 
  Calendar, 
  Copy, 
  CheckCircle, 
  Clock, 
  XCircle,
  Search,
  Download,
  HelpCircle,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'react-toastify';
import { PaymentTabs } from '../components/payments/PaymentTabs';
import { PaymentTable } from '../components/payments/PaymentTable';
import { ExportPayments } from '../components/payments/ExportPayments';

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

// Types
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

// Mock data
const mockCourses: Course[] = [
  { id: '1', title: 'Advanced Swimming Techniques', type: 'B2B', basePrice: 5000 },
  { id: '2', title: 'Water Safety & Rescue', type: 'B2C', basePrice: 3000 },
  { id: '3', title: 'Competitive Swimming', type: 'B2B', basePrice: 7500 },
  { id: '4', title: 'Beginner Swimming', type: 'B2C', basePrice: 2500 },
  { id: '5', title: 'Lifeguard Training', type: 'B2B', basePrice: 12000 },
];

const mockPayments: Payment[] = [
  {
    id: '1',
    name: 'Delhi Public School',
    courseTitle: 'Advanced Swimming Techniques',
    amount: 5000,
    finalAmount: 5000,
    status: 'paid',
    razorpayLink: 'https://pay.razorpay.com/link/abc123',
    dateCreated: '2024-01-15',
    paymentDate: '2024-01-16',
    expiryDate: '2024-02-15',
    type: 'school'
  },
  {
    id: '2',
    name: 'St. Mary\'s Convent',
    courseTitle: 'Water Safety & Rescue',
    amount: 3000,
    discount: 10,
    finalAmount: 2700,
    status: 'pending',
    razorpayLink: 'https://pay.razorpay.com/link/def456',
    dateCreated: '2024-01-20',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
    type: 'school'
  },
  {
    id: '3',
    name: 'Rahul Sharma',
    courseTitle: 'Beginner Swimming',
    amount: 2500,
    finalAmount: 2500,
    status: 'expired',
    razorpayLink: 'https://pay.razorpay.com/link/ghi789',
    dateCreated: '2024-01-10',
    expiryDate: '2024-02-10',
    type: 'student'
  },
  {
    id: '4',
    name: 'Kendriya Vidyalaya',
    courseTitle: 'Lifeguard Training',
    amount: 12000,
    discount: 15,
    finalAmount: 10200,
    status: 'paid',
    razorpayLink: 'https://pay.razorpay.com/link/jkl012',
    dateCreated: '2024-01-25',
    paymentDate: '2024-01-26',
    expiryDate: '2024-02-25',
    type: 'school'
  },
  {
    id: '5',
    name: 'Priya Patel',
    courseTitle: 'Competitive Swimming',
    amount: 7500,
    finalAmount: 7500,
    status: 'pending',
    razorpayLink: 'https://pay.razorpay.com/link/mno345',
    dateCreated: '2024-01-28',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 day from now
    type: 'student'
  },
  {
    id: '6',
    name: 'Modern School',
    courseTitle: 'Advanced Swimming Techniques',
    amount: 5000,
    finalAmount: 5000,
    status: 'pending',
    razorpayLink: 'https://pay.razorpay.com/link/pqr678',
    dateCreated: '2024-01-30',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    type: 'school'
  },
  {
    id: '7',
    name: 'Aarav Singh',
    courseTitle: 'Water Safety & Rescue',
    amount: 3000,
    finalAmount: 3000,
    status: 'pending',
    razorpayLink: 'https://pay.razorpay.com/link/stu901',
    dateCreated: '2024-01-31',
    expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString().split('T')[0], // 12 hours from now
    type: 'student'
  }
];

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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

// Generate Payment Modal Component
const GeneratePaymentModal = ({ 
  isOpen, 
  onClose, 
  onGenerate 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onGenerate: (payment: Omit<Payment, 'id' | 'status' | 'dateCreated'>) => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    amount: 0,
    discount: 0,
    expiryDate: '',
    type: 'student' as 'student' | 'school'
  });

  const selectedCourse = mockCourses.find(c => c.id === formData.courseId);
  const finalAmount = formData.amount * (1 - formData.discount / 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    const newPayment: Omit<Payment, 'id' | 'status' | 'dateCreated'> = {
      name: formData.name,
      courseTitle: selectedCourse.title,
      amount: formData.amount,
      discount: formData.discount || undefined,
      finalAmount,
      expiryDate: formData.expiryDate,
      type: formData.type
    };

    onGenerate(newPayment);
    onClose();
    setFormData({ name: '', courseId: '', amount: 0, discount: 0, expiryDate: '', type: 'student' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold" style={{ color: colors.navy }}>
              Generate Payment Link
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name (Student/School)
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'student' | 'school' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="school">School</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>
            <select
              required
              value={formData.courseId}
              onChange={(e) => {
                const course = mockCourses.find(c => c.id === e.target.value);
                setFormData(prev => ({ 
                  ...prev, 
                  courseId: e.target.value,
                  amount: course?.basePrice || 0
                }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a course</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title} ({course.type}) - ₹{course.basePrice}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discount}
              onChange={(e) => setFormData(prev => ({ ...prev, discount: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Final Amount:</span>
              <span className="text-lg font-bold" style={{ color: colors.primary }}>
                ₹{finalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              required
              value={formData.expiryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors"
              style={{ backgroundColor: colors.primary }}
            >
              Generate Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Payment Header Component
const PaymentHeader = ({ 
  onGenerateClick, 
  filters, 
  onFilterChange,
  onExportClick
}: { 
  onGenerateClick: () => void;
  filters: {
    courseType: string;
    status: string;
    dateRange: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onExportClick: () => void;
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.navy }}>
            Manage Payments
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Generate and track payment links for courses
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>

          <button
            onClick={onExportClick}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onGenerateClick}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium transition-colors"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus size={16} />
            <span>Generate New Payment</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`mt-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Type
            </label>
            <select
              value={filters.courseType}
              onChange={(e) => onFilterChange('courseType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Payments Component
export function Payments() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'B2B' | 'B2C'>('all');
  const [filters, setFilters] = useState({
    courseType: '',
    status: '',
    dateRange: ''
  });

  const handleGeneratePayment = (paymentData: Omit<Payment, 'id' | 'status' | 'dateCreated'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: crypto.randomUUID(),
      status: 'pending',
      dateCreated: new Date().toISOString(),
      razorpayLink: `https://pay.razorpay.com/link/${Math.random().toString(36).substr(2, 9)}`
    };

    setPayments(prev => [newPayment, ...prev]);
    toast.success('Payment link generated successfully!');
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleTabChange = (tab: 'all' | 'B2B' | 'B2C') => {
    setActiveTab(tab);
  };

  const handleExportClick = () => {
    // This will be handled by the ExportPayments component
  };

  // Filter payments based on current filters and active tab
  const filteredPayments = payments.filter(payment => {
    // Filter by tab (B2B/B2C)
    if (activeTab !== 'all') {
      const course = mockCourses.find(c => c.title === payment.courseTitle);
      if (course?.type !== activeTab) return false;
    }

    // Filter by course type
    if (filters.courseType) {
      const course = mockCourses.find(c => c.title === payment.courseTitle);
      if (course?.type !== filters.courseType) return false;
    }

    // Filter by status
    if (filters.status && payment.status !== filters.status) return false;

    // Filter by date range
    if (filters.dateRange) {
      const paymentDate = new Date(payment.dateCreated);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - paymentDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (filters.dateRange) {
        case 'today':
          if (diffDays > 1) return false;
          break;
        case 'week':
          if (diffDays > 7) return false;
          break;
        case 'month':
          if (diffDays > 30) return false;
          break;
        case 'quarter':
          if (diffDays > 90) return false;
          break;
      }
    }
    return true;
  });

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <PaymentHeader 
          onGenerateClick={() => setIsModalOpen(true)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onExportClick={handleExportClick}
        />

        {/* Payment Tabs */}
        <PaymentTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Export Button */}
        <div className="flex justify-end">
          <ExportPayments 
            payments={filteredPayments}
            courseType={activeTab === 'all' ? undefined : activeTab}
          />
        </div>

        {/* Payment Table */}
        <PaymentTable 
          payments={filteredPayments}
          courses={mockCourses}
        />

        {/* Generate Payment Modal */}
        <GeneratePaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGenerate={handleGeneratePayment}
        />

        {/* Floating Help Button */}
        <button
          className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: colors.primary }}
        >
          <HelpCircle size={24} style={{ color: colors.textLight }} />
        </button>
      </div>
    </div>
  );
}