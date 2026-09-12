'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  GraduationCap,
  CheckCircle,
  Phone,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Laptop,
  School,
  FileText,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

import { createClient } from '@/lib/supabase/client';
import { AdmissionFormData, StudentCategory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdmissionForm() {
  const [formData, setFormData] = useState<AdmissionFormData>({
    student_name: '',
    email: '',
    phone: '',
    course: '',
    class: '',
    subjects: '',
    reference_number: '',
    parent_name: '',
    parent_phone: '',
    address: '',
    message: '',

    category: '' as StudentCategory | '',

    exam: '',
    level: '',
    stream: '',
    session: '',
    batch: '',
    batch_timing: '',
    duration: '',
    computer_course: '',
    date_of_birth: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const supabase = createClient();
  const { toast } = useToast();

  /* =========================================================
     GOVERNMENT EXAMS
  ========================================================= */

  const governmentExams = [
    'SSC',
    'CGL',
    'CHSL',
    'Delhi Police',
    'Constable',
    'Head Constable',
    'MTS / GD',
    'Bank',
    'CLAT',
    'NDA',
    'CUET',
    'CPO',
    'CTET',
    'DSSSB',
    'PRT',
    'TGT',
    'PGT',
    'KVS',
    'NVS',
    'D.El.Ed',
    'B.Ed.',
  ];

  /* =========================================================
     NIOS COURSES
  ========================================================= */

  const niosCourses = [
    'NIOS Secondary - Class 10th',
    'NIOS Senior Secondary - Class 12th',
    'NIOS Subject Selection Guidance',
    'NIOS Admission Guidance',
    'NIOS Examination Guidance',
    'NIOS On-Demand Examination (ODE)',
  ];

  /* =========================================================
     OPEN SCHOOLING COURSES
  ========================================================= */

  const openSchoolingCourses = [
    'Open Schooling - Class 10th',
    'Open Schooling - Class 12th',
    'Subject Selection Guidance',
    'Academic Support',
    'Examination Guidance',
    'Admission Assistance',
  ];

  /* =========================================================
     COMPUTER COURSES
  ========================================================= */

  const computerCourses = [
    'Basic Computer Course',
    'MS Office',
    'Advanced Excel',
    'Tally',
    'DTP',
    'Computer Fundamentals',
    'Internet & Digital Skills',
  ];

  /* =========================================================
     PROGRAM CARDS
  ========================================================= */

  const programs = [
    {
      title: 'Government Competitive Exams',
      icon: GraduationCap,
      items: [
        'SSC',
        'CGL',
        'CHSL',
        'Delhi Police',
        'Constable',
        'Head Constable',
        'MTS / GD',
        'Bank',
        'CLAT',
        'NDA',
        'CUET',
        'CPO',
        'CTET',
        'DSSSB',
        'PRT',
        'TGT',
        'PGT',
        'KVS',
        'NVS',
        'D.El.Ed',
        'B.Ed.',
      ],
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'NIOS',
      icon: BookOpen,
      items: [
        'Secondary - Class 10th',
        'Senior Secondary - Class 12th',
        'Subject Selection Guidance',
        'Admission Guidance',
        'Examination Guidance',
        'On-Demand Examination',
      ],
      color: 'from-green-600 to-emerald-600',
    },
    {
      title: 'Open Schooling',
      icon: School,
      items: [
        'Class 10th',
        'Class 12th',
        'Subject Selection',
        'Academic Support',
        'Examination Guidance',
        'Admission Assistance',
      ],
      color: 'from-purple-600 to-violet-600',
    },
    {
      title: 'Computer Courses',
      icon: Laptop,
      items: [
        'Basic Computer',
        'MS Office',
        'Advanced Excel',
        'Tally',
        'DTP',
        'Computer Fundamentals',
        'Internet & Digital Skills',
      ],
      color: 'from-orange-500 to-red-600',
    },
  ];

  /* =========================================================
     WHY CHOOSE US
  ========================================================= */

  const whyChooseUs = [
    'Government Competitive Exam Guidance',
    'NIOS Admission & Academic Guidance',
    'Open Schooling Support',
    'Computer Course Guidance',
    'Subject Selection Assistance',
    'Personalized Career Guidance',
    'Exam & Admission Support',
    'Student-Centered Learning',
    'Simple & Hassle-Free Admission Process',
  ];

  /* =========================================================
     ADMISSION STEPS
  ========================================================= */

  const admissionSteps = [
    {
      title: 'Choose Category',
      description:
        'Select the educational program or competitive exam you are interested in.',
    },
    {
      title: 'Fill Details',
      description:
        'Provide your basic information and course requirements.',
    },
    {
      title: 'Get Guidance',
      description:
        'Our team will contact you regarding your admission enquiry.',
    },
    {
      title: 'Complete Admission',
      description:
        'Complete the required admission process with our assistance.',
    },
    {
      title: 'Start Learning',
      description:
        'Begin your learning journey with Starlight Academy.',
    },
  ];

  /* =========================================================
     UPDATE FIELD
  ========================================================= */

  const updateField = (
    field: keyof AdmissionFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================================================
     CATEGORY CHANGE
  ========================================================= */

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value as StudentCategory,
      course: '',
      class: '',
      subjects: '',
      exam: '',
      level: '',
      stream: '',
      session: '',
      batch: '',
      batch_timing: '',
      duration: '',
      computer_course: '',
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      toast({
        title: 'Category Required',
        description:
          'Please select an admission category.',
        variant: 'destructive',
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const subjectsArray = formData.subjects
        ? formData.subjects
            .split(',')
            .map((subject) => subject.trim())
            .filter(Boolean)
        : [];

      const payload: Record<string, any> = {
        student_name: formData.student_name || null,
        email: formData.email || null,
        phone: formData.phone || null,

        course: formData.course || null,
        class: formData.class || null,

        subjects:
          subjectsArray.length > 0
            ? subjectsArray
            : null,

        reference_number:
          formData.reference_number || null,

        parent_name:
          formData.parent_name || null,

        parent_phone:
          formData.parent_phone || null,

        address:
          formData.address || null,

        message:
          formData.message || null,

        category:
          formData.category || null,

        exam:
          formData.exam || null,

        level:
          formData.level || null,

        stream:
          formData.stream || null,

        session:
          formData.session || null,

        batch:
          formData.batch || null,

        batch_timing:
          formData.batch_timing || null,

        duration:
          formData.duration || null,

        computer_course:
          formData.computer_course || null,

        date_of_birth:
          formData.date_of_birth || null,
      };

      const { error } = await (
        supabase.from('admissions') as any
      ).insert([payload]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Application Submitted!',
        description:
          'Your admission enquiry has been submitted successfully.',
      });

      setSubmitted(true);
    } catch (error) {
      console.error(
        'Admission submission error:',
        error
      );

      toast({
        title: 'Submission Failed',
        description:
          'Unable to submit your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setFormData({
      student_name: '',
      email: '',
      phone: '',
      course: '',
      class: '',
      subjects: '',
      reference_number: '',
      parent_name: '',
      parent_phone: '',
      address: '',
      message: '',

      category: '' as StudentCategory | '',

      exam: '',
      level: '',
      stream: '',
      session: '',
      batch: '',
      batch_timing: '',
      duration: '',
      computer_course: '',
      date_of_birth: '',
    });

    setSubmitted(false);
  };

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-blue-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            Application Submitted
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Thank you for submitting your admission enquiry
            to <strong>Starlight Academy</strong>. Our team will
            review your details and contact you shortly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="w-full rounded-xl border-gray-200 sm:w-auto"
              >
                Back Home
              </Button>
            </Link>

            <Button
              onClick={resetForm}
              className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800 sm:w-auto"
            >
              Submit Another Application
            </Button>

          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 py-20 text-white">

        <div className="container mx-auto px-4 text-center">

          <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            Admissions Open 2026
          </div>

          <h1 className="text-4xl font-bold md:text-6xl">
            Begin Your Journey With Starlight Academy
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-blue-100">
            Campus of Competitive Studies offering guidance
            and learning support for government competitive
            exams, NIOS, Open Schooling and computer courses.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <a href="#admission-form">
              <Button
                size="lg"
                className="w-full rounded-xl bg-white px-8 text-blue-700 shadow-xl hover:bg-gray-100 sm:w-auto"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>

            <a href="tel:+918750123355">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-xl border-white/40 bg-white/10 px-8 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </a>

          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16">

        {/* ===================================================
            COURSES & PROGRAMS
        =================================================== */}

        <section className="mb-16">

          <div className="mb-10 text-center">

            <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Starlight Academy
            </div>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Courses & Programs
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-gray-600">
              Choose from competitive exam preparation,
              NIOS, Open Schooling and computer courses
              according to your educational and career goals.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {programs.map((program, index) => {
              const Icon = program.icon;

              return (
                <Card
                  key={index}
                  className="overflow-hidden rounded-3xl border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >

                  <div
                    className={`bg-gradient-to-r ${program.color} p-6 text-white`}
                  >
                    <div className="flex items-center gap-4">

                      <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="text-xl font-bold">
                        {program.title}
                      </h3>

                    </div>
                  </div>

                  <CardContent className="p-6">

                    <ul className="grid gap-3 sm:grid-cols-2">

                      {program.items.map(
                        (item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />

                            <span className="text-sm">
                              {item}
                            </span>
                          </li>
                        )
                      )}

                    </ul>

                  </CardContent>
                </Card>
              );
            })}

          </div>
        </section>

        {/* ===================================================
            GOVERNMENT EXAMS
        =================================================== */}

        <section className="mb-16">

          <div className="mb-10 text-center">

            <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Competitive Exam Preparation
            </div>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Government Competitive Exams
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-gray-600">
              Prepare for competitive, government, teaching,
              banking, defence and entrance examinations at
              Starlight Academy.
            </p>

          </div>

          <div className="flex flex-wrap justify-center gap-3">

            {governmentExams.map((exam) => (
              <div
                key={exam}
                className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"
              >
                {exam}
              </div>
            ))}

          </div>
        </section>

        {/* ===================================================
            WHY CHOOSE US
        =================================================== */}

        <section className="mb-16 rounded-3xl border border-gray-100 bg-white py-12">

          <div className="mb-10 text-center">

            <div className="mb-4 inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
              Why Starlight Academy?
            </div>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Starlight Academy?
            </h2>

          </div>

          <div className="grid gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">

            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-red-50 px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600" />

                {item}
              </div>
            ))}

          </div>
        </section>

        {/* ===================================================
            ADMISSION PROCESS
        =================================================== */}

        <section className="mb-16">

          <div className="mb-10 text-center">

            <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Simple Process
            </div>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Admission Process
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-5">

            {admissionSteps.map(
              (step, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-red-600 font-bold text-white">
                    {index + 1}
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>

                </div>
              )
            )}

          </div>
        </section>

        {/* ===================================================
            ADMISSION FORM
        =================================================== */}

        <Card
          id="admission-form"
          className="mb-16 overflow-hidden border-0 shadow-2xl"
        >

          {/* FORM HEADER */}

          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-8 text-white">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                <FileText className="h-8 w-8" />
              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  Admission Form
                </h2>

                <p className="mt-1 text-blue-100">
                  Fill in your details and our team will
                  contact you for further admission guidance.
                </p>

              </div>

            </div>
          </div>

          <CardContent className="p-6 md:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Select Admission Category *
                </label>

                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    handleCategoryChange(
                      e.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="government_exam">
                    Government Competitive Exams
                  </option>

                  <option value="nios">
                    NIOS
                  </option>

                  <option value="open_schooling">
                    Open Schooling
                  </option>

                  <option value="computer">
                    Computer Courses
                  </option>

                </select>

              </div>

              {/* =================================================
                  GOVERNMENT EXAM
              ================================================= */}

              {formData.category ===
                'government_exams' && (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Competitive Exam Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Select Examination *
                      </label>

                      <select
                        required
                        value={formData.exam}
                        onChange={(e) => {
                          updateField(
                            'exam',
                            e.target.value
                          );

                          updateField(
                            'course',
                            e.target.value
                          );
                        }}
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      >

                        <option value="">
                          Select Examination
                        </option>

                        {governmentExams.map(
                          (exam) => (
                            <option
                              key={exam}
                              value={exam}
                            >
                              {exam}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    <Input
                      placeholder="Preferred Batch / Timing"
                      className="h-12 rounded-xl border-gray-200"
                      value={
                        formData.batch_timing
                      }
                      onChange={(e) =>
                        updateField(
                          'batch_timing',
                          e.target.value
                        )
                      }
                    />

                  </div>
                </div>
              )}

              {/* =================================================
                  NIOS
              ================================================= */}

              {formData.category === 'nios' && (
                <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    NIOS Admission Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Select NIOS Course *
                      </label>

                      <select
                        required
                        value={formData.course}
                        onChange={(e) =>
                          updateField(
                            'course',
                            e.target.value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      >

                        <option value="">
                          Select NIOS Course
                        </option>

                        {niosCourses.map(
                          (course) => (
                            <option
                              key={course}
                              value={course}
                            >
                              {course}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Level *
                      </label>

                      <select
                        required
                        value={formData.level}
                        onChange={(e) =>
                          updateField(
                            'level',
                            e.target.value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      >

                        <option value="">
                          Select Level
                        </option>

                        <option value="Secondary - Class 10th">
                          Secondary - Class 10th
                        </option>

                        <option value="Senior Secondary - Class 12th">
                          Senior Secondary - Class 12th
                        </option>

                      </select>

                    </div>

                    <Input
                      placeholder="Stream / Subjects"
                      className="h-12 rounded-xl border-gray-200"
                      value={
                        formData.subjects
                      }
                      onChange={(e) =>
                        updateField(
                          'subjects',
                          e.target.value
                        )
                      }
                    />

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Session
                      </label>

                      <select
                        value={
                          formData.session
                        }
                        onChange={(e) =>
                          updateField(
                            'session',
                            e.target.value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                      >

                        <option value="">
                          Select Session
                        </option>

                        <option value="April-May">
                          April-May
                        </option>

                        <option value="October-November">
                          October-November
                        </option>

                        <option value="On-Demand">
                          On-Demand
                        </option>

                      </select>

                    </div>

                  </div>
                </div>
              )}

              {/* =================================================
                  OPEN SCHOOLING
              ================================================= */}

              {formData.category ===
                'open_schooling' && (
                <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">

                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                    <School className="h-5 w-5 text-purple-600" />
                    Open Schooling Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Select Course *
                      </label>

                      <select
                        required
                        value={
                          formData.course
                        }
                        onChange={(e) =>
                          updateField(
                            'course',
                            e.target.value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      >

                        <option value="">
                          Select Course
                        </option>

                        {openSchoolingCourses.map(
                          (course) => (
                            <option
                              key={course}
                              value={course}
                            >
                              {course}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Class / Level *
                      </label>

                      <select
                        required
                        value={
                          formData.level
                        }
                        onChange={(e) =>
                          updateField(
                            'level',
                            e.target.value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      >

                        <option value="">
                          Select Class
                        </option>

                        <option value="Class 10th">
                          Class 10th
                        </option>

                        <option value="Class 12th">
                          Class 12th
                        </option>

                      </select>

                    </div>

                    <Input
                      placeholder="Stream / Subjects"
                      className="h-12 rounded-xl border-gray-200"
                      value={
                        formData.stream
                      }
                      onChange={(e) =>
                        updateField(
                          'stream',
                          e.target.value
                        )
                      }
                    />

                    <Input
                      placeholder="Preferred Batch / Timing"
                      className="h-12 rounded-xl border-gray-200"
                      value={
                        formData.batch_timing
                      }
                      onChange={(e) =>
                        updateField(
                          'batch_timing',
                          e.target.value
                        )
                      }
                    />

                  </div>
                </div>
              )}

              {/* =================================================
                  COMPUTER COURSES
              ================================================= */}

              {formData.category ===
                'computer' && (
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">

                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                    <Laptop className="h-5 w-5 text-orange-600" />
                    Computer Course Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Select Computer Course *
                      </label>

                      <select
                        required
                        value={
                          formData.computer_course
                        }
                        onChange={(e) => {
                          updateField(
                            'computer_course',
                            e.target.value
                          );

                          updateField(
                            'course',
                            e.target.value
                          );
                        }}
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                      >

                        <option value="">
                          Select Computer Course
                        </option>

                        {computerCourses.map(
                          (course) => (
                            <option
                              key={course}
                              value={course}
                            >
                              {course}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    <Input
                      placeholder="Preferred Batch / Timing"
                      className="h-12 rounded-xl border-gray-200"
                      value={
                        formData.batch_timing
                      }
                      onChange={(e) =>
                        updateField(
                          'batch_timing',
                          e.target.value
                        )
                      }
                    />

                  </div>
                </div>
              )}

              {/* =================================================
                  STUDENT DETAILS
              ================================================= */}

              <div>

                <div className="mb-5">

                  <h3 className="text-xl font-bold text-gray-900">
                    Student Details
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the student's basic information.
                  </p>

                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  <Input
                    placeholder="Student Name *"
                    required
                    className="h-12 rounded-xl border-gray-200"
                    value={
                      formData.student_name
                    }
                    onChange={(e) =>
                      updateField(
                        'student_name',
                        e.target.value
                      )
                    }
                  />

                  <Input
                    placeholder="Email Address *"
                    type="email"
                    required
                    className="h-12 rounded-xl border-gray-200"
                    value={
                      formData.email
                    }
                    onChange={(e) =>
                      updateField(
                        'email',
                        e.target.value
                      )
                    }
                  />

                  <Input
                    placeholder="Phone Number *"
                    type="tel"
                    required
                    className="h-12 rounded-xl border-gray-200"
                    value={
                      formData.phone
                    }
                    onChange={(e) =>
                      updateField(
                        'phone',
                        e.target.value
                      )
                    }
                  />

                  <Input
                    placeholder="Date of Birth"
                    type="date"
                    className="h-12 rounded-xl border-gray-200"
                    value={
                      formData.date_of_birth
                    }
                    onChange={(e) =>
                      updateField(
                        'date_of_birth',
                        e.target.value
                      )
                    }
                  />

                </div>
              </div>

              {/* =================================================
                  PARENT / GUARDIAN
              ================================================= */}

              <div>

                <div className="mb-5">

                  <h3 className="text-xl font-bold text-gray-900">
                    Parent / Guardian Details
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Parent or guardian details are optional.
                  </p>

                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  <Input
                    placeholder="Parent / Guardian Name"
                    className="h-12 rounded-xl border-gray-200"
                    value={
                      formData.parent_name
                    }
                    onChange={(e) =>
                      updateField(
                        'parent_name',
                        e.target.value
                      )
                    }
                  />

                  <Input
                    placeholder="Parent / Guardian Phone"
                    type="tel"
                    className="h-12 rounded-xl border-gray-200"
                    value={
                      formData.parent_phone
                    }
                    onChange={(e) =>
                      updateField(
                        'parent_phone',
                        e.target.value
                      )
                    }
                  />

                </div>
              </div>

              {/* =================================================
                  ADDRESS
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Address
                </label>

                <Textarea
                  placeholder="Enter your address"
                  rows={3}
                  className="rounded-xl border-gray-200"
                  value={
                    formData.address
                  }
                  onChange={(e) =>
                    updateField(
                      'address',
                      e.target.value
                    )
                  }
                />

              </div>

              {/* =================================================
                  MESSAGE
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Additional Message
                </label>

                <Textarea
                  placeholder="Tell us anything else you would like to know about the course or admission."
                  rows={4}
                  className="rounded-xl border-gray-200"
                  value={
                    formData.message
                  }
                  onChange={(e) =>
                    updateField(
                      'message',
                      e.target.value
                    )
                  }
                />

              </div>

              {/* =================================================
                  PRIVACY
              ================================================= */}

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                🔒 Your information is used only for admission
                assistance and to contact you regarding your
                enquiry.
              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200 transition-all hover:from-red-700 hover:to-red-800"
              >

                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Admission Enquiry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}

              </Button>

            </form>
          </CardContent>
        </Card>

        {/* ===================================================
            CONTACT
        =================================================== */}

        <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 p-8 text-white shadow-2xl md:p-12">

          <div className="mb-10 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Phone className="h-7 w-7" />
            </div>

            <h3 className="text-3xl font-bold">
              Need Admission Guidance?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Contact Starlight Academy for information
              about competitive exams, NIOS, Open Schooling
              and computer courses.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* PHONE 1 */}

            <div className="flex flex-col items-center text-center">

              <div className="mb-3 rounded-xl bg-white/10 p-3 backdrop-blur">
                <Phone className="h-6 w-6" />
              </div>

              <a
                href="tel:+918750123355"
                className="text-xl font-semibold hover:underline"
              >
                8750123355
              </a>

            </div>

            {/* PHONE 2 */}

            <div className="flex flex-col items-center text-center">

              <div className="mb-3 rounded-xl bg-white/10 p-3 backdrop-blur">
                <Phone className="h-6 w-6" />
              </div>

              <a
                href="tel:+919899771089"
                className="text-xl font-semibold hover:underline"
              >
                9899771089
              </a>

            </div>

            {/* ACADEMY */}

            <div className="flex flex-col items-center text-center">

              <div className="mb-3 rounded-xl bg-white/10 p-3 backdrop-blur">
                <GraduationCap className="h-6 w-6" />
              </div>

              <p className="text-xl font-semibold">
                Starlight Academy
              </p>

              <p className="mt-1 text-sm text-blue-100">
                Campus of Competitive Studies
              </p>

            </div>

          </div>

          <div className="mt-10 text-center">

            <p className="text-2xl font-bold opacity-95">
              Sapna Aapka, Taiyari Hamari, Safalta Aapki
            </p>

            <p className="mt-2 text-blue-100">
              Your Dream. Our Preparation. Your Success.
            </p>

          </div>

        </section>

      </main>
    </div>
  );
}