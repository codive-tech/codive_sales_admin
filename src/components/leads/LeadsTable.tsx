import React, { useState } from 'react';
import { Lead } from '../../types';
import LeadStatusBadge from './LeadStatusBadge';
import { leadStatuses } from '../../data/mockData';
import { WhatsAppButton } from './WhatsAppButton';

interface LeadsTableProps {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void;
  onEditLead: (lead: Lead) => void;
  onViewNotes: (lead: Lead) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onStatusChange, onEditLead, onViewNotes }) => {
  const [editingStatus, setEditingStatus] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    onStatusChange(leadId, newStatus);
    setEditingStatus(null);
  };

  const getTypeBadgeColor = (type: 'School' | 'Parent') => {
    return type === 'School' 
      ? 'bg-[#00AEEF] text-white' 
      : 'bg-[#D0F0FA] text-[#1E2A3B]';
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[#333333] mb-2">No leads found</h3>
        <p className="text-gray-500">Try adjusting your filters or add a new lead.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#E6F6FB] sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Program</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Campaign</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Source</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Created On</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#1E2A3B]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E0E0]">
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className="hover:bg-[#F8F9FA] transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-[#333333]">{lead.fullName}</div>
                    {lead.email && (
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(lead.leadType)}`}>
                    {lead.leadType}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#333333]">{lead.programOfInterest}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#333333]">{lead.contactNumber}</span>
                    <WhatsAppButton
                      phoneNumber={lead.contactNumber}
                      leadName={lead.fullName}
                      programOfInterest={lead.programOfInterest}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  {lead.campaignId ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#D0F0FA] text-[#1E2A3B]">
                      {lead.campaignId}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingStatus === lead.id ? (
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                      onBlur={() => setEditingStatus(null)}
                      autoFocus
                      className="px-2 py-1 border border-[#E0E0E0] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    >
                      {leadStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  ) : (
                    <div 
                      className="cursor-pointer"
                      onClick={() => setEditingStatus(lead.id)}
                    >
                      <LeadStatusBadge status={lead.status} />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-[#333333]">{lead.source}</td>
                <td className="px-6 py-4 text-[#333333]">{formatDate(lead.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onViewNotes(lead)}
                      className="text-[#00AEEF] hover:text-[#0095D9] text-sm font-medium transition-colors"
                    >
                      View Notes
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => onEditLead(lead)}
                      className="text-[#00AEEF] hover:text-[#0095D9] text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleStatusChange(lead.id, 'Converted')}
                      className="text-[#49c57a] hover:text-[#3da066] text-sm font-medium transition-colors"
                    >
                      Convert
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {leads.map((lead) => (
          <div 
            key={lead.id} 
            className="p-4 border-b border-[#E0E0E0] hover:bg-[#F8F9FA] transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-[#333333] mb-1">{lead.fullName}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(lead.leadType)}`}>
                    {lead.leadType}
                  </span>
                  <LeadStatusBadge status={lead.status} />
                  {lead.campaignId && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#D0F0FA] text-[#1E2A3B]">
                      {lead.campaignId}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewNotes(lead)}
                  className="text-[#00AEEF] hover:text-[#0095D9] text-sm font-medium transition-colors"
                >
                  Notes
                </button>
                <button
                  onClick={() => onEditLead(lead)}
                  className="text-[#00AEEF] hover:text-[#0095D9] text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleStatusChange(lead.id, 'Converted')}
                  className="text-[#49c57a] hover:text-[#3da066] text-sm font-medium transition-colors"
                >
                  Convert
                </button>
              </div>
            </div>
            
            <div className="space-y-1 text-sm text-[#333333]">
              <div><span className="font-medium">Program:</span> {lead.programOfInterest}</div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Contact:</span> 
                <span>{lead.contactNumber}</span>
                <WhatsAppButton
                  phoneNumber={lead.contactNumber}
                  leadName={lead.fullName}
                  programOfInterest={lead.programOfInterest}
                />
              </div>
              {lead.email && <div><span className="font-medium">Email:</span> {lead.email}</div>}
              <div><span className="font-medium">Source:</span> {lead.source}</div>
              <div><span className="font-medium">Created:</span> {formatDate(lead.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsTable; 