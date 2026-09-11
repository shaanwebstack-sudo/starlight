import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Clock,
  BadgeIndianRupee,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createServerClient } from '@/lib/supabase/server';
import { Course } from '@/lib/types';
import { courses as fallbackCourses } from '@/lib/data/courses';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Courses | Starlight Academy",
  description:
    "Explore Undergraduate, Postgraduate, Teacher Training, Healthcare and Paramedical Courses at Vihaan Education Academy. Get expert admission guidance and career counseling.",
  keywords: [
    "Vihaan Education Academy",
    "Starlight Academy",
    "B.Tech Admission",
    "BBA Admission",
    "MBA Admission",
    "B.Ed Admission",
    "JBT Admission",
    "MLT Course",
    "Optometry Course",
    "Radiology Course",
    "Healthcare Courses",
    "UG Courses",
    "PG Courses",
    "Career Counseling",
    "Admission Guidance",
  ],
  openGraph: {
    title: "Courses | Starlight Academy",
    description:
      "Admission guidance and career counseling for UG, PG, Teacher Training and Healthcare Programs.",
    type: "website",
  },
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default async function CoursesPage() {
  const supabase = createServerClient();
  let courses: Course[] = [];

  try {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    courses = (data || []) as Course[];
  } catch (e) {
    // Use fallback data
  }

  // Apply fallbacks
  if (!courses || courses.length === 0) {
    courses = fallbackCourses;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm mb-6 border border-white/20 backdrop-blur">
            Empowering Minds, Shaping Futures ✨
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Courses & Admission Guidance
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            Starlight Academy provides expert admission guidance,
            career counseling, and academic support for Undergraduate,
            Postgraduate, Teacher Training, and Healthcare Programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link href="/admission" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg font-semibold"
              >
                Apply Now
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white text-black hover:bg-white/10 rounded-xl font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore all the courses we offer to help you achieve your academic goals
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  course.featured 
                    ? 'border-2 border-blue-600 shadow-blue-100' 
                    : 'border border-slate-200'
                }`}
              >
                {/* Top Gradient */}
                <div className={`h-2 ${
                  course.featured 
                    ? 'bg-gradient-to-r from-red-600 via-blue-600 to-red-600' 
                    : 'bg-gradient-to-r from-blue-600 via-blue-500 to-red-600'
                }`} />

                {/* Image */}
              <div className="relative h-60 overflow-hidden">
                {course.image_url || course.image ? (
                  <Image
                    src={course.image_url || course.image!}
                    alt={course.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-red-100">
                    <GraduationCap className="h-20 w-20 text-blue-600" />
                  </div>
                )}

                  <div className="absolute left-4 top-4 flex gap-2">
                    {course.featured && (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white backdrop-blur flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur">
                      Popular Course
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {course.title}
                  </h3>

                  <p className="line-clamp-3 text-sm leading-7 text-slate-600 mb-4">
                    {course.description || 'Professional course designed for academic excellence and career growth.'}
                  </p>

                  {/* Duration & Fee */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {course.duration && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 bg-blue-50 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600" />
                        {course.duration}
                      </div>
                    )}
                    {course.fee && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 bg-red-50 px-3 py-1.5 rounded-full">
                        <BadgeIndianRupee className="h-4 w-4 text-red-600" />
                        {course.fee}
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/courses/${course.slug || generateSlug(course.title)}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-xl"
                      >
                        Details
                      </Button>
                    </Link>

                    <Link
                      href="/admission"
                      className="flex-1"
                    >
                      <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700">
                        Enroll
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Academic Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized counseling, admission guidance, and career support
            from our experienced team.
          </p>
          <Link href="/admission" className="inline-flex w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold gap-2 shadow-lg"
            >
              Apply For Admission
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
