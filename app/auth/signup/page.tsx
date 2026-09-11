'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';

import {
  Loader as Loader2,
  GraduationCap,
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const {
    signUpStudent,
    user,
    role,
    isLoading: authLoading,
  } = useAuth();

  const { toast } = useToast();

  // Account fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Student profile fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [subjects, setSubjects] = useState('');
  const [address, setAddress] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  /*
   * If the user is already authenticated,
   * don't allow them to stay on signup.
   *
   * We wait for the role to be resolved first.
   */
  useEffect(() => {
    if (authLoading) return;

    if (!user) return;

    if (!role) return;

    if (role === 'admin') {
      router.replace('/admin');
      return;
    }

    if (role === 'student') {
      router.replace('/student/dashboard');
      return;
    }

    router.replace('/');
  }, [authLoading, user, role, router]);

  /*
   * Student signup
   */
  const handleSubmitStudent = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    /*
     * Full name validation
     */
    if (!fullName.trim()) {
      toast({
        title: 'Full Name Required',
        description: 'Please enter your full name.',
        variant: 'destructive',
      });
      return;
    }

    /*
     * Email validation
     */
    if (!email.trim()) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    /*
     * Password validation
     */
    if (password.length < 6) {
      toast({
        title: 'Invalid Password',
        description:
          'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    /*
     * Confirm password
     */
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description:
          'Please make sure both passwords are the same.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      /*
       * Convert comma-separated subjects into
       * a string array.
       *
       * Example:
       *
       * Mathematics, Science, English
       *
       * becomes:
       *
       * ['Mathematics', 'Science', 'English']
       */
      const subjectsArray = subjects
        ? subjects
            .split(',')
            .map((subject) => subject.trim())
            .filter(Boolean)
        : [];

      /*
       * Create the student account.
       *
       * signUpStudent() in AuthContext handles:
       *
       * 1. auth.users
       * 2. user_roles
       * 3. student_profiles
       *
       * New students are created with:
       *
       * is_approved = false
       */
      await signUpStudent(
        email.trim(),
        password,
        {
          full_name: fullName.trim(),

          phone: phone.trim() || undefined,

          course: course.trim() || undefined,

          class_grade:
            classGrade.trim() || undefined,

          enrollment_number:
            enrollmentNumber.trim() || undefined,

          subjects:
            subjectsArray.length > 0
              ? subjectsArray
              : undefined,

          address:
            address.trim() || undefined,
        }
      );

      /*
       * Successful signup.
       *
       * We send the student to LOGIN instead of directly
       * opening the dashboard.
       *
       * This works correctly when Supabase email
       * confirmation is enabled.
       */
      toast({
        title: 'Account Created Successfully',
        description:
          'Please confirm your email address and then login. Your account will remain pending until an administrator approves it.',
      });

      router.replace('/auth/login');
    } catch (error) {
      let message =
        'Failed to create student account. Please try again.';

      if (error instanceof Error) {
        message = error.message;
      }

      /*
       * Friendly handling for common Supabase errors.
       */
      const lowerMessage =
        message.toLowerCase();

      if (
        lowerMessage.includes('already registered') ||
        lowerMessage.includes('user already registered')
      ) {
        message =
          'An account with this email already exists. Please login instead.';
      }

      toast({
        title: 'Signup Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'border-blue-100 focus:border-blue-400 focus:ring-blue-400';

  /*
   * Initial auth loading.
   */
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <p className="text-sm text-gray-500">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Already authenticated.
   */
  if (user && role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <p className="text-sm text-gray-500">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-blue-50 px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
              <GraduationCap className="h-9 w-9 text-white" />
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Starlight Academy
          </h1>

          <p className="mt-2 text-gray-500">
            Create your student account
          </p>
        </div>

        {/* Signup Card */}
        <Card className="border-blue-100 shadow-xl shadow-blue-100/50">

          <CardHeader>
            <CardTitle className="text-blue-900">
              Student Registration
            </CardTitle>

            <CardDescription>
              Create your student account to access the
              academy dashboard and online tests.
            </CardDescription>
          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleSubmitStudent}
              className="space-y-6"
            >

              {/* ================= ACCOUNT INFORMATION ================= */}
              <div className="space-y-4">

                <div>
                  <h2 className="text-sm font-semibold text-blue-900">
                    Account Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    These details will be used to login to
                    your student account.
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="student-email">
                    Email *
                  </Label>

                  <Input
                    id="student-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    disabled={isLoading}
                    placeholder="student@example.com"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="student-password">
                      Password *
                    </Label>

                    <Input
                      id="student-password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      disabled={isLoading}
                      minLength={6}
                      placeholder="At least 6 characters"
                      className={inputClass}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="student-confirm-password">
                      Confirm Password *
                    </Label>

                    <Input
                      id="student-confirm-password"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      required
                      disabled={isLoading}
                      minLength={6}
                      placeholder="Confirm your password"
                      className={inputClass}
                    />
                  </div>

                </div>
              </div>

              {/* ================= STUDENT INFORMATION ================= */}
              <div className="space-y-4">

                <div>
                  <h2 className="text-sm font-semibold text-blue-900">
                    Student Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Provide your academic and contact
                    information.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="student-fullname">
                      Full Name *
                    </Label>

                    <Input
                      id="student-fullname"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      required
                      disabled={isLoading}
                      placeholder="e.g. Rahul Sharma"
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="student-phone">
                      Phone
                    </Label>

                    <Input
                      id="student-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      disabled={isLoading}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>

                  {/* Enrollment */}
                  <div className="space-y-2">
                    <Label htmlFor="student-enrollment">
                      Enrollment Number
                    </Label>

                    <Input
                      id="student-enrollment"
                      value={enrollmentNumber}
                      onChange={(e) =>
                        setEnrollmentNumber(
                          e.target.value
                        )
                      }
                      disabled={isLoading}
                      placeholder="e.g. VEA-2026-001"
                      className={inputClass}
                    />
                  </div>

                  {/* Course */}
                  <div className="space-y-2">
                    <Label htmlFor="student-course">
                      Course
                    </Label>

                    <Input
                      id="student-course"
                      value={course}
                      onChange={(e) =>
                        setCourse(e.target.value)
                      }
                      disabled={isLoading}
                      placeholder="e.g. NIOS 10th, CBSE 12th"
                      className={inputClass}
                    />
                  </div>

                  {/* Class */}
                  <div className="space-y-2">
                    <Label htmlFor="student-class">
                      Class / Grade
                    </Label>

                    <Input
                      id="student-class"
                      value={classGrade}
                      onChange={(e) =>
                        setClassGrade(
                          e.target.value
                        )
                      }
                      disabled={isLoading}
                      placeholder="e.g. 10th, 12th, Foundation"
                      className={inputClass}
                    />
                  </div>

                  {/* Subjects */}
                  <div className="space-y-2">
                    <Label htmlFor="student-subjects">
                      Subjects
                    </Label>

                    <Input
                      id="student-subjects"
                      value={subjects}
                      onChange={(e) =>
                        setSubjects(e.target.value)
                      }
                      disabled={isLoading}
                      placeholder="Math, Science, English"
                      className={inputClass}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="student-address">
                      Address
                    </Label>

                    <Textarea
                      id="student-address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      disabled={isLoading}
                      placeholder="Your full address"
                      rows={3}
                      className={inputClass}
                    />
                  </div>

                </div>
              </div>

              {/* ================= APPROVAL INFORMATION ================= */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">

                <div className="flex gap-3">

                  <div className="mt-0.5 shrink-0">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                      ⏳
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-yellow-900">
                      Admin Approval Required
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-yellow-800">
                      After registration, your account will
                      remain pending until an administrator
                      approves it. You will be able to access
                      quizzes and other restricted features
                      after approval.
                    </p>
                  </div>

                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating student account...
                  </>
                ) : (
                  'Create Student Account'
                )}
              </Button>

            </form>

            {/* Login */}
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-500">
                Already have an account?{' '}

                <Link
                  href="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>

          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          © 2024 Starlight Academy.
          All rights reserved.
        </p>

      </div>
    </div>
  );
}