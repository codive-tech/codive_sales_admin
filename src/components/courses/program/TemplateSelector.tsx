import React from 'react';
import type { ProgramTemplate } from '../../../types/programs';

interface TemplateSelectorProps {
  templates: ProgramTemplate[];
  onSelect: (template: ProgramTemplate) => void;
}

export function TemplateSelector({ templates, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => {
        const Icon = template.icon;
        return (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-left"
          >
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {template.defaultDuration} • {template.defaultClasses} classes
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}