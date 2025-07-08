import React, { useState, useEffect } from 'react';
import { ReportHeader } from '../components/revenue/ReportHeader';
import { RevenueTable } from '../components/revenue/RevenueTable';
import { MobileFilterDrawer } from '../components/revenue/MobileFilterDrawer';
import Toast from '../components/ui/Toast';
import { RevenueFilters, RevenueRecord } from '../types';
import { mockRevenueData } from '../data/revenueData';
import { exportRevenueToCSV } from '../utils/export';

const Revenue = () => {
  const [filters, setFilters] = useState<RevenueFilters>({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    leadType: '',
    program: '',
    status: ''
  });

  const [filteredData, setFilteredData] = useState<RevenueRecord[]>(mockRevenueData);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter data based on current filters
  useEffect(() => {
    let filtered = mockRevenueData;

    // Filter by date range
    // filtered = filtered.filter(record => {
    //   const recordDate = new Date(record.date);
    //   const startDate = new Date(filters.dateRange.start);
    //   const endDate = new Date(filters.dateRange.end);
    //   return recordDate >= startDate && recordDate <= endDate;
    // });

    // // Filter by lead type
    // if (filters.leadType) {
    //   filtered = filtered.filter(record => record.leadType === filters.leadType);
    // }

    // // Filter by program
    // if (filters.program) {
    //   filtered = filtered.filter(record => record.program === filters.program);
    // }

    // // Filter by status
    // if (filters.status) {
    //   filtered = filtered.filter(record => record.paymentStatus === filters.status);
    // }

    setFilteredData(filtered);
  }, [filters]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      exportRevenueToCSV(filteredData, `revenue-report-${new Date().toISOString().split('T')[0]}.csv`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRowClick = (record: RevenueRecord) => {
    console.log('Clicked record:', record);
    // You can implement modal or navigation logic here
  };

  return (
    <div className="min-h-screen bg-[#E6F6FB] p-6">
      <div className="max-w-7xl mx-auto">
        <ReportHeader
          filters={filters}
          onFiltersChange={setFilters}
          data={filteredData}
          onExport={handleExport}
          isLoading={isExporting}
          onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
        />
        
        <RevenueTable
          data={filteredData}
          onRowClick={handleRowClick}
        />
      </div>

      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {showToast && (
        <Toast
          message="Report exported successfully"
          type="success"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Revenue;