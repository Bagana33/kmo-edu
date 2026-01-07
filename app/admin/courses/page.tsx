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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { initializeStorage, getCourses, saveCourse, deleteCourse, generateSlug } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { Plus, Pencil, Trash2 } from "lucide-react"

const courseSchema = z.object({
  title: z.string().min(1, "Гарчиг оруулна уу"),
  slug: z.string().min(1, "Slug оруулна уу"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  price_mnt: z.coerce.number().nullable(),
  short_desc: z.string().nullable(),
  content_md: z.string().nullable(),
  is_published: z.boolean(),
})

type CourseFormData = z.infer<typeof courseSchema>

const levelLabels = {
  beginner: "Анхан шат",
  intermediate: "Дунд шат",
  advanced: "Ахисан түвшин",
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  const loadCourses = () => {
    initializeStorage()
    setCourses(getCourses())
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      level: "beginner",
      is_published: false,
    },
  })

  const title = watch("title")

  useEffect(() => {
    if (title && !editingCourse) {
      setValue("slug", generateSlug(title))
    }
  }, [title, editingCourse, setValue])

  const openCreate = () => {
    setEditingCourse(null)
    reset({
      title: "",
      slug: "",
      level: "beginner",
      price_mnt: null,
      short_desc: "",
      content_md: "",
      is_published: false,
    })
    setIsOpen(true)
  }

  const openEdit = (course: Course) => {
    setEditingCourse(course)
    reset({
      title: course.title,
      slug: course.slug,
      level: course.level,
      price_mnt: course.price_mnt,
      short_desc: course.short_desc || "",
      content_md: course.content_md || "",
      is_published: course.is_published,
    })
    setIsOpen(true)
  }

  const onSubmit = (data: CourseFormData) => {
    saveCourse({
      ...data,
      id: editingCourse?.id,
      schedule_json: editingCourse?.schedule_json || null,
    })
    loadCourses()
    setIsOpen(false)
    toast.success(editingCourse ? "Сургалт шинэчлэгдлээ" : "Сургалт нэмэгдлээ")
  }

  const handleDelete = (id: string) => {
    if (confirm("Энэ сургалтыг устгах уу?")) {
      deleteCourse(id)
      loadCourses()
      toast.success("Сургалт устгагдлаа")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Сургалтууд</h1>
          <p className="text-muted-foreground">Солонгос хэлний сургалтуудыг удирдах</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Нэмэх
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Сургалт засах" : "Шинэ сургалт"}</DialogTitle>
              <DialogDescription>Сургалтын мэдээллийг оруулна уу</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Гарчиг *</Label>
                  <Input id="title" {...register("title")} />
                  {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input id="slug" {...register("slug")} />
                  {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Түвшин *</Label>
                  <Select
                    value={watch("level")}
                    onValueChange={(value) => setValue("level", value as CourseFormData["level"])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(levelLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_mnt">Үнэ (₮)</Label>
                  <Input id="price_mnt" type="number" {...register("price_mnt")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_desc">Богино тайлбар</Label>
                <Textarea id="short_desc" rows={2} {...register("short_desc")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_md">Дэлгэрэнгүй (Markdown)</Label>
                <Textarea id="content_md" rows={6} {...register("content_md")} />
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
          <CardTitle>Бүх сургалт ({courses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {courses.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Гарчиг</TableHead>
                    <TableHead>Түвшин</TableHead>
                    <TableHead>Үнэ</TableHead>
                    <TableHead>Төлөв</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{levelLabels[course.level]}</Badge>
                      </TableCell>
                      <TableCell>{course.price_mnt ? `${course.price_mnt.toLocaleString()}₮` : "-"}</TableCell>
                      <TableCell>
                        <Badge variant={course.is_published ? "default" : "secondary"}>
                          {course.is_published ? "Нийтэлсэн" : "Ноорог"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(course)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
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
            <div className="py-12 text-center text-muted-foreground">Сургалт байхгүй байна</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
