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

// Mock school data with comprehensive scenarios
export const mockSchools = [
  {
    id: 'sch_1',
    name: 'Springfield High School',
    principalName: 'Dr. Sarah Johnson',
    contactNumber: '+1-555-0123',
    contactEmail: 'principal@springfield.edu',
    country: 'United States',
    city: 'Springfield',
    course: 'AI Bootcamp',
    status: 'active',
    totalStudents: 1250,
    totalStudentsExpected: 1500,
    lockedDealAmount: 75000,
    lockedDealCurrency: 'USD',
    enrollmentDate: '2024-01-15T00:00:00Z',
    notes: 'Excellent engagement with AI program. Students showing great progress in machine learning projects.',
    contactPersonRole: 'Principal',
    schoolCode: 'SPR001',
    creationDate: '2024-01-15T00:00:00Z',
    lastEdited: '2024-03-10T14:30:00Z',
    studentGrowth: { '2023': 1150, '2024': 1250 },
    gradeAllocations: [
      { grade: 9, students: 200, sections: ['A', 'B', 'C', 'D'], course: 'AI Bootcamp' },
      { grade: 10, students: 180, sections: ['A', 'B', 'C'], course: 'Robotics Junior' },
      { grade: 11, students: 150, sections: ['A', 'B'], course: 'Coding Mastery' },
      { grade: 12, students: 120, sections: ['A'], course: 'Financial Literacy' }
    ],
    section: [
      {
        status: 'active',
        grade: '9th Grade',
        section: 'A',
        classCount: 25,
        courseName: 'AI Bootcamp',
        sectionCode: 'AI9A',
        courseCode: 'AI001',
        zoomLink: 'https://zoom.us/j/123456789'
      }
    ]
  },
  {
    id: 'sch_2',
    name: 'Riverside Academy',
    principalName: 'Mr. Michael Chen',
    contactNumber: '+1-555-0456',
    contactEmail: 'admin@riverside.edu',
    country: 'United States',
    city: 'Riverside',
    course: 'Robotics Senior',
    status: 'active',
    totalStudents: 850,
    totalStudentsExpected: 1000,
    lockedDealAmount: 55000,
    lockedDealCurrency: 'USD',
    enrollmentDate: '2024-02-20T00:00:00Z',
    notes: 'Strong robotics program implementation. Students participating in regional competitions.',
    contactPersonRole: 'Administrator',
    schoolCode: 'RIV002',
    creationDate: '2024-02-20T00:00:00Z',
    lastEdited: '2024-03-12T09:15:00Z',
    studentGrowth: { '2023': 800, '2024': 850 },
    gradeAllocations: [
      { grade: 8, students: 150, sections: ['A', 'B', 'C'], course: 'Robotics Senior' },
      { grade: 9, students: 200, sections: ['A', 'B', 'C', 'D'], course: 'Coding Challenger' },
      { grade: 10, students: 180, sections: ['A', 'B', 'C'], course: 'Web-development' }
    ],
    section: [
      {
        status: 'active',
        grade: '10th Grade',
        section: 'B',
        classCount: 30,
        courseName: 'Robotics Senior',
        sectionCode: 'RB10B',
        courseCode: 'RB001',
        zoomLink: 'https://zoom.us/j/987654321'
      }
    ]
  },
  {
    id: 'sch_3',
    name: 'Mountain View School',
    principalName: 'Ms. Emma Rodriguez',
    contactNumber: '+1-555-0789',
    contactEmail: 'contact@mountainview.edu',
    country: 'United States',
    city: 'Mountain View',
    course: 'Coding Explorer',
    status: 'suspended',
    totalStudents: 650,
    totalStudentsExpected: 800,
    lockedDealAmount: 40000,
    lockedDealCurrency: 'USD',
    enrollmentDate: '2024-01-10T00:00:00Z',
    notes: 'Access suspended due to payment issues. Contact made for resolution.',
    contactPersonRole: 'Principal',
    schoolCode: 'MTV003',
    creationDate: '2024-01-10T00:00:00Z',
    lastEdited: '2024-03-08T16:45:00Z',
    studentGrowth: { '2023': 600, '2024': 650 },
    gradeAllocations: [
      { grade: 7, students: 120, sections: ['A', 'B'], course: 'Coding Explorer' },
      { grade: 8, students: 150, sections: ['A', 'B', 'C'], course: 'Coding Early Level' },
      { grade: 9, students: 180, sections: ['A', 'B', 'C', 'D'], course: 'Starter pack' }
    ],
    section: [
      {
        status: 'suspended',
        grade: '8th Grade',
        section: 'C',
        classCount: 20,
        courseName: 'Coding Explorer',
        sectionCode: 'CF8C',
        courseCode: 'CF001',
        zoomLink: 'https://zoom.us/j/456789123'
      }
    ]
  },
  {
    id: 'sch_4',
    name: 'Delhi Public School',
    principalName: 'Dr. Rajesh Kumar',
    contactNumber: '+91-98765-43210',
    contactEmail: 'principal@dpsdelhi.edu.in',
    country: 'India',
    city: 'New Delhi',
    course: 'Coding Mastery',
    status: 'active',
    totalStudents: 2000,
    totalStudentsExpected: 2500,
    lockedDealAmount: 4500000,
    lockedDealCurrency: 'INR',
    enrollmentDate: '2024-03-01T00:00:00Z',
    notes: 'Large school with excellent infrastructure. Students very enthusiastic about data science.',
    contactPersonRole: 'Principal',
    schoolCode: 'DPS004',
    creationDate: '2024-03-01T00:00:00Z',
    lastEdited: '2024-03-14T11:20:00Z',
    studentGrowth: { '2023': 1800, '2024': 2000 },
    gradeAllocations: [
      { grade: 9, students: 300, sections: ['A', 'B', 'C', 'D', 'E'], course: 'Coding Mastery' },
      { grade: 10, students: 280, sections: ['A', 'B', 'C', 'D'], course: 'AI Bootcamp' },
      { grade: 11, students: 250, sections: ['A', 'B', 'C'], course: 'Hackathon preparation' },
      { grade: 12, students: 220, sections: ['A', 'B'], course: 'Bootcamp adventure' }
    ],
    section: [
      {
        status: 'active',
        grade: '11th Grade',
        section: 'A',
        classCount: 35,
        courseName: 'Coding Mastery',
        sectionCode: 'DS11A',
        courseCode: 'DS001',
        zoomLink: 'https://zoom.us/j/789123456'
      }
    ]
  },
  {
    id: 'sch_5',
    name: 'St. Mary\'s International School',
    principalName: 'Sister Maria Theresa',
    contactNumber: '+91-87654-32109',
    contactEmail: 'admin@stmarys.edu.in',
    country: 'India',
    city: 'Mumbai',
    course: 'Web-development',
    status: 'active',
    totalStudents: 1200,
    totalStudentsExpected: 1500,
    lockedDealAmount: 2800000,
    lockedDealCurrency: 'INR',
    enrollmentDate: '2024-02-15T00:00:00Z',
    notes: 'Catholic school with strong emphasis on technology education. Great partnership potential.',
    contactPersonRole: 'Administrator',
    schoolCode: 'SMI005',
    creationDate: '2024-02-15T00:00:00Z',
    lastEdited: '2024-03-13T15:30:00Z',
    studentGrowth: { '2023': 1100, '2024': 1200 },
    gradeAllocations: [
      { grade: 10, students: 200, sections: ['A', 'B', 'C'], course: 'Web-development' },
      { grade: 11, students: 180, sections: ['A', 'B'], course: 'Complete Java' },
      { grade: 12, students: 150, sections: ['A'], course: 'Coding Innovator' }
    ],
    section: [
      {
        status: 'active',
        grade: '12th Grade',
        section: 'B',
        classCount: 28,
        courseName: 'Web-development',
        sectionCode: 'WD12B',
        courseCode: 'WD001',
        zoomLink: 'https://zoom.us/j/321654987'
      }
    ]
  },
  {
    id: 'sch_6',
    name: 'Cambridge International School',
    principalName: 'Mr. David Wilson',
    contactNumber: '+44-20-7123-4567',
    contactEmail: 'principal@cambridgeint.edu.uk',
    country: 'United Kingdom',
    city: 'London',
    course: 'Complete Java',
    status: 'active',
    totalStudents: 800,
    totalStudentsExpected: 1000,
    lockedDealAmount: 65000,
    lockedDealCurrency: 'GBP',
    enrollmentDate: '2024-01-25T00:00:00Z',
    notes: 'International curriculum with focus on practical skills. Students creating innovative mobile apps.',
    contactPersonRole: 'Principal',
    schoolCode: 'CAM006',
    creationDate: '2024-01-25T00:00:00Z',
    lastEdited: '2024-03-11T10:45:00Z',
    studentGrowth: { '2023': 750, '2024': 800 },
    gradeAllocations: [
      { grade: 9, students: 150, sections: ['A', 'B'], course: 'Complete Java' },
      { grade: 10, students: 180, sections: ['A', 'B', 'C'], course: 'AI Bootcamp' },
      { grade: 11, students: 120, sections: ['A'], course: 'Coding Innovator' }
    ],
    section: [
      {
        status: 'active',
        grade: '10th Grade',
        section: 'A',
        classCount: 22,
        courseName: 'Complete Java',
        sectionCode: 'MAD10A',
        courseCode: 'MAD001',
        zoomLink: 'https://zoom.us/j/654321987'
      }
    ]
  },
  {
    id: 'sch_7',
    name: 'Toronto STEM Academy',
    principalName: 'Dr. Jennifer Smith',
    contactNumber: '+1-416-555-0123',
    contactEmail: 'admin@torontostem.edu.ca',
    country: 'Canada',
    city: 'Toronto',
    course: 'AI Bootcamp',
    status: 'inactive',
    totalStudents: 0,
    totalStudentsExpected: 600,
    lockedDealAmount: 45000,
    lockedDealCurrency: 'CAD',
    enrollmentDate: '2024-02-28T00:00:00Z',
    notes: 'School closed temporarily due to administrative changes. Contact maintained for future opportunities.',
    contactPersonRole: 'Administrator',
    schoolCode: 'TSA007',
    creationDate: '2024-02-28T00:00:00Z',
    lastEdited: '2024-03-09T13:20:00Z',
    studentGrowth: { '2023': 0, '2024': 0 },
    gradeAllocations: [],
    section: []
  },
  {
    id: 'sch_8',
    name: 'Sydney Tech High',
    principalName: 'Ms. Lisa Thompson',
    contactNumber: '+61-2-9123-4567',
    contactEmail: 'principal@sydneytech.edu.au',
    country: 'Australia',
    city: 'Sydney',
    course: 'Robotics Junior',
    status: 'active',
    totalStudents: 950,
    totalStudentsExpected: 1200,
    lockedDealAmount: 85000,
    lockedDealCurrency: 'AUD',
    enrollmentDate: '2024-03-05T00:00:00Z',
    notes: 'New partnership showing great promise. Students very engaged with robotics projects.',
    contactPersonRole: 'Principal',
    schoolCode: 'STH008',
    creationDate: '2024-03-05T00:00:00Z',
    lastEdited: '2024-03-15T08:30:00Z',
    studentGrowth: { '2023': 0, '2024': 950 },
    gradeAllocations: [
      { grade: 8, students: 120, sections: ['A', 'B'], course: 'Robotics Junior' },
      { grade: 9, students: 180, sections: ['A', 'B', 'C'], course: 'AI Bootcamp' },
      { grade: 10, students: 200, sections: ['A', 'B', 'C', 'D'], course: 'Web-development' }
    ],
    section: [
      {
        status: 'active',
        grade: '9th Grade',
        section: 'C',
        classCount: 26,
        courseName: 'Robotics Junior',
        sectionCode: 'RB9C',
        courseCode: 'RB001',
        zoomLink: 'https://zoom.us/j/147258369'
      }
    ]
  },
  {
    id: 'sch_9',
    name: 'Berlin Innovation School',
    principalName: 'Herr Klaus Mueller',
    contactNumber: '+49-30-1234-5678',
    contactEmail: 'direktor@berlininnovation.edu.de',
    country: 'Germany',
    city: 'Berlin',
    course: 'Financial Literacy',
    status: 'active',
    totalStudents: 700,
    totalStudentsExpected: 900,
    lockedDealAmount: 55000,
    lockedDealCurrency: 'EUR',
    enrollmentDate: '2024-02-10T00:00:00Z',
    notes: 'German school with excellent technical infrastructure. Students very analytical and detail-oriented.',
    contactPersonRole: 'Director',
    schoolCode: 'BIS009',
    creationDate: '2024-02-10T00:00:00Z',
    lastEdited: '2024-03-12T14:15:00Z',
    studentGrowth: { '2023': 650, '2024': 700 },
    gradeAllocations: [
      { grade: 10, students: 150, sections: ['A', 'B'], course: 'Financial Literacy' },
      { grade: 11, students: 180, sections: ['A', 'B', 'C'], course: 'AI Bootcamp' },
      { grade: 12, students: 120, sections: ['A'], course: 'Coding Innovator' }
    ],
    section: [
      {
        status: 'active',
        grade: '11th Grade',
        section: 'B',
        classCount: 24,
        courseName: 'Financial Literacy',
        sectionCode: 'DS11B',
        courseCode: 'DS001',
        zoomLink: 'https://zoom.us/j/963852741'
      }
    ]
  },
  {
    id: 'sch_10',
    name: 'Singapore Tech Institute',
    principalName: 'Mr. Tan Wei Ming',
    contactNumber: '+65-6123-4567',
    contactEmail: 'principal@singaporetech.edu.sg',
    country: 'Singapore',
    city: 'Singapore',
    course: 'Web-development',
    status: 'active',
    totalStudents: 1100,
    totalStudentsExpected: 1400,
    lockedDealAmount: 95000,
    lockedDealCurrency: 'SGD',
    enrollmentDate: '2024-01-20T00:00:00Z',
    notes: 'High-performing school with excellent student outcomes. Strong focus on practical web development skills.',
    contactPersonRole: 'Principal',
    schoolCode: 'STI010',
    creationDate: '2024-01-20T00:00:00Z',
    lastEdited: '2024-03-14T16:45:00Z',
    studentGrowth: { '2023': 1000, '2024': 1100 },
    gradeAllocations: [
      { grade: 9, students: 200, sections: ['A', 'B', 'C'], course: 'Web-development' },
      { grade: 10, students: 220, sections: ['A', 'B', 'C', 'D'], course: 'AI Bootcamp' },
      { grade: 11, students: 180, sections: ['A', 'B'], course: 'Complete Java' },
      { grade: 12, students: 150, sections: ['A'], course: 'Coding Innovator' }
    ],
    section: [
      {
        status: 'active',
        grade: '10th Grade',
        section: 'A',
        classCount: 32,
        courseName: 'Web-development',
        sectionCode: 'WD10A',
        courseCode: 'WD001',
        zoomLink: 'https://zoom.us/j/852963741'
      }
    ]
  },
  {
    id: 'sch_11',
    name: 'Dubai Future Academy',
    principalName: 'Sheikh Ahmed Al Mansouri',
    contactNumber: '+971-4-123-4567',
    contactEmail: 'principal@dubaifuture.edu.ae',
    country: 'UAE',
    city: 'Dubai',
    course: 'AI Bootcamp',
    status: 'active',
    totalStudents: 600,
    totalStudentsExpected: 800,
    lockedDealAmount: 220000,
    lockedDealCurrency: 'AED',
    enrollmentDate: '2024-03-08T00:00:00Z',
    notes: 'Premium school with state-of-the-art facilities. Students very motivated and tech-savvy.',
    contactPersonRole: 'Principal',
    schoolCode: 'DFA011',
    creationDate: '2024-03-08T00:00:00Z',
    lastEdited: '2024-03-15T12:00:00Z',
    studentGrowth: { '2023': 0, '2024': 600 },
    gradeAllocations: [
      { grade: 11, students: 150, sections: ['A', 'B'], course: 'AI Bootcamp' },
      { grade: 12, students: 120, sections: ['A'], course: 'Coding Innovator' }
    ],
    section: [
      {
        status: 'active',
        grade: '12th Grade',
        section: 'A',
        classCount: 20,
        courseName: 'AI Bootcamp',
        sectionCode: 'AI12A',
        courseCode: 'AI001',
        zoomLink: 'https://zoom.us/j/741852963'
      }
    ]
  },
  {
    id: 'sch_12',
    name: 'Paris Digital School',
    principalName: 'Madame Sophie Dubois',
    contactNumber: '+33-1-42-34-56-78',
    contactEmail: 'directrice@parisdigital.edu.fr',
    country: 'France',
    city: 'Paris',
    course: 'Coding Challenger',
    status: 'suspended',
    totalStudents: 450,
    totalStudentsExpected: 600,
    lockedDealAmount: 35000,
    lockedDealCurrency: 'EUR',
    enrollmentDate: '2024-02-25T00:00:00Z',
    notes: 'Suspended due to curriculum conflicts. Working on resolution with school administration.',
    contactPersonRole: 'Director',
    schoolCode: 'PDS012',
    creationDate: '2024-02-25T00:00:00Z',
    lastEdited: '2024-03-07T11:30:00Z',
    studentGrowth: { '2023': 400, '2024': 450 },
    gradeAllocations: [
      { grade: 10, students: 120, sections: ['A', 'B'], course: 'Coding Challenger' },
      { grade: 11, students: 150, sections: ['A', 'B', 'C'], course: 'AI Bootcamp' }
    ],
    section: [
      {
        status: 'suspended',
        grade: '11th Grade',
        section: 'C',
        classCount: 18,
        courseName: 'Coding Challenger',
        sectionCode: 'MAD11C',
        courseCode: 'MAD001',
        zoomLink: 'https://zoom.us/j/369258147'
      }
    ]
  }
];

// Mock lead data
export const mockLeads = [
  {
    id: 'lead_1',
    fullName: 'Sarah Johnson',
    contactNumber: '+1-555-0123',
    email: 'sarah.johnson@email.com',
    leadType: 'Parent' as const,
    programOfInterest: 'AI Bootcamp',
    source: 'Facebook' as const,
    notes: 'Interested in AI program for her 15-year-old son. Prefers weekend classes.',
    status: 'New' as const,
    campaignId: 'SUMMER2024',
    // Demo assignment for testing
    demoDate: '2024-03-20T14:00:00Z',
    demoInstructor: 'Sarah Johnson',
    demoNotes: 'Weekend demo preferred. Son is very interested in AI.',
    demoStatus: 'scheduled' as const,
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: 'lead_2',
    fullName: 'Springfield High School',
    contactNumber: '+1-555-0456',
    email: 'admin@springfield.edu',
    leadType: 'School' as const,
    programOfInterest: 'Robotics',
    source: 'Event' as const,
    notes: 'School principal interested in implementing robotics curriculum. Budget approved for 50 students.',
    status: 'Contacted' as const,
    campaignId: 'EDU_CONF_2024',
    // Demo assignment for testing
    demoDate: '2024-03-18T10:00:00Z',
    demoInstructor: 'Michael Chen',
    demoNotes: 'School demo for principal and IT coordinator.',
    demoStatus: 'scheduled' as const,
    createdAt: '2024-03-14T14:20:00Z',
    updatedAt: '2024-03-15T09:15:00Z'
  },
  {
    id: 'lead_3',
    fullName: 'Michael Chen',
    contactNumber: '+1-555-0789',
    email: 'mchen@email.com',
    leadType: 'Parent' as const,
    programOfInterest: 'Hackathon',
    source: 'WhatsApp' as const,
    notes: 'Looking for coding competitions for daughter. Wants to know about upcoming hackathons.',
    status: 'Converted' as const,
    campaignId: 'WHATSAPP_ADS',
    // Demo completed and validated as eligible
    demoDate: '2024-03-10T16:00:00Z',
    demoInstructor: 'Emma Rodriguez',
    demoNotes: 'Daughter showed great interest in hackathon. Very motivated student.',
    demoStatus: 'completed' as const,
    adminValidation: 'eligible' as const,
    adminValidationDate: '2024-03-11T09:00:00Z',
    adminValidationNotes: 'Student is highly motivated and has good coding background. Perfect fit for hackathon program.',
    createdAt: '2024-03-13T16:45:00Z',
    updatedAt: '2024-03-11T09:00:00Z'
  },
  {
    id: 'lead_4',
    fullName: 'Riverside Academy',
    contactNumber: '+1-555-0321',
    email: 'info@riverside.edu',
    leadType: 'School' as const,
    programOfInterest: 'AI Bootcamp',
    source: 'Referral' as const,
    notes: 'Referred by Springfield High. Interested in AI program for grades 9-12.',
    status: 'Converted' as const,
    campaignId: 'REFERRAL_PROGRAM',
    // Demo completed and validated as eligible
    demoDate: '2024-03-08T14:00:00Z',
    demoInstructor: 'David Wilson',
    demoNotes: 'School demo went very well. Teachers and students were engaged.',
    demoStatus: 'completed' as const,
    adminValidation: 'eligible' as const,
    adminValidationDate: '2024-03-09T11:00:00Z',
    adminValidationNotes: 'School has strong technical infrastructure and motivated students. Ready for AI program implementation.',
    createdAt: '2024-03-10T08:15:00Z',
    updatedAt: '2024-03-09T11:00:00Z'
  },
  {
    id: 'lead_5',
    fullName: 'Emma Rodriguez',
    contactNumber: '+1-555-0654',
    email: 'emma.rodriguez@email.com',
    leadType: 'Parent' as const,
    programOfInterest: 'Robotics',
    source: 'Instagram' as const,
    notes: 'Saw our robotics showcase on Instagram. Son is very interested in building robots.',
    status: 'New' as const,
    campaignId: 'INSTAGRAM_ADS',
    createdAt: '2024-03-15T12:00:00Z',
    updatedAt: '2024-03-15T12:00:00Z'
  },
  {
    id: 'lead_6',
    fullName: 'Mountain View School',
    contactNumber: '+1-555-0987',
    email: 'contact@mountainview.edu',
    leadType: 'School' as const,
    programOfInterest: 'Hackathon',
    source: 'Manual' as const,
    notes: 'School wants to host a hackathon event. Need details about logistics and costs.',
    status: 'Cold' as const,
    // Demo completed but rejected
    demoDate: '2024-03-05T15:00:00Z',
    demoInstructor: 'Priya Patel',
    demoNotes: 'School demo completed but budget constraints are significant.',
    demoStatus: 'completed' as const,
    adminValidation: 'not_eligible' as const,
    adminValidationDate: '2024-03-06T10:00:00Z',
    adminValidationNotes: 'School has budget constraints and cannot commit to the program at this time.',
    createdAt: '2024-03-08T10:20:00Z',
    updatedAt: '2024-03-06T10:00:00Z'
  }
];

export const leadPrograms = [
  'AI Bootcamp',
  'Robotics',
  'Hackathon',
  'Coding Fundamentals',
  'Web Development',
  'Data Science',
  'Cybersecurity'
];

export const leadSources = [
  'Manual',
  'Event',
  'WhatsApp',
  'Facebook',
  'Instagram',
  'Referral'
] as const;

export const leadStatuses = [
  'New',
  'Contacted',
  'Follow-Up',
  'Converted',
  'Cold'
] as const;