"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { initializeStorage, getPosts } from "@/lib/storage"
import type { Post } from "@/lib/types"
import { Calendar } from "lucide-react"

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    initializeStorage()
    setPosts(getPosts(true))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Мэдээ & Блог</h1>
            <p className="mt-4 text-lg text-muted-foreground">Солонгост суралцах талаарх хамгийн сүүлийн мэдээлэл</p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                {post.cover_url && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={post.cover_url || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {post.excerpt && <CardDescription className="mb-3 line-clamp-2">{post.excerpt}</CardDescription>}
                  {post.published_at && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.published_at).toLocaleDateString("mn-MN")}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">Одоогоор нийтлэл байхгүй байна.</div>
          )}
        </div>
      </section>
    </div>
  )
}
