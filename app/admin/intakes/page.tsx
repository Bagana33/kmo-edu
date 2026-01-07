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
import { initializeStorage, getIntakes, saveIntake, deleteIntake, generateSlug } from "@/lib/storage"
import type { Intake } from "@/lib/types"
import { Plus, Pencil, Trash2 } from "lucide-react"

const intakeSchema = z.object({
  title: z.string().min(1, "Гарчиг оруулна уу"),
  slug: z.string().min(1, "Slug оруулна уу"),
  start_date: z.string().nullable(),
  deadline: z.string().nullable(),
  seats: z.coerce.number().nullable(),
  requirements: z.string().nullable(),
  note: z.string().nullable(),
  is_published: z.boolean(),
})

type IntakeFormData = z.infer<typeof intakeSchema>

export default function AdminIntakesPage() {
  const [intakes, setIntakes] = useState<Intake[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingIntake, setEditingIntake] = useState<Intake | null>(null)

  const loadIntakes = () => {
    initializeStorage()
    setIntakes(getIntakes())
  }

  useEffect(() => {
    loadIntakes()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      is_published: false,
    },
  })

  const title = watch("title")

  useEffect(() => {
    if (title && !editingIntake) {
      setValue("slug", generateSlug(title))
    }
  }, [title, editingIntake, setValue])

  const openCreate = () => {
    setEditingIntake(null)
    reset({
      title: "",
      slug: "",
      start_date: "",
      deadline: "",
      seats: null,
      requirements: "",
      note: "",
      is_published: false,
    })
    setIsOpen(true)
  }

  const openEdit = (intake: Intake) => {
    setEditingIntake(intake)
    reset({
      title: intake.title,
      slug: intake.slug,
      start_date: intake.start_date || "",
      deadline: intake.deadline || "",
      seats: intake.seats,
      requirements: intake.requirements || "",
      note: intake.note || "",
      is_published: intake.is_published,
    })
    setIsOpen(true)
  }

  const onSubmit = (data: IntakeFormData) => {
    saveIntake({
      ...data,
      id: editingIntake?.id,
      start_date: data.start_date || null,
      deadline: data.deadline || null,
    })
    loadIntakes()
    setIsOpen(false)
    toast.success(editingIntake ? "Элсэлт шинэчлэгдлээ" : "Элсэлт нэмэгдлээ")
  }

  const handleDelete = (id: string) => {
    if (confirm("Энэ элсэлтийг устгах уу?")) {
      deleteIntake(id)
      loadIntakes()
      toast.success("Элсэлт устгагдлаа")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Элсэлтүүд</h1>
          <p className="text-muted-foreground">Элсэлтийн хөтөлбөрүүдийг удирдах</p>
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
              <DialogTitle>{editingIntake ? "Элсэлт засах" : "Шинэ элсэлт"}</DialogTitle>
              <DialogDescription>Элсэлтийн мэдээллийг оруулна уу</DialogDescription>
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

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Эхлэх огноо</Label>
                  <Input id="start_date" type="date" {...register("start_date")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Хугацаа</Label>
                  <Input id="deadline" type="date" {...register("deadline")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seats">Суудал</Label>
                  <Input id="seats" type="number" {...register("seats")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Шаардлага</Label>
                <Textarea id="requirements" rows={2} {...register("requirements")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Тэмдэглэл</Label>
                <Textarea id="note" rows={2} {...register("note")} />
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
          <CardTitle>Бүх элсэлт ({intakes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {intakes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Гарчиг</TableHead>
                    <TableHead>Хугацаа</TableHead>
                    <TableHead>Суудал</TableHead>
                    <TableHead>Төлөв</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {intakes.map((intake) => (
                    <TableRow key={intake.id}>
                      <TableCell className="font-medium">{intake.title}</TableCell>
                      <TableCell>
                        {intake.deadline ? new Date(intake.deadline).toLocaleDateString("mn-MN") : "-"}
                      </TableCell>
                      <TableCell>{intake.seats || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={intake.is_published ? "default" : "secondary"}>
                          {intake.is_published ? "Нийтэлсэн" : "Ноорог"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(intake)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(intake.id)}>
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
            <div className="py-12 text-center text-muted-foreground">Элсэлт байхгүй байна</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
