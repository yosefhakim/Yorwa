"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ar: {
    siteName: "يُروى",
    home: "الرئيسية",
    stories: "القصص",
    writers: "الكتّاب",
    login: "تسجيل الدخول",
    register: "التسجيل",
    blog: "المدونة",
    search: "بحث",
    darkMode: "الوضع الليلي",
    lightMode: "الوضع النهاري",
    heroTitle: "شارك قصتك مع العالم",
    heroSubtitle: "منصة تفاعلية للكتاب والمبدعين لمشاركة القصص والإبداعات",
    featuredStories: "قصص مميزة",
    weeklyWriter: "الكاتِبُ الأُسبوعِيّ",
    readMore: "اقرأ المزيد",
    writeStory: "اكتب قصة",
    saveDraft: "حفظ كمسودة",
    publish: "نشر",
    yourDrafts: "مسوداتك",
    yourStories: "قصصك",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    followWriter: "متابعة الكاتب",
    comments: "التعليقات",
    ratings: "التقييمات",
    audioStory: "قصة صوتية",
    textStory: "قصة نصية",
    recordAudio: "تسجيل صوتي",
    uploadCover: "رفع صورة الغلاف",
    categories: "التصنيفات",
    footer: "جميع الحقوق محفوظة © يُروى 2025",
  },
  en: {
    siteName: "Yorwa",
    home: "Home",
    stories: "Stories",
    writers: "Writers",
    login: "Login",
    register: "Register",
    blog: "Blog",
    search: "Search",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    heroTitle: "Share Your Story With The World",
    heroSubtitle: "An interactive platform for writers and creators to share stories and creations",
    featuredStories: "Featured Stories",
    weeklyWriter: "Weekly Writer",
    readMore: "Read More",
    writeStory: "Write a Story",
    saveDraft: "Save as Draft",
    publish: "Publish",
    yourDrafts: "Your Drafts",
    yourStories: "Your Stories",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    followWriter: "Follow Writer",
    comments: "Comments",
    ratings: "Ratings",
    audioStory: "Audio Story",
    textStory: "Text Story",
    recordAudio: "Record Audio",
    uploadCover: "Upload Cover",
    categories: "Categories",
    footer: "All Rights Reserved © Yorwa 2025",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
      document.documentElement.lang = savedLanguage
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.ar] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
