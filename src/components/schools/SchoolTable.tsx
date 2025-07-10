import React, { useState, useMemo } from 'react';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  AlertTriangle, 
  Users, 
  MapPin, 
  ChevronUp, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  DollarSign,
  Hash,
  Info,
  X
} from 'lucide-react';
import { SchoolData } from '../../types/school';
import { SchoolStatusBadge } from './SchoolStatusBadge';
import { SchoolTag } from './SchoolTag';

interface SchoolTableProps {
  schools: SchoolData[];
  onEdit: (school: SchoolData) => void;
  onSuspend: (school: SchoolData) => void;
  onView: (school: SchoolData) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

type SortField = 'name' | 'country' | 'course' | 'totalStudents' | 'totalStudentsExpected' | 'lockedDealAmount' | 'status' | 'enrollmentDate';
type SortDirection = 'asc' | 'desc';

// Utility function to generate school ID
const generateSchoolId = (school: SchoolData, index: number): string => {
  const serialNumber = (index + 1).toString().padStart(3, '0');
  const country = school.country || 'UNK';
  const locationCode = getCountryAbbreviation(country);
  return `SCH-${serialNumber}-${locationCode}`;
};

// Utility function to get country abbreviation
const getCountryAbbreviation = (country: string): string => {
  const countryMap: Record<string, string> = {
    'Germany': 'GER',
    'United Kingdom': 'UK',
    'India': 'IND',
    'United States': 'USA',
    'Canada': 'CAN',
    'Australia': 'AUS',
    'France': 'FRA',
    'Singapore': 'SGP',
    'UAE': 'UAE'
  };
  return countryMap[country] || country.substring(0, 3).toUpperCase();
};

// Component for displaying grade-wise courses
const GradeWiseCourses = ({ gradeAllocations }: { gradeAllocations?: any[] }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  if (!gradeAllocations || gradeAllocations.length === 0) {
    return <SchoolTag program="Not Assigned" />;
  }

  const assignedCourses = gradeAllocations
    .filter(allocation => allocation.course && allocation.course !== 'Not Assigned' && allocation.course !== '')
    .map(allocation => ({
      grade: allocation.grade,
      course: allocation.course
    }));

  if (assignedCourses.length === 0) {
    return <SchoolTag program="Not Assigned" />;
  }

  const firstCourse = assignedCourses[0];
  const remainingCount = assignedCourses.length - 1;

  return (
    <div className="flex items-center gap-2">
      <SchoolTag program={firstCourse.course} />
      {remainingCount > 0 && (
        <div className="relative">
          <span
            className="inline-flex items-center gap-1 px-2 py-1 bg-[#E6F6FB] text-[#00AEEF] text-xs font-medium rounded-md border border-[#00AEEF] cursor-pointer hover:bg-[#D0F0FA] transition-colors"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowInfoModal(true)}
          >
            +{remainingCount} More
          </span>
          
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#1E2A3B] text-white text-xs rounded-md opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 min-w-max">
              {assignedCourses.slice(1).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-[#00AEEF]">•</span>
                  <span>Grade {item.grade} – {item.course}</span>
                </div>
              ))}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1E2A3B]"></div>
            </div>
          )}
        </div>
      )}

      {/* Info Modal for mobile or when tooltip doesn't work */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowInfoModal(false)}>
          <div className="bg-white rounded-lg p-4 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#1E2A3B]">Grade-wise Courses</h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-[#666] hover:text-[#1E2A3B]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {assignedCourses.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-[#00AEEF]">•</span>
                  <span className="font-medium">Grade {item.grade}</span>
                  <span className="text-[#666]">–</span>
                  <span>{item.course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// School ID Badge Component
const SchoolIdBadge = ({ schoolId }: { schoolId: string }) => (
  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#E6F6FB] text-[#00AEEF] text-xs font-medium rounded-md border border-[#00AEEF]">
    <Hash className="h-3 w-3" />
    {schoolId}
  </div>
);

export function SchoolTable({ 
  schools, 
  onEdit, 
  onSuspend, 
  onView,
  searchQuery = '',
  onSearchChange
}: SchoolTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sorting and pagination logic
  const sortedSchools = useMemo(() => {
    return [...schools].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle special cases
      if (sortField === 'enrollmentDate') {
        aValue = new Date(a.enrollmentDate || '').getTime();
        bValue = new Date(b.enrollmentDate || '').getTime();
      } else if (sortField === 'totalStudents') {
        aValue = a.totalStudents || 0;
        bValue = b.totalStudents || 0;
      } else if (sortField === 'totalStudentsExpected') {
        aValue = a.totalStudentsExpected || 0;
        bValue = b.totalStudentsExpected || 0;
      } else if (sortField === 'lockedDealAmount') {
        aValue = a.lockedDealAmount || 0;
        bValue = b.lockedDealAmount || 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [schools, sortField, sortDirection]);

  const paginatedSchools = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedSchools.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedSchools, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedSchools.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-[#00AEEF]" /> : 
      <ChevronDown className="h-4 w-4 text-[#00AEEF]" />;
  };

  const formatCurrency = (amount: number | undefined, currency: string | undefined) => {
    if (!amount || !currency) return 'Not specified';
    
    const currencySymbols: Record<string, string> = {
      'INR': '₹',
      'USD': '$',
      'AED': 'AED',
      'ZAR': 'R',
      'EUR': '€',
      'GBP': '£',
      'CAD': 'C$',
      'AUD': 'A$'
    };
    
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  if (schools.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-[#E6F6FB] rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#1E2A3B] mb-2">
            No schools found
          </h3>
          <p className="text-[#666] text-sm">
            Try adjusting your filters or add a new school to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Search and Filters */}
      <div className="lg:hidden space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
          <input
            type="text"
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#E6F6FB] transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-[#E0E0E0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E0E0E0]">
            <thead className="bg-[#E6F6FB] sticky top-0 z-10">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider cursor-pointer hover:bg-[#D1F2F9] transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    School Name
                    <SortIcon field="name" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider cursor-pointer hover:bg-[#D1F2F9] transition-colors"
                  onClick={() => handleSort('country')}
                >
                  <div className="flex items-center gap-1">
                    Location
                    <SortIcon field="country" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                  Contact Person
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider cursor-pointer hover:bg-[#D1F2F9] transition-colors"
                  onClick={() => handleSort('course')}
                >
                  <div className="flex items-center gap-1">
                    Program Assigned
                    <SortIcon field="course" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider cursor-pointer hover:bg-[#D1F2F9] transition-colors"
                  onClick={() => handleSort('totalStudentsExpected')}
                >
                  <div className="flex items-center gap-1">
                    Expected Students
                    <SortIcon field="totalStudentsExpected" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider cursor-pointer hover:bg-[#D1F2F9] transition-colors"
                  onClick={() => handleSort('totalStudents')}
                >
                  <div className="flex items-center gap-1">
                    Current Students
                    <SortIcon field="totalStudents" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider cursor-pointer hover:bg-[#D1F2F9] transition-colors"
                  onClick={() => handleSort('lockedDealAmount')}
                >
                  <div className="flex items-center gap-1">
                    Deal Amount
                    <SortIcon field="lockedDealAmount" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider cursor-pointer hover:bg-[#D1F2F9] transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <SortIcon field="status" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#1E2A3B] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E0E0E0]">
              {paginatedSchools.map((school) => (
                <tr
                  key={school.id}
                  className={`hover:bg-[#E6F6FB] transition-all duration-200 cursor-pointer ${
                    hoveredRow === school.id ? 'bg-[#E6F6FB]' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(school.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#00AEEF] flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {school.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <SchoolIdBadge schoolId={generateSchoolId(school, schools.indexOf(school))} />
                        <div className="text-sm font-medium text-[#1E2A3B] mt-1">
                          {school.name}
                        </div>
                        <div className="text-sm text-[#666]">
                          {school.contactEmail}
                        </div>
                        <div className="text-xs text-[#666]">
                          {school.schoolCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#1E2A3B]">
                      <MapPin className="h-4 w-4 text-[#666] mr-2" />
                      {school.city}, {school.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#1E2A3B]">
                      <div className="font-medium">{school.principalName}</div>
                      <div className="text-xs text-[#666]">{school.contactPersonRole}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <GradeWiseCourses gradeAllocations={school.gradeAllocations} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#1E2A3B]">
                      <Users className="h-4 w-4 text-[#666] mr-2" />
                      {school.totalStudentsExpected || 0} expected
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#1E2A3B]">
                      <Users className="h-4 w-4 text-[#666] mr-2" />
                      {school.totalStudents || 0} current
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-[#1E2A3B]">
                      <DollarSign className="h-4 w-4 text-[#666] mr-2" />
                      {formatCurrency(school.lockedDealAmount, school.lockedDealCurrency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <SchoolStatusBadge status={school.status || 'inactive'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onView(school);
                        }}
                        className="p-1.5 text-[#00AEEF] hover:bg-[#E6F6FB] rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(school);
                        }}
                        className="p-1.5 text-[#666] hover:bg-[#E6F6FB] rounded transition-colors"
                        title="Edit School"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {school.status === 'active' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSuspend(school);
                          }}
                          className="p-1.5 text-[#f55a5a] hover:bg-[#E6F6FB] rounded transition-colors"
                          title="Suspend Access"
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stack View */}
      <div className="lg:hidden">
        <div className="space-y-4">
          {paginatedSchools.map((school) => (
            <div
              key={school.id}
              className="bg-white border border-[#E0E0E0] rounded-lg p-4 hover:bg-[#E6F6FB] transition-colors duration-150"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#00AEEF] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {school.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <SchoolIdBadge schoolId={generateSchoolId(school, schools.indexOf(school))} />
                    <h3 className="font-medium text-[#1E2A3B] mt-1">{school.name}</h3>
                    <p className="text-sm text-[#666]">{school.contactEmail}</p>
                    <p className="text-xs text-[#666]">{school.schoolCode}</p>
                  </div>
                </div>
                <SchoolStatusBadge status={school.status || 'inactive'} />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Location:</span>
                  <span className="font-medium text-[#1E2A3B]">
                    {school.city}, {school.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Contact Person:</span>
                  <div className="text-right">
                    <div className="font-medium text-[#1E2A3B]">{school.principalName}</div>
                    <div className="text-xs text-[#666]">{school.contactPersonRole}</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Program:</span>
                  <GradeWiseCourses gradeAllocations={school.gradeAllocations} />
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Expected Students:</span>
                  <span className="font-medium text-[#1E2A3B]">
                    {school.totalStudentsExpected || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Current Students:</span>
                  <span className="font-medium text-[#1E2A3B]">
                    {school.totalStudents || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Deal Amount:</span>
                  <span className="font-medium text-[#1E2A3B]">
                    {formatCurrency(school.lockedDealAmount, school.lockedDealCurrency)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[#E0E0E0]">
                <button
                  onClick={() => onView(school)}
                  className="p-2 text-[#00AEEF] hover:bg-[#E6F6FB] rounded transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit(school)}
                  className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                {school.status === 'active' && (
                  <button
                    onClick={() => onSuspend(school)}
                    className="p-2 text-[#f55a5a] hover:bg-[#E6F6FB] rounded transition-colors"
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#666]">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedSchools.length)} of {sortedSchools.length} schools
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#00AEEF] text-white'
                        : 'text-[#666] hover:bg-[#E6F6FB]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-[#666] hover:bg-[#E6F6FB] rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 