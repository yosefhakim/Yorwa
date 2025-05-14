"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface UserData {
  name: string
  email: string
  avatar?: string
  registeredAt?: string
}

interface AuthContextType {
  user: UserData | null
  isLoggedIn: boolean
  login: (userData: UserData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // تحقق من حالة تسجيل الدخول عند بدء التطبيق
  useEffect(() => {
    // استرجاع بيانات المستخدم من localStorage
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        // في حالة وجود خطأ في تحليل البيانات، قم بمسح localStorage
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
      }
    }

    setIsInitialized(true)
  }, [])

  const login = (userData: UserData) => {
    // حفظ بيانات المستخدم في localStorage
    localStorage.setItem("user", JSON.stringify(userData))

    // تحديث حالة المصادقة
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    // مسح بيانات المستخدم من localStorage
    localStorage.removeItem("user")

    // إعادة تعيين حالة المصادقة
    setUser(null)
    setIsLoggedIn(false)
  }

  // لا تعرض المحتوى حتى يتم التحقق من حالة تسجيل الدخول
  if (!isInitialized) {
    return null
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
