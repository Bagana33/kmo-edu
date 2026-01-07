"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LeadForm } from "@/components/lead-form"
import { initializeStorage, getIntakeBySlug } from "@/lib/storage"
import type { Intake } from "@/lib/types"
import { ArrowLeft, Calendar, Users, MapPin } from "lucide-react"

export default function IntakeDetailPage() {
  const params = useParams()
  const [intake, setIntake] = useState<Intake | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeStorage()
    const foundIntake = getIntakeBySlug(params.slug as string)
    if (foundIntake && foundIntake.is_published) {
      setIntake(foundIntake)
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

  if (!intake) {
    notFound()
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/intakes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Бүх элсэлт
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {intake.deadline && (
                <Badge variant="outline">
                  <Calendar className="mr-1 h-3 w-3" />
                  Хугацаа: {new Date(intake.deadline).toLocaleDateString("mn-MN")}
                </Badge>
              )}
              {intake.seats && (
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" />
                  {intake.seats} суудал
                </Badge>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{intake.title}</h1>

            {intake.start_date && (
              <div className="mb-6 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Эхлэх огноо: {new Date(intake.start_date).toLocaleDateString("mn-MN")}
              </div>
            )}

            {intake.requirements && (
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold">Шаардлага</h2>
                <p className="text-muted-foreground">{intake.requirements}</p>
              </div>
            )}

            {intake.note && (
              <div className="rounded-lg bg-primary/10 p-4 text-primary">
                <h3 className="mb-1 font-medium">Тэмдэглэл</h3>
                <p>{intake.note}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Бүртгүүлэх</CardTitle>
                <CardDescription>Мэдээллээ үлдээвэл бид тантай холбогдоно</CardDescription>
              </CardHeader>
              <CardContent>
                <LeadForm intakeSlug={intake.slug} defaultServiceType="study_abroad" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
