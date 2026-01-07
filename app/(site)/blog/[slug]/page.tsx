"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { initializeStorage, getPostBySlug } from "@/lib/storage"
import type { Post } from "@/lib/types"
import { ArrowLeft, Calendar } from "lucide-react"

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeStorage()
    const foundPost = getPostBySlug(params.slug as string)
    if (foundPost && foundPost.is_published) {
      setPost(foundPost)
    }
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-muted-foreground">Уншиж байна...</div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <article className="py-8">
      <div className="mx-auto max-w-3xl px-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Бүх нийтлэл
          </Link>
        </Button>

        {post.cover_url && (
          <div className="mb-8 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={post.cover_url || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>

        {post.published_at && (
          <div className="mb-8 flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(post.published_at).toLocaleDateString("mn-MN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}

        {post.content_md && (
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{post.content_md}</ReactMarkdown>
          </div>
        )}

        <div className="mt-12 rounded-lg bg-muted p-6 text-center">
          <h3 className="mb-2 text-lg font-semibold">Илүү мэдээлэл авах уу?</h3>
          <p className="mb-4 text-muted-foreground">Бидэнтэй холбогдож үнэгүй зөвлөгөө аваарай</p>
          <Button asChild>
            <Link href="/contact">Холбогдох</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
