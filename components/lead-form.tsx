"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveLead } from "@/lib/storage"
import { Loader2 } from "lucide-react"

const leadSchema = z.object({
  full_name: z.string().min(2, "Нэрээ оруулна уу"),
  phone: z.string().min(8, "Утасны дугаараа оруулна уу"),
  email: z.string().email("Имэйл буруу байна").optional().or(z.literal("")),
  service_type: z.enum(["consulting", "study_abroad", "korean_course", "other"]),
  message: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadFormProps {
  intakeSlug?: string
  courseSlug?: string
  defaultServiceType?: LeadFormData["service_type"]
}

const serviceTypes = {
  consulting: "Зөвлөгөө авах",
  study_abroad: "Гадаадад суралцах",
  korean_course: "Хэлний сургалт",
  other: "Бусад",
}

export function LeadForm({ intakeSlug, courseSlug, defaultServiceType = "consulting" }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      service_type: defaultServiceType,
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)

    try {
      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utm: Record<string, string> = {}
      ;["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
        const value = urlParams.get(key)
        if (value) utm[key] = value
      })

      saveLead({
        ...data,
        email: data.email || null,
        message: data.message || null,
        intake_slug: intakeSlug || null,
        course_slug: courseSlug || null,
        utm: Object.keys(utm).length > 0 ? utm : null,
      })

      toast.success("Таны хүсэлтийг хүлээн авлаа. Бид тун удахгүй холбогдоно.")
      reset()
    } catch {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="full_name" className="text-sm">
          Нэр *
        </Label>
        <Input
          id="full_name"
          placeholder="Таны нэр"
          {...register("full_name")}
          className={`h-10 sm:h-11 text-base ${errors.full_name ? "border-destructive" : ""}`}
        />
        {errors.full_name && <p className="text-xs sm:text-sm text-destructive">{errors.full_name.message}</p>}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="phone" className="text-sm">
          Утас *
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="99001122"
          {...register("phone")}
          className={`h-10 sm:h-11 text-base ${errors.phone ? "border-destructive" : ""}`}
        />
        {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="email" className="text-sm">
          Имэйл
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...register("email")}
          className={`h-10 sm:h-11 text-base ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label className="text-sm">Үйлчилгээний төрөл *</Label>
        <Select
          value={watch("service_type")}
          onValueChange={(value) => setValue("service_type", value as LeadFormData["service_type"])}
        >
          <SelectTrigger className={`h-10 sm:h-11 text-base ${errors.service_type ? "border-destructive" : ""}`}>
            <SelectValue placeholder="Сонгоно уу" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(serviceTypes).map(([value, label]) => (
              <SelectItem key={value} value={value} className="text-base">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service_type && <p className="text-xs sm:text-sm text-destructive">{errors.service_type.message}</p>}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="message" className="text-sm">
          Нэмэлт мэдээлэл
        </Label>
        <Textarea
          id="message"
          placeholder="Таны асуулт, хүсэлт..."
          rows={3}
          {...register("message")}
          className="text-base resize-none"
        />
      </div>

      <Button type="submit" className="w-full h-11 sm:h-12 text-base" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Илгээж байна...
          </>
        ) : (
          "Илгээх"
        )}
      </Button>
    </form>
  )
}
