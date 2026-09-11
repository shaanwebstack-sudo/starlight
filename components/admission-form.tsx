'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  GraduationCap,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  BookOpen,
  Users,
  Clock,
  Award,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

import { createClient } from '@/lib/supabase/client';
import { AdmissionFormData } from '@/lib/types';
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const supabase = createClient();
  const { toast } = useToast();

  const programs = [
    {
      title: "NIOS Programs",
      icon: BookOpen,
      items: [
        "NIOS Secondary (10th)",
        "NIOS Senior Secondary (12th)",
        "NIOS On-Demand Examination (ODE)",
        "Open School Admissions",
        "Academic Guidance & Subject Selection"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Undergraduate Programs",
      icon: GraduationCap,
      items: ["B.A.", "B.Sc.", "B.Tech", "BBA"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Postgraduate Programs",
      icon: Award,
      items: ["M.A.", "M.Sc.", "MBA"],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Teacher Training Programs",
      icon: Users,
      items: ["JBT (Junior Basic Training)", "B.Ed. (Bachelor of Education)"],
      color: "from-green-500 to-green-600"
    },
    {
      title: "Healthcare & Paramedical Programs",
      icon: Clock,
      items: [
        "Optometry",
        "Medical Laboratory Technology (MLT)",
        "Radiology & Imaging Technology",
        "OT & Anesthesia Technology",
        "Physician Assistant Programs"
      ],
      color: "from-red-500 to-red-600"
    }
  ];

  const whyChooseUs = [
    "Expert Admission Guidance",
    "Personalized Career Counseling",
    "Support for NIOS & On-Demand Admissions",
    "Undergraduate & Postgraduate Course Guidance",
    "Healthcare & Paramedical Course Support",
    "Teacher Training Program Assistance",
    "Student-Centered Learning Approach",
    "Experienced Academic Counselors",
    "Easy & Hassle-Free Admission Process"
  ];

  const admissionSteps = [
    {
      title: "Step 1",
      description: "Fill out the admission inquiry form."
    },
    {
      title: "Step 2",
      description: "Receive personalized counseling from our academic experts."
    },
    {
      title: "Step 3",
      description: "Choose the course that matches your goals and interests."
    },
    {
      title: "Step 4",
      description: "Complete the admission process with our support team."
    },
    {
      title: "Step 5",
      description: "Begin your educational journey with confidence."
    }
  ];

  const rohiniSectors = [
    "Sector 5", "Sector 6", "Sector 7", "Sector 8", "Sector 9", "Sector 10",
    "Sector 11", "Sector 13", "Sector 14", "Sector 15", "Sector 16", "Sector 17",
    "Sector 18"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await (supabase.from('admissions') as any).insert([
        {
          ...formData,
          class: formData.class || null,
          subjects: formData.subjects || null,
          reference_number: formData.reference_number || null,
          parent_name: formData.parent_name || null,
          parent_phone: formData.parent_phone || null,
          address: formData.address || null,
          message: formData.message || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Application submitted successfully.',
      });
      setSubmitted(true);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to submit application.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <p className="mt-4 text-lg text-gray-600">
            Thank you for choosing Vihaan
            Education Academy and Library. Our team will
            contact you soon.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-xl border-gray-200"
              >
                Back Home
              </Button>
            </Link>
            <Button
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg hover:from-red-700 hover:to-red-800"
            >
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm border border-white/20 backdrop-blur">
            Admission Open 2026
          </div>
          <h1 className="text-4xl font-bold md:text-6xl">
            Begin Your Academic Journey with Starlight Academy
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Welcome to Starlight Academy, your trusted destination for quality education, admission guidance, career counseling, and academic support in Rohini, Delhi. We help students choose the right educational path by providing expert guidance for NIOS, Undergraduate, Postgraduate, Teacher Training, Healthcare, and Paramedical programs.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16">
        {/* ADMISSIONS AVAILABLE FOR */}
        <section className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Admissions Available For
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={index} className="rounded-3xl border-gray-100 card-hover overflow-hidden">
                  <div className={`bg-gradient-to-r ${program.color} p-6 text-white`}>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white/20 backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">{program.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {program.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-16 bg-white py-12 rounded-3xl border border-gray-100">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Starlight Academy?
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-red-50 px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg flex items-center gap-3 card-hover"
              >
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* ADMISSION PROCESS */}
        <section className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Admission Process
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {admissionSteps.map((step, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 text-center shadow-card border border-gray-100 card-hover">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STUDENTS WE HELP */}
        <section className="mb-16">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200">
              <MapPin className="mr-2 h-4 w-4" />
              Serving Students Across Rohini
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Students We Help
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
              We assist students from Rohini {rohiniSectors.join(", ")} and nearby areas of Delhi.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {rohiniSectors.map((sector, index) => (
              <div
                key={index}
                className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 card-hover"
              >
                {sector}
              </div>
            ))}
          </div>
        </section>

        {/* ADMISSION FORM */}
        <Card className="overflow-hidden border-0 shadow-2xl mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-8 text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  Admission Form
                </h2>
                <p className="text-blue-100">
                  Fill your details and our team will contact you.
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Student Name *"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                  value={formData.student_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student_name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Email *"
                  type="email"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Phone *"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Course *"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      course: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Class / Grade"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      class: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Subjects"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.subjects}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subjects: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Parent Name"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.parent_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parent_name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Parent Phone"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.parent_phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parent_phone: e.target.value,
                    })
                  }
                />
              </div>
              <Textarea
                placeholder="Address"
                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Additional Message"
                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
              />
              <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800 border border-blue-100">
                🔒 Your information is secure and only used for admission assistance.
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CONTACT */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 p-8 text-white shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold">
              Need Admission Guidance?
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-blue-100">
              Our team is ready to help you select the right course, understand eligibility requirements, and complete your admission process smoothly.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-white/10 text-white mb-2 backdrop-blur">
                <Phone className="h-6 w-6" />
              </div>
              <p className="font-semibold text-xl">
                92126 44428
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-white/10 text-white mb-2 backdrop-blur">
                <Mail className="h-6 w-6" />
              </div>
              <p className="font-semibold text-xl break-all">
                vihaaneducationacademy@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-white/10 text-white mb-2 backdrop-blur">
                <GraduationCap className="h-6 w-6" />
              </div>
              <p className="font-semibold text-xl">
                Starlight Academy
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-2xl font-bold opacity-95">
              Empowering Minds, Shaping Futures.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
