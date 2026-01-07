import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "KMO Education Center - Боловсрол зууч, Сургалтын төв",
    template: "%s | KMO Education Center",
  },
  description:
    "Солонгост суралцах зөвлөгөө, элсэлт, материал бүрдүүлэлт, Солонгос хэлний сургалт - KMO Боловсрол зуучлал, Сургалтын төв",
  keywords: ["Солонгос", "суралцах", "элсэлт", "хэлний сургалт", "боловсрол", "KMO"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="mn" className={`${sans.variable} ${mono.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
