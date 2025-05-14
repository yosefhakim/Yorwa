"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Save, Upload, BookOpen } from "lucide-react"

export default function WritePage() {
  const { t, language } = useLanguage()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const audioChunks = useRef<BlobPart[]>([])
  const [draftId, setDraftId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/login?redirect=write")
      } else {
        setIsLoading(false)

        // التحقق من وجود معرف مسودة في عنوان URL
        const searchParams = new URLSearchParams(window.location.search)
        const draftIdParam = searchParams.get("draft")

        if (draftIdParam) {
          const draftId = Number.parseInt(draftIdParam)
          setDraftId(draftId)

          // تحميل بيانات المسودة
          const draftsJSON = localStorage.getItem("drafts")
          if (draftsJSON) {
            const drafts = JSON.parse(draftsJSON)
            const draft = drafts.find((d: any) => d.id === draftId)

            if (draft) {
              setTitle(draft.title || "")
              setContent(draft.content || "")
              setCategory(draft.category || "")
              setCoverImage(draft.coverImage || null)
              setAudioURL(draft.audioURL || null)
            }
          }
        }
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isLoggedIn, router])

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      audioChunks.current = []

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data)
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioURL(audioUrl)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      alert(
        language === "ar"
          ? "لا يمكن الوصول إلى الميكروفون. يرجى التحقق من إذن الميكروفون."
          : "Could not access microphone. Please check microphone permission.",
      )
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setIsRecording(false)
      // إيقاف جميع مسارات الصوت
      mediaRecorder.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const saveDraft = () => {
    if (!title) {
      alert(language === "ar" ? "يرجى إدخال عنوان للقصة" : "Please enter a title for your story")
      return
    }

    const draft = {
      id: draftId || Date.now(),
      title,
      content,
      category,
      coverImage,
      audioURL,
      createdAt: new Date().toISOString(),
      isDraft: true,
    }

    // الحصول على المسودات الموجودة من localStorage
    const existingDraftsJSON = localStorage.getItem("drafts")
    const existingDrafts = existingDraftsJSON ? JSON.parse(existingDraftsJSON) : []

    let updatedDrafts

    if (draftId) {
      // تحديث مسودة موجودة
      updatedDrafts = existingDrafts.map((d: any) => (d.id === draftId ? draft : d))
    } else {
      // إضافة مسودة جديدة
      updatedDrafts = [...existingDrafts, draft]
    }

    // حفظ في localStorage
    localStorage.setItem("drafts", JSON.stringify(updatedDrafts))

    alert(language === "ar" ? "تم حفظ المسودة بنجاح" : "Draft saved successfully")

    if (!draftId) {
      // إذا كانت مسودة جديدة، قم بتحديث عنوان URL ليتضمن معرف المسودة
      setDraftId(draft.id)
      router.push(`/write?draft=${draft.id}`)
    }
  }

  const publishStory = () => {
    if (!title || !content || !category) {
      alert(
        language === "ar"
          ? "يرجى إدخال العنوان والمحتوى واختيار الفئة"
          : "Please enter title, content and select a category",
      )
      return
    }

    const story = {
      id: Date.now(),
      title,
      content,
      category,
      coverImage,
      audioURL,
      createdAt: new Date().toISOString(),
      isDraft: false,
    }

    // الحصول على القصص الموجودة من localStorage
    const existingStoriesJSON = localStorage.getItem("stories")
    const existingStories = existingStoriesJSON ? JSON.parse(existingStoriesJSON) : []

    // إضافة قصة جديدة
    const updatedStories = [...existingStories, story]

    // حفظ في localStorage
    localStorage.setItem("stories", JSON.stringify(updatedStories))

    // إذا كانت هذه مسودة، قم بإزالتها من المسودات
    if (draftId) {
      const draftsJSON = localStorage.getItem("drafts")
      if (draftsJSON) {
        const drafts = JSON.parse(draftsJSON)
        const updatedDrafts = drafts.filter((d: any) => d.id !== draftId)
        localStorage.setItem("drafts", JSON.stringify(updatedDrafts))
      }
    }

    alert(language === "ar" ? "تم نشر القصة بنجاح" : "Story published successfully")
    router.push("/stories/my")
  }

  // إذا كان جاري التحميل، عرض رسالة التحميل
  if (isLoading) {
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
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            {draftId
              ? language === "ar"
                ? "تعديل المسودة"
                : "Edit Draft"
              : language === "ar"
                ? "كتابة قصة جديدة"
                : "Write a New Story"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text">
            <TabsList className="mb-4">
              <TabsTrigger value="text">{language === "ar" ? "قصة نصية" : "Text Story"}</TabsTrigger>
              <TabsTrigger value="audio">{language === "ar" ? "قصة صوتية" : "Audio Story"}</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">{language === "ar" ? "العنوان" : "Title"}</Label>
                <Input
                  id="title"
                  placeholder={language === "ar" ? "أدخل عنوان القصة" : "Enter story title"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">{language === "ar" ? "الفئة" : "Category"}</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === "ar" ? "اختر فئة" : "Select a category"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiction">{language === "ar" ? "خيال" : "Fiction"}</SelectItem>
                    <SelectItem value="anime">{language === "ar" ? "أنمي" : "Anime"}</SelectItem>
                    <SelectItem value="non-fiction">{language === "ar" ? "واقعي" : "Non-Fiction"}</SelectItem>
                    <SelectItem value="poetry">{language === "ar" ? "شعر" : "Poetry"}</SelectItem>
                    <SelectItem value="mystery">{language === "ar" ? "غموض" : "Mystery"}</SelectItem>
                    <SelectItem value="romance">{language === "ar" ? "رومانسية" : "Romance"}</SelectItem>
                    <SelectItem value="horror">{language === "ar" ? "رعب" : "Horror"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">{language === "ar" ? "المحتوى" : "Content"}</Label>
                <Textarea
                  id="content"
                  placeholder={language === "ar" ? "اكتب قصتك هنا..." : "Write your story here..."}
                  className="min-h-[300px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover-image">{language === "ar" ? "صورة الغلاف" : "Cover Image"}</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("cover-image")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "رفع صورة" : "Upload Image"}
                  </Button>
                  <Input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageUpload}
                  />
                </div>
                {coverImage && (
                  <div className="mt-2">
                    <img
                      src={coverImage || "/placeholder.svg"}
                      alt="Cover Preview"
                      className="max-h-[200px] rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audio-title">{language === "ar" ? "العنوان" : "Title"}</Label>
                <Input
                  id="audio-title"
                  placeholder={language === "ar" ? "أدخل عنوان القصة" : "Enter story title"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audio-category">{language === "ar" ? "الفئة" : "Category"}</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="audio-category">
                    <SelectValue placeholder={language === "ar" ? "اختر فئة" : "Select a category"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiction">{language === "ar" ? "خيال" : "Fiction"}</SelectItem>
                    <SelectItem value="anime">{language === "ar" ? "أنمي" : "Anime"}</SelectItem>
                    <SelectItem value="non-fiction">{language === "ar" ? "واقعي" : "Non-Fiction"}</SelectItem>
                    <SelectItem value="poetry">{language === "ar" ? "شعر" : "Poetry"}</SelectItem>
                    <SelectItem value="mystery">{language === "ar" ? "غموض" : "Mystery"}</SelectItem>
                    <SelectItem value="romance">{language === "ar" ? "رومانسية" : "Romance"}</SelectItem>
                    <SelectItem value="horror">{language === "ar" ? "رعب" : "Horror"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{language === "ar" ? "التسجيل الصوتي" : "Audio Recording"}</Label>
                <div className="flex flex-col items-center gap-4 p-6 border rounded-md">
                  {!isRecording ? (
                    <Button variant="outline" size="lg" className="w-full" onClick={startRecording}>
                      <Mic className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                      {language === "ar" ? "بدء التسجيل" : "Start Recording"}
                    </Button>
                  ) : (
                    <Button variant="destructive" size="lg" className="w-full" onClick={stopRecording}>
                      <MicOff className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                      {language === "ar" ? "إيقاف التسجيل" : "Stop Recording"}
                    </Button>
                  )}

                  {audioURL && (
                    <div className="w-full mt-4">
                      <audio controls className="w-full">
                        <source src={audioURL} type="audio/mp3" />
                        {language === "ar"
                          ? "متصفحك لا يدعم عنصر الصوت."
                          : "Your browser does not support the audio element."}
                      </audio>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audio-cover-image">{language === "ar" ? "صورة الغلاف" : "Cover Image"}</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("audio-cover-image")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "رفع صورة" : "Upload Image"}
                  </Button>
                  <Input
                    id="audio-cover-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageUpload}
                  />
                </div>
                {coverImage && (
                  <div className="mt-2">
                    <img
                      src={coverImage || "/placeholder.svg"}
                      alt="Cover Preview"
                      className="max-h-[200px] rounded-md object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="audio-description">{language === "ar" ? "وصف القصة" : "Story Description"}</Label>
                <Textarea
                  id="audio-description"
                  placeholder={
                    language === "ar" ? "أضف وصفًا للقصة الصوتية..." : "Add a description for your audio story..."
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={saveDraft}>
            <Save className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            {t("saveDraft")}
          </Button>
          <Button onClick={publishStory}>
            <BookOpen className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            {t("publish")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
