import Link from 'next/link';
import Image from 'next/image';

import {
  GraduationCap,
  Users,
  Trophy,
  Target,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Award,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export const metadata = {
  title:
    "About Starlight Academy | Best Study Library & Education Academy in Rohini Delhi",

  description:
    "Starlight Academy is a trusted education academy and study library located in Rohini, Delhi. Founded by Hemant Singh, we provide quality education, academic guidance, modern library facilities, peaceful study spaces, career counseling, and student support for academic success.",

  keywords: [
    // Brand
    "Vihaan Education Academy",
    "Vihaan Library",
    "Hemant Singh",

    // Academy
    "Education Academy Delhi",
    "Education Academy Rohini",
    "Coaching Institute Rohini",
    "Coaching Institute Delhi",
    "Academic Guidance",
    "Student Success",
    "Educational Institute",

    // Library Keywords
    "Library in Rohini",
    "Library in Rohini Delhi",
    "Library in Rohini Sector 5",
    "Study Library Rohini",
    "Study Library Delhi",
    "Reading Library Rohini",
    "Reading Room Rohini",
    "Silent Study Library",
    "Library Near Me",
    "Student Library Rohini",
    "Best Library in Rohini",
    "Best Library in Delhi",
    "Modern Library",
    "Library Membership",

    // Rohini Local SEO
    "Rohini Sector 5 Library",
    "Rohini Sector 6 Library",
    "Rohini Sector 7 Library",
    "Rohini Sector 8 Library",
    "Rohini Sector 9 Library",
    "Rohini Sector 10 Library",
    "Rohini Sector 11 Library",
    "Rohini Sector 13 Library",
    "Rohini Sector 14 Library",
    "Rohini Sector 15 Library",
    "Rohini Sector 16 Library",
    "Rohini Sector 17 Library",
    "Rohini Sector 18 Library",
    "Rohini Sector 24 Library",
    "Rohini Sector 25 Library",

    // Delhi SEO
    "Library Delhi",
    "Study Library Delhi",
    "Reading Room Delhi",
    "Library for Students Delhi",
    "Best Study Place Delhi",
    "Learning Center Delhi",
    "Education and Library"
  ],

  openGraph: {
    title:
      "Starlight Academy | Rohini Delhi",
    description:
      "Trusted education academy and study library in Rohini, Delhi offering quality education, career guidance, and peaceful study facilities.",
    url: "https://www.vihaanacademy.com/about",
    siteName: "Starlight Academy",
    type: "website",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Starlight Academy Rohini Delhi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Starlight Academy | Rohini Delhi",
    description:
      "Trusted study library and education academy in Rohini, Delhi.",
    images: ["/og-about.jpg"],
  },

  alternates: {
    canonical: "https://www.vihaanacademy.com/about",
  },
};
export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Quality Education',
      description:
        'Industry-focused practical learning designed for real-world success.',
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description:
        'Learn directly from experienced professionals and industry experts.',
    },
    {
      icon: Trophy,
      title: 'Student Success',
      description:
        'We focus on placements, confidence, and long-term career growth.',
    },
  ];

  const stats = [
    {
      number: '5000+',
      label: 'Students Trained',
    },
    {
      number: '50+',
      label: 'Expert Mentors',
    },
    {
      number: '100+',
      label: 'Courses',
    },
    {
      number: '95%',
      label: 'Success Rate',
    },
  ];

  const whyChooseUs = [
    'Experienced and Dedicated Faculty',
    'Student-Centered Learning Approach',
    'Personalized Academic Guidance',

    'Regular Assessments and Performance Tracking',
    'Focus on Academic Excellence and Skill Development',
    'Supportive and Motivating Learning Atmosphere',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50">
    
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-red-100/30" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-28">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-800 shadow-sm border border-blue-200">
              About Starlight Academy
            </div>

            <h1 className="mb-5 text-3xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Empowering Students
              <span className="block bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                Through Education, Guidance &amp; Growth
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              At Starlight Academy, we believe that every student has the potential to achieve excellence when provided with the right guidance, resources, and learning environment. Since our establishment, we have been committed to helping students build confidence, strengthen their knowledge, and achieve their academic and career goals.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/admission" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-12 w-full gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 transition-all duration-200 sm:w-auto"
                >
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-xl border-gray-200 px-8 text-gray-900 hover:bg-gray-50 sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-red-200 blur-3xl" />
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-blue-200 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-4 shadow-2xl sm:p-6">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-red-600 p-6 text-white sm:p-10">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <GraduationCap className="h-10 w-10" />
                </div>

                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                  Transform Your Career
                </h3>

                <p className="mb-8 text-blue-100">
                  Learn modern skills with practical
                  training and expert mentorship.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <BookOpen className="mb-2 h-6 w-6" />
                    <h4 className="font-semibold">
                      Practical Learning
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <Award className="mb-2 h-6 w-6" />
                    <h4 className="font-semibold">
                      Certified Courses
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY & INTRO */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Welcome to Starlight Academy
            </h2>
            <p className="mx-auto max-w-4xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Our academy is more than just a place for learning. It is a supportive community where students receive expert coaching, personalized mentorship, and access to a modern library designed to encourage focused study and continuous growth.
            </p>
            <p className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Whether students are preparing for school examinations, competitive exams, or seeking a productive environment for self-study, Starlight Academy provides the tools and support needed for success.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              Our Mission
            </h3>
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              Our mission is to provide quality education and a disciplined learning environment that inspires students to reach their full potential. We aim to nurture knowledge, confidence, and lifelong learning habits that contribute to academic excellence and personal growth.
            </p>
          </div>

          <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6 sm:p-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-600">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              Our Vision
            </h3>
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              Our vision is to become one of the most trusted educational institutions by combining quality teaching, innovative learning methods, and modern study facilities. We strive to create an environment where every student can learn, grow, and achieve success.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER'S MESSAGE */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 p-6 sm:p-10 lg:p-12 text-white shadow-2xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-center">
              {/* Founder Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl" />
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl">
                    <Image
                      src="https://images.pexels.com/photos/15866461/pexels-photo-15866461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                      alt="Mr. J.K Pihal - Founder"
                      width={280}
                      height={280}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg">
                    <p className="font-bold text-lg">Mr. J.K Pihal</p>
                    <p className="text-sm text-gray-600">Founder &amp; Director</p>
                  </div>
                </div>
              </div>
              {/* Message */}
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="mb-6 text-3xl font-black sm:text-4xl">
                  A Message From Our Founder
                </h3>
                <div className="space-y-5 text-base leading-relaxed text-blue-100 sm:text-lg">
                  <p>
                    Starlight Academy was founded with a simple yet powerful vision—to create a place where students can receive quality education and a peaceful study environment under one roof.
                  </p>
                  <p>
                    Under the leadership of Mr. J.K Pihal, the academy has grown into a trusted destination for students seeking academic support, guidance, and self-improvement. His dedication to education and student success continues to inspire the values and teaching approach of the institution.
                  </p>
                  <p>
                    Mr. J.K Pihal strongly believes that education is not only about achieving good marks but also about building confidence, discipline, and the skills needed to succeed in life. His commitment to student development remains at the heart of everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US & CONTACT */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* WHY CHOOSE US */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Starlight Academy?
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-1">
              {whyChooseUs.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm border border-gray-100 card-hover"
                >
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-xl sm:p-8 card-hover">
            <h3 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
              Visit Our Campus
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-100 p-3">
                  <MapPin className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-gray-900">
                    Address
                  </h4>
                  <p className="text-gray-600">
                    Starlight Academy,
                    <br />
                    A-309, 2nd Floor,
                    <br />
                    Landmark Vijay Vihar Petrol Pump &amp; Mount Abu Junior School,
                    <br />
                    Sector-4, Rohini, Delhi-85
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-red-100 p-3">
                  <Phone className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-gray-900">
                    Phone
                  </h4>
                  <p className="text-gray-600">
                    +91 92126 44428
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-100 p-3">
                  <Clock className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-gray-900">
                    Working Hours
                  </h4>
                  <p className="text-gray-600">
                    Monday - Friday:
                    <br />
                    9:00 AM - 8:00 PM
                    <br />
                    Saturday:
                    <br />
                    10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Everything we do is focused on helping
              students succeed with confidence and practical
              skills.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="rounded-3xl border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl card-hover"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-red-600">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600">
              Numbers that reflect our dedication to
              education
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-6 text-center shadow-xl border border-gray-100 sm:p-10 card-hover"
              >
                <div className="mb-3 text-4xl font-black bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent sm:text-5xl">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - OUR COMMITMENT */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 p-8 text-center text-white shadow-2xl sm:p-12 lg:p-16">
            <h2 className="mb-6 text-3xl font-black sm:text-4xl">
              Our Commitment
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
              At Starlight Academy, we are committed to helping every student move closer to their dreams. Through quality education, dedicated mentorship, and an inspiring study environment, we continue to empower students to build a brighter future.
              <br /><br />
              Join us and become part of a learning community where success begins with knowledge and determination.
            </p>
            <Link href="/admission">
              <Button
                size="lg"
                className="h-14 w-full rounded-2xl bg-white text-gray-900 hover:bg-gray-100 px-8 text-base font-bold shadow-lg sm:w-auto sm:px-10 sm:text-lg"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
