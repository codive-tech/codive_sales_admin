export interface DashboardMetrics {
  schools: {
    current: number;
    previous: number;
  };
  revenue: {
    current: number;
    previous: number;
  };
  students: {
    current: number;
    previous: number;
  };
  payments: {
    current: number;
    previous: number;
  };
}