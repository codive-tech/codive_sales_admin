import React, { useState, useMemo } from 'react';
import { Lead, CreateLeadData, LeadFilters, LeadNote } from '../types';
import { mockLeads } from '../data/mockData';
import LeadFiltersPanel from '../components/leads/LeadFiltersPanel';
import AddLeadModal from '../components/leads/AddLeadModal';
import LeadsTable from '../components/leads/LeadsTable';
import { FunnelChart } from '../components/leads/FunnelChart';
import { LeadNotesModal } from '../components/leads/LeadNotesModal';
import Toast from '../components/ui/Toast';

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState<LeadFilters>({
    search: '',
    leadType: '',
    status: '',
    program: '',
    source: '',
    campaignId: '',
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  // Filter leads based on current filters
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          lead.fullName.toLowerCase().includes(searchLower) ||
          lead.contactNumber.includes(searchLower) ||
          (lead.email && lead.email.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Lead type filter
      if (filters.leadType && lead.leadType !== filters.leadType) {
        return false;
      }

      // Status filter
      if (filters.status && lead.status !== filters.status) {
        return false;
      }

      // Program filter
      if (filters.program && lead.programOfInterest !== filters.program) {
        return false;
      }

      // Source filter
      if (filters.source && lead.source !== filters.source) {
        return false;
      }

      // Campaign ID filter
      if (filters.campaignId) {
        const campaignLower = filters.campaignId.toLowerCase();
        if (!lead.campaignId || !lead.campaignId.toLowerCase().includes(campaignLower)) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const leadDate = new Date(lead.createdAt);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

        if (startDate && leadDate < startDate) return false;
        if (endDate && leadDate > endDate) return false;
      }

      return true;
    });
  }, [leads, filters]);

  const handleAddLead = (leadData: CreateLeadData) => {
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      ...leadData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setLeads(prev => [newLead, ...prev]);
    showToast('Lead added successfully!', 'success');
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => 
      prev.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
          : lead
      )
    );
    showToast(`Lead status updated to ${newStatus}`, 'success');
  };

  const handleEditLead = (lead: Lead) => {
    // For now, just show a toast. In a real app, you'd open an edit modal
    showToast('Edit functionality coming soon!', 'info');
  };

  const handleViewNotes = (lead: Lead) => {
    setSelectedLead(lead);
    setIsNotesModalOpen(true);
  };

  const handleAddNote = (leadId: string, noteData: Omit<LeadNote, 'id' | 'createdAt'>) => {
    // In a real app, this would be saved to an API
    const newNote: LeadNote = {
      ...noteData,
      id: `note_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    showToast('Note added successfully!', 'success');
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      leadType: '',
      status: '',
      program: '',
      source: '',
      campaignId: '',
      dateRange: {
        start: '',
        end: ''
      }
    });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-[#E6F6FB] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1E2A3B] mb-2">Leads Tracker</h1>
              <p className="text-[#333333]">
                Manage and track your leads efficiently. Currently showing {filteredLeads.length} of {leads.length} leads.
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              + Add New Lead
            </button>
          </div>
        </div>

        {/* Conversion Funnel Chart */}
        <FunnelChart leads={filteredLeads} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <LeadFiltersPanel
              filters={filters}
              onFiltersChange={setFilters}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Leads Table */}
          <div className="lg:col-span-3">
            <LeadsTable
              leads={filteredLeads}
              onStatusChange={handleStatusChange}
              onEditLead={handleEditLead}
              onViewNotes={handleViewNotes}
            />
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddLead}
      />

      {/* Lead Notes Modal */}
      <LeadNotesModal
        isOpen={isNotesModalOpen}
        onClose={() => {
          setIsNotesModalOpen(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
        onAddNote={handleAddNote}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
};

export default Leads;