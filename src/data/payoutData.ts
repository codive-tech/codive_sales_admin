import { PayoutRecord, EarningsSummary } from '../types';

export const mockPayoutData: PayoutRecord[] = [
  // Recent months with good performance
  {
    id: '1',
    month: '2024-01-01',
    totalRevenue: 2500000,
    commissionRate: 15,
    commissionEarned: 375000,
    payoutStatus: 'pending',
    payoutDate: undefined,
    remarks: 'Processing for February 15th payout',
    generatedByRazorpay: true,
    trend: 'up',
    previousMonthRevenue: 2200000
  },
  {
    id: '2',
    month: '2023-12-01',
    totalRevenue: 2200000,
    commissionRate: 15,
    commissionEarned: 330000,
    payoutStatus: 'paid',
    payoutDate: '2024-01-15',
    remarks: 'Successfully processed',
    generatedByRazorpay: true,
    trend: 'up',
    previousMonthRevenue: 1800000
  },
  {
    id: '3',
    month: '2023-11-01',
    totalRevenue: 1800000,
    commissionRate: 15,
    commissionEarned: 270000,
    payoutStatus: 'paid',
    payoutDate: '2023-12-15',
    remarks: 'On-time payment',
    generatedByRazorpay: true,
    trend: 'stable',
    previousMonthRevenue: 1750000
  },
  {
    id: '4',
    month: '2023-10-01',
    totalRevenue: 1750000,
    commissionRate: 15,
    commissionEarned: 262500,
    payoutStatus: 'paid',
    payoutDate: '2023-11-15',
    remarks: 'Regular payout',
    generatedByRazorpay: true,
    trend: 'down',
    previousMonthRevenue: 2000000
  },
  {
    id: '5',
    month: '2023-09-01',
    totalRevenue: 2000000,
    commissionRate: 15,
    commissionEarned: 300000,
    payoutStatus: 'paid',
    payoutDate: '2023-10-15',
    remarks: 'Peak season performance',
    generatedByRazorpay: true,
    trend: 'up',
    previousMonthRevenue: 1600000
  },
  // Earlier months with varied performance
  {
    id: '6',
    month: '2023-08-01',
    totalRevenue: 1600000,
    commissionRate: 15,
    commissionEarned: 240000,
    payoutStatus: 'paid',
    payoutDate: '2023-09-15',
    remarks: 'Monsoon season dip',
    generatedByRazorpay: true,
    trend: 'down',
    previousMonthRevenue: 1900000
  },
  {
    id: '7',
    month: '2023-07-01',
    totalRevenue: 1900000,
    commissionRate: 15,
    commissionEarned: 285000,
    payoutStatus: 'paid',
    payoutDate: '2023-08-15',
    remarks: 'Summer camp success',
    generatedByRazorpay: true,
    trend: 'up',
    previousMonthRevenue: 1500000
  },
  {
    id: '8',
    month: '2023-06-01',
    totalRevenue: 1500000,
    commissionRate: 15,
    commissionEarned: 225000,
    payoutStatus: 'paid',
    payoutDate: '2023-07-15',
    remarks: 'Academic year start',
    generatedByRazorpay: true,
    trend: 'up',
    previousMonthRevenue: 1200000
  },
  {
    id: '9',
    month: '2023-05-01',
    totalRevenue: 1200000,
    commissionRate: 15,
    commissionEarned: 180000,
    payoutStatus: 'paid',
    payoutDate: '2023-06-15',
    remarks: 'Exam season',
    generatedByRazorpay: true,
    trend: 'down',
    previousMonthRevenue: 1400000
  },
  {
    id: '10',
    month: '2023-04-01',
    totalRevenue: 1400000,
    commissionRate: 15,
    commissionEarned: 210000,
    payoutStatus: 'paid',
    payoutDate: '2023-05-15',
    remarks: 'New academic year',
    generatedByRazorpay: true,
    trend: 'up',
    previousMonthRevenue: 1100000
  },
  // Edge cases and special scenarios
  {
    id: '11',
    month: '2023-03-01',
    totalRevenue: 1100000,
    commissionRate: 12,
    commissionEarned: 132000,
    payoutStatus: 'paid',
    payoutDate: '2023-04-15',
    remarks: 'Lower commission rate applied',
    generatedByRazorpay: false,
    trend: 'stable',
    previousMonthRevenue: 1050000
  },
  {
    id: '12',
    month: '2023-02-01',
    totalRevenue: 1050000,
    commissionRate: 12,
    commissionEarned: 126000,
    payoutStatus: 'paid',
    payoutDate: '2023-03-15',
    remarks: 'Winter season',
    generatedByRazorpay: false,
    trend: 'down',
    previousMonthRevenue: 1300000
  },
  {
    id: '13',
    month: '2023-01-01',
    totalRevenue: 1300000,
    commissionRate: 12,
    commissionEarned: 156000,
    payoutStatus: 'paid',
    payoutDate: '2023-02-15',
    remarks: 'New Year boost',
    generatedByRazorpay: false,
    trend: 'up',
    previousMonthRevenue: 1000000
  },
  // Very high performance months
  {
    id: '14',
    month: '2022-12-01',
    totalRevenue: 1000000,
    commissionRate: 12,
    commissionEarned: 120000,
    payoutStatus: 'paid',
    payoutDate: '2023-01-15',
    remarks: 'Year-end performance',
    generatedByRazorpay: false,
    trend: 'up',
    previousMonthRevenue: 800000
  },
  {
    id: '15',
    month: '2022-11-01',
    totalRevenue: 800000,
    commissionRate: 12,
    commissionEarned: 96000,
    payoutStatus: 'paid',
    payoutDate: '2022-12-15',
    remarks: 'Diwali season',
    generatedByRazorpay: false,
    trend: 'down',
    previousMonthRevenue: 900000
  },
  // Special remarks and scenarios
  {
    id: '16',
    month: '2022-10-01',
    totalRevenue: 900000,
    commissionRate: 12,
    commissionEarned: 108000,
    payoutStatus: 'paid',
    payoutDate: '2022-11-15',
    remarks: 'Festival season boost',
    generatedByRazorpay: false,
    trend: 'up',
    previousMonthRevenue: 700000
  },
  {
    id: '17',
    month: '2022-09-01',
    totalRevenue: 700000,
    commissionRate: 12,
    commissionEarned: 84000,
    payoutStatus: 'paid',
    payoutDate: '2022-10-15',
    remarks: 'Monsoon recovery',
    generatedByRazorpay: false,
    trend: 'up',
    previousMonthRevenue: 600000
  },
  {
    id: '18',
    month: '2022-08-01',
    totalRevenue: 600000,
    commissionRate: 12,
    commissionEarned: 72000,
    payoutStatus: 'paid',
    payoutDate: '2022-09-15',
    remarks: 'Heavy monsoon impact',
    generatedByRazorpay: false,
    trend: 'down',
    previousMonthRevenue: 850000
  },
  {
    id: '19',
    month: '2022-07-01',
    totalRevenue: 850000,
    commissionRate: 12,
    commissionEarned: 102000,
    payoutStatus: 'paid',
    payoutDate: '2022-08-15',
    remarks: 'Summer vacation programs',
    generatedByRazorpay: false,
    trend: 'up',
    previousMonthRevenue: 750000
  },
  {
    id: '20',
    month: '2022-06-01',
    totalRevenue: 750000,
    commissionRate: 12,
    commissionEarned: 90000,
    payoutStatus: 'paid',
    payoutDate: '2022-07-15',
    remarks: 'Academic year preparation',
    generatedByRazorpay: false,
    trend: 'stable',
    previousMonthRevenue: 720000
  }
];

// Calculate summary for current period (last 30 days)
export const getCurrentEarningsSummary = (): EarningsSummary => {
  const currentMonth = mockPayoutData[0]; // January 2024
  const totalRevenue = currentMonth.totalRevenue;
  const totalCommission = currentMonth.commissionEarned;
  
  // Calculate next payout date (15th of next month)
  const nextPayoutDate = new Date();
  nextPayoutDate.setDate(15);
  nextPayoutDate.setMonth(nextPayoutDate.getMonth() + 1);
  
  return {
    totalRevenue,
    totalCommission,
    nextPayoutDate: nextPayoutDate.toISOString().split('T')[0],
    period: 'for last 30 days'
  };
}; 