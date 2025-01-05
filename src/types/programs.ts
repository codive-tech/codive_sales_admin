import type { ElementType } from 'react';

export interface ProgramTemplate {
  id: string;
  name: string;
  icon: ElementType;
  description: string;
  defaultDuration: string;
  defaultClasses: number;
}

export interface ProgramDetails {
  name: string;
  description: string;
  duration: string;
  classCount: number;
  templateId?: string;
}