"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Headphones, Search, Star } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StoriesPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  // Mock data for stories
  const allStories = [
    {
      id: 1,
      title: language === "ar" ? "رحلة إلى المجهول" : "Journey to the Unknown",
      excerpt:
        language === "ar"
          ? "قصة مثيرة عن مغامرة في عالم غامض..."
          : "An exciting story about an adventure in a mysterious world...",
      author: language === "ar" ? "أحمد محمود" : "Ahmed Mahmoud",
      authorId: 1,
      authorAvatar: "/placeholder.svg?height=40&width=40",
      coverImage: "/placeholder.svg?height=200&width=400",
      hasAudio: true,
      category: "fiction",
      rating: 4.8,
    },
    {
      id: 2,
      title: language === "ar" ? "صدى الماضي" : "Echo of the Past",
      excerpt:
        language === "ar" ? "قصة درامية عن ذكريات لا تُنسى..." : "A dramatic story about unforgettable memories...",
      author: language === "ar" ? "سارة خالد" : "Sara Khalid",
      authorId: 2,
      authorAvatar: "/placeholder.svg?height=40&width=40",
      coverImage: "/placeholder.svg?height=200&width=400",
      hasAudio: false,
      category: "non-fiction",
      rating: 4.5,
    },
    {
      id: 3,
      title: language === "ar" ? "أسرار الليل" : "Secrets of the Night",
      excerpt:
        language === "ar"
          ? "قصة غموض وتشويق تدور أحداثها في ظلام الليل..."
          : "A mystery and suspense story that takes place in the darkness of night...",
      author: language === "ar" ? "محمد علي" : "Mohammed Ali",
      authorId: 3,
      authorAvatar: "/placeholder.svg?height=40&width=40",
      coverImage: "/placeholder.svg?height=200&width=400",
      hasAudio: true,
      category: "mystery",
      rating: 4.7,
    },
    {
      id: 4,
      title: language === "ar" ? "قلب الشاعر" : "The Poet's Heart",
      excerpt:
        language === "ar"
          ? "مجموعة قصائد تعبر عن مشاعر الحب والحنين..."
          : "A collection of poems expressing feelings of love and nostalgia...",
      author: language === "ar" ? "ليلى أحمد" : "Layla Ahmed",
      authorId: 4,
      authorAvatar: "/placeholder.svg?height=40&width=40",
      coverImage: "/placeholder.svg?height=200&width=400",
      hasAudio: true,
      category: "poetry",
      rating: 4.9,
    },
    {
      id: 5,
      title: language === "ar" ? "عالم الغد" : "Tomorrow's World",
      excerpt:
        language === "ar"
          ? "رؤية مستقبلية لعالم تحكمه التكنولوجيا..."
          : "A futuristic vision of a world governed by technology...",
      author: language === "ar" ? "عمر حسن" : "Omar Hassan",
      authorId: 5,
      authorAvatar: "/placeholder.svg?height=40&width=40",
      coverImage: "/placeholder.svg?height=200&width=400",
      hasAudio: false,
      category: "sci-fi",
      rating: 4.6,
    },
    {
      id: 6,
      title: language === "ar" ? "لقاء الأرواح" : "Meeting of Souls",
      excerpt:
        language === "ar"
          ? "قصة رومانسية عن حبين يلتقيان بعد فراق طويل..."
          : "A romantic story about two lovers who meet after a long separation...",
      author: language === "ar" ? "نور محمد" : "Noor Mohammed",
      authorId: 6,
      authorAvatar: "/placeholder.svg?height=40&width=40",
      coverImage: "/placeholder.svg?height=200&width=400",
      hasAudio: true,
      category: "romance",
      rating: 4.8,
    },
  ]

  // Filter stories based on search query and category
  const filteredStories = allStories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter ? story.category === categoryFilter : true

    return matchesSearch && matchesCategory
  })

  // Get category name based on value
  const getCategoryName = (value: string) => {
    const categories: Record<string, { ar: string; en: string }> = {
      fiction: { ar: "خيال", en: "Fiction" },
      "non-fiction": { ar: "واقعي", en: "Non-Fiction" },
      poetry: { ar: "شعر", en: "Poetry" },
      mystery: { ar: "غموض", en: "Mystery" },
      romance: { ar: "رومانسية", en: "Romance" },
      "sci-fi": { ar: "خيال علمي", en: "Sci-Fi" },
    }

    return categories[value] ? (language === "ar" ? categories[value].ar : categories[value].en) : value
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
              <SelectItem value="fiction">{language === "ar" ? "خيال" : "Fiction"}</SelectItem>
              <SelectItem value="non-fiction">{language === "ar" ? "واقعي" : "Non-Fiction"}</SelectItem>
              <SelectItem value="poetry">{language === "ar" ? "شعر" : "Poetry"}</SelectItem>
              <SelectItem value="mystery">{language === "ar" ? "غموض" : "Mystery"}</SelectItem>
              <SelectItem value="romance">{language === "ar" ? "رومانسية" : "Romance"}</SelectItem>
              <SelectItem value="sci-fi">{language === "ar" ? "خيال علمي" : "Sci-Fi"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredStories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {language === "ar" ? "لم يتم العثور على قصص مطابقة لبحثك." : "No stories found matching your search."}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("")
            }}
          >
            {language === "ar" ? "إعادة ضبط البحث" : "Reset Search"}
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={story.coverImage || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                {story.hasAudio && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-md">
                    <Headphones className="h-4 w-4" />
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs">
                  {getCategoryName(story.category)}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{story.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Link href={`/writers/${story.authorId}`} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={story.authorAvatar || "/placeholder.svg"} alt={story.author} />
                      <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{story.author}</span>
                  </Link>
                  <div className="flex items-center ml-auto rtl:ml-0 rtl:mr-auto">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm ml-1 rtl:mr-1">{story.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{story.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={`/stories/${story.id}`}>
                    <BookOpen className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    {t("readMore")}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
