'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export type UserRole = 'admin' | 'student' | null;

export interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  course: string | null;
  class_grade: string | null;
  enrollment_number: string | null;
  subjects: string[];
  address: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

interface UserRoleRow {
  user_id: string;
  role: 'admin' | 'student';
  created_at?: string;
}

interface SignUpStudentData {
  full_name: string;
  phone?: string;
  course?: string;
  class_grade?: string;
  enrollment_number?: string;
  subjects?: string[];
  address?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  profile: StudentProfile | null;
  isLoading: boolean;

  signUp: (
    email: string,
    password: string
  ) => Promise<void>;

  signUpStudent: (
    email: string,
    password: string,
    data: SignUpStudentData
  ) => Promise<void>;

  signIn: (
    email: string,
    password: string
  ) => Promise<void>;

  signOut: () => Promise<void>;

  refreshRoleAndProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [profile, setProfile] =
    useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Keep one Supabase browser client instance.
  const supabase = useRef(createClient()).current;

  /**
   * Fetch the logged-in user's role and student profile.
   */
  const fetchRoleAndProfile = async (userId: string) => {
    try {
      /*
       * First get the user's role.
       */
      const { data: roleRaw, error: roleFetchError } =
        await supabase
          .from('user_roles')
          .select('user_id, role, created_at')
          .eq('user_id', userId)
          .maybeSingle();

      if (roleFetchError) {
        console.error(
          'Error fetching user role:',
          roleFetchError
        );

        setRole(null);
        setProfile(null);
        return;
      }

      const roleData =
        roleRaw as unknown as UserRoleRow | null;

      const detectedRole: UserRole =
        roleData?.role ?? null;

      setRole(detectedRole);

      /*
       * If the user is a student,
       * fetch their student profile.
       */
      if (detectedRole === 'student') {
        const {
          data: profileRaw,
          error: profileFetchError,
        } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (profileFetchError) {
          console.error(
            'Error fetching student profile:',
            profileFetchError
          );

          setProfile(null);
          return;
        }

        const studentProfile =
          profileRaw as unknown as StudentProfile | null;

        setProfile(studentProfile);
      } else {
        /*
         * Admin or unknown role doesn't need
         * a student profile.
         */
        setProfile(null);
      }
    } catch (error) {
      console.error(
        'Error fetching role/profile:',
        error
      );

      setRole(null);
      setProfile(null);
    }
  };

  /**
   * Manually refresh the current user's role/profile.
   *
   * This is useful after admin approval or
   * when the student dashboard needs fresh data.
   */
  const refreshRoleAndProfile = async () => {
    if (!user) {
      setRole(null);
      setProfile(null);
      return;
    }

    await fetchRoleAndProfile(user.id);
  };

  /**
   * Initial authentication check
   * + listen for auth state changes.
   */
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await fetchRoleAndProfile(currentUser.id);
        } else {
          setRole(null);
          setProfile(null);
        }
      } catch (error) {
        console.error(
          'Error initializing authentication:',
          error
        );

        if (mounted) {
          setUser(null);
          setRole(null);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;

        if (!mounted) return;

        setUser(currentUser);

        if (currentUser) {
          /*
           * Fetch role/profile whenever a valid
           * authenticated session exists.
           */
          if (
            event === 'SIGNED_IN' ||
            event === 'TOKEN_REFRESHED' ||
            event === 'INITIAL_SESSION'
          ) {
            await fetchRoleAndProfile(currentUser.id);
          }
        } else {
          setRole(null);
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  /**
   * ADMIN SIGNUP
   *
   * Keep this for your current system.
   *
   * IMPORTANT:
   * For production, public admin signup should be
   * removed/restricted. Admin accounts should ideally
   * be created separately.
   */
  const signUp = async (
    email: string,
    password: string
  ) => {
    const {
      data: authData,
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error(
        'Sign up failed: no user returned'
      );
    }

    const {
      error: roleError,
    } = await supabase
      .from('user_roles')
      .insert([
        {
          user_id: authData.user.id,
          role: 'admin',
        } as never,
      ]);

    if (roleError) {
      throw new Error(roleError.message);
    }
  };

  /**
   * STUDENT SIGNUP
   *
   * Every new student starts as:
   *
   * role = student
   * is_approved = false
   *
   * Admin must approve the student later.
   */
const signUpStudent = async (
  email: string,
  password: string,
  data: SignUpStudentData
) => {
  const normalizedEmail = email.trim().toLowerCase();

  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email: normalizedEmail,
      password,

      options: {
        data: {
          full_name: data.full_name?.trim() || '',
          phone: data.phone?.trim() || '',
          course: data.course?.trim() || '',
          class_grade: data.class_grade?.trim() || '',
          enrollment_number:
            data.enrollment_number?.trim() || '',
          subjects: data.subjects || [],
          address: data.address?.trim() || '',
        },
      },
    });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error(
      'Student registration failed: no user was created.'
    );
  }
};

  /**
   * LOGIN
   */
  const signIn = async (
    email: string,
    password: string
  ) => {
    const {
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  /**
   * LOGOUT
   */
  const signOut = async () => {
    const {
      error,
    } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    setUser(null);
    setRole(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        profile,
        isLoading,
        signUp,
        signUpStudent,
        signIn,
        signOut,
        refreshRoleAndProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}