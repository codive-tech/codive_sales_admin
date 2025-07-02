import React, { useState } from 'react';
import { X, Upload, Download, FileText, Users } from 'lucide-react';
import { CreateLeadData, ImportCampaign } from '../../types';

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (leads: CreateLeadData[]) => void;
  isLoading?: boolean;
}

const mockCampaigns: ImportCampaign[] = [
  {
    id: 'fb_summer_2024',
    name: 'Facebook Summer 2024',
    source: 'Facebook',
    leads: [
      {
        fullName: 'John Smith',
        contactNumber: '+1-555-0101',
        email: 'john.smith@email.com',
        leadType: 'Parent',
        programOfInterest: 'AI Bootcamp',
        source: 'Facebook',
        notes: 'Interested in AI program for son',
        status: 'New',
        campaignId: 'FB_SUMMER_2024'
      },
      {
        fullName: 'Sarah Wilson',
        contactNumber: '+1-555-0102',
        email: 'sarah.wilson@email.com',
        leadType: 'Parent',
        programOfInterest: 'Robotics',
        source: 'Facebook',
        notes: 'Saw robotics ad on Facebook',
        status: 'New',
        campaignId: 'FB_SUMMER_2024'
      }
    ]
  },
  {
    id: 'google_ads_q2',
    name: 'Google Ads Q2 2024',
    source: 'Google Ads',
    leads: [
      {
        fullName: 'Mike Johnson',
        contactNumber: '+1-555-0103',
        email: 'mike.johnson@email.com',
        leadType: 'Parent',
        programOfInterest: 'Coding Fundamentals',
        source: 'Google Ads',
        notes: 'Found through Google search',
        status: 'New',
        campaignId: 'GOOGLE_Q2_2024'
      }
    ]
  },
  {
    id: 'whatsapp_campaign',
    name: 'WhatsApp Campaign March',
    source: 'WhatsApp',
    leads: [
      {
        fullName: 'Emily Davis',
        contactNumber: '+1-555-0104',
        email: 'emily.davis@email.com',
        leadType: 'Parent',
        programOfInterest: 'Web Development',
        source: 'WhatsApp',
        notes: 'Contacted through WhatsApp',
        status: 'New',
        campaignId: 'WHATSAPP_MARCH_2024'
      }
    ]
  }
];

export const ImportLeadsModal: React.FC<ImportLeadsModalProps> = ({
  isOpen,
  onClose,
  onImport,
  isLoading = false
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [importType, setImportType] = useState<'campaign' | 'manual'>('campaign');
  const [csvData, setCsvData] = useState<string>('');

  const handleCampaignImport = () => {
    if (!selectedCampaign) return;
    
    const campaign = mockCampaigns.find(c => c.id === selectedCampaign);
    if (campaign) {
      onImport(campaign.leads);
      setSelectedCampaign('');
    }
  };

  const handleCSVImport = () => {
    if (!csvData.trim()) return;
    
    try {
      // Simple CSV parsing (in real app, use a proper CSV parser)
      const lines = csvData.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const leads: CreateLeadData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const lead: CreateLeadData = {
          fullName: values[headers.indexOf('Full Name')] || '',
          contactNumber: values[headers.indexOf('Contact Number')] || '',
          email: values[headers.indexOf('Email')] || '',
          leadType: (values[headers.indexOf('Lead Type')] as 'School' | 'Parent') || 'Parent',
          programOfInterest: values[headers.indexOf('Program of Interest')] || '',
          source: (values[headers.indexOf('Source')] as any) || 'Manual',
          notes: values[headers.indexOf('Notes')] || '',
          status: 'New',
          campaignId: values[headers.indexOf('Campaign ID')] || ''
        };
        leads.push(lead);
      }
      
      onImport(leads);
      setCsvData('');
    } catch (error) {
      console.error('Error parsing CSV:', error);
    }
  };

  const downloadTemplate = () => {
    const template = `Full Name,Contact Number,Email,Lead Type,Program of Interest,Source,Notes,Campaign ID
"John Doe","+1-555-0123","john.doe@email.com","Parent","AI Bootcamp","Manual","Interested in AI program","SUMMER2024"
"Jane Smith","+1-555-0456","jane.smith@email.com","Parent","Robotics","Facebook","Saw ad on Facebook","FB_CAMPAIGN"`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E6F6FB] rounded-lg">
              <Upload className="h-5 w-5 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1E2A3B]">Import Leads</h2>
              <p className="text-sm text-[#666]">Import leads from campaigns or CSV file</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F0F0F0] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Import Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1E2A3B]">Import Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setImportType('campaign')}
                className={`p-4 border rounded-lg text-left transition-all ${
                  importType === 'campaign'
                    ? 'border-[#00AEEF] bg-[#E6F6FB]'
                    : 'border-[#E0E0E0] hover:border-[#00AEEF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#00AEEF]" />
                  <div>
                    <h4 className="font-medium text-[#1E2A3B]">From Campaign</h4>
                    <p className="text-sm text-[#666]">Import from existing campaigns</p>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setImportType('manual')}
                className={`p-4 border rounded-lg text-left transition-all ${
                  importType === 'manual'
                    ? 'border-[#00AEEF] bg-[#E6F6FB]'
                    : 'border-[#E0E0E0] hover:border-[#00AEEF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#00AEEF]" />
                  <div>
                    <h4 className="font-medium text-[#1E2A3B]">CSV Upload</h4>
                    <p className="text-sm text-[#666]">Upload CSV file with leads</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Campaign Import */}
          {importType === 'campaign' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1E2A3B]">Select Campaign</h3>
              <div className="space-y-3">
                {mockCampaigns.map(campaign => (
                  <div
                    key={campaign.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCampaign === campaign.id
                        ? 'border-[#00AEEF] bg-[#E6F6FB]'
                        : 'border-[#E0E0E0] hover:border-[#00AEEF]'
                    }`}
                    onClick={() => setSelectedCampaign(campaign.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#1E2A3B]">{campaign.name}</h4>
                        <p className="text-sm text-[#666]">
                          {campaign.source} • {campaign.leads.length} leads
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs bg-[#00AEEF] text-white rounded">
                          {campaign.source}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedCampaign && (
                <button
                  type="button"
                  onClick={handleCampaignImport}
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Importing...' : 'Import Selected Campaign'}
                </button>
              )}
            </div>
          )}

          {/* CSV Import */}
          {importType === 'manual' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#1E2A3B]">Upload CSV File</h3>
                <button
                  type="button"
                  onClick={downloadTemplate}
                  className="text-sm text-[#00AEEF] hover:text-[#0095D9] flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </button>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1E2A3B]">
                  CSV Content
                </label>
                <textarea
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] resize-none font-mono text-sm"
                  placeholder="Paste your CSV content here or use the template above..."
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>CSV Format:</strong> Full Name, Contact Number, Email, Lead Type, Program of Interest, Source, Notes, Campaign ID
                </p>
              </div>
              
              <button
                type="button"
                onClick={handleCSVImport}
                disabled={isLoading || !csvData.trim()}
                className="w-full px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Importing...' : 'Import CSV Data'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 