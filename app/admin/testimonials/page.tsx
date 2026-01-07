"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { initializeStorage, getTestimonials, saveTestimonial, deleteTestimonial } from "@/lib/storage"
import type { Testimonial } from "@/lib/types"
import { Plus, Pencil, Trash2, Star } from "lucide-react"

const testimonialSchema = z.object({
  full_name: z.string().min(1, "Нэр оруулна уу"),
  quote: z.string().min(1, "Сэтгэгдэл оруулна уу"),
  rating: z.coerce.number().min(1).max(5).nullable(),
  avatar_url: z.string().nullable(),
  is_published: z.boolean(),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  const loadTestimonials = () => {
    initializeStorage()
    setTestimonials(getTestimonials())
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      is_published: false,
      rating: 5,
    },
  })

  const openCreate = () => {
    setEditingTestimonial(null)
    reset({
      full_name: "",
      quote: "",
      rating: 5,
      avatar_url: "",
      is_published: false,
    })
    setIsOpen(true)
  }

  const openEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    reset({
      full_name: testimonial.full_name,
      quote: testimonial.quote,
      rating: testimonial.rating,
      avatar_url: testimonial.avatar_url || "",
      is_published: testimonial.is_published,
    })
    setIsOpen(true)
  }

  const onSubmit = (data: TestimonialFormData) => {
    saveTestimonial({
      ...data,
      id: editingTestimonial?.id,
    })
    loadTestimonials()
    setIsOpen(false)
    toast.success(editingTestimonial ? "Сэтгэгдэл шинэчлэгдлээ" : "Сэтгэгдэл нэмэгдлээ")
  }

  const handleDelete = (id: string) => {
    if (confirm("Энэ сэтгэгдлийг устгах уу?")) {
      deleteTestimonial(id)
      loadTestimonials()
      toast.success("Сэтгэгдэл устгагдлаа")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Сэтгэгдлүүд</h1>
          <p className="text-muted-foreground">Оюутнуудын сэтгэгдлийг удирдах</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Нэмэх
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Сэтгэгдэл засах" : "Шинэ сэтгэгдэл"}</DialogTitle>
              <DialogDescription>Сэтгэгдлийн мэдээллийг оруулна уу</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Нэр *</Label>
                <Input id="full_name" {...register("full_name")} />
                {errors.full_name && <p className="text-sm text-destructive">{errors.full_name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Сэтгэгдэл *</Label>
                <Textarea id="quote" rows={3} {...register("quote")} />
                {errors.quote && <p className="text-sm text-destructive">{errors.quote.message}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rating">Үнэлгээ (1-5)</Label>
                  <Input id="rating" type="number" min={1} max={5} {...register("rating")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar_url">Зургийн URL</Label>
                  <Input id="avatar_url" {...register("avatar_url")} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_published"
                  checked={watch("is_published")}
                  onCheckedChange={(checked) => setValue("is_published", checked)}
                />
                <Label htmlFor="is_published">Нийтлэх</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Болих
                </Button>
                <Button type="submit">Хадгалах</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бүх сэтгэгдэл ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {testimonials.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Нэр</TableHead>
                    <TableHead>Сэтгэгдэл</TableHead>
                    <TableHead>Үнэлгээ</TableHead>
                    <TableHead>Төлөв</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">{testimonial.full_name}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{testimonial.quote}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(testimonial.rating || 0)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={testimonial.is_published ? "default" : "secondary"}>
                          {testimonial.is_published ? "Нийтэлсэн" : "Ноорог"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(testimonial)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">Сэтгэгдэл байхгүй байна</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
