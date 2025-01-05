export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function aggregateMetrics(data: any[], key: string, timeframe: string) {
  return data.reduce((acc, curr) => {
    const period = new Date(curr.date).toLocaleDateString('en-US', {
      [timeframe]: 'long',
    });
    
    acc[period] = (acc[period] || 0) + curr[key];
    return acc;
  }, {});
}