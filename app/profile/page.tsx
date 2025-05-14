"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Edit, LogOut, Pencil, Camera } from "lucide-react"
import Link from "next/link"

interface Story {
  id: number
  title: string
  content: string
  category: string
  coverImage: string | null
  audioURL: string | null
  createdAt: string
  isDraft: boolean
}

export default function ProfilePage() {
  const { t, language } = useLanguage()
  const { user, isLoggedIn, logout, login } = useAuth()
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [drafts, setDrafts] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn || !user) {
      router.push("/login")
      return
    }

    // Load stories
    const storiesJSON = localStorage.getItem("stories")
    if (storiesJSON) {
      const parsedStories = JSON.parse(storiesJSON)
      setStories(parsedStories)
    }

    // Load drafts
    const draftsJSON = localStorage.getItem("drafts")
    if (draftsJSON) {
      const parsedDrafts = JSON.parse(draftsJSON)
      setDrafts(parsedDrafts)
    }

    setIsLoading(false)
  }, [isLoggedIn, user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && user) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newAvatar = e.target?.result as string

        // Update user in localStorage
        const users = localStorage.getItem("users")
        const parsedUsers = users ? JSON.parse(users) : []

        const updatedUsers = parsedUsers.map((u: any) => {
          if (u.email === user.email) {
            return { ...u, avatar: newAvatar }
          }
          return u
        })

        localStorage.setItem("users", JSON.stringify(updatedUsers))

        // Update current user
        const updatedUser = { ...user, avatar: newAvatar }
        localStorage.setItem("user", JSON.stringify(updatedUser))

        // Update auth context
        login(updatedUser)

        // Show success message
        alert(language === "ar" ? "تم تغيير صورة الملف الشخصي بنجاح" : "Profile picture updated successfully")
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 relative group">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg?height=96&width=96"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              {/* Change profile picture button */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-6 w-6 text-white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>{language === "ar" ? "تاريخ التسجيل:" : "Joined:"}</span>
                <span>
                  {user.registeredAt
                    ? new Date(user.registeredAt).toLocaleDateString(language === "ar" ? "ar" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : language === "ar"
                      ? "غير متوفر"
                      : "Not available"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{language === "ar" ? "القصص:" : "Stories:"}</span>
                <span>{stories.length}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === "ar" ? "المسودات:" : "Drafts:"}</span>
                <span>{drafts.length}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/settings">
                <Edit className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "تعديل الملف الشخصي" : "Edit Profile"}
              </Link>
            </Button>
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
              {t("logout")}
            </Button>
          </CardFooter>
        </Card>

        {/* Content Area */}
        <div className="md:col-span-2">
          <Tabs defaultValue="stories">
            <TabsList className="mb-4">
              <TabsTrigger value="stories">{t("yourStories")}</TabsTrigger>
              <TabsTrigger value="drafts">{t("yourDrafts")}</TabsTrigger>
            </TabsList>

            <TabsContent value="stories">
              {stories.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      {language === "ar" ? "لم تنشر أي قصص بعد." : "You haven't published any stories yet."}
                    </p>
                    <Button asChild>
                      <Link href="/write">
                        <Pencil className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {t("writeStory")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {stories.map((story) => (
                    <Card key={story.id}>
                      <CardHeader>
                        <CardTitle>{story.title}</CardTitle>
                        <CardDescription>
                          {new Date(story.createdAt).toLocaleDateString(language === "ar" ? "ar" : "en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2 text-muted-foreground">{story.content}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" asChild className="w-full">
                          <Link href={`/stories/${story.id}`}>
                            <BookOpen className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {language === "ar" ? "عرض القصة" : "View Story"}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="drafts">
              {drafts.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      {language === "ar" ? "ليس لديك أي مسودات محفوظة بعد." : "You don't have any saved drafts yet."}
                    </p>
                    <Button asChild>
                      <Link href="/write">
                        <Pencil className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {t("writeStory")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {drafts.map((draft) => (
                    <Card key={draft.id}>
                      <CardHeader>
                        <CardTitle>{draft.title}</CardTitle>
                        <CardDescription>
                          {new Date(draft.createdAt).toLocaleDateString(language === "ar" ? "ar" : "en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2 text-muted-foreground">{draft.content}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" asChild className="w-full">
                          <Link href={`/write?draft=${draft.id}`}>
                            <Edit className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {language === "ar" ? "تعديل المسودة" : "Edit Draft"}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
