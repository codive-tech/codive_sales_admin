import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, School, TrendingUp, CreditCard, BookOpen, LogOut, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', path: '/' },
  { icon: School, label: 'Schools', path: '/schools' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: TrendingUp, label: 'Sales', path: '/sales' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
];

export function Layout() {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <School className="h-8 w-8 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900">Codive Admin</h1>
        </div>
        
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-4 px-2 py-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </nav>

      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}