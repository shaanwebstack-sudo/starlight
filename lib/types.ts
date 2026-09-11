export interface Course {
  id: string;
  title: string;
  slug?: string;
  description: string;
  image_url?: string;
  image?: string;
  duration?: string;
  fee?: string;
  price?: number;
  featured?: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  course: string;
  message: string | null;
  created_at: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  image?: File;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  course: string;
  message?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  image_alt: string;
  author: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  canonical_url: string;
  og_image: string;
  reading_time: number;
  views: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories?: BlogCategory[];
  tags?: BlogTag[];
  faqs?: BlogFAQ[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_id: string | null;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogFAQ {
  id: string;
  blog_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollment_number: string;
  course: string | null;
  phone: string | null;
  class: string | null;
  reference_number: string | null;
  subjects: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentFormData {
  full_name: string;
  email: string;
  enrollment_number: string;
  course: string;
  phone: string;
  class_grade: string;
  address: string;
  subjects: string;
}
export type StudentProfile = {
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
};

export interface Admission {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  course: string;
  class: string | null;
  subjects: string | null;
  reference_number: string | null;
  parent_name: string | null;
  parent_phone: string | null;
  address: string | null;
  status: 'pending' | 'approved' | 'rejected';
  message: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdmissionFormData {
  student_name: string;
  email: string;
  phone: string;
  course: string;
  class: string;
  subjects: string;
  reference_number: string;
  parent_name: string;
  parent_phone: string;
  address: string;
  message: string;
}





export interface QuizSubject {
  id: string;
  name: string;
  description: string;
  slug: string | null;
  created_at: string;
}

export interface Quiz {
  id: string;
  subject_id: string;
  title: string;
  description: string;
  duration_minutes: number;
  passing_score: number;
  is_active: boolean;
  slug: string | null;
  created_at: string;
  questions_count?: number;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  sort_order: number;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string | null;
  student_name: string;
  student_email: string | null;
  score: number;
  total_questions: number;
  percentage: number;
  passed: boolean;
  time_taken_seconds: number | null;
  started_at: string;
  completed_at: string;
}
