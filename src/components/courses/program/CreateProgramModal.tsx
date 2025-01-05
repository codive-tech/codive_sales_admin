import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';
import { ProgramForm } from './ProgramForm';
import { programTemplates } from '../../../data/programTemplates';
import type { ProgramTemplate, ProgramDetails } from '../../../types/programs';

interface CreateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProgram: (program: ProgramDetails) => void;
}

export function CreateProgramModal({ isOpen, onClose, onCreateProgram }: CreateProgramModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ProgramTemplate | null>(null);
  const [programDetails, setProgramDetails] = useState<ProgramDetails>({
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
      classCount: template.defaultClasses,
      templateId: template.id
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProgram(programDetails);
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
              <TemplateSelector
                templates={programTemplates}
                onSelect={handleTemplateSelect}
              />
            ) : (
              <ProgramForm
                details={programDetails}
                onChange={setProgramDetails}
                onBack={() => setSelectedTemplate(null)}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}