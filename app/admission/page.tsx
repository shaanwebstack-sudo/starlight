import type { Metadata } from 'next';
import AdmissionForm from '@/components/admission-form';

export const metadata: Metadata = {
  title:
    'Admission Open 2026 | NIOS, UG, PG & Professional Courses in Rohini Delhi | Starlight Academy',

  description:
    'Admissions Open 2026 at Starlight Academy, Rohini Sector 5, Delhi. Apply for NIOS, NIOS On-Demand, Undergraduate, Postgraduate, Teacher Training, Healthcare and Paramedical Courses. Get expert admission guidance and career counseling.',

  keywords: [
    // Brand
    'Vihaan Education Academy',
    'Starlight Academy',

    // NIOS
    'NIOS Admission',
    'NIOS Admission Delhi',
    'NIOS Admission Rohini',
    'NIOS On Demand',
    'NIOS On Demand Admission',
    'NIOS 10th Admission',
    'NIOS 12th Admission',
    'Open School Admission',

    // UG
    'B.A Admission',
    'B.Sc Admission',
    'B.Tech Admission',
    'BBA Admission',

    // PG
    'M.A Admission',
    'M.Sc Admission',
    'MBA Admission',

    // Teacher Training
    'B.Ed Admission',
    'JBT Admission',

    // Healthcare
    'MLT Admission',
    'Optometry Course',
    'Radiology Course',
    'Healthcare Courses',
    'Paramedical Courses',

    // Local SEO
    'Admission Rohini',
    'Admission Rohini Sector 5',
    'Admission Delhi',
    'Career Counseling Rohini',
    'Education Academy Rohini',
    'Education Academy Delhi',
    'Library Rohini',
    'Library Membership Rohini',

    // Generic
    'Admission Open 2026',
    'Career Counseling',
    'Admission Guidance',
    'Student Counseling'
  ],

  openGraph: {
    title:
      'Admission Open 2026 | Starlight Academy',
    description:
      'Apply online for NIOS, UG, PG, Teacher Training, Healthcare and Professional Courses. Get admission guidance and career counseling in Rohini, Delhi.',
    url: 'https://www.vihaanacademy.com/admission',
    siteName: 'Starlight Academy',
    type: 'website',
    images: [
      {
        url: '/admission-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Admission Open 2026 - Starlight Academy',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Admission Open 2026 | Starlight Academy',
    description:
      'Apply for NIOS, UG, PG, Teacher Training and Healthcare Courses with expert admission guidance.',
    images: ['/admission-og.jpg'],
  },

  alternates: {
    canonical: 'https://www.vihaanacademy.com/admission',
  },
};

export default function Page() {
  return <AdmissionForm />;
}