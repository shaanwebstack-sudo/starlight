import type { Metadata } from 'next';
import AdmissionForm from '@/components/admission-form';

export const metadata: Metadata = {
  title:
    'Admissions Open 2026 | Starlight Academy | Competitive Exams, NIOS & Academic Courses in Rohini',

  description:
    'Admissions are open at Starlight Academy, Rohini, Delhi. Apply for competitive exam preparation, NIOS and open schooling, academic courses, English and computer courses. Get expert guidance and start your educational journey with Starlight Academy.',

  keywords: [
    // Brand
    'Starlight Academy',
    'Starlight Academy Rohini',
    'Starlight Academy Delhi',
    'Starlight Academy Admission',

    // Admission
    'Starlight Academy Admission',
    'Admission Open 2026',
    'Admissions Open 2026',
    'Admission Form 2026',
    'Education Admission Rohini',
    'Admission in Rohini Delhi',
    'Education Academy Rohini',

    // Competitive Exams
    'Competitive Exam Coaching Rohini',
    'Competitive Exam Coaching Delhi',
    'Government Exam Preparation Rohini',
    'Government Exam Coaching Delhi',
    'SSC Coaching Rohini',
    'SSC Coaching Delhi',
    'CGL Coaching Rohini',
    'CHSL Coaching Rohini',
    'Delhi Police Coaching Rohini',
    'Banking Exam Coaching Rohini',
    'CTET Coaching Rohini',
    'DSSSB Coaching Rohini',
    'KVS Coaching Rohini',
    'NVS Coaching Rohini',
    'NDA Coaching Rohini',
    'CUET Coaching Rohini',
    'CLAT Coaching Rohini',

    // NIOS / Open Schooling
    'NIOS Admission Rohini',
    'NIOS Admission Delhi',
    'NIOS 10th Admission Delhi',
    'NIOS 12th Admission Delhi',
    'NIOS Coaching Rohini',
    'Open School Admission Rohini',
    'Open Schooling Delhi',
    'Open School Coaching Rohini',
    'NIOS Student Guidance',

    // Academic Education
    'Academic Coaching Rohini',
    'School Coaching Rohini',
    'School Education Rohini',
    'Science Coaching Rohini',
    'Commerce Coaching Rohini',
    'Humanities Coaching Rohini',

    // English
    'English Classes Rohini',
    'English Coaching Rohini',
    'English Classes Delhi',
    'School of English Rohini',
    'Spoken English Rohini',

    // Computer Courses
    'Computer Courses Rohini',
    'Computer Course Delhi',
    'Computer Classes Rohini',
    'Computer Training Rohini',
    'Basic Computer Course Rohini',

    // Local SEO
    'Education Institute Rohini',
    'Coaching Institute Rohini',
    'Coaching Institute Delhi',
    'Best Coaching Institute Rohini',
    'Study Centre Rohini',
    'Learning Centre Rohini',
    'Education Centre Delhi',
  ],

  openGraph: {
    title:
      'Admissions Open 2026 | Starlight Academy Rohini Delhi',

    description:
      'Apply to Starlight Academy for competitive exam preparation, NIOS and open schooling, academic education, English and computer courses in Rohini, Delhi.',

    siteName: 'Starlight Academy',

    type: 'website',

    images: [
      {
        url: '/admission-og.jpg',
        width: 1200,
        height: 630,
        alt:
          'Admissions Open 2026 - Starlight Academy Rohini Delhi',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Admissions Open 2026 | Starlight Academy',

    description:
      'Apply for competitive exam preparation, NIOS, open schooling, academic, English and computer courses at Starlight Academy, Rohini Delhi.',

    images: ['/admission-og.jpg'],
  },

  alternates: {
    canonical: '/admission',
  },
};

export default function Page() {
  return <AdmissionForm />;
}