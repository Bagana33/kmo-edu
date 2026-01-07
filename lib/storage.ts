import type { Course, Intake, Post, Testimonial, Lead, AdminUser } from "./types"

// Storage keys
const KEYS = {
  courses: "kmo_courses",
  intakes: "kmo_intakes",
  posts: "kmo_posts",
  testimonials: "kmo_testimonials",
  leads: "kmo_leads",
  admin: "kmo_admin",
  session: "kmo_session",
}

// Helper functions
function getItem<T>(key: string, defaultValue: T[]): T[] {
  if (typeof window === "undefined") return defaultValue
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : defaultValue
}

function setItem<T>(key: string, value: T[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

// Generate unique ID
export function generateId(): string {
  return crypto.randomUUID()
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Courses
export function getCourses(publishedOnly = false): Course[] {
  const courses = getItem<Course>(KEYS.courses, getDefaultCourses())
  return publishedOnly ? courses.filter((c) => c.is_published) : courses
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getCourses().find((c) => c.slug === slug)
}

export function saveCourse(course: Omit<Course, "id" | "created_at" | "updated_at"> & { id?: string }): Course {
  const courses = getCourses()
  const now = new Date().toISOString()

  if (course.id) {
    const index = courses.findIndex((c) => c.id === course.id)
    if (index !== -1) {
      courses[index] = { ...courses[index], ...course, updated_at: now }
      setItem(KEYS.courses, courses)
      return courses[index]
    }
  }

  const newCourse: Course = {
    ...course,
    id: generateId(),
    created_at: now,
    updated_at: now,
  } as Course

  courses.push(newCourse)
  setItem(KEYS.courses, courses)
  return newCourse
}

export function deleteCourse(id: string): void {
  const courses = getCourses().filter((c) => c.id !== id)
  setItem(KEYS.courses, courses)
}

// Intakes
export function getIntakes(publishedOnly = false): Intake[] {
  const intakes = getItem<Intake>(KEYS.intakes, getDefaultIntakes())
  return publishedOnly ? intakes.filter((i) => i.is_published) : intakes
}

export function getIntakeBySlug(slug: string): Intake | undefined {
  return getIntakes().find((i) => i.slug === slug)
}

export function saveIntake(intake: Omit<Intake, "id" | "created_at" | "updated_at"> & { id?: string }): Intake {
  const intakes = getIntakes()
  const now = new Date().toISOString()

  if (intake.id) {
    const index = intakes.findIndex((i) => i.id === intake.id)
    if (index !== -1) {
      intakes[index] = { ...intakes[index], ...intake, updated_at: now }
      setItem(KEYS.intakes, intakes)
      return intakes[index]
    }
  }

  const newIntake: Intake = {
    ...intake,
    id: generateId(),
    created_at: now,
    updated_at: now,
  } as Intake

  intakes.push(newIntake)
  setItem(KEYS.intakes, intakes)
  return newIntake
}

export function deleteIntake(id: string): void {
  const intakes = getIntakes().filter((i) => i.id !== id)
  setItem(KEYS.intakes, intakes)
}

// Posts
export function getPosts(publishedOnly = false): Post[] {
  const posts = getItem<Post>(KEYS.posts, getDefaultPosts())
  return publishedOnly ? posts.filter((p) => p.is_published) : posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export function savePost(post: Omit<Post, "id" | "created_at" | "updated_at"> & { id?: string }): Post {
  const posts = getPosts()
  const now = new Date().toISOString()

  if (post.id) {
    const index = posts.findIndex((p) => p.id === post.id)
    if (index !== -1) {
      posts[index] = { ...posts[index], ...post, updated_at: now }
      setItem(KEYS.posts, posts)
      return posts[index]
    }
  }

  const newPost: Post = {
    ...post,
    id: generateId(),
    created_at: now,
    updated_at: now,
  } as Post

  posts.push(newPost)
  setItem(KEYS.posts, posts)
  return newPost
}

export function deletePost(id: string): void {
  const posts = getPosts().filter((p) => p.id !== id)
  setItem(KEYS.posts, posts)
}

// Testimonials
export function getTestimonials(publishedOnly = false): Testimonial[] {
  const testimonials = getItem<Testimonial>(KEYS.testimonials, getDefaultTestimonials())
  return publishedOnly ? testimonials.filter((t) => t.is_published) : testimonials
}

export function saveTestimonial(testimonial: Omit<Testimonial, "id" | "created_at"> & { id?: string }): Testimonial {
  const testimonials = getTestimonials()
  const now = new Date().toISOString()

  if (testimonial.id) {
    const index = testimonials.findIndex((t) => t.id === testimonial.id)
    if (index !== -1) {
      testimonials[index] = { ...testimonials[index], ...testimonial }
      setItem(KEYS.testimonials, testimonials)
      return testimonials[index]
    }
  }

  const newTestimonial: Testimonial = {
    ...testimonial,
    id: generateId(),
    created_at: now,
  } as Testimonial

  testimonials.push(newTestimonial)
  setItem(KEYS.testimonials, testimonials)
  return newTestimonial
}

export function deleteTestimonial(id: string): void {
  const testimonials = getTestimonials().filter((t) => t.id !== id)
  setItem(KEYS.testimonials, testimonials)
}

// Leads
export function getLeads(): Lead[] {
  return getItem<Lead>(KEYS.leads, [])
}

export function saveLead(lead: Omit<Lead, "id" | "created_at" | "status" | "source">): Lead {
  const leads = getLeads()
  const now = new Date().toISOString()

  const newLead: Lead = {
    ...lead,
    id: generateId(),
    status: "new",
    source: "website",
    created_at: now,
  }

  leads.unshift(newLead)
  setItem(KEYS.leads, leads)
  return newLead
}

export function updateLeadStatus(id: string, status: Lead["status"]): void {
  const leads = getLeads()
  const index = leads.findIndex((l) => l.id === id)
  if (index !== -1) {
    leads[index].status = status
    setItem(KEYS.leads, leads)
  }
}

export function deleteLead(id: string): void {
  const leads = getLeads().filter((l) => l.id !== id)
  setItem(KEYS.leads, leads)
}

// Admin Auth (localStorage simulation)
export function getAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null
  const admin = localStorage.getItem(KEYS.admin)
  if (!admin) {
    // Set default admin credentials
    const defaultAdmin: AdminUser = {
      email: "admin@kmo.mn",
      password: "admin123",
      role: "admin",
    }
    localStorage.setItem(KEYS.admin, JSON.stringify(defaultAdmin))
    return defaultAdmin
  }
  return JSON.parse(admin)
}

export function login(email: string, password: string): boolean {
  const admin = getAdminUser()
  if (admin && admin.email === email && admin.password === password) {
    localStorage.setItem(KEYS.session, JSON.stringify({ email, loggedIn: true }))
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem(KEYS.session)
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  const session = localStorage.getItem(KEYS.session)
  return session ? JSON.parse(session).loggedIn : false
}

// Default data
function getDefaultCourses(): Course[] {
  return [
    {
      id: "1",
      title: "Солонгос хэл - Анхан шат",
      slug: "korean-beginner",
      level: "beginner",
      price_mnt: 350000,
      short_desc: "Солонгос хэлний үндсэн үсэг, дуудлага, энгийн харилцааны түвшин",
      content_md:
        "## Сургалтын агу|улга\n\n- Хангыль үсэг\n- Үндсэн дуудлага\n- Өдөр тутмын харилцаа\n- 1-2 түвшний TOPIK бэлтгэл",
      schedule_json: { days: ["Даваа", "Лхагва", "Баасан"], time: "18:00-20:00" },
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Солонгос хэл - Дунд шат",
      slug: "korean-intermediate",
      level: "intermediate",
      price_mnt: 450000,
      short_desc: "Дүрмийн гүнзгий мэдлэг, уншлага, бичлэг, ярианы дадлага",
      content_md: "## Сургалтын агуулга\n\n- Нарийн дүрэм\n- Уран зохиол унших\n- Эссэ бичих\n- TOPIK II бэлтгэл",
      schedule_json: { days: ["Мягмар", "Пүрэв"], time: "18:00-20:30" },
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Солонгос хэл - Ахисан түвшин",
      slug: "korean-advanced",
      level: "advanced",
      price_mnt: 550000,
      short_desc: "Мэргэжлийн түвшний Солонгос хэл, TOPIK 5-6 түвшин",
      content_md:
        "## Сургалтын агуулга\n\n- Мэргэжлийн нэр томьёо\n- Бизнес Солонгос хэл\n- Орчуулга\n- TOPIK 5-6 бэлтгэл",
      schedule_json: { days: ["Бямба"], time: "10:00-14:00" },
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}

function getDefaultIntakes(): Intake[] {
  return [
    {
      id: "1",
      title: "2026 оны хаврын элсэлт - Сөүлийн их сургууль",
      slug: "2026-spring-seoul-university",
      start_date: "2026-03-01",
      deadline: "2026-01-15",
      seats: 50,
      requirements: "TOPIK 3+ түвшин, Бакалаврын диплом",
      note: "Тэтгэлэгт хамрагдах боломжтой",
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "2026 оны намрын элсэлт - Коре их сургууль",
      slug: "2026-fall-korea-university",
      start_date: "2026-09-01",
      deadline: "2026-05-30",
      seats: 30,
      requirements: "TOPIK 4+ түвшин, GPA 3.0+",
      note: "Бүрэн тэтгэлэгтэй хөтөлбөр",
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}

function getDefaultPosts(): Post[] {
  return [
    {
      id: "1",
      title: "Солонгост суралцах давуу талууд",
      slug: "benefits-of-studying-in-korea",
      excerpt: "Солонгос улсад суралцах нь яагаад сайн сонголт болох талаар",
      content_md:
        "## Боловсролын чанар\n\nСолонгос улс дэлхийн шилдэг боловсролын системтэй орнуудын нэг...\n\n## Карьерийн боломж\n\nСолонгост суралцсанаар олон улсын түвшинд ажиллах боломж нээгдэнэ...",
      cover_url: "/korean-university-campus.jpg",
      tags: ["Солонгос", "Боловсрол", "Тэтгэлэг"],
      published_at: new Date().toISOString(),
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "TOPIK шалгалтанд бэлтгэх зөвлөмж",
      slug: "topik-preparation-tips",
      excerpt: "TOPIK шалгалтанд амжилттай бэлтгэх аргууд",
      content_md:
        "## TOPIK гэж юу вэ?\n\nTOPIK бол Солонгос хэлний мэдлэгийн түвшинг тодорхойлох олон улсын шалгалт...\n\n## Бэлтгэлийн стратеги\n\n1. Өдөр бүр үг цээжлэх\n2. Сонсох дадлага\n3. Бичих дадлага",
      cover_url: "/student-studying-korean-language.jpg",
      tags: ["TOPIK", "Шалгалт", "Зөвлөмж"],
      published_at: new Date().toISOString(),
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
}

function getDefaultTestimonials(): Testimonial[] {
  return [
    {
      id: "1",
      full_name: "Б. Болормаа",
      quote: "KMO-ийн тусламжтайгаар Сөүлийн их сургуульд тэтгэлэгтэй элслээ. Маш их баярлалаа!",
      rating: 5,
      avatar_url: "/asian-woman-portrait.png",
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      full_name: "Д. Бат-Эрдэнэ",
      quote: "Солонгос хэлний сургалт маш чанартай байсан. TOPIK 4 түвшинд 3 сарын дотор хүрсэн.",
      rating: 5,
      avatar_url: "/asian-man-portrait.png",
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      full_name: "Г. Сарангэрэл",
      quote: "Материал бүрдүүлэлтээс эхлээд виз авах хүртэл бүх процессыг маш сайн удирдсан.",
      rating: 5,
      avatar_url: "/young-asian-woman-smiling.png",
      is_published: true,
      created_at: new Date().toISOString(),
    },
  ]
}

// Migrate old 2025 intake slugs/dates to 2026 for existing localStorage data
function migrateLegacyIntakesTo2026(): void {
  if (typeof window === "undefined") return

  const intakes = getItem<Intake>(KEYS.intakes, [])
  if (!intakes.length) return

  let changed = false
  const updated = intakes.map((intake) => {
    if (intake.slug === "2025-spring-seoul-university") {
      changed = true
      return {
        ...intake,
        title: "2026 оны хаврын элсэлт - Сөүлийн их сургууль",
        slug: "2026-spring-seoul-university",
        start_date: "2026-03-01",
        deadline: "2026-01-15",
      }
    }
    if (intake.slug === "2025-fall-korea-university") {
      changed = true
      return {
        ...intake,
        title: "2026 оны намрын элсэлт - Коре их сургууль",
        slug: "2026-fall-korea-university",
        start_date: "2026-09-01",
        deadline: "2026-05-30",
      }
    }
    return intake
  })

  if (changed) {
    setItem(KEYS.intakes, updated)
  }
}

// Initialize storage with default data
export function initializeStorage(): void {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(KEYS.courses)) {
    setItem(KEYS.courses, getDefaultCourses())
  }
  if (!localStorage.getItem(KEYS.intakes)) {
    setItem(KEYS.intakes, getDefaultIntakes())
  }
  if (!localStorage.getItem(KEYS.posts)) {
    setItem(KEYS.posts, getDefaultPosts())
  }
  if (!localStorage.getItem(KEYS.testimonials)) {
    setItem(KEYS.testimonials, getDefaultTestimonials())
  }
  migrateLegacyIntakesTo2026()
  getAdminUser() // Initialize admin
}
