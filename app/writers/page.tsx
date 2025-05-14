"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Star, Heart, MessageSquare, Crown } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// تعريف نوع بيانات الكاتب
interface Writer {
  id: number
  name: string
  avatar: string
  bio: string
  followers: number
  stories: number
  likes: number
  comments: number
  engagement: number
  rank: number
  badge?: string
  joinDate: string
  categories: string[]
}

export default function WritersPage() {
  const { t, language } = useLanguage()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [writers, setWriters] = useState<Writer[]>([])
  const [filteredWriters, setFilteredWriters] = useState<Writer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const writersPerPage = 10

  // إنشاء بيانات وهمية للكتّاب
  useEffect(() => {
    // التحقق من تسجيل الدخول
    if (!isLoggedIn) {
      router.push("/login?redirect=writers")
      return
    }

    // إنشاء قائمة من 100 كاتب وهمي
    const generateMockWriters = () => {
      // إرجاع مصفوفة فارغة بدلاً من إنشاء كتّاب وهميين
      return []
    }

    const mockData = generateMockWriters()
    setWriters(mockData)
    setFilteredWriters(mockData)
    setIsLoading(false)
  }, [isLoggedIn, router, language])

  // تطبيق البحث
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredWriters(writers)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = writers.filter(
        (writer) =>
          writer.name.toLowerCase().includes(query) ||
          writer.bio.toLowerCase().includes(query) ||
          writer.categories.some((category) => category.toLowerCase().includes(query)),
      )
      setFilteredWriters(filtered)
    }
  }, [searchQuery, writers])

  // حساب الكتّاب المعروضين في الصفحة الحالية
  const indexOfLastWriter = currentPage * writersPerPage
  const indexOfFirstWriter = indexOfLastWriter - writersPerPage
  const currentWriters = filteredWriters.slice(indexOfFirstWriter, indexOfLastWriter)
  const totalPages = Math.ceil(filteredWriters.length / writersPerPage)

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // تنسيق الأرقام
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + (language === "ar" ? "م" : "M")
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + (language === "ar" ? "ألف" : "K")
    }
    return num.toString()
  }

  // الانتقال إلى صفحة معينة
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // عرض أيقونة التاج حسب المركز
  const renderCrown = (rank: number) => {
    if (rank === 1) {
      return <Crown className="h-6 w-6 text-yellow-500 fill-yellow-500" />
    } else if (rank === 2) {
      return <Crown className="h-6 w-6 text-gray-400 fill-gray-400" />
    } else if (rank === 3) {
      return <Crown className="h-6 w-6 text-amber-700 fill-amber-700" />
    }
    return null
  }

  // إذا كان جاري التحميل، عرض رسالة التحميل
  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-muted-foreground">{language === "ar" ? "جا��ي التحميل..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{language === "ar" ? "استكشف الكتّاب" : "Explore Writers"}</h1>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "تصنيف أفضل 100 كاتب لهذا الشهر بناءً على تفاعل القراء"
              : "Ranking of top 100 writers this month based on reader engagement"}
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-2" />
          <Input
            placeholder={language === "ar" ? "ابحث عن كاتب..." : "Search for a writer..."}
            className="pl-8 rtl:pl-3 rtl:pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="ranking" className="mb-8">
        <TabsList className="led-tabs">
          <TabsTrigger value="ranking">{language === "ar" ? "التصنيف الشهري" : "Monthly Ranking"}</TabsTrigger>
          <TabsTrigger value="new">{language === "ar" ? "كتّاب جدد" : "New Writers"}</TabsTrigger>
        </TabsList>

        <TabsContent value="ranking">
          {/* Top 3 Writers - Featured Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6">
              {language === "ar" ? "أفضل ثلاثة كتّاب لهذا الشهر" : "Top 3 Writers This Month"}
            </h2>

            {filteredWriters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredWriters.slice(0, 3).map((writer) => (
                  <Link href={`/writers/${writer.id}`} key={writer.id}>
                    <Card
                      className={`overflow-hidden hover:shadow-lg transition-all duration-300 h-full led-card ${
                        writer.rank === 1
                          ? "border-yellow-500 shadow-yellow-200 dark:shadow-yellow-900/20"
                          : writer.rank === 2
                            ? "border-gray-400 shadow-gray-200 dark:shadow-gray-800/20"
                            : "border-amber-700 shadow-amber-200 dark:shadow-amber-900/20"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-4">
                            <div
                              className={`absolute -top-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center`}
                            >
                              {renderCrown(writer.rank)}
                              <span
                                className={`text-xs font-bold ${
                                  writer.rank === 1
                                    ? "text-yellow-500"
                                    : writer.rank === 2
                                      ? "text-gray-400"
                                      : "text-amber-700"
                                }`}
                              >
                                {language === "ar" ? `المركز #${writer.rank}` : `Rank #${writer.rank}`}
                              </span>
                            </div>
                            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                              <AvatarImage src={writer.avatar || "/placeholder.svg"} alt={writer.name} />
                              <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>

                          <h3 className="text-xl font-bold mb-1">{writer.name}</h3>
                          <div className="flex items-center justify-center mb-3">
                            <Badge
                              variant={writer.rank === 1 ? "default" : "outline"}
                              className={
                                writer.rank === 1
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : writer.rank === 2
                                    ? "border-gray-400 text-gray-600 dark:text-gray-300"
                                    : "border-amber-700 text-amber-700 dark:text-amber-500"
                              }
                            >
                              {writer.rank === 1
                                ? language === "ar"
                                  ? "الكاتب الأول"
                                  : "Top Writer"
                                : writer.rank === 2
                                  ? language === "ar"
                                    ? "المركز الثاني"
                                    : "Second Place"
                                  : language === "ar"
                                    ? "المركز الثالث"
                                    : "Third Place"}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{writer.bio}</p>

                          <div className="grid grid-cols-2 gap-3 w-full mb-4">
                            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                              <div className="flex items-center text-primary">
                                <BookOpen className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                                <span className="font-bold">{formatNumber(writer.stories)}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {language === "ar" ? "قصة" : "Stories"}
                              </span>
                            </div>
                            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                              <div className="flex items-center text-primary">
                                <Star className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                                <span className="font-bold">{formatNumber(writer.followers)}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {language === "ar" ? "متابع" : "Followers"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 justify-center">
                            {writer.categories.map((category, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/20 rounded-lg border">
                <p className="text-muted-foreground mb-4">
                  {language === "ar" ? "لا يوجد كتّاب مسجلين حالياً." : "No writers registered yet."}
                </p>
                <Button asChild variant="default" className="led-button">
                  <Link href="/register">
                    {language === "ar" ? "سجل وكن أول الكتّاب" : "Register and be the first writer"}
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Writers Ranking Table */}
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {currentWriters.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left">{language === "ar" ? "الترتيب" : "Rank"}</th>
                      <th className="px-4 py-3 text-left">{language === "ar" ? "الكاتب" : "Writer"}</th>
                      <th className="px-4 py-3 text-center">{language === "ar" ? "القصص" : "Stories"}</th>
                      <th className="px-4 py-3 text-center">{language === "ar" ? "المتابعون" : "Followers"}</th>
                      <th className="px-4 py-3 text-center">{language === "ar" ? "الإعجابات" : "Likes"}</th>
                      <th className="px-4 py-3 text-center">{language === "ar" ? "التعليقات" : "Comments"}</th>
                      <th className="px-4 py-3 text-center">{language === "ar" ? "التفاعل" : "Engagement"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentWriters.map((writer) => (
                      <tr
                        key={writer.id}
                        className={`border-t hover:bg-muted/30 transition-colors ${
                          writer.rank <= 3 ? "bg-muted/20" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span
                              className={`font-bold ${
                                writer.rank === 1
                                  ? "text-yellow-500"
                                  : writer.rank === 2
                                    ? "text-gray-400"
                                    : writer.rank === 3
                                      ? "text-amber-700"
                                      : ""
                              }`}
                            >
                              {writer.rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Link href={`/writers/${writer.id}`} className="flex items-center group">
                            <Avatar className="h-10 w-10 mr-3 rtl:ml-3 rtl:mr-0">
                              <AvatarImage src={writer.avatar || "/placeholder.svg"} alt={writer.name} />
                              <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium group-hover:text-primary transition-colors">
                                {writer.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {language === "ar" ? "انضم " : "Joined "}
                                {formatDate(writer.joinDate)}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium">{formatNumber(writer.stories)}</span>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium">{formatNumber(writer.followers)}</span>
                            <Star className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium">{formatNumber(writer.likes)}</span>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium">{formatNumber(writer.comments)}</span>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {Math.round(writer.engagement).toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {language === "ar"
                      ? "لا يوجد كتّاب لعرضهم في التصنيف الشهري."
                      : "No writers to display in the monthly ranking."}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                {language === "ar"
                  ? `عرض ${indexOfFirstWriter + 1}-${Math.min(indexOfLastWriter, filteredWriters.length)} من ${filteredWriters.length} كاتب`
                  : `Showing ${indexOfFirstWriter + 1}-${Math.min(indexOfLastWriter, filteredWriters.length)} of ${filteredWriters.length} writers`}
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {language === "ar" ? "السابق" : "Previous"}
                </Button>
                <div className="flex items-center">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="sm"
                        className="w-9"
                        onClick={() => goToPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {language === "ar" ? "التالي" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="new">
          {writers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {writers
                .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
                .slice(0, 9)
                .map((writer) => (
                  <Link href={`/writers/${writer.id}`} key={writer.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full led-card">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-12 w-12 mr-3 rtl:ml-3 rtl:mr-0">
                            <AvatarImage src={writer.avatar || "/placeholder.svg"} alt={writer.name} />
                            <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold">{writer.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {language === "ar" ? "انضم " : "Joined "}
                              {formatDate(writer.joinDate)}
                            </p>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{writer.bio}</p>

                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 text-muted-foreground" />
                            <span className="text-sm">{writer.stories}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 text-muted-foreground" />
                            <span className="text-sm">{formatNumber(writer.followers)}</span>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="text-xs">
                              {language === "ar" ? `#${writer.rank}` : `#${writer.rank}`}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {writer.categories.map((category, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === "ar" ? "لا يوجد كتّاب جدد حالياً." : "No new writers at the moment."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
