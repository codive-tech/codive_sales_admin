import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { 
  Building2, 
  Users, 
  IndianRupee, 
  Link, 
  TrendingUp, 
  TrendingDown,
  Bell,
  Calendar,
  Clock
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
  activeBlue: '#0074B7'
};

// Mock data
const mockData = {
  partnerName: "St. Xavier's School",
  totalSchools: 0,
  totalStudents: 0,
  revenueGenerated: 0,
  revenueChange: 0,
  activeLinks: 0,
  pendingLinks: 0,
  expiredLinks: 0,
  monthlyRevenue: [0,0,0,0,0,0],
  monthlyEnrollments: [0,0,0,0,0,0],
  activities: [] as Array<{
    id: number;
    type: string;
    message: string;
    time: string;
    status: string;
  }>
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
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

  return <span>{count.toLocaleString()}</span>;
};

// Summary Card Component
const SummaryCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  change, 
  changeType = 'neutral' 
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ElementType;
  change?: number | null;
  changeType?: 'positive' | 'negative' | 'neutral';
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      style={{ 
        boxShadow: isHovered ? '0 10px 25px rgba(0, 174, 239, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
        borderColor: isHovered ? colors.primary : colors.borderGrey
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: colors.accentLightBlue }}
        >
          <Icon size={24} style={{ color: colors.primary }} />
        </div>
        {change && (
          <div className="flex items-center space-x-1">
            {changeType === 'positive' ? (
              <TrendingUp size={16} style={{ color: '#10B981' }} />
            ) : changeType === 'negative' ? (
              <TrendingDown size={16} style={{ color: '#EF4444' }} />
            ) : null}
            <span 
              className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              {change ? (change > 0 ? '+' : '') + change + '%' : ''}
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-3xl font-bold" style={{ color: colors.navy }}>
          {title === 'Revenue Generated' ? (
            <span>₹<AnimatedCounter value={value} /></span>
          ) : (
            <AnimatedCounter value={value} />
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

// Dashboard Chart Component
const DashboardChart = () => {
  const [activeTab, setActiveTab] = useState<'revenue' | 'enrollments'>('revenue');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const revenueData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue (₹)',
        data: mockData.monthlyRevenue,
        borderColor: colors.primary,
        backgroundColor: colors.accentLightBlue,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: colors.textLight,
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const enrollmentData = {
    labels: months,
    datasets: [
      {
        label: 'Enrollments',
        data: mockData.monthlyEnrollments,
        backgroundColor: colors.primary,
        borderColor: colors.activeBlue,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: colors.navy,
        titleColor: colors.textLight,
        bodyColor: colors.textLight,
        borderColor: colors.primary,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: colors.borderGrey,
          drawBorder: false
        },
        ticks: {
          color: colors.textDark,
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: colors.textDark,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold" style={{ color: colors.navy }}>
          Monthly Performance
        </h3>
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'revenue' 
                ? 'text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{
              backgroundColor: activeTab === 'revenue' ? colors.primary : 'transparent'
            }}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'enrollments' 
                ? 'text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{
              backgroundColor: activeTab === 'enrollments' ? colors.primary : 'transparent'
            }}
          >
            Enrollments
          </button>
        </div>
      </div>
      
      <div className="h-80">
        {activeTab === 'revenue' ? (
          <Line data={revenueData} options={chartOptions} />
        ) : (
          <Bar data={enrollmentData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

// Activity Feed Component
const ActivityFeed = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'school': return <Building2 size={16} />;
      case 'payment': return <IndianRupee size={16} />;
      case 'enrollment': return <Users size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return colors.primary;
      case 'pending': return colors.accentYellow;
      case 'error': return '#EF4444';
      default: return colors.borderGrey;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Bell size={20} style={{ color: colors.primary }} />
        <h3 className="text-xl font-semibold" style={{ color: colors.navy }}>
          Recent Activity
        </h3>
      </div>
      
      <div className="space-y-4">
        {mockData.activities.length < 1 ? (
          <div className="flex items-center justify-center p-8 text-gray-500">
            <p>No activities found</p>
          </div>
        ) : (
          mockData.activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div 
                className="p-2 rounded-full mt-1"
                style={{ backgroundColor: colors.accentLightBlue }}
              >
                <div style={{ color: getStatusColor(activity.status) }}>
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{activity.time}</span>
                </div>
              </div>
              
              <div 
                className="w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: getStatusColor(activity.status) }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.accentLightBlue }}
          >
            <Building2 size={24} style={{ color: colors.primary }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.navy }}>
              Partner Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Welcome back! Here's your performance overview
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-600">Partner</p>
          <p className="font-semibold" style={{ color: colors.navy }}>
            {mockData.partnerName}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export function Dashboard() {
  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header />
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Total Schools"
            value={mockData.totalSchools}
            subtitle="Schools onboarded"
            icon={Building2}
            change={null}
            changeType="positive"
          />
          <SummaryCard
            title="Total Students"
            value={mockData.totalStudents}
            subtitle="Students enrolled"
            icon={Users}
            change={null}
            changeType="positive"
          />
          <SummaryCard
            title="Revenue Generated"
            value={mockData.revenueGenerated}
            subtitle="Total revenue this year"
            icon={IndianRupee}
            change={null}
            changeType="positive"
          />
          <SummaryCard
            title="Active Links"
            value={mockData.activeLinks}
            subtitle={`${mockData.pendingLinks} pending, ${mockData.expiredLinks} expired`}
            icon={Link}
            change={null}
            changeType="negative"
          />
        </div>
        
        {/* Charts and Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardChart />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}