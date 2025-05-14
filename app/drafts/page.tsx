"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Headphones } from "lucide-react"
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

interface Draft {
  id: number
  title: string
  content: string
  category: string
  coverImage: string | null
  audioURL: string | null
  createdAt: string
  isDraft: boolean
}

export default function DraftsPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)

      // Load drafts from localStorage
      const draftsJSON = localStorage.getItem("drafts")
      if (draftsJSON) {
        const parsedDrafts = JSON.parse(draftsJSON)
        setDrafts(parsedDrafts)
      }
    }
  }, [router])

  const deleteDraft = (id: number) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== id)
    setDrafts(updatedDrafts)
    localStorage.setItem("drafts", JSON.stringify(updatedDrafts))
  }

  const editDraft = (id: number) => {
    router.push(`/write?draft=${id}`)
  }

  if (!isLoggedIn) {
    return null // Don't render anything until we check login status
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("yourDrafts")}</h1>
        <Button asChild>
          <a href="/write">{t("writeStory")}</a>
        </Button>
      </div>

      {drafts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {language === "ar" ? "ليس لديك أي مسودات محفوظة بعد." : "You don't have any saved drafts yet."}
          </p>
          <Button asChild>
            <a href="/write">{t("writeStory")}</a>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {drafts.map((draft) => (
            <Card key={draft.id}>
              <div className="relative">
                <img
                  src={draft.coverImage || "/placeholder.svg?height=200&width=400"}
                  alt={draft.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {draft.audioURL && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-md">
                    <Headphones className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{draft.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {draft.content || (language === "ar" ? "لا يوجد محتوى" : "No content")}
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  {new Date(draft.createdAt).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => editDraft(draft.id)}>
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
                          ? "سيتم حذف هذه المسودة نهائيًا. لا يمكن التراجع عن هذا الإجراء."
                          : "This draft will be permanently deleted. This action cannot be undone."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{language === "ar" ? "إلغاء" : "Cancel"}</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteDraft(draft.id)}>
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
