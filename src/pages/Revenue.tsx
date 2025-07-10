import React, { useState, useEffect } from 'react';
import { ReportHeader } from '../components/revenue/ReportHeader';
import { RevenueTable } from '../components/revenue/RevenueTable';
import { MobileFilterDrawer } from '../components/revenue/MobileFilterDrawer';
import Toast from '../components/ui/Toast';
import { RevenueFilters, RevenueRecord } from '../types';
import { mockRevenueData } from '../data/revenueData';
import { exportRevenueToCSV } from '../utils/export';
import { DollarSign, Users, CheckCircle, Clock, XCircle } from 'lucide-react';

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
    filtered = filtered.filter(record => {
      const recordDate = new Date(record.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      return recordDate >= startDate && recordDate <= endDate;
    });

    // Filter by lead type
    if (filters.leadType) {
      filtered = filtered.filter(record => record.leadType === filters.leadType);
    }

    // Filter by program
    if (filters.program) {
      filtered = filtered.filter(record => record.program === filters.program);
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(record => record.paymentStatus === filters.status);
    }

    setFilteredData(filtered);
  }, [filters]);

  // Calculate summary statistics
  const summaryStats = React.useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, record) => sum + record.amountCollected, 0);
    const totalEnrollments = filteredData.length;
    const paidCount = filteredData.filter(record => record.paymentStatus === 'paid').length;
    const pendingCount = filteredData.filter(record => record.paymentStatus === 'pending').length;
    const expiredCount = filteredData.filter(record => record.paymentStatus === 'expired').length;

    return {
      totalRevenue,
      totalEnrollments,
      paidCount,
      pendingCount,
      expiredCount
    };
  }, [filteredData]);

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

        {/* Summary Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-[#EAF6FF] rounded-xl p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#0481FF]" />
                <span className="text-sm font-medium text-[#003C64]">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-[#0481FF] mt-1">
                ₹{summaryStats.totalRevenue.toLocaleString('en-IN')}
              </p>
            </div>
            
            <div className="bg-[#EAF6FF] rounded-xl p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#0481FF]" />
                <span className="text-sm font-medium text-[#003C64]">Total Enrollments</span>
              </div>
              <p className="text-2xl font-bold text-[#0481FF] mt-1">
                {summaryStats.totalEnrollments}
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#49c57a]" />
                <span className="text-sm font-medium text-[#003C64]">Paid</span>
              </div>
              <p className="text-2xl font-bold text-[#49c57a] mt-1">
                {summaryStats.paidCount}
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#FFD600]" />
                <span className="text-sm font-medium text-[#003C64]">Pending</span>
              </div>
              <p className="text-2xl font-bold text-[#FFD600] mt-1">
                {summaryStats.pendingCount}
              </p>
            </div>
            
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-[#f55a5a]" />
                <span className="text-sm font-medium text-[#003C64]">Expired</span>
              </div>
              <p className="text-2xl font-bold text-[#f55a5a] mt-1">
                {summaryStats.expiredCount}
              </p>
            </div>
          </div>
        </div>
        
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