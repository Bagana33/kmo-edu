import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeadForm } from "@/components/lead-form"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Холбоо барих",
  description: "KMO Education Center-тэй холбогдох - Үнэгүй зөвлөгөө авах",
}

const contactInfo = [
  {
    icon: Phone,
    title: "Утас",
    details: ["7735-5005", "9100-8525"],
  },
  {
    icon: Mail,
    title: "Имэйл",
    details: ["info@kmo.mn"],
  },
  {
    icon: MapPin,
    title: "Хаяг",
    details: ["Баянгол дүүрэг, Хорооллын Өргөөгөөс", "TAF BUILDING 3 давхар 301 тоот"],
  },
  {
    icon: Clock,
    title: "Ажлын цаг",
    details: ["Даваа - Баасан: 09:00 - 18:00", "Бямба: 10:00 - 15:00"],
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Холбоо барих</h1>
            <p className="mt-4 text-lg text-muted-foreground">Бидэнтэй холбогдож үнэгүй зөвлөгөө аваарай</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Бидэнтэй холбогдох</h2>
              <p className="text-muted-foreground">
                Солонгост суралцах талаар асуух зүйл байвал бидэнтэй холбогдоорой. Бид таны бүх асуултанд хариулахад
                бэлэн.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <div key={item.title} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    {item.details.map((detail) => (
                      <p key={detail} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.1234567890123!2d106.91234567890123!3d47.91234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU0JzQ0LjQiTiAxMDbCsDU0JzQ0LjQiRQ!5e0!3m2!1sen!2smn!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KMO Education Center байршил"
                />
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Хүсэлт илгээх</CardTitle>
                <CardDescription>Мэдээллээ үлдээвэл бид тантай 24 цагийн дотор холбогдоно</CardDescription>
              </CardHeader>
              <CardContent>
                <LeadForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
