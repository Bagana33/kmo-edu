"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { initializeStorage, getCourses } from "@/lib/storage"
import type { Course } from "@/lib/types"

const levelLabels = {
  beginner: "Анхан шат",
  intermediate: "Дунд шат",
  advanced: "Ахисан түвшин",
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    initializeStorage()
    setCourses(getCourses(true))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Солонгос хэлний сургалт</h1>
            <p className="mt-4 text-lg text-muted-foreground">TOPIK шалгалтанд бэлтгэх түвшинтэй сургалтууд</p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        course.level === "beginner"
                          ? "secondary"
                          : course.level === "intermediate"
                            ? "default"
                            : "outline"
                      }
                    >
                      {levelLabels[course.level]}
                    </Badge>
                    {course.price_mnt && (
                      <span className="text-lg font-semibold text-primary">{course.price_mnt.toLocaleString()}₮</span>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <CardDescription className="flex-1">{course.short_desc}</CardDescription>
                  <Button className="mt-4 w-full" asChild>
                    <Link href={`/courses/${course.slug}`}>Дэлгэрэнгүй</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">Одоогоор нээлттэй сургалт байхгүй байна.</div>
          )}
        </div>
      </section>
    </div>
  )
}
