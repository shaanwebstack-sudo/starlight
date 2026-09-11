import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowLeft, ArrowRight, Clock, BookOpen, GraduationCap, BadgeIndianRupee, CircleCheck as CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { courses as fallbackCourses } from '@/lib/data/courses';
import { Course } from '@/lib/types';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
  params: {
    slug: string;
  };
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function generateMetadata({
  params,
}: PageProps) {
  const supabase = createServerClient();

  // Try to find by slug first
  let { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .single();

  // If not found, try fallback courses
  if (!course) {
    course = fallbackCourses.find(c => 
      c.slug === params.slug || 
      generateSlug(c.title) === params.slug
    ) as Course | undefined;
  }

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.title} | Starlight Academy`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: course.image_url || course.image ? [course.image_url || course.image || ''] : [],
    },
  };
}

export default async function CourseDetailsPage({
  params,
}: PageProps) {
  const supabase = createServerClient();

  // Try to find by slug first
  let { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .single();

  // If not found, try fallback courses
  if (!course) {
    course = fallbackCourses.find(c => 
      c.slug === params.slug || 
      generateSlug(c.title) === params.slug
    ) as Course | undefined;
  }

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">

            {/* Content */}
            <div>

              {course.featured && (
                <div className="mb-4 inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                  Featured Course
                </div>
              )}

              <h1 className="text-4xl font-black text-slate-900 lg:text-6xl">
                {course.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {course.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <Clock className="mb-2 h-6 w-6 text-blue-600" />
                  <p className="text-sm text-slate-500">
                    Duration
                  </p>
                  <p className="font-semibold">
                    {course.duration || 'Flexible'}
                  </p>
                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <BadgeIndianRupee className="mb-2 h-6 w-6 text-red-600" />
                  <p className="text-sm text-slate-500">
                    Fee
                  </p>
                  <p className="font-semibold">
                    {course.fee || 'Contact Us'}
                  </p>
                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <GraduationCap className="mb-2 h-6 w-6 text-green-600" />
                  <p className="text-sm text-slate-500">
                    Students
                  </p>
                  <p className="font-semibold">
                    100+
                  </p>
                </div>

              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                <Link href="/admission">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                  >
                    Contact Us
                  </Button>
                </Link>

              </div>

            </div>

            {/* Image */}
            <div>

              <div className="overflow-hidden rounded-3xl shadow-2xl">

                {course.image_url || course.image ? (
                  <Image
                    src={course.image_url || course.image || ''}
                    alt={course.title}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-[450px] items-center justify-center bg-gradient-to-br from-blue-100 to-red-100">
                    <BookOpen className="h-32 w-32 text-blue-600" />
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-lg">

            <h2 className="mb-8 text-3xl font-bold">
              What You'll Learn
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {[
                "Expert faculty guidance",
                "Comprehensive study material",
                "Regular mock tests",
                "Exam preparation strategy",
                "Personalized mentoring",
                "Doubt solving sessions",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="pb-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-red-600 p-10 text-center text-white shadow-2xl">

            <h2 className="text-3xl font-bold">
              Ready To Start Your Journey?
            </h2>

            <p className="mt-3 text-lg text-white/90">
              Join Starlight Academy and achieve
              your academic goals with confidence.
            </p>

            <Link href="/admission">

              <Button
                size="lg"
                className="mt-8 bg-white text-slate-900 hover:bg-slate-100"
              >
                Apply For Admission
              </Button>

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
