import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  TrendingUp, 
  UserPlus, 
  BarChart3, 
  Activity, 
  CreditCard, 
  BookOpen,
  Menu,
  X,
  Zap,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Schools', path: '/schools' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: TrendingUp, label: 'Sales', path: '/sales' },
  { icon: UserPlus, label: 'Leads', path: '/leads' },
  { icon: BarChart3, label: 'Revenue', path: '/revenue' },
  { icon: Activity, label: 'Tracker', path: '/tracker' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
];

export function Layout() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setIsMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="min-h-screen bg-[#E6F6FB]">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`
        fixed top-0 left-0 h-full w-56 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="flex items-center px-6 py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00AEEF] to-[#8961f5] rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1E2A3B]">Codive</h1>
              <p className="text-xs text-gray-500">Partner Dash</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 font-medium ${
                    isActive
                      ? 'bg-[#E6F6FB] text-[#00AEEF]'
                      : 'text-[#1E2A3B] hover:bg-[#D0F0FA] hover:text-[#00AEEF]'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 flex-shrink-0 ${
                      isActive ? 'text-[#00AEEF]' : 'text-[#1E2A3B]'
                    }`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - User Profile & Logout */}
        <div className="p-4 border-t border-gray-100">
          <div className="mb-4 px-3 py-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-[#1E2A3B]">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-left transition-all duration-200 font-medium text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={20} className="mr-3 flex-shrink-0" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="lg:ml-56 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}