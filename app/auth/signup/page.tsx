'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import DynamicCategoryForm, {
  type CompleteFormValue,
} from '@/components/ui/dynamic-category-form';

import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import type { StudentCategory } from '@/lib/types';

import {
  Loader2,
  GraduationCap,
  Shield,
  User,
  ArrowRight,
} from 'lucide-react';

type SignupMode = 'student' | 'admin';

export default function SignupPage() {
  const router = useRouter();

  const { signUp, signUpStudent, user, role, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<SignupMode>('student');

  // Account fields (shared)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const validatePasswords = () => {
    if (password.length < 6) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description: 'Please make sure both passwords are the same.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSubmitStudent = async (categoryData: CompleteFormValue) => {
    if (!email.trim()) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!categoryData.full_name.trim()) {
      toast({
        title: 'Full Name Required',
        description: 'Please enter your full name.',
        variant: 'destructive',
      });
      return;
    }

    if (!categoryData.category) {
      toast({
        title: 'Category Required',
        description: 'Please select a category for your application.',
        variant: 'destructive',
      });
      return;
    }

    if (!validatePasswords()) return;

    setIsLoading(true);

    try {
      const subjectsArray = categoryData.subjects && categoryData.subjects.length > 0
        ? categoryData.subjects
        : [];

      await signUpStudent(email.trim(), password, {
        full_name: categoryData.full_name.trim(),
        phone: categoryData.phone?.trim() || undefined,
        subjects: subjectsArray.length > 0 ? subjectsArray : undefined,
        address: categoryData.address?.trim() || undefined,
        category: (categoryData.category as StudentCategory) || undefined,
        exam: categoryData.exam?.trim() || undefined,
        level: categoryData.level?.trim() || undefined,
        stream: categoryData.stream?.trim() || undefined,
        session: categoryData.session?.trim() || undefined,
        batch: categoryData.batch?.trim() || undefined,
        batch_timing: categoryData.batch_timing?.trim() || undefined,
        duration: categoryData.duration?.trim() || undefined,
        computer_course: categoryData.computer_course?.trim() || undefined,
        parent_name: categoryData.parent_name?.trim() || undefined,
        parent_phone: categoryData.parent_phone?.trim() || undefined,
        date_of_birth: categoryData.date_of_birth || undefined,
      });

      toast({
        title: 'Application Submitted Successfully',
        description:
          'Your registration is complete. Please confirm your email and login. An administrator will review your application and your enrollment number will be generated upon approval.',
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

    if (!validatePasswords()) return;

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
          <p className="text-sm text-gray-500">Checking your account...</p>
        </div>
      </div>
    );
  }

  if (user && role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-red-600 shadow-lg shadow-blue-200">
              <GraduationCap className="h-9 w-9 text-white" />
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Starlight Academy
          </h1>

          <p className="mt-2 text-gray-500">
            Create your account and submit your application
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 rounded-xl bg-blue-50 p-1.5 max-w-sm mx-auto">
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
          <Card className="border-blue-100 shadow-xl shadow-blue-100/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Student Registration</h2>
              <p className="mt-1 text-blue-100 text-sm">
                Fill out the form to apply for admission. Your enrollment number will be generated after admin approval.
              </p>
            </div>

            <CardContent className="p-5 md:p-6 space-y-6">
              {/* ===== ACCOUNT INFORMATION ===== */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                  <span className="w-1.5 h-5 bg-gradient-to-b from-blue-600 to-red-600 rounded-full" />
                  Account Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="student-email">Email *</Label>
                  <Input
                    id="student-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="student@example.com"
                    className={`h-11 ${inputClass}`}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password *</Label>
                    <Input
                      id="student-password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      minLength={6}
                      placeholder="At least 6 characters"
                      className={`h-11 ${inputClass}`}
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
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      minLength={6}
                      placeholder="Confirm your password"
                      className={`h-11 ${inputClass}`}
                    />
                  </div>
                </div>
              </div>

              {/* ===== PERSONAL + CATEGORY FIELDS ===== */}
              <DynamicCategoryForm
                mode="signup"
                isLoading={isLoading}
                onSubmit={handleSubmitStudent}
                submitLabel={
                  isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting application...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )
                }
                courses={[]}
              />

              {/* Info Notice */}
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
                <div className="flex gap-4">
                  <div className="mt-0.5 shrink-0">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                      ⏳
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-amber-900">
                      Application Review Process
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-amber-800">
                      After you submit your application, it will be reviewed by our
                      administration team. Once approved:
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-amber-800 list-disc pl-5">
                      <li>Your student account will be activated</li>
                      <li>A unique enrollment number will be generated (e.g. ST-0001)</li>
                      <li>You will gain access to the dashboard, courses, and quizzes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Signup Card */}
        {mode === 'admin' && (
          <Card className="border-blue-100 shadow-xl shadow-blue-100/50">
            <CardHeader>
              <CardTitle className="text-blue-900">Admin Registration</CardTitle>
              <CardDescription>
                Create an administrator account to manage the academy dashboard,
                courses, students, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitAdmin} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm font-semibold text-blue-900">
                      Account Information
                    </h2>
                    <p className="text-xs text-gray-500">
                      These details will be used to login to your admin account.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-name">Full Name *</Label>
                    <Input
                      id="admin-name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="e.g. Hemant Singh"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email *</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="admin@starlightacademy.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password *</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Admin accounts have full control over courses, blogs,
                        notices, students, admissions, and gallery. Only create an
                        admin account if you are authorized to manage this academy.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 h-12 rounded-xl"
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
