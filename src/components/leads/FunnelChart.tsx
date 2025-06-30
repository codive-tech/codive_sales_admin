import React from 'react';
import { Lead } from '../../types';

interface FunnelChartProps {
  leads: Lead[];
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ leads }) => {
  // Calculate funnel metrics
  const totalLeads = leads.length;
  const contactedLeads = leads.filter(lead => 
    ['Contacted', 'Follow-Up', 'Converted'].includes(lead.status)
  ).length;
  const convertedLeads = leads.filter(lead => 
    lead.status === 'Converted'
  ).length;

  const contactedPercentage = totalLeads > 0 ? Math.round((contactedLeads / totalLeads) * 100) : 0;
  const convertedPercentage = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  // Brand colors
  const colors = {
    primary: '#00AEEF',
    accentYellow: '#FFD600',
    navy: '#1E2A3B',
    green: '#49c57a',
    red: '#f55a5a',
    grey: '#E0E0E0'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 mb-6">
      <h3 className="text-lg font-semibold text-[#1E2A3B] mb-4">Conversion Funnel</h3>
      
      {/* Desktop Funnel */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between space-x-4">
          {/* Total Leads */}
          <div className="flex-1 text-center">
            <div className="relative">
              <div 
                className="w-full h-16 rounded-lg flex items-center justify-center text-white font-semibold text-lg mb-2"
                style={{ backgroundColor: colors.primary }}
              >
                {totalLeads}
              </div>
              <div className="text-sm text-[#333333] font-medium">Total Leads</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-[#00AEEF]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="text-xs text-gray-500 mt-1">{contactedPercentage}%</div>
          </div>

          {/* Contacted */}
          <div className="flex-1 text-center">
            <div className="relative">
              <div 
                className="w-full h-16 rounded-lg flex items-center justify-center text-white font-semibold text-lg mb-2"
                style={{ backgroundColor: colors.accentYellow }}
              >
                {contactedLeads}
              </div>
              <div className="text-sm text-[#333333] font-medium">Contacted</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-[#FFD600]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="text-xs text-gray-500 mt-1">{convertedPercentage}%</div>
          </div>

          {/* Converted */}
          <div className="flex-1 text-center">
            <div className="relative">
              <div 
                className="w-full h-16 rounded-lg flex items-center justify-center text-white font-semibold text-lg mb-2"
                style={{ backgroundColor: colors.green }}
              >
                {convertedLeads}
              </div>
              <div className="text-sm text-[#333333] font-medium">Converted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Funnel */}
      <div className="md:hidden space-y-4">
        {/* Total Leads */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.primary + '20' }}>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.primary }}
            >
              {totalLeads}
            </div>
            <div>
              <div className="font-medium text-[#333333]">Total Leads</div>
              <div className="text-sm text-gray-500">All leads in the system</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#00AEEF]">100%</div>
          </div>
        </div>

        {/* Contacted */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.accentYellow + '20' }}>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.accentYellow }}
            >
              {contactedLeads}
            </div>
            <div>
              <div className="font-medium text-[#333333]">Contacted</div>
              <div className="text-sm text-gray-500">Leads we've reached out to</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#FFD600]">{contactedPercentage}%</div>
          </div>
        </div>

        {/* Converted */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.green + '20' }}>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.green }}
            >
              {convertedLeads}
            </div>
            <div>
              <div className="font-medium text-[#333333]">Converted</div>
              <div className="text-sm text-gray-500">Successfully converted leads</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#49c57a]">{convertedPercentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 