import React from 'react';

// Brand colors
const colors = {
  primary: '#00AEEF',
  navy: '#1E2A3B',
  background: '#E6F6FB',
  hoverBlue: '#0095D9',
  textLight: '#FFFFFF'
};

interface PaymentTabsProps {
  activeTab: 'all' | 'B2B' | 'B2C';
  onTabChange: (tab: 'all' | 'B2B' | 'B2C') => void;
}

export const PaymentTabs: React.FC<PaymentTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'All Payments', count: null },
    { id: 'B2B', label: 'B2B', count: null },
    { id: 'B2C', label: 'B2C', count: null }
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: colors.navy }}>
          Payment Overview
        </h3>
      </div>
      
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm scale-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 scale-95'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-600">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 