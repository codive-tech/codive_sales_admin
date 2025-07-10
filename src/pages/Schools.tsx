import React, { useState, useMemo } from 'react';
import { SchoolFilters } from '../components/schools/SchoolFilters';
import { SchoolTable } from '../components/schools/SchoolTable';
import { AddSchoolModal } from '../components/schools/AddSchoolModal';
import { EditSchoolModal } from '../components/schools/EditSchoolModal';
import { SuspendSchoolModal } from '../components/schools/SuspendSchoolModal';
import { SchoolProfileModal } from '../components/schools/SchoolProfileModal';
import { filterData } from '../utils/filters';
import { SchoolData } from "../types/school";
import { mockSchools } from "../data/mockData";
import { Plus, Building, Download, Search, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { toast } from "react-toastify";

export function Schools() {
  // State management
  const [schools, setSchools] = useState<SchoolData[]>(mockSchools);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSchools = schools.length;
    const totalStudentsEnrolled = schools.reduce((sum, school) => sum + (school.totalStudents || 0), 0);
    const paidSchools = schools.filter(school => (school.lockedDealAmount || 0) > 0).length;
    const unpaidSchools = schools.filter(school => !school.lockedDealAmount || school.lockedDealAmount === 0).length;
    const activeSchools = schools.filter(school => school.status === 'active').length;
    const inactiveSchools = schools.filter(school => school.status !== 'active').length;

    return {
      totalSchools,
      totalStudentsEnrolled,
      paidSchools,
      unpaidSchools,
      activeSchools,
      inactiveSchools
    };
  }, [schools]);

  // Filter schools based on all criteria
  const filteredSchools = useMemo(() => {
    return filterData(
      schools,
      searchQuery,
      'name',
      ['name', 'principalName', 'contactEmail', 'schoolCode']
    ).filter((school) => {
      if (countryFilter && school?.country !== countryFilter) return false;
      if (programFilter && school?.course !== programFilter) return false;
      if (statusFilter && school?.status !== statusFilter) return false;
      return true;
    });
  }, [schools, searchQuery, countryFilter, programFilter, statusFilter]);

  const handleAddSubmit = async (data: Partial<SchoolData>) => {
    setIsLoading(true);
    try {
      // Add new school
      const newSchool: SchoolData = {
        id: `sch_${Date.now()}`,
        status: 'active',
        totalStudents: 0,
        enrollmentDate: new Date().toISOString(),
        creationDate: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        ...data as Omit<SchoolData, 'id' | 'enrollmentDate' | 'creationDate' | 'lastEdited'>
      };
      setSchools(prev => [newSchool, ...prev]);
      toast.success('School added successfully!');
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding school:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (data: Partial<SchoolData>) => {
    if (!selectedSchool) return;
    
    setIsLoading(true);
    try {
      // Update existing school
      const updatedSchools = schools.map(school => 
        school.id === selectedSchool.id 
          ? { ...school, ...data, lastEdited: new Date().toISOString() }
          : school
      );
      setSchools(updatedSchools);
      toast.success('School updated successfully!');
      setShowEditModal(false);
      setSelectedSchool(undefined);
    } catch (error) {
      console.error('Error updating school:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (school: SchoolData) => {
    setSelectedSchool(school);
    setShowEditModal(true);
  };

  const handleSuspend = (school: SchoolData) => {
    setSelectedSchool(school);
    setShowSuspendModal(true);
  };

  const handleSuspendConfirm = async (reason: string) => {
    if (!selectedSchool) return;
    
    setIsLoading(true);
    try {
      // Update school status to suspended
      const updatedSchools = schools.map(school => 
        school.id === selectedSchool.id 
          ? { 
              ...school, 
              status: 'suspended',
              lastEdited: new Date().toISOString(),
              notes: `${school.notes || ''}\n\nSuspended on ${new Date().toLocaleDateString()}: ${reason}`
            }
          : school
      );
      setSchools(updatedSchools);
      
      toast.success('School access suspended successfully!');
      setShowSuspendModal(false);
      setSelectedSchool(undefined);
    } catch (error) {
      console.error('Error suspending school:', error);
      toast.error('Failed to suspend school access.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (school: SchoolData) => {
    setSelectedSchool(school);
    setShowProfileModal(true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCountryFilter('');
    setProgramFilter('');
    setStatusFilter('');
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['School Name', 'School Code', 'Contact Person', 'Role', 'Email', 'Phone', 'Location', 'Program', 'Status', 'Expected Students', 'Current Students', 'Deal Amount', 'Deal Currency', 'Enrollment Date'],
      ...filteredSchools.map(school => [
        school.name || '',
        school.schoolCode || '',
        school.principalName || '',
        school.contactPersonRole || '',
        school.contactEmail || '',
        school.contactNumber || '',
        `${school.city || ''}, ${school.country || ''}`,
        school.course || 'Not Assigned',
        school.status || '',
        school.totalStudentsExpected?.toString() || '0',
        school.totalStudents?.toString() || '0',
        school.lockedDealAmount?.toString() || '0',
        school.lockedDealCurrency || 'Not specified',
        school.enrollmentDate ? new Date(school.enrollmentDate).toLocaleDateString() : ''
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schools_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Schools data exported successfully!');
  };

  // Get unique countries and programs for filters
  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(schools.map(school => school.country).filter(Boolean))] as string[];
    return uniqueCountries.sort();
  }, [schools]);

  const programs = useMemo(() => {
    const uniquePrograms = [...new Set(schools.map(school => school.course).filter(Boolean))] as string[];
    return uniquePrograms.sort();
  }, [schools]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#E6F6FB] rounded-lg">
              <Building className="h-6 w-6 text-[#00AEEF]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1E2A3B]">Manage Schools</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 text-[#666] border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => {
                setSelectedSchool(undefined);
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0095D9] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add School
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 pt-6 border-t border-[#E0E0E0]">
          <div className="bg-[#EAF6FF] rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-[#0481FF]" />
              <span className="text-sm font-medium text-[#003C64]">Total Schools</span>
            </div>
            <p className="text-2xl font-bold text-[#0481FF] mt-1">{stats.totalSchools}</p>
          </div>
          
          <div className="bg-[#EAF6FF] rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#0481FF]" />
              <span className="text-sm font-medium text-[#003C64]">Students Enrolled</span>
            </div>
            <p className="text-2xl font-bold text-[#0481FF] mt-1">{stats.totalStudentsEnrolled}</p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#49c57a]" />
              <span className="text-sm font-medium text-[#003C64]">Paid Schools</span>
            </div>
            <p className="text-2xl font-bold text-[#49c57a] mt-1">{stats.paidSchools}</p>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-[#FFD600]" />
              <span className="text-sm font-medium text-[#003C64]">Unpaid Schools</span>
            </div>
            <p className="text-2xl font-bold text-[#FFD600] mt-1">{stats.unpaidSchools}</p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#49c57a]" />
              <span className="text-sm font-medium text-[#003C64]">Active Schools</span>
            </div>
            <p className="text-2xl font-bold text-[#49c57a] mt-1">{stats.activeSchools}</p>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-[#f55a5a]" />
              <span className="text-sm font-medium text-[#003C64]">Inactive Schools</span>
            </div>
            <p className="text-2xl font-bold text-[#f55a5a] mt-1">{stats.inactiveSchools}</p>
          </div>
        </div>
      </div>

      {/* Desktop Search */}
      <div className="hidden lg:block">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
          <input
            type="text"
            placeholder="Search schools by name, contact, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <SchoolFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        countryFilter={countryFilter}
        onCountryChange={setCountryFilter}
        programFilter={programFilter}
        onProgramChange={setProgramFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
        countries={countries}
        programs={programs}
      />

      {/* School Table */}
      <SchoolTable
        schools={filteredSchools}
        onEdit={handleEdit}
        onSuspend={handleSuspend}
        onView={handleView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Modals */}
      <AddSchoolModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedSchool(undefined);
        }}
        onSubmit={handleAddSubmit}
        school={undefined}
        isLoading={isLoading}
      />

      <EditSchoolModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedSchool(undefined);
        }}
        onSubmit={handleEditSubmit}
        school={selectedSchool}
        isLoading={isLoading}
      />

      <SuspendSchoolModal
        isOpen={showSuspendModal}
        onClose={() => {
          setShowSuspendModal(false);
          setSelectedSchool(undefined);
        }}
        onConfirm={handleSuspendConfirm}
        school={selectedSchool}
        isLoading={isLoading}
      />

      <SchoolProfileModal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedSchool(undefined);
        }}
        school={selectedSchool}
      />
    </div>
  );
}