// Mock data for the dashboard
export const mockMetrics = {
  schools: {
    current: 150,
    previous: 120
  },
  revenue: {
    current: 450000,
    previous: 380000
  },
  students: {
    current: 3500,
    previous: 3000
  },
  payments: {
    current: 425000,
    previous: 350000
  }
};

export const mockSalesData = [
  { month: 'Jan', revenue: 320000, schools: 12 },
  { month: 'Feb', revenue: 450000, schools: 15 },
  { month: 'Mar', revenue: 520000, schools: 18 },
  { month: 'Apr', revenue: 480000, schools: 16 },
  { month: 'May', revenue: 600000, schools: 20 },
  { month: 'Jun', revenue: 650000, schools: 22 }
];

export const mockActivities = [
  {
    id: '1',
    type: 'enrollment',
    description: 'New school enrolled: Springfield High',
    timestamp: '2024-03-15T10:30:00Z',
    schoolId: 'sch_1',
    schoolName: 'Springfield High'
  },
  {
    id: '2',
    type: 'payment',
    description: 'Payment received from Riverside Academy',
    timestamp: '2024-03-15T09:15:00Z',
    schoolId: 'sch_2',
    schoolName: 'Riverside Academy'
  },
  {
    id: '3',
    type: 'course',
    description: 'New course assigned to Mountain View School',
    timestamp: '2024-03-14T16:45:00Z',
    schoolId: 'sch_3',
    schoolName: 'Mountain View School'
  }
];