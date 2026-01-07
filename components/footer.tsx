import Link from "next/link"
import { Phone, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
          {/* Brand - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm sm:text-base">
                KMO
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold">KMO EDUCATION CENTER</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">Боловсрол зууч, Сургалтын төв</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Солонгост суралцах зөвлөгөө, элсэлт, материал бүрдүүлэлт, Солонгос хэлний сургалт
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">Цэс</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary">
                  Үйлчилгээ
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary">
                  Сургалт
                </Link>
              </li>
              <li>
                <Link href="/intakes" className="hover:text-primary">
                  Элсэлт
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Мэдээ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Wrap text better on mobile */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">Холбоо барих</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>
                  7735-5005
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline">, </span>9100-8525
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="break-all">info@kmo.mn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>Баянгол дүүрэг, TAF BUILDING 3 давхар 301 тоот</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">Бусад</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Нууцлалын бодлого
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-primary">
                  Админ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} KMO Education Center. Бүх эрх хуулиар хамгаалагдсан.
        </div>
      </div>
    </footer>
  )
}
