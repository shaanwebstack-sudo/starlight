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
  Shield,
  User,
} from 'lucide-react';

type SignupMode = 'student' | 'admin';

export default function SignupPage() {
  const router = useRouter();

  const {
    signUp,
    signUpStudent,
    user,
    role,
    isLoading: authLoading,
  } = useAuth();

  const { toast } = useToast();

  const [mode, setMode] = useState<SignupMode>('student');

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

  // Admin fields
  const [adminName, setAdminName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmitStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast({
        title: 'Full Name Required',
        description: 'Please enter your full name.',
        variant: 'destructive',
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description: 'Please make sure both passwords are the same.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const subjectsArray = subjects
        ? subjects
            .split(',')
            .map((subject) => subject.trim())
            .filter(Boolean)
        : [];

      await signUpStudent(email.trim(), password, {
        full_name: fullName.trim(),
        phone: phone.trim() || undefined,
        course: course.trim() || undefined,
        class_grade: classGrade.trim() || undefined,
        enrollment_number: enrollmentNumber.trim() || undefined,
        subjects: subjectsArray.length > 0 ? subjectsArray : undefined,
        address: address.trim() || undefined,
      });

      toast({
        title: 'Account Created Successfully',
        description:
          'Please confirm your email address and then login. Your account will remain pending until an administrator approves it.',
      });

      router.replace('/auth/login');
    } catch (error) {
      let message = 'Failed to create student account. Please try again.';

      if (error instanceof Error) {
        message = error.message;
      }

      const lowerMessage = message.toLowerCase();

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

  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminName.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter your name.',
        variant: 'destructive',
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description: 'Please make sure both passwords are the same.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email.trim(), password, adminName.trim());

      toast({
        title: 'Admin Account Created',
        description:
          'Your admin account has been created. Please login to access the admin dashboard.',
      });

      router.replace('/auth/login');
    } catch (error) {
      let message = 'Failed to create admin account. Please try again.';

      if (error instanceof Error) {
        message = error.message;
      }

      const lowerMessage = message.toLowerCase();

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
            Create your account
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 rounded-xl bg-blue-50 p-1.5">
          <button
            type="button"
            onClick={() => setMode('student')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === 'student'
                ? 'bg-blue-600 text-white shadow'
                : 'text-blue-700 hover:bg-blue-100'
            }`}
          >
            <User className="h-4 w-4" />
            Student
          </button>
          <button
            type="button"
            onClick={() => setMode('admin')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === 'admin'
                ? 'bg-blue-600 text-white shadow'
                : 'text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Shield className="h-4 w-4" />
            Admin
          </button>
        </div>

        {/* Student Signup Card */}
        {mode === 'student' && (
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
                          setConfirmPassword(e.target.value)
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
                    <div className="space-y-2">
                      <Label htmlFor="student-enrollment">
                        Enrollment Number
                      </Label>
                      <Input
                        id="student-enrollment"
                        value={enrollmentNumber}
                        onChange={(e) =>
                          setEnrollmentNumber(e.target.value)
                        }
                        disabled={isLoading}
                        placeholder="e.g. VEA-2026-001"
                        className={inputClass}
                      />
                    </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="student-class">
                        Class / Grade
                      </Label>
                      <Input
                        id="student-class"
                        value={classGrade}
                        onChange={(e) =>
                          setClassGrade(e.target.value)
                        }
                        disabled={isLoading}
                        placeholder="e.g. 10th, 12th, Foundation"
                        className={inputClass}
                      />
                    </div>
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
            </CardContent>
          </Card>
        )}

        {/* Admin Signup Card */}
        {mode === 'admin' && (
          <Card className="border-blue-100 shadow-xl shadow-blue-100/50">
            <CardHeader>
              <CardTitle className="text-blue-900">
                Admin Registration
              </CardTitle>
              <CardDescription>
                Create an administrator account to manage the
                academy dashboard, courses, students, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitAdmin}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm font-semibold text-blue-900">
                      Account Information
                    </h2>
                    <p className="text-xs text-gray-500">
                      These details will be used to login to
                      your admin account.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-name">
                      Full Name *
                    </Label>
                    <Input
                      id="admin-name"
                      value={adminName}
                      onChange={(e) =>
                        setAdminName(e.target.value)
                      }
                      required
                      disabled={isLoading}
                      placeholder="e.g. Hemant Singh"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">
                      Email *
                    </Label>
                    <Input
                      id="admin-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      disabled={isLoading}
                      placeholder="admin@starlightacademy.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">
                        Password *
                      </Label>
                      <Input
                        id="admin-password"
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
                    <div className="space-y-2">
                      <Label htmlFor="admin-confirm-password">
                        Confirm Password *
                      </Label>
                      <Input
                        id="admin-confirm-password"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
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

                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Shield className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-red-900">
                        Admin Access
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-red-800">
                        Admin accounts have full control over
                        courses, blogs, notices, students,
                        admissions, and gallery. Only create
                        an admin account if you are authorized
                        to manage this academy.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating admin account...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Login Link */}
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

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          © 2024 Starlight Academy. All rights reserved.
        </p>
      </div>
    </div>
  );
}
