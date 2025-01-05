import React from 'react';
import { MapPin, Building2, FileText, Fingerprint, Bank, Briefcase, FileCheck } from 'lucide-react';
import { KYCSection } from './KYCSection';

interface KYCPageProps {
  onSectionClick: (section: string) => void;
  completedSections: string[];
}

export function KYCPage({ onSectionClick, completedSections }: KYCPageProps) {
  const sections = [
    {
      id: 'business-address',
      title: 'Business Address',
      icon: MapPin,
      description: 'Provide your business location details'
    },
    {
      id: 'bank-details',
      title: 'Bank Details',
      icon: Bank,
      description: 'Add your banking information'
    },
    {
      id: 'gst-details',
      title: 'GST Details',
      icon: FileText,
      description: 'Enter your GST registration information'
    },
    {
      id: 'identity-proof',
      title: 'Identity Proof',
      icon: Fingerprint,
      description: 'Upload identity verification documents'
    },
    {
      id: 'business-documents',
      title: 'Business Documents',
      icon: FileCheck,
      description: 'Submit required business documentation'
    },
    {
      id: 'business-policy',
      title: 'Business Policy',
      icon: Building2,
      description: 'Review and accept business policies'
    },
    {
      id: 'business-category',
      title: 'Business Category',
      icon: Briefcase,
      description: 'Select your business category'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Complete your KYC</h1>
        <p className="text-lg text-gray-600">You can finish each section in any order</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">YET TO COMPLETE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <KYCSection
              key={section.id}
              {...section}
              isCompleted={completedSections.includes(section.id)}
              onClick={() => onSectionClick(section.id)}
            />
          ))}
        </div>
      </div>

      <button
        className={`w-full py-4 rounded-lg text-center text-lg font-medium transition-colors ${
          completedSections.length === sections.length
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        disabled={completedSections.length !== sections.length}
      >
        Submit KYC
      </button>
    </div>
  );
}