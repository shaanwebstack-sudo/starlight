'use client';

import { ContactForm } from '@/components/contact-form';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

function ContactPageContent() {
  const searchParams = useSearchParams();
  const course = searchParams.get('course') || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm mb-4 border border-white/20 backdrop-blur">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Starlight Academy
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Have questions about admissions, courses, or career guidance?
            Our team is ready to help you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 mb-4 inline-block">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-700">92126 44428</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover">
              <div className="p-3 rounded-xl bg-red-100 text-red-700 mb-4 inline-block">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700 break-all">
                vihaaneducationacademy@gmail.com
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 mb-4 inline-block">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-700">9:00 AM - 6:00 PM</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card card-hover">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 mb-4 inline-block">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-700">Visit Our Academy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Contact Us?
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-card card-hover">
                  ✅ Admission Guidance
                </div>
                <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-card card-hover">
                  ✅ Career Counseling
                </div>
                <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-card card-hover">
                  ✅ Course Selection Support
                </div>
                <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-card card-hover">
                  ✅ Personalized Student Assistance
                </div>
              </div>
            </div>
            {/* Right */}
            <ContactForm initialCourse={course} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
