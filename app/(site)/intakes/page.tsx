"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { initializeStorage, getIntakes } from "@/lib/storage"
import type { Intake } from "@/lib/types"
import { Calendar, Users } from "lucide-react"

export default function IntakesPage() {
  const [intakes, setIntakes] = useState<Intake[]>([])

  useEffect(() => {
    initializeStorage()
    setIntakes(getIntakes(true))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Элсэлтийн календарь</h1>
            <p className="mt-4 text-lg text-muted-foreground">Солонгосын их сургуулиудын нээлттэй элсэлтүүд</p>
          </div>
        </div>
      </section>

      {/* Intakes Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {intakes.map((intake) => (
              <Card key={intake.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
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
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{intake.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {intake.requirements && (
                    <div>
                      <h4 className="mb-1 text-sm font-medium">Шаардлага:</h4>
                      <CardDescription>{intake.requirements}</CardDescription>
                    </div>
                  )}
                  {intake.note && (
                    <div className="rounded-lg bg-primary/10 p-3 text-sm text-primary">{intake.note}</div>
                  )}
                  <Button className="w-full" asChild>
                    <Link href={`/intakes/${intake.slug}`}>Дэлгэрэнгүй & Бүртгүүлэх</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {intakes.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">Одоогоор нээлттэй элсэлт байхгүй байна.</div>
          )}
        </div>
      </section>
    </div>
  )
}
