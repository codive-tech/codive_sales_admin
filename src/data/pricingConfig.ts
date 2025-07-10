// Pricing configuration for different countries, programs, and enrollment modes
export interface PricingConfig {
  country: string;
  currency: string;
  currencySymbol: string;
  programs: {
    [programName: string]: {
      group: number; // Base price for group classes
      one2one: number; // Base price for one-to-one classes
    };
  };
}

// Pricing configuration for different countries
export const pricingConfigs: PricingConfig[] = [
  {
    country: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    programs: {
      'AI Bootcamp': { group: 12000, one2one: 18000 },
      'Robotics Junior': { group: 8000, one2one: 12000 },
      'Robotics Senior': { group: 10000, one2one: 15000 },
      'Coding Explorer': { group: 6000, one2one: 9000 },
      'Coding Challenger': { group: 8000, one2one: 12000 },
      'Coding Innovator': { group: 10000, one2one: 15000 },
      'Coding Early Level': { group: 5000, one2one: 7500 },
      'Complete Java': { group: 12000, one2one: 18000 },
      'Web-development': { group: 9000, one2one: 13500 },
      'Financial Literacy': { group: 7000, one2one: 10500 },
      'Coding Mastery': { group: 15000, one2one: 22500 },
      'Starter pack': { group: 4000, one2one: 6000 },
      'Hackathon preparation': { group: 8000, one2one: 12000 },
      'Bootcamp adventure': { group: 14000, one2one: 21000 },
      'Not Assigned': { group: 0, one2one: 0 }
    }
  },
  {
    country: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    programs: {
      'AI Bootcamp': { group: 150, one2one: 225 },
      'Robotics Junior': { group: 100, one2one: 150 },
      'Robotics Senior': { group: 125, one2one: 187 },
      'Coding Explorer': { group: 75, one2one: 112 },
      'Coding Challenger': { group: 100, one2one: 150 },
      'Coding Innovator': { group: 125, one2one: 187 },
      'Coding Early Level': { group: 62, one2one: 93 },
      'Complete Java': { group: 150, one2one: 225 },
      'Web-development': { group: 112, one2one: 168 },
      'Financial Literacy': { group: 87, one2one: 130 },
      'Coding Mastery': { group: 187, one2one: 280 },
      'Starter pack': { group: 50, one2one: 75 },
      'Hackathon preparation': { group: 100, one2one: 150 },
      'Bootcamp adventure': { group: 175, one2one: 262 },
      'Not Assigned': { group: 0, one2one: 0 }
    }
  },
  {
    country: 'United Arab Emirates',
    currency: 'AED',
    currencySymbol: 'AED',
    programs: {
      'AI Bootcamp': { group: 550, one2one: 825 },
      'Robotics Junior': { group: 367, one2one: 550 },
      'Robotics Senior': { group: 458, one2one: 687 },
      'Coding Explorer': { group: 275, one2one: 412 },
      'Coding Challenger': { group: 367, one2one: 550 },
      'Coding Innovator': { group: 458, one2one: 687 },
      'Coding Early Level': { group: 229, one2one: 343 },
      'Complete Java': { group: 550, one2one: 825 },
      'Web-development': { group: 412, one2one: 618 },
      'Financial Literacy': { group: 321, one2one: 481 },
      'Coding Mastery': { group: 687, one2one: 1030 },
      'Starter pack': { group: 183, one2one: 275 },
      'Hackathon preparation': { group: 367, one2one: 550 },
      'Bootcamp adventure': { group: 642, one2one: 963 },
      'Not Assigned': { group: 0, one2one: 0 }
    }
  },
  {
    country: 'South Africa',
    currency: 'ZAR',
    currencySymbol: 'R',
    programs: {
      'AI Bootcamp': { group: 2500, one2one: 3750 },
      'Robotics Junior': { group: 1667, one2one: 2500 },
      'Robotics Senior': { group: 2083, one2one: 3125 },
      'Coding Explorer': { group: 1250, one2one: 1875 },
      'Coding Challenger': { group: 1667, one2one: 2500 },
      'Coding Innovator': { group: 2083, one2one: 3125 },
      'Coding Early Level': { group: 1042, one2one: 1563 },
      'Complete Java': { group: 2500, one2one: 3750 },
      'Web-development': { group: 1875, one2one: 2813 },
      'Financial Literacy': { group: 1458, one2one: 2188 },
      'Coding Mastery': { group: 3125, one2one: 4688 },
      'Starter pack': { group: 833, one2one: 1250 },
      'Hackathon preparation': { group: 1667, one2one: 2500 },
      'Bootcamp adventure': { group: 2917, one2one: 4375 },
      'Not Assigned': { group: 0, one2one: 0 }
    }
  }
];

// Discount options
export const discountOptions = [
  { label: 'No Discount', value: 0 },
  { label: '10% Off', value: 10 },
  { label: '20% Off', value: 20 },
  { label: '30% Off', value: 30 },
  { label: '40% Off', value: 40 },
  { label: '50% Off', value: 50 }
];

// Helper function to get pricing config by country
export const getPricingConfig = (country: string): PricingConfig | null => {
  return pricingConfigs.find(config => config.country === country) || null;
};

// Helper function to get base price
export const getBasePrice = (
  country: string, 
  program: string, 
  enrollmentType: 'group' | 'one2one'
): number => {
  const config = getPricingConfig(country);
  if (!config || !config.programs[program]) {
    return 0;
  }
  return config.programs[program][enrollmentType];
};

// Helper function to get currency info
export const getCurrencyInfo = (country: string): { currency: string; symbol: string } | null => {
  const config = getPricingConfig(country);
  if (!config) {
    return null;
  }
  return {
    currency: config.currency,
    symbol: config.currencySymbol
  };
};

// Helper function to calculate final price
export const calculateFinalPrice = (basePrice: number, discountPercent: number): number => {
  const discountAmount = (basePrice * discountPercent) / 100;
  return basePrice - discountAmount;
};

// Helper function to format price
export const formatPrice = (amount: number, currency: string, symbol: string): string => {
  const formatters: Record<string, Intl.NumberFormat> = {
    'INR': new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }),
    'USD': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    'AED': new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }),
    'ZAR': new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' })
  };

  const formatter = formatters[currency] || formatters['INR'];
  return formatter.format(amount);
}; 