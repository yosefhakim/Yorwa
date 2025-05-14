"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
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
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState(categoryParam || "all")
  const [stories, setStories] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])

  // أقسام أنواع القصص
  const categories = [
    { id: "fiction", name: language === "ar" ? "خيال" : "Fiction" },
    { id: "anime", name: language === "ar" ? "أنمي" : "Anime" },
    { id: "non-fiction", name: language === "ar" ? "واقعي" : "Non-Fiction" },
    { id: "poetry", name: language === "ar" ? "شعر" : "Poetry" },
    { id: "mystery", name: language === "ar" ? "غموض" : "Mystery" },
    { id: "romance", name: language === "ar" ? "رومانسية" : "Romance" },
    { id: "sci-fi", name: language === "ar" ? "خيال علمي" : "Sci-Fi" },
    { id: "fantasy", name: language === "ar" ? "فانتازيا" : "Fantasy" },
    { id: "horror", name: language === "ar" ? "رعب" : "Horror" },
    { id: "thriller", name: language === "ar" ? "إثارة" : "Thriller" },
    { id: "historical", name: language === "ar" ? "تاريخي" : "Historical" },
  ]

  // بيانات وهمية للقصص
  const mockStories: Story[] = [
    {
      id: 1,
      title: language === "ar" ? "ليلة الرعب" : "Night of Horror",
      content: language === "ar" ? "في ليلة مظلمة وعاصفة..." : "On a dark and stormy night...",
      category: "horror",
      coverImage: "/placeholder.svg?height=200&width=400&text=Horror",
      authorId: 1,
      authorName: language === "ar" ? "أحمد محمود" : "Ahmed Mahmoud",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.5,
    },
    {
      id: 2,
      title: language === "ar" ? "رحلة إلى المريخ" : "Journey to Mars",
      content: language === "ar" ? "في عام 2150، بدأت أول رحلة بشرية..." : "In 2150, the first human journey...",
      category: "sci-fi",
      coverImage: "/placeholder.svg?height=200&width=400&text=SciFi",
      authorId: 2,
      authorName: language === "ar" ? "سارة خالد" : "Sara Khalid",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.8,
    },
    {
      id: 3,
      title: language === "ar" ? "قصة حب" : "Love Story",
      content: language === "ar" ? "عندما التقينا لأول مرة..." : "When we first met...",
      category: "romance",
      coverImage: "/placeholder.svg?height=200&width=400&text=Romance",
      authorId: 3,
      authorName: language === "ar" ? "ليلى عبدالله" : "Layla Abdullah",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.2,
    },
    {
      id: 4,
      title: language === "ar" ? "ناروتو: قصة جديدة" : "Naruto: A New Tale",
      content: language === "ar" ? "في قرية كونوها المخفية..." : "In the hidden village of Konoha...",
      category: "anime",
      coverImage: "/placeholder.svg?height=200&width=400&text=Anime",
      authorId: 4,
      authorName: language === "ar" ? "محمد علي" : "Mohammed Ali",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      audioURL: "/audio-sample.mp3",
      rating: 4.9,
    },
    {
      id: 5,
      title: language === "ar" ? "مملكة الخيال" : "Fantasy Kingdom",
      content: language === "ar" ? "في مملكة بعيدة حيث التنانين..." : "In a distant kingdom where dragons...",
      category: "fantasy",
      coverImage: "/placeholder.svg?height=200&width=400&text=Fantasy",
      authorId: 5,
      authorName: language === "ar" ? "نورا حسن" : "Noura Hassan",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.7,
    },
    {
      id: 6,
      title: language === "ar" ? "الحرب العالمية" : "World War",
      content: language === "ar" ? "في عام 1939، بدأت الحرب..." : "In 1939, the war began...",
      category: "historical",
      coverImage: "/placeholder.svg?height=200&width=400&text=Historical",
      authorId: 6,
      authorName: language === "ar" ? "خالد عمر" : "Khalid Omar",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.6,
    },
    {
      id: 7,
      title: language === "ar" ? "لغز الجريمة" : "The Mystery Crime",
      content: language === "ar" ? "وجد المحقق الجثة في..." : "The detective found the body in...",
      category: "mystery",
      coverImage: "/placeholder.svg?height=200&width=400&text=Mystery",
      authorId: 7,
      authorName: language === "ar" ? "سمير فؤاد" : "Samir Fouad",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.4,
    },
    {
      id: 8,
      title: language === "ar" ? "قصيدة الحياة" : "Poem of Life",
      content: language === "ar" ? "الحياة كالبحر في أمواجها..." : "Life is like the sea in its waves...",
      category: "poetry",
      coverImage: "/placeholder.svg?height=200&width=400&text=Poetry",
      authorId: 8,
      authorName: language === "ar" ? "فاطمة أحمد" : "Fatima Ahmed",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.3,
    },
    {
      id: 9,
      title: language === "ar" ? "دراكون بول: مغامرة جديدة" : "Dragon Ball: New Adventure",
      content: language === "ar" ? "بعد معركة فريزا..." : "After the battle with Frieza...",
      category: "anime",
      coverImage: "/placeholder.svg?height=200&width=400&text=Anime",
      authorId: 9,
      authorName: language === "ar" ? "عمر حسين" : "Omar Hussein",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.8,
    },
    {
      id: 10,
      title: language === "ar" ? "رحلتي حول العالم" : "My Journey Around the World",
      content: language === "ar" ? "بدأت رحلتي من القاهرة..." : "My journey started from Cairo...",
      category: "non-fiction",
      coverImage: "/placeholder.svg?height=200&width=400&text=NonFiction",
      authorId: 10,
      authorName: language === "ar" ? "هدى سليم" : "Huda Salim",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      rating: 4.5,
    },
  ]

  // تحميل البيانات وتطبيق الفلتر عند تحميل الصفحة
  useEffect(() => {
    setStories(mockStories)

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
                ? "لا توجد قصص متطابقة مع بحثك."
                : "No stories match your search."}
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
