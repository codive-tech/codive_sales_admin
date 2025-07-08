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
  EyeOff,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { toast } from 'react-toastify';
import { PaymentTabs } from '../components/payments/PaymentTabs';
import { PaymentTable } from '../components/payments/PaymentTable';
import { ExportPayments } from '../components/payments/ExportPayments';
import { PaymentVerification, PaymentVerificationForm } from '../types';
import { 
  mockPaymentVerifications, 
  updatePaymentVerification, 
  assignCourse,
  filterPayments 
} from '../data/paymentVerificationData';

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

// Mock courses data
const mockCourses: Course[] = [
  { id: '1', title: 'Advanced Swimming Techniques', type: 'B2B', basePrice: 5000 },
  { id: '2', title: 'Water Safety & Rescue', type: 'B2C', basePrice: 3000 },
  { id: '3', title: 'Competitive Swimming', type: 'B2B', basePrice: 7500 },
  { id: '4', title: 'Beginner Swimming', type: 'B2C', basePrice: 2500 },
  { id: '5', title: 'Lifeguard Training', type: 'B2B', basePrice: 12000 },
];

// Payment Summary Cards Component
const PaymentSummaryCards = ({ payments }: { payments: PaymentVerification[] }) => {
  const totalPayments = payments.length;
  const paidPayments = payments.filter(p => p.status === 'paid').length;
  const partialPayments = payments.filter(p => p.status === 'partial').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const verifiedPayments = payments.filter(p => p.isVerified).length;
  const assignedCourses = payments.filter(p => p.assignedCourse).length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const collectedRevenue = payments
    .filter(p => p.status === 'paid' || p.status === 'partial')
    .reduce((sum, p) => sum + (p.partialAmount || p.amount), 0);

  const cards = [
    {
      title: 'Total Payments',
      value: totalPayments,
      icon: IndianRupee,
      color: colors.primary,
      bgColor: colors.accentLightBlue
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: colors.success,
      bgColor: '#f0fdf4'
    },
    {
      title: 'Collected Revenue',
      value: `₹${collectedRevenue.toLocaleString()}`,
      icon: CheckCircle,
      color: colors.success,
      bgColor: '#f0fdf4'
    },
    {
      title: 'Verified Payments',
      value: verifiedPayments,
      icon: CheckCircle,
      color: colors.success,
      bgColor: '#f0fdf4'
    },
    {
      title: 'Pending Verification',
      value: totalPayments - verifiedPayments,
      icon: AlertCircle,
      color: colors.warning,
      bgColor: '#fffbeb'
    },
    {
      title: 'Courses Assigned',
      value: assignedCourses,
      icon: BookOpen,
      color: colors.primary,
      bgColor: colors.accentLightBlue
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold" style={{ color: card.color }}>
                  {card.value}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: card.bgColor }}
              >
                <Icon size={24} style={{ color: card.color }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Payment Filters Component
const PaymentFilters = ({ 
  filters, 
  onFilterChange 
}: { 
  filters: {
    status: string;
    isVerified: string;
    assignedCourse: string;
    dateRange: string;
  };
  onFilterChange: (key: string, value: string) => void;
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: colors.navy }}>
          Payment Filters
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
        >
          <Filter size={16} />
          <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
        </button>
      </div>

      <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="paid">✅ Paid</option>
              <option value="partial">🟡 Partial</option>
              <option value="pending">🔴 Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Status
            </label>
            <select
              value={filters.isVerified}
              onChange={(e) => onFilterChange('isVerified', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All</option>
              <option value="true">✅ Verified</option>
              <option value="false">❌ Not Verified</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Assignment
            </label>
            <select
              value={filters.assignedCourse}
              onChange={(e) => onFilterChange('assignedCourse', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All</option>
              <option value="true">✅ Assigned</option>
              <option value="false">❌ Not Assigned</option>
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
  const [payments, setPayments] = useState<PaymentVerification[]>(mockPaymentVerifications);
  const [activeTab, setActiveTab] = useState<'all' | 'B2B' | 'B2C'>('all');
  const [filters, setFilters] = useState({
    status: '',
    isVerified: '',
    assignedCourse: '',
    dateRange: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleTabChange = (tab: 'all' | 'B2B' | 'B2C') => {
    setActiveTab(tab);
  };

  const handlePaymentUpdate = async (paymentId: string, formData: PaymentVerificationForm) => {
    try {
      const updatedPayments = updatePaymentVerification(payments, paymentId, formData);
      setPayments(updatedPayments);
      toast.success(`Payment status updated to ${formData.status}`);
    } catch (error) {
      toast.error('Failed to update payment');
      throw error;
    }
  };

  const handleAssignCourse = (paymentId: string) => {
    const updatedPayments = assignCourse(payments, paymentId);
    setPayments(updatedPayments);
    toast.success('Course assigned successfully!');
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

    // Filter by status
    if (filters.status && payment.status !== filters.status) return false;

    // Filter by verification status
    if (filters.isVerified !== '') {
      const isVerified = filters.isVerified === 'true';
      if (payment.isVerified !== isVerified) return false;
    }

    // Filter by course assignment
    if (filters.assignedCourse !== '') {
      const assignedCourse = filters.assignedCourse === 'true';
      if (payment.assignedCourse !== assignedCourse) return false;
    }

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
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.navy }}>
                Payment Verification Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage payment verification, course assignments, and payment status updates
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportClick}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Summary Cards */}
        <PaymentSummaryCards payments={payments} />

        {/* Payment Filters */}
        <PaymentFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
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
          onPaymentUpdate={handlePaymentUpdate}
          onAssignCourse={handleAssignCourse}
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