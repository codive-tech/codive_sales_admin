export interface CourseLevel {
  id: string;
  name: string;
  tagline: string;
  grades: string;
  description: string;
  subjects: string[];
  classesCount: number;
  duration: string;
  enrolledSchools: number;
  features: string[];
}

export const courseLevels: CourseLevel[] = [
  {
    id: 'little-discoverers',
    name: 'Little Discoverers',
    tagline: 'Nurturing Young Minds',
    grades: 'Grades 1-3',
    description: 'A foundational program designed to spark curiosity and build essential learning skills through interactive and engaging activities.',
    subjects: [
      'Early Mathematics',
      'Language Arts',
      'Environmental Science',
      'Creative Expression',
      'Basic Digital Skills'
    ],
    classesCount: 150,
    duration: '12 months',
    enrolledSchools: 45,
    features: [
      'Interactive storytelling sessions',
      'Hands-on learning activities',
      'Basic coding introduction',
      'Art and music integration',
      'Regular progress assessments'
    ]
  },
  {
    id: 'young-explorers',
    name: 'Young Explorers',
    tagline: 'Building Strong Foundations',
    grades: 'Grades 4-6',
    description: 'A comprehensive program that strengthens core academic skills while fostering critical thinking and problem-solving abilities.',
    subjects: [
      'Advanced Mathematics',
      'Science & Technology',
      'Language & Literature',
      'Social Studies',
      'Digital Literacy'
    ],
    classesCount: 150,
    duration: '12 months',
    enrolledSchools: 38,
    features: [
      'Project-based learning',
      'STEM activities',
      'Reading comprehension',
      'Scientific experiments',
      'Digital project creation'
    ]
  },
  {
    id: 'knowledge-seekers',
    name: 'Knowledge Seekers',
    tagline: 'Expanding Horizons',
    grades: 'Grades 7-9',
    description: 'An intermediate program that deepens subject understanding while developing analytical and research skills.',
    subjects: [
      'Pre-Algebra & Geometry',
      'Life & Physical Sciences',
      'World Literature',
      'World History',
      'Computer Science'
    ],
    classesCount: 150,
    duration: '12 months',
    enrolledSchools: 32,
    features: [
      'Advanced problem-solving',
      'Research methodology',
      'Laboratory experiments',
      'Creative writing',
      'Programming fundamentals'
    ]
  },
  {
    id: 'academic-achievers',
    name: 'Academic Achievers',
    tagline: 'Excellence in Education',
    grades: 'Grades 10-12',
    description: 'An advanced program preparing students for higher education with in-depth subject knowledge and specialized skills.',
    subjects: [
      'Advanced Mathematics',
      'Physics & Chemistry',
      'Advanced Literature',
      'Social Sciences',
      'Technology & Programming'
    ],
    classesCount: 150,
    duration: '12 months',
    enrolledSchools: 28,
    features: [
      'College preparation',
      'Advanced placement support',
      'Research projects',
      'Career guidance',
      'Technical skill development'
    ]
  }
];