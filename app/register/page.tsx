"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!name || !email || !password) {
      setError(language === "ar" ? "يرجى إدخال جميع الحقول المطلوبة" : "Please fill in all required fields")
      return
    }

    if (password !== confirmPassword) {
      setError(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match")
      return
    }

    // Check if email already exists
    const users = localStorage.getItem("users")
    const parsedUsers = users ? JSON.parse(users) : []

    const existingUser = parsedUsers.find((user: any) => user.email === email)

    if (existingUser) {
      setError(language === "ar" ? "البريد الإلكتروني مسجل بالفعل" : "Email is already registered")
      return
    }

    // Create new user
    const newUser = {
      name,
      email,
      password, // In a real app, this would be hashed
      avatar: "/placeholder.svg?height=40&width=40",
      registeredAt: new Date().toISOString(),
    }

    // Add to users array
    const updatedUsers = [...parsedUsers, newUser]
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Show success message
    setError("")
    alert(
      language === "ar"
        ? "تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول."
        : "Account created successfully! You can now log in.",
    )

    // Redirect to login page
    router.push("/login")
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>{language === "ar" ? "إنشاء حساب جديد" : "Create an account"}</CardTitle>
          <CardDescription>
            {language === "ar"
              ? "أدخل التفاصيل الخاصة بك لإنشاء حساب جديد"
              : "Enter your details to create a new account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {error && <div className="text-sm text-red-500 p-2 bg-red-50 dark:bg-red-950/20 rounded">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="name">{language === "ar" ? "الاسم" : "Name"}</Label>
              <Input
                id="name"
                placeholder={language === "ar" ? "أدخل اسمك" : "Enter your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}</Label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Confirm your password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {language === "ar" ? "إنشاء حساب" : "Create account"}
            </Button>
            <div className="text-center text-sm">
              {language === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
              <Link href="/login" className="underline">
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
