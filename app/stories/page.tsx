"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, BookOpen, Star, Headphones } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// تعريف نوع البيانات للقصة
interface Story {
  id: number
  title: string
  content: string
  category: string
  coverImage: string
  authorId: number
  authorName: string
  authorAvatar: string
  createdAt: string
  audioURL?: string | null
  rating: number
}

export default function StoriesPage() {
  const { t, language } = useLanguage()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState(categoryParam || "all")
  const [stories, setStories] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // أقسام أنواع القصص
  const categories = [
    { id: "fiction", name: language === "ar" ? "خيال" : "Fiction" },
    { id: "anime", name: language === "ar" ? "أنمي" : "Anime" },
    { id: "non-fiction", name: language === "ar" ? "واقعي" : "Non-Fiction" },
    { id: "poetry", name: language === "ar" ? "شعر" : "Poetry" },
    { id: "mystery", name: language === "ar" ? "غموض" : "Mystery" },
    { id: "romance", name: language === "ar" ? "رومانسية" : "Romance" },
    { id: "horror", name: language === "ar" ? "رعب" : "Horror" },
  ]

  // تعديل البيانات الوهمية للقصص
  // استبدال البيانات الوهمية بمصفوفة فارغة
  const mockStories: Story[] = []

  // التحقق من تسجيل الدخول
  useEffect(() => {
    // تأخير قصير لتجنب التوجيه المباشر
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/login?redirect=stories")
      } else {
        setIsLoading(false)
        setStories(mockStories)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isLoggedIn, router])

  // تطبيق الفلتر عند تحميل الصفحة
  useEffect(() => {
    if (categoryParam) {
      setCategoryFilter(categoryParam)
    }
  }, [categoryParam])

  // تطبيق الفلتر عند تغيير الفئة أو البحث
  useEffect(() => {
    let result = [...stories]

    // تطبيق فلتر الفئة
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((story) => story.category === categoryFilter)
    }

    // تطبيق فلتر البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (story) =>
          story.title.toLowerCase().includes(query) ||
          story.content.toLowerCase().includes(query) ||
          story.authorName.toLowerCase().includes(query),
      )
    }

    setFilteredStories(result)
  }, [stories, categoryFilter, searchQuery])

  // الحصول على اسم الفئة بناءً على المعرف
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold">{t("stories")}</h1>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 rtl:space-x-reverse">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-2" />
            <Input
              placeholder={t("search")}
              className="pl-8 rtl:pl-3 rtl:pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={language === "ar" ? "جميع الفئات" : "All Categories"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === "ar" ? "جميع الفئات" : "All Categories"}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* عرض القصص المفلترة */}
      {filteredStories.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 led-card">
              <div className="relative">
                <img
                  src={story.coverImage || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                {story.audioURL && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-md">
                    <Headphones className="h-4 w-4" />
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-1">
                    <Link href={`/stories/${story.id}`} className="hover:underline">
                      {story.title}
                    </Link>
                  </CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {getCategoryName(story.category)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">{story.content}</p>
                <div className="flex justify-between items-center">
                  <Link href={`/writers/${story.authorId}`} className="flex items-center group">
                    <img
                      src={story.authorAvatar || "/placeholder.svg"}
                      alt={story.authorName}
                      className="w-6 h-6 rounded-full mr-2 rtl:ml-2 rtl:mr-0"
                    />
                    <span className="text-sm group-hover:underline">{story.authorName}</span>
                  </Link>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1 rtl:ml-1 rtl:mr-0" />
                    <span className="text-sm">{story.rating.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <span className="text-xs text-muted-foreground">{formatDate(story.createdAt)}</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/stories/${story.id}`}>
                    <BookOpen className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "قراءة" : "Read"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {categoryFilter !== "all"
              ? language === "ar"
                ? `لا توجد قصص في فئة ${getCategoryName(categoryFilter)} حالياً.`
                : `No stories in ${getCategoryName(categoryFilter)} category at the moment.`
              : language === "ar"
                ? "لا توجد قصص منشورة حالياً."
                : "No stories published yet."}
          </p>
          <Button asChild variant="default" className="led-button">
            <Link href="/write">{language === "ar" ? "كن أول من يكتب قصة" : "Be the first to write a story"}</Link>
          </Button>
        </div>
      )}

      {/* Categories Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{language === "ar" ? "استكشف الأقسام" : "Explore Categories"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 led-card ${categoryFilter === category.id ? "border-primary" : ""}`}
            >
              <Link href={`/stories?category=${category.id}`}>
                <CardHeader className="p-4">
                  <CardTitle className="text-center text-base">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className={`h-1 ${categoryFilter === category.id ? "bg-primary" : "bg-muted"}`}></div>
                </CardContent>
                <CardFooter className="p-4 text-center text-sm text-muted-foreground">
                  {language === "ar" ? "استكشف" : "Explore"}
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
