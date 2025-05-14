"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Headphones, Star } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

export default function MyStoriesPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)

      // Load stories from localStorage
      const storiesJSON = localStorage.getItem("stories")
      if (storiesJSON) {
        const parsedStories = JSON.parse(storiesJSON)
        setStories(parsedStories)
      }
    }
  }, [router])

  const deleteStory = (id: number) => {
    const updatedStories = stories.filter((story) => story.id !== id)
    setStories(updatedStories)
    localStorage.setItem("stories", JSON.stringify(updatedStories))
  }

  const editStory = (id: number) => {
    router.push(`/write?story=${id}`)
  }

  if (!isLoggedIn) {
    return null // Don't render anything until we check login status
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("yourStories")}</h1>
        <Button asChild>
          <a href="/write">{t("writeStory")}</a>
        </Button>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {language === "ar" ? "لم تنشر أي قصص بعد." : "You haven't published any stories yet."}
          </p>
          <Button asChild>
            <a href="/write">{t("writeStory")}</a>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.id}>
              <div className="relative">
                <img
                  src={story.coverImage || "/placeholder.svg?height=200&width=400"}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {story.audioURL && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-md">
                    <Headphones className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {story.content || (language === "ar" ? "لا يوجد محتوى" : "No content")}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {new Date(story.createdAt).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm ml-1 rtl:mr-1">4.5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => editStory(story.id)}>
                  <Edit className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "تعديل" : "Edit"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {language === "ar" ? "حذف" : "Delete"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{language === "ar" ? "هل أنت متأكد؟" : "Are you sure?"}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {language === "ar"
                          ? "سيتم حذف هذه القصة نهائيًا. لا يمكن التراجع عن هذا الإجراء."
                          : "This story will be permanently deleted. This action cannot be undone."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{language === "ar" ? "إلغاء" : "Cancel"}</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteStory(story.id)}>
                        {language === "ar" ? "حذف" : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
