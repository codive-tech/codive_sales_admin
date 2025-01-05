import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KYCSectionProps {
  title: string;
  icon: LucideIcon;
  description: string;
  isCompleted: boolean;
  onClick: () => void;
}

export function KYCSection({ title, icon: Icon, description, isCompleted, onClick }: KYCSectionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 p-6 rounded-xl border transition-all ${
        isCompleted
          ? 'border-green-200 bg-green-50'
          : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50'
      }`}
    >
      <div className={`p-3 rounded-lg ${
        isCompleted ? 'bg-green-100' : 'bg-indigo-100'
      }`}>
        <Icon className={`h-6 w-6 ${
          isCompleted ? 'text-green-600' : 'text-indigo-600'
        }`} />
      </div>
      <div className="text-left">
        <h3 className={`text-lg font-semibold ${
          isCompleted ? 'text-green-900' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`text-sm mt-1 ${
          isCompleted ? 'text-green-600' : 'text-gray-500'
        }`}>
          {description}
        </p>
      </div>
    </button>
  );
}