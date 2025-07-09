import React from 'react';
import { Brain, Bot, Code, Banknote, Globe, GraduationCap, BookOpen, Laptop } from 'lucide-react';

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
      description: 'Artificial Intelligence & Machine Learning',
    },
    'Robotics Junior': {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      icon: Bot,
      description: 'Hands-on robotics for young minds',
    },
    'Robotics Senior': {
      bgColor: 'bg-blue-200',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-300',
      icon: Bot,
      description: 'Advanced robotics & automation concepts',
    },
    'Coding Explorer': {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: Code,
      description: 'Early-stage logic & coding exposure',
    },
    'Coding Challenger': {
      bgColor: 'bg-green-200',
      textColor: 'text-green-900',
      borderColor: 'border-green-300',
      icon: Code,
      description: 'Problem-solving through interactive coding',
    },
    'Coding Innovator': {
      bgColor: 'bg-green-300',
      textColor: 'text-green-900',
      borderColor: 'border-green-400',
      icon: Code,
      description: 'Creative apps, games & project building',
    },
    'Coding Early Level': {
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-800',
      borderColor: 'border-emerald-200',
      icon: Code,
      description: 'Block-based coding and logic games',
    },
    'Complete Java': {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: Laptop,
      description: 'Object-Oriented Programming with Java',
    },
    'Web-development': {
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-800',
      borderColor: 'border-indigo-200',
      icon: Globe,
      description: 'Frontend & Backend Web Projects',
    },
    'Financial Literacy': {
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200',
      icon: Banknote,
      description: 'Money management & financial skills',
    },
    'Coding Mastery': {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: GraduationCap,
      description: 'Capstone-level real-world coding skills',
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