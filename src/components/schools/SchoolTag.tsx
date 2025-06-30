import React from 'react';
import { BookOpen, Brain, Code, Database, Globe, Smartphone } from 'lucide-react';

interface SchoolTagProps {
  program: string;
  className?: string;
}

export function SchoolTag({ program, className = '' }: SchoolTagProps) {
  const tagConfig = {
    'AI Bootcamp': {
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200',
      icon: Brain,
      description: 'Artificial Intelligence & Machine Learning'
    },
    'Robotics 101': {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      icon: Brain,
      description: 'Robotics & Automation'
    },
    'Coding Fundamentals': {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: Code,
      description: 'Basic Programming Concepts'
    },
    'Data Science': {
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200',
      icon: Database,
      description: 'Data Analysis & Visualization'
    },
    'Web Development': {
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-800',
      borderColor: 'border-indigo-200',
      icon: Globe,
      description: 'Frontend & Backend Development'
    },
    'Mobile App Development': {
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800',
      borderColor: 'border-pink-200',
      icon: Smartphone,
      description: 'iOS & Android Development'
    },
    'Not Assigned': {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200',
      icon: BookOpen,
      description: 'No program assigned yet'
    }
  };

  const config = tagConfig[program as keyof typeof tagConfig] || tagConfig['Not Assigned'];
  const IconComponent = config.icon;

  return (
    <div className={`group relative ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-200 hover:scale-105 cursor-default ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        <IconComponent className="h-3 w-3" />
        {program}
      </span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#1E2A3B] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
        {config.description}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1E2A3B]"></div>
      </div>
    </div>
  );
} 