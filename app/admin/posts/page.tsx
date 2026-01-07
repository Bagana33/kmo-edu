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
import { initializeStorage, getPosts, savePost, deletePost, generateSlug } from "@/lib/storage"
import type { Post } from "@/lib/types"
import { Plus, Pencil, Trash2 } from "lucide-react"

const postSchema = z.object({
  title: z.string().min(1, "Гарчиг оруулна уу"),
  slug: z.string().min(1, "Slug оруулна уу"),
  excerpt: z.string().nullable(),
  content_md: z.string().nullable(),
  cover_url: z.string().nullable(),
  tags: z.string(),
  is_published: z.boolean(),
})

type PostFormData = z.infer<typeof postSchema>

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const loadPosts = () => {
    initializeStorage()
    setPosts(getPosts())
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      is_published: false,
      tags: "",
    },
  })

  const title = watch("title")

  useEffect(() => {
    if (title && !editingPost) {
      setValue("slug", generateSlug(title))
    }
  }, [title, editingPost, setValue])

  const openCreate = () => {
    setEditingPost(null)
    reset({
      title: "",
      slug: "",
      excerpt: "",
      content_md: "",
      cover_url: "",
      tags: "",
      is_published: false,
    })
    setIsOpen(true)
  }

  const openEdit = (post: Post) => {
    setEditingPost(post)
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content_md: post.content_md || "",
      cover_url: post.cover_url || "",
      tags: post.tags.join(", "),
      is_published: post.is_published,
    })
    setIsOpen(true)
  }

  const onSubmit = (data: PostFormData) => {
    const tags = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    savePost({
      ...data,
      id: editingPost?.id,
      tags,
      published_at: data.is_published ? new Date().toISOString() : null,
    })
    loadPosts()
    setIsOpen(false)
    toast.success(editingPost ? "Нийтлэл шинэчлэгдлээ" : "Нийтлэл нэмэгдлээ")
  }

  const handleDelete = (id: string) => {
    if (confirm("Энэ нийтлэлийг устгах уу?")) {
      deletePost(id)
      loadPosts()
      toast.success("Нийтлэл устгагдлаа")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Нийтлэлүүд</h1>
          <p className="text-muted-foreground">Блог нийтлэлүүдийг удирдах</p>
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
              <DialogTitle>{editingPost ? "Нийтлэл засах" : "Шинэ нийтлэл"}</DialogTitle>
              <DialogDescription>Нийтлэлийн мэдээллийг оруулна уу</DialogDescription>
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

              <div className="space-y-2">
                <Label htmlFor="cover_url">Зургийн URL</Label>
                <Input id="cover_url" {...register("cover_url")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (таслалаар тусгаарлана)</Label>
                <Input id="tags" placeholder="Солонгос, Боловсрол" {...register("tags")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Хураангуй</Label>
                <Textarea id="excerpt" rows={2} {...register("excerpt")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content_md">Агуулга (Markdown)</Label>
                <Textarea id="content_md" rows={8} {...register("content_md")} />
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
          <CardTitle>Бүх нийтлэл ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Гарчиг</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Төлөв</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={post.is_published ? "default" : "secondary"}>
                          {post.is_published ? "Нийтэлсэн" : "Ноорог"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
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
            <div className="py-12 text-center text-muted-foreground">Нийтлэл байхгүй байна</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
