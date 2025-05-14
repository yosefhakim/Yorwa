"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { LanguageToggle } from "./language-toggle"
import { PenSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { t, language } = useLanguage()
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    // استخدام router.push بدلاً من window.location.href للتنقل
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full led-ring-solid"></div>
              <div className="absolute inset-[3px] rounded-full bg-background overflow-hidden">
                <Image
                  src="/images/yorwa-logo.png"
                  alt="Yorwa Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <span className="inline-block font-bold text-2xl tracking-tight">{t("siteName")}</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t("home")}
            </Link>
            <Link
              href="/stories"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t("stories")}
            </Link>
            <Link
              href="/writers"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t("writers")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LanguageToggle />

          {isLoggedIn && user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="led-button-subtle">
                <Link href="/write">
                  <PenSquare className="h-4 w-4 me-2" />
                  {t("writeStory")}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={language === "ar" ? "start" : "end"}>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t("profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/drafts">{t("yourDrafts")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/stories/my">{t("yourStories")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">{t("settings")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>{t("logout")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t("login")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
