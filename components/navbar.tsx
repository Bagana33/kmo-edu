"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Нүүр" },
  { href: "/services", label: "Үйлчилгээ" },
  { href: "/courses", label: "Сургалт" },
  { href: "/intakes", label: "Элсэлт" },
  { href: "/blog", label: "Мэдээ" },
  { href: "/contact", label: "Холбоо барих" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="KMO Education Center"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            priority
          />
          <div className="hidden xs:block sm:block">
            <div className="text-xs sm:text-sm font-semibold text-foreground">KMO EDUCATION</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Боловсрол зууч</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 lg:gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:77355005" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <Phone className="h-4 w-4" />
            7735-5005
          </a>
          <Button asChild>
            <Link href="/contact">Үнэгүй зөвлөгөө</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:77355005"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Залгах"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            className="flex h-9 w-9 items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Full screen overlay on mobile */}
      <div
        className={cn(
          "fixed inset-x-0 top-14 sm:top-16 bottom-0 bg-background lg:hidden transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        )}
      >
        <nav className="flex flex-col h-full px-4 py-6 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-lg font-medium text-foreground border-b border-border transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 space-y-3">
            <a
              href="tel:77355005"
              className="flex items-center justify-center gap-2 py-3 text-base font-medium text-muted-foreground border border-border rounded-lg"
            >
              <Phone className="h-5 w-5" />
              7735-5005
            </a>
            <Button asChild className="w-full h-12 text-base">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Үнэгүй зөвлөгөө авах
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
