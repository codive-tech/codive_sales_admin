import React, { useState } from 'react';
import { X, Calendar, Clock, Code, Sparkles } from 'lucide-react';

interface ProgramTemplate {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  defaultDuration: string;
  defaultClasses: number;
}

const programTemplates: ProgramTemplate[] = [
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

interface CreateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProgram: (program: any) => void;
}

export function CreateProgramModal({ isOpen, onClose, onCreateProgram }: CreateProgramModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ProgramTemplate | null>(null);
  const [programDetails, setProgramDetails] = useState({
    name: '',
    description: '',
    duration: '',
    classCount: 0
  });

  if (!isOpen) return null;

  const handleTemplateSelect = (template: ProgramTemplate) => {
    setSelectedTemplate(template);
    setProgramDetails({
      name: template.name,
      description: template.description,
      duration: template.defaultDuration,
      classCount: template.defaultClasses
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProgram({
      ...programDetails,
      templateId: selectedTemplate?.id
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full">
          <div className="absolute right-4 top-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Create Custom Program
            </h2>

            {!selectedTemplate ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
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
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Program Name</label>
                    <input
                      type="text"
                      value={programDetails.name}
                      onChange={(e) => setProgramDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      value={programDetails.duration}
                      onChange={(e) => setProgramDetails(prev => ({ ...prev, duration: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Classes</label>
                    <input
                      type="number"
                      value={programDetails.classCount}
                      onChange={(e) => setProgramDetails(prev => ({ ...prev, classCount: parseInt(e.target.value) }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={programDetails.description}
                      onChange={(e) => setProgramDetails(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Back to Templates
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Create Program
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}