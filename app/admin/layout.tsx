"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { isLoggedIn, logout } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, GraduationCap, Calendar, FileText, MessageSquare, LogOut, Menu, X } from "lucide-react"

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/leads", icon: Users, label: "Leads" },
  { href: "/admin/courses", icon: GraduationCap, label: "Сургалт" },
  { href: "/admin/intakes", icon: Calendar, label: "Элсэлт" },
  { href: "/admin/posts", icon: FileText, label: "Нийтлэл" },
  { href: "/admin/testimonials", icon: MessageSquare, label: "Сэтгэгдэл" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (pathname !== "/admin/login" && !isLoggedIn()) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  // Don't render admin layout for login page
  if (pathname === "/admin/login") {
    return children
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 border-r bg-muted/30 lg:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
              KMO
            </div>
            <span className="font-semibold">Admin</span>
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Гарах
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-4 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
              KMO
            </div>
            <span className="font-semibold">Admin</span>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-16 z-50 border-b bg-background p-4 lg:hidden">
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-4 w-full bg-transparent" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Гарах
              </Button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
