"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      {language === "ar" ? "English" : "العربية"}
    </Button>
  )
}
