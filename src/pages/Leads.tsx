import React, { useState, useMemo } from 'react';
import { Lead, CreateLeadData, LeadFilters, LeadNote, CreateStudentData } from '../types';
import { mockLeads } from '../data/mockData';
import LeadFiltersPanel from '../components/leads/LeadFiltersPanel';
import AddLeadModal from '../components/leads/AddLeadModal';
import LeadsTable from '../components/leads/LeadsTable';
import { FunnelChart } from '../components/leads/FunnelChart';
import { LeadNotesModal } from '../components/leads/LeadNotesModal';
import { EditLeadModal } from '../components/leads/EditLeadModal';
import { ConvertLeadModal } from '../components/leads/ConvertLeadModal';
import { ImportLeadsModal } from '../components/leads/ImportLeadsModal';
import Toast from '../components/ui/Toast';
import { Plus, Upload, Users, TrendingUp } from 'lucide-react';

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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

  // Calculate statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter(l => l.status === 'Converted').length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const contacted = leads.filter(l => l.status === 'Contacted').length;
    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0';

    return { total, converted, newLeads, contacted, conversionRate };
  }, [leads]);

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

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleUpdateLead = (leadData: CreateLeadData) => {
    if (!selectedLead) return;
    
    const updatedLead: Lead = {
      ...selectedLead,
      ...leadData,
      updatedAt: new Date().toISOString()
    };

    setLeads(prev => 
      prev.map(lead => 
        lead.id === selectedLead.id ? updatedLead : lead
      )
    );
    
    setIsEditModalOpen(false);
    setSelectedLead(null);
    showToast('Lead updated successfully!', 'success');
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => 
      prev.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
          : lead
      )
    );
    
    if (newStatus === 'Converted') {
      showToast('Lead marked as converted!', 'success');
    } else {
      showToast(`Lead status updated to ${newStatus}`, 'success');
    }
  };

  const handleConvertToStudent = (lead: Lead) => {
    setSelectedLead(lead);
    setIsConvertModalOpen(true);
  };

  const handleStudentConversion = (studentData: CreateStudentData) => {
    // In a real app, this would create a student and link it to the lead
    // For now, we'll just show a success message
    showToast('Lead successfully converted to student!', 'success');
    setIsConvertModalOpen(false);
    setSelectedLead(null);
  };

  const handleImportLeads = (importedLeads: CreateLeadData[]) => {
    const newLeads: Lead[] = importedLeads.map((leadData, index) => ({
      id: `imported_lead_${Date.now()}_${index}`,
      ...leadData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    setLeads(prev => [...newLeads, ...prev]);
    showToast(`${importedLeads.length} leads imported successfully!`, 'success');
    setIsImportModalOpen(false);
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
              <h1 className="text-3xl font-bold text-[#1E2A3B] mb-2">Leads CRM</h1>
              <p className="text-[#333333]">
                Manage and track your leads efficiently. Currently showing {filteredLeads.length} of {leads.length} leads.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-white text-[#1E2A3B] border border-[#E0E0E0] rounded-lg hover:bg-[#F0F0F0] transition-colors font-medium"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Leads
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                + Add New Lead
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#666]">Total Leads</p>
                <p className="text-2xl font-bold text-[#1E2A3B]">{stats.total}</p>
              </div>
              <div className="p-3 bg-[#E6F6FB] rounded-lg">
                <Users className="h-6 w-6 text-[#00AEEF]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#666]">Converted</p>
                <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#666]">New Leads</p>
                <p className="text-2xl font-bold text-[#00AEEF]">{stats.newLeads}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-[#00AEEF]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#666]">Conversion Rate</p>
                <p className="text-2xl font-bold text-[#FFD600]">{stats.conversionRate}%</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-[#FFD600]" />
              </div>
            </div>
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
              onConvertToStudent={handleConvertToStudent}
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

      {/* Edit Lead Modal */}
      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLead(null);
        }}
        onSubmit={handleUpdateLead}
        lead={selectedLead}
      />

      {/* Convert Lead Modal */}
      <ConvertLeadModal
        isOpen={isConvertModalOpen}
        onClose={() => {
          setIsConvertModalOpen(false);
          setSelectedLead(null);
        }}
        onSubmit={handleStudentConversion}
        lead={selectedLead}
      />

      {/* Import Leads Modal */}
      <ImportLeadsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportLeads}
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