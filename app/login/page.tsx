"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const { t, language } = useLanguage()
  const { login, isLoggedIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
  useEffect(() => {
    // إذا كان المستخدم مسجل الدخول بالفعل، قم بإعادة توجيهه
    if (isLoggedIn) {
      if (redirectPath) {
        router.push(`/${redirectPath}`)
      } else {
        router.push("/")
      }
    } else {
      setIsLoading(false)
    }
  }, [isLoggedIn, router, redirectPath])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // تحقق بسيط
    if (!email || !password) {
      setError(language === "ar" ? "يرجى إدخال البريد الإلكتروني وكلمة المرور" : "Please enter email and password")
      return
    }

    // التحقق من وجود المستخدم في localStorage
    const users = localStorage.getItem("users")
    const parsedUsers = users ? JSON.parse(users) : []

    const user = parsedUsers.find((u: any) => u.email === email)

    if (!user) {
      setError(language === "ar" ? "البريد الإلكتروني غير مسجل" : "Email is not registered")
      return
    }

    // في تطبيق حقيقي، ستقوم بتشفير ومقارنة كلمات المرور
    // لأغراض العرض التوضيحي، سنتحقق فقط مما إذا كانت متطابقة
    if (user.password !== password) {
      setError(language === "ar" ? "كلمة المرور غير صحيحة" : "Incorrect password")
      return
    }

    // تم تسجيل الدخول بنجاح
    const userData = {
      name: user.name,
      email: user.email,
      avatar: user.avatar || "/placeholder.svg?height=40&width=40",
      registeredAt: user.registeredAt,
    }

    // استخدام وظيفة تسجيل الدخول من AuthContext
    login(userData)

    // إعادة التوجيه إلى الصفحة المطلوبة أو الصفحة الرئيسية
    if (redirectPath) {
      router.push(`/${redirectPath}`)
    } else {
      router.push("/")
    }
  }

  // عرض شاشة التحميل أثناء التحقق من حالة تسجيل الدخول
  if (isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p className="text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
      </div>
    )
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>{language === "ar" ? "تسجيل الدخول" : "Login"}</CardTitle>
          <CardDescription>
            {language === "ar"
              ? "أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك"
              : "Enter your email and password to access your account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && <div className="text-sm text-red-500 p-2 bg-red-50 dark:bg-red-950/20 rounded">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">{language === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
              <Input
                id="email"
                type="email"
                placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{language === "ar" ? "كلمة المرور" : "Password"}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 rtl:right-auto rtl:left-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </Button>
            <div className="text-center text-sm">
              {language === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
              <Link href="/register" className="underline">
                {language === "ar" ? "سجل الآن" : "Register now"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
