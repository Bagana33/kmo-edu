"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LeadForm } from "@/components/lead-form"
import { initializeStorage, getCourseBySlug } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

const levelLabels = {
  beginner: "Анхан шат",
  intermediate: "Дунд шат",
  advanced: "Ахисан түвшин",
}

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeStorage()
    const foundCourse = getCourseBySlug(params.slug as string)
    if (foundCourse && foundCourse.is_published) {
      setCourse(foundCourse)
    }
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-muted-foreground">Уншиж байна...</div>
      </div>
    )
  }

  if (!course) {
    notFound()
  }

  const schedule = course.schedule_json as { days?: string[]; time?: string } | null

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Бүх сургалт
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Badge
                variant={
                  course.level === "beginner" ? "secondary" : course.level === "intermediate" ? "default" : "outline"
                }
              >
                {levelLabels[course.level]}
              </Badge>
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{course.title}</h1>

            {course.short_desc && <p className="mb-6 text-lg text-muted-foreground">{course.short_desc}</p>}

            {schedule && (
              <div className="mb-6 flex flex-wrap gap-4">
                {schedule.days && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    {schedule.days.join(", ")}
                  </div>
                )}
                {schedule.time && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    {schedule.time}
                  </div>
                )}
              </div>
            )}

            {course.content_md && (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{course.content_md}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Бүртгүүлэх</CardTitle>
                {course.price_mnt && (
                  <div className="text-2xl font-bold text-primary">{course.price_mnt.toLocaleString()}₮</div>
                )}
                <CardDescription>Мэдээллээ үлдээвэл бид тантай холбогдоно</CardDescription>
              </CardHeader>
              <CardContent>
                <LeadForm courseSlug={course.slug} defaultServiceType="korean_course" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
