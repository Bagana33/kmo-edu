import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { GraduationCap, Users, FileText, Calendar, CheckCircle2, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Үйлчилгээ",
  description: "KMO Education Center-ийн үзүүлдэг үйлчилгээнүүд - Солонгост суралцах зөвлөгөө, элсэлт, хэлний сургалт",
}

const services = [
  {
    icon: GraduationCap,
    title: "Солонгост суралцах зөвлөгөө",
    description: "Их сургууль сонгох, элсэлтийн шаардлага, тэтгэлгийн боломжуудын талаар бүрэн зөвлөгөө",
    features: [
      "Их сургууль сонгоход туслах",
      "Тэтгэлгийн мэдээлэл өгөх",
      "Элсэлтийн шаардлага тайлбарлах",
      "Хувийн төлөвлөгөө гаргах",
    ],
  },
  {
    icon: FileText,
    title: "Материал бүрдүүлэлт",
    description: "Элсэлтэд шаардлагатай бүх бичиг баримтыг бүрдүүлэх, орчуулах, баталгаажуулах",
    features: [
      "Бичиг баримт орчуулах",
      "Нотариат баталгаажуулалт",
      "Виз материал бэлтгэх",
      "Элсэлтийн материал шалгах",
    ],
  },
  {
    icon: Users,
    title: "Солонгос хэлний сургалт",
    description: "TOPIK 1-6 түвшний шалгалтанд бэлтгэх мэргэжлийн сургалт",
    features: ["Түвшин тогтоох тест", "Анхан, дунд, ахисан түвшин", "TOPIK бэлтгэл", "Уян хатан цагийн хуваарь"],
  },
  {
    icon: Calendar,
    title: "Элсэлтийн бүртгэл",
    description: "Солонгосын их сургуулиудын элсэлтэд бүртгүүлэх, дагалдах үйлчилгээ",
    features: ["Элсэлтийн материал илгээх", "Ярилцлагад бэлтгэх", "Хариу хүлээн авах", "Виз процесс удирдах"],
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Бидний үйлчилгээ</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Солонгост суралцах зорилгодоо хүрэхэд танд туслах бүрэн үйлчилгээ
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="mb-4 text-base">{service.description}</CardDescription>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Ажлын процесс" subtitle="Бидэнтэй хамтран ажиллах энгийн алхмууд" />
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "Зөвлөгөө", desc: "Үнэгүй зөвлөгөө авах" },
              { step: "02", title: "Төлөвлөгөө", desc: "Хувийн төлөвлөгөө гаргах" },
              { step: "03", title: "Бэлтгэл", desc: "Материал бүрдүүлэх" },
              { step: "04", title: "Элсэлт", desc: "Амжилттай элсэх" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="text-2xl font-bold md:text-3xl">Эхлэхэд бэлэн үү?</h2>
            <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
              Үнэгүй зөвлөгөө авч, Солонгост суралцах замаа эхлүүлээрэй
            </p>
            <Button size="lg" variant="secondary" className="mt-6" asChild>
              <Link href="/contact">
                Холбогдох
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
