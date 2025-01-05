import { Code, Sparkles, Calendar, Clock } from 'lucide-react';
import type { ProgramTemplate } from '../types/programs';

export const programTemplates: ProgramTemplate[] = [
  {
    id: 'coding',
    name: 'Programming Course',
    icon: Code,
    description: 'Specialized programming courses in Python, JavaScript, or other languages',
    defaultDuration: '3 months',
    defaultClasses: 36
  },
  {
    id: 'summer',
    name: 'Summer Camp',
    icon: Sparkles,
    description: 'Engaging summer activities combining learning and fun',
    defaultDuration: '6 weeks',
    defaultClasses: 30
  },
  {
    id: 'winter',
    name: 'Winter Program',
    icon: Calendar,
    description: 'Special winter activities and educational programs',
    defaultDuration: '4 weeks',
    defaultClasses: 20
  },
  {
    id: 'hackathon',
    name: 'Hackathon Program',
    icon: Clock,
    description: 'Structured hackathon preparation and execution program',
    defaultDuration: '2 months',
    defaultClasses: 24
  }
];