"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { initializeStorage, getLeads, getCourses, getIntakes, getPosts } from "@/lib/storage"
import type { Lead } from "@/lib/types"
import { Users, GraduationCap, Calendar, FileText, ArrowRight } from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    leads: 0,
    newLeads: 0,
    courses: 0,
    intakes: 0,
    posts: 0,
  })
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])

  useEffect(() => {
    initializeStorage()
    const leads = getLeads()
    const courses = getCourses()
    const intakes = getIntakes()
    const posts = getPosts()

    setStats({
      leads: leads.length,
      newLeads: leads.filter((l) => l.status === "new").length,
      courses: courses.length,
      intakes: intakes.length,
      posts: posts.length,
    })

    setRecentLeads(leads.slice(0, 5))
  }, [])

  const statCards = [
    {
      title: "Нийт Leads",
      value: stats.leads,
      subtitle: `${stats.newLeads} шинэ`,
      icon: Users,
      href: "/admin/leads",
      color: "text-blue-600",
    },
    {
      title: "Сургалтууд",
      value: stats.courses,
      subtitle: "Нийт сургалт",
      icon: GraduationCap,
      href: "/admin/courses",
      color: "text-green-600",
    },
    {
      title: "Элсэлтүүд",
      value: stats.intakes,
      subtitle: "Нийт элсэлт",
      icon: Calendar,
      href: "/admin/intakes",
      color: "text-orange-600",
    },
    {
      title: "Нийтлэлүүд",
      value: stats.posts,
      subtitle: "Нийт нийтлэл",
      icon: FileText,
      href: "/admin/posts",
      color: "text-purple-600",
    },
  ]

  const statusLabels: Record<Lead["status"], string> = {
    new: "Шинэ",
    contacted: "Холбогдсон",
    qualified: "Чанарласан",
    closed: "Хаасан",
  }

  const statusColors: Record<Lead["status"], "default" | "secondary" | "outline" | "destructive"> = {
    new: "default",
    contacted: "secondary",
    qualified: "outline",
    closed: "destructive",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">KMO Education Center админ хэсэг</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              <Button variant="link" className="mt-2 h-auto p-0" asChild>
                <Link href={stat.href}>
                  Дэлгэрэнгүй <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Сүүлийн Leads</CardTitle>
              <CardDescription>Вэбсайтаас ирсэн хүсэлтүүд</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin/leads">Бүгдийг харах</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentLeads.length > 0 ? (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="font-medium">{lead.full_name}</div>
                    <div className="text-sm text-muted-foreground">{lead.phone}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColors[lead.status]}>{statusLabels[lead.status]}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("mn-MN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">Одоогоор lead байхгүй байна</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
