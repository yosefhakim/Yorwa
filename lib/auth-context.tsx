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

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (userData: UserData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
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
