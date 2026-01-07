"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, isLoggedIn, initializeStorage } from "@/lib/storage"
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Имэйл буруу байна"),
  password: z.string().min(1, "Нууц үг оруулна уу"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    initializeStorage()
    if (isLoggedIn()) {
      router.push("/admin")
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (login(data.email, data.password)) {
      toast.success("Амжилттай нэвтэрлээ")
      router.push("/admin")
    } else {
      toast.error("Имэйл эсвэл нууц үг буруу байна")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            KMO
          </div>
          <CardTitle>Админ нэвтрэх</CardTitle>
          <CardDescription>Имэйл болон нууц үгээ оруулна уу</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Имэйл</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@kmo.mn"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Нууц үг</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Нэвтэрч байна...
                </>
              ) : (
                "Нэвтрэх"
              )}
            </Button>
          </form>

          <div className="mt-4 rounded-lg bg-muted p-3 text-center text-sm text-muted-foreground">
            <p>Туршилтын нэвтрэх мэдээлэл:</p>
            <p className="font-mono">admin@kmo.mn / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
