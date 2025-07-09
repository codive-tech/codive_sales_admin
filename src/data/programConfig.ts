import {
  Brain,
  Bot,
  Code,
  Globe,
  Smartphone,
  Gamepad2,
  Rocket,
  GraduationCap,
  Compass,
  BookOpenText,
  Hammer,
  Laptop,
  Star,
  Database,
  Swords,
  Sparkles,
  Flag
} from 'lucide-react';

export const tagConfig = {
  'AI Bootcamp': {
    bgColor: 'bg-purple-200',
    textColor: 'text-purple-900',
    borderColor: 'border-purple-300',
    icon: Brain,
    description: 'Dive into AI, machine learning, and logic',
  },
  'Robotics Junior': {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
    icon: Bot,
    description: 'Introduction to robotics for younger students',
  },
  'Robotics Senior': {
    bgColor: 'bg-blue-200',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-300',
    icon: Bot,
    description: 'Advanced robotics and automation for older students',
  },
  'Coding Explorer': {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    icon: Code,
    description: 'Discover the world of programming fundamentals',
  },
  'Coding Challenger': {
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200',
    icon: Code,
    description: 'Take on challenging coding projects and problems',
  },
  'Coding Innovator': {
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200',
    icon: Rocket,
    description: 'Create innovative solutions with advanced coding',
  },
  'Coding Early Level': {
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-800',
    borderColor: 'border-pink-200',
    icon: Compass,
    description: 'Early introduction to coding concepts for beginners',
  },
  'Complete Java': {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    icon: Laptop,
    description: 'Master Java programming from basics to advanced',
  },
  'Web-development': {
    bgColor: 'bg-cyan-100',
    textColor: 'text-cyan-800',
    borderColor: 'border-cyan-200',
    icon: Globe,
    description: 'Build modern websites and web applications',
  },
  'Financial Literacy': {
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    icon: Database,
    description: 'Learn financial concepts and money management',
  },
  'Coding Mastery': {
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
    icon: GraduationCap,
    description: 'Achieve mastery in programming and software development',
  },
  'Starter pack': {
    bgColor: 'bg-lime-100',
    textColor: 'text-lime-800',
    borderColor: 'border-lime-200',
    icon: Sparkles,
    description: 'Essential tools and concepts to begin your tech journey',
  },
  'Hackathon preparation': {
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200',
    icon: Swords,
    description: 'Prepare for coding competitions and hackathons',
  },
  'Bootcamp adventure': {
    bgColor: 'bg-fuchsia-100',
    textColor: 'text-fuchsia-800',
    borderColor: 'border-fuchsia-200',
    icon: Flag,
    description: 'Intensive bootcamp experience for rapid skill development',
  },
  'Not Assigned': {
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-500',
    borderColor: 'border-gray-100',
    icon: BookOpenText,
    description: 'No course assigned yet',
  },
};

// Helper function to get program options for select dropdowns
export const getProgramOptions = () => {
  return [
    { label: 'Select Program', value: '' },
    ...Object.keys(tagConfig).map(programName => ({
      label: programName,
      value: programName
    }))
  ];
};

// Helper function to get program config by name
export const getProgramConfig = (programName: string) => {
  return tagConfig[programName as keyof typeof tagConfig];
};

// Course options list for student assignment
export const courseOptions = [
  'AI Bootcamp',
  'Robotics Junior',
  'Robotics Senior',
  'Coding Explorer',
  'Coding Challenger',
  'Coding Innovator',
  'Coding Early Level',
  'Complete Java',
  'Web-development',
  'Financial Literacy',
  'Coding Mastery',
  'Starter pack',
  'Hackathon preparation',
  'Bootcamp adventure',
  'Not Assigned'
];

// Program list for compatibility
export const programList = courseOptions; 