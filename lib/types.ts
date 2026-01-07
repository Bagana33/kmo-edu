export interface Course {
  id: string
  title: string
  slug: string
  level: "beginner" | "intermediate" | "advanced"
  price_mnt: number | null
  short_desc: string | null
  content_md: string | null
  schedule_json: Record<string, unknown> | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Intake {
  id: string
  title: string
  slug: string
  start_date: string | null
  deadline: string | null
  seats: number | null
  requirements: string | null
  note: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content_md: string | null
  cover_url: string | null
  tags: string[]
  published_at: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  full_name: string
  quote: string
  rating: number | null
  avatar_url: string | null
  is_published: boolean
  created_at: string
}

export interface Lead {
  id: string
  full_name: string
  phone: string
  email: string | null
  service_type: "consulting" | "study_abroad" | "korean_course" | "other"
  message: string | null
  intake_slug: string | null
  course_slug: string | null
  status: "new" | "contacted" | "qualified" | "closed"
  source: string
  utm: Record<string, string> | null
  created_at: string
}

export interface AdminUser {
  email: string
  password: string
  role: "admin"
}
