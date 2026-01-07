"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { LeadForm } from "@/components/lead-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { initializeStorage, getCourses, getIntakes, getTestimonials } from "@/lib/storage"
import type { Course, Intake, Testimonial } from "@/lib/types"
import { GraduationCap, Users, FileText, Calendar, Star, ArrowRight, CheckCircle2, Phone } from "lucide-react"

const services = [
  {
    icon: GraduationCap,
    title: "Солонгост суралцах",
    description: "Их сургуулийн элсэлт, материал бүрдүүлэлт, виз авахад туслах бүрэн үйлчилгээ",
  },
  {
    icon: Users,
    title: "Хэлний сургалт",
    description: "TOPIK шалгалтанд бэлтгэх түвшний Солонгос хэлний сургалт",
  },
  {
    icon: FileText,
    title: "Материал бүрдүүлэлт",
    description: "Бичиг баримт орчуулах, баталгаажуулах, бүрдүүлэхэд туслах",
  },
  {
    icon: Calendar,
    title: "Зөвлөгөө өгөх",
    description: "Элсэлтийн хугацаа, шаардлага, тэтгэлгийн мэдээллээр үнэгүй зөвлөнө",
  },
]

const faqs = [
  {
    q: "Үнэгүй зөвлөгөө хэрхэн авах вэ?",
    a: "Та манай вэбсайтаар дамжуулан хүсэлт илгээх эсвэл 7735-5005 дугаарт залгаж үнэгүй зөвлөгөө авах боломжтой.",
  },
  {
    q: "Материал бүрдүүлэлтэд юу хэрэгтэй вэ?",
    a: "Диплом, тодорхойлолт, гадаад паспорт, цээж зураг, банкны тодорхойлолт зэрэг баримтууд шаардлагатай. Дэлгэрэнгүйг зөвлөгөө авах үед мэдэгдэнэ.",
  },
  {
    q: "Элсэлтийн хугацаа хэдий хугацаанд үргэлжилдэг вэ?",
    a: "Ихэнх Солонгосын их сургуулиуд жилд 2 удаа элсэлт авдаг: 3-р сарын хавар, 9-р сарын намрын улирал.",
  },
  {
    q: "Солонгос хэлний сургалтын түвшин гэж юу вэ?",
    a: "Бид анхан, дунд, ахисан гэсэн 3 түвшний сургалт явуулдаг. TOPIK 1-6 түвшинд бэлтгэнэ.",
  },
  {
    q: "Төлбөрөө хувааж төлж болох уу?",
    a: "Тийм, бид уян хатан төлбөрийн нөхцөл санал болгодог. Дэлгэрэнгүй мэдээллийг холбогдож авна уу.",
  },
  {
    q: "Хаана байрладаг вэ?",
    a: "Баянгол дүүрэг, Хорооллын Өргөөгөөс 25-р эмийн сан руу уруудах зам дагуу, TAF BUILDING 3 давхар 301 тоот.",
  },
]

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [intakes, setIntakes] = useState<Intake[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    initializeStorage()
    setCourses(getCourses(true).slice(0, 3))
    setIntakes(getIntakes(true).slice(0, 3))
    setTestimonials(getTestimonials(true))
  }, [])

  return (
    <div>
      {/* Hero Section - More motion & energy */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/12 via-background to-background py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-6rem] h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl animate-float" />
          <div className="absolute right-[-4rem] bottom-[-6rem] h-80 w-80 rounded-full bg-secondary/50 blur-3xl animate-gradient" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left relative">
              <div className="absolute -left-10 top-6 hidden lg:block h-24 w-24 rounded-full bg-primary/10 blur-3xl animate-float" />
              <Badge
                variant="secondary"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 text-xs sm:text-sm text-primary shadow-sm backdrop-blur animate-soft-pulse"
              >
                Солонгосын их сургуульд элсүүлэх зөвлөх үйлчилгээ
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Солонгост суралцах{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-foreground bg-clip-text text-transparent">
                  мөрөөдлөө
                </span>{" "}
                биелүүл
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0">
                KMO Education Center нь Солонгост суралцахыг хүсэгч оюутнуудад элсэлт, материал бүрдүүлэлт, хэлний
                сургалтын бүрэн үйлчилгээ үзүүлдэг.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" asChild className="w-full sm:w-auto shadow-lg shadow-primary/25">
                  <Link href="/contact">
                    Үнэгүй зөвлөгөө авах
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                  <a href="tel:77355005">
                    <Phone className="mr-2 h-4 w-4" />
                    7735-5005
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 shadow-sm ring-1 ring-primary/10 backdrop-blur">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  100+ оюутан илгээсэн
                </div>
                <div className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 shadow-sm ring-1 ring-primary/10 backdrop-blur [animation-delay:0.6s] animate-soft-pulse">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  5+ жилийн туршлага
                </div>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl animate-gradient" />
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 bg-background/80 soft-shadow backdrop-blur">
                <Image
                  src="/korean-university-students-studying-together.jpg"
                  alt="Солонгосын их сургуулийн оюутнууд"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover scale-[1.02]"
                  priority
                />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur animate-float">
                  <Star className="h-4 w-4 text-primary fill-primary/30" />
                  TOPIK & элсэлтийн цогц тусламж
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-primary/90 px-4 py-3 text-primary-foreground shadow-lg animate-soft-pulse">
                  <GraduationCap className="h-5 w-5" />
                  2026 элсэлт нээлттэй
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Improved mobile grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Бидний үйлчилгээ"
            subtitle="Солонгост суралцах зорилгодоо хүрэхэд танд туслах бүрэн үйлчилгээ"
          />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card
                key={service.title}
                className="group glass-card h-full transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <CardHeader className="pb-2 sm:pb-4">
                  <div className="mb-2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 text-primary ring-1 ring-primary/10 transition duration-300 group-hover:scale-105">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <CardDescription className="text-sm text-muted-foreground/90">{service.description}</CardDescription>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition duration-300 group-hover:opacity-100">
                    Илүү мэдэх <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 text-center">
            <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/services">
                Бүх үйлчилгээ үзэх
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section - Improved mobile layout */}
      <section className="bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Солонгос хэлний сургалт" subtitle="TOPIK шалгалтанд бэлтгэх түвшинтэй сургалтууд" />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="group overflow-hidden glass-card soft-shadow transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <CardHeader className="pb-2 sm:pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <Badge
                      variant={
                        course.level === "beginner"
                          ? "secondary"
                          : course.level === "intermediate"
                            ? "default"
                            : "outline"
                      }
                    >
                      {course.level === "beginner"
                        ? "Анхан шат"
                        : course.level === "intermediate"
                          ? "Дунд шат"
                          : "Ахисан түвшин"}
                    </Badge>
                    {course.price_mnt && (
                      <span className="text-xs sm:text-sm font-semibold text-primary bg-primary/5 px-2 py-1 rounded-full">
                        {course.price_mnt.toLocaleString()}₮
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 pt-0">
                  <CardDescription className="text-sm text-muted-foreground/90 line-clamp-2">
                    {course.short_desc}
                  </CardDescription>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`/courses/${course.slug}`}>Дэлгэрэнгүй</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 text-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/courses">
                Бүх сургалт үзэх
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intakes Section - Single column on mobile */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Элсэлтийн календарь" subtitle="Одоо нээлттэй байгаа элсэлтийн хөтөлбөрүүд" />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {intakes.map((intake) => (
              <Card
                key={intake.id}
                className="group glass-card soft-shadow transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <CardHeader className="pb-2 sm:pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs ring-1 ring-primary/15">
                      <Calendar className="mr-1 h-3 w-3" />
                      {intake.deadline ? new Date(intake.deadline).toLocaleDateString("mn-MN") : "TBD"}
                    </Badge>
                    {intake.seats && (
                      <span className="text-xs sm:text-sm text-muted-foreground">{intake.seats} суудал</span>
                    )}
                  </div>
                  <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">
                    {intake.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 pt-0">
                  {intake.requirements && (
                    <CardDescription className="text-sm text-muted-foreground/90 line-clamp-2">
                      {intake.requirements}
                    </CardDescription>
                  )}
                  <Button className="w-full" asChild>
                    <Link href={`/intakes/${intake.slug}`}>Бүртгүүлэх</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 sm:mt-8 text-center">
            <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/intakes">
                Бүх элсэлт үзэх
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Horizontal scroll on mobile */}
      <section className="bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Манай оюутнууд" subtitle="Амжилттай суралцаж буй оюутнуудын сэтгэгдэл" />
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="glass-card soft-shadow flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-start transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <CardContent className="pt-6">
                  <div className="mb-3 sm:mb-4 flex">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground line-clamp-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={testimonial.avatar_url || "/placeholder.svg?height=40&width=40&query=student avatar"}
                        alt={testimonial.full_name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm sm:text-base font-medium">{testimonial.full_name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Better mobile padding */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="Түгээмэл асуултууд" subtitle="Хамгийн их асуудаг асуултууд болон хариултууд" />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base py-3 sm:py-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section - Improved mobile layout */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary py-12 sm:py-16 md:py-20 text-primary-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[-3rem] h-48 w-48 rounded-full bg-white/20 blur-3xl animate-float" />
          <div className="absolute right-[8%] bottom-[-4rem] h-56 w-56 rounded-full bg-secondary/50 blur-3xl animate-gradient" />
        </div>
        <div className="mx-auto max-w-7xl px-4 relative">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
                Солонгост суралцах мөрөөдөлтэй юу?
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/80 max-w-lg mx-auto lg:mx-0">
                Бидэнтэй холбогдож үнэгүй зөвлөгөө аваарай. Таны зорилгодоо хүрэхэд бид тусална.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="tel:77355005"
                  className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-base sm:text-lg font-semibold shadow-lg backdrop-blur transition hover:scale-[1.02]"
                >
                  <Phone className="h-5 w-5" />
                  7735-5005
                </a>
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur animate-soft-pulse">
                  Хариу өгөх хугацаа: 1 цагийн дотор
                </div>
              </div>
            </div>
            <Card className="glass-card soft-shadow relative overflow-hidden border-white/30 bg-background/90">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/15 animate-gradient" />
              <CardHeader className="pb-2 sm:pb-4 relative">
                <CardTitle className="text-lg sm:text-xl">Үнэгүй зөвлөгөө авах</CardTitle>
                <CardDescription>Мэдээллээ үлдээвэл бид тантай холбогдоно</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <LeadForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
