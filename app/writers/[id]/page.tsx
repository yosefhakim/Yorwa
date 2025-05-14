"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Headphones, Star, UserCheck, UserPlus } from "lucide-react"
import Link from "next/link"

interface Writer {
  id: number
  name: string
  avatar: string
  bio: string
  followers: number
  following: number
  storiesCount: number
  isFollowing: boolean
  joinedDate: string
}

interface Story {
  id: number
  title: string
  excerpt: string
  coverImage: string | null
  hasAudio: boolean
  category: string
  rating: number
  createdAt: string
}

export default function WriterPage() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [writer, setWriter] = useState<Writer | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    // Fetch writer data
    const fetchWriter = () => {
      setIsLoading(true)

      // In a real app, you would fetch from an API
      // For demo, we'll use mock data

      // Parse the writer ID
      const writerId = Array.isArray(id) ? Number.parseInt(id[0]) : Number.parseInt(id as string)

      // Mock writer data
      const mockWriter: Writer = {
        id: writerId,
        name: language === "ar" ? "أحمد محمود" : "Ahmed Mahmoud",
        avatar: "/placeholder.svg?height=120&width=120",
        bio:
          language === "ar"
            ? "كاتب قصص قصيرة وروايات، مهتم بالأدب العربي المعاصر. حاصل على عدة جوائز أدبية محلية ودولية. يكتب في مجالات الخيال والواقعية والأدب التاريخي."
            : "Writer of short stories and novels, interested in contemporary Arabic literature. Winner of several local and international literary awards. Writes in the fields of fiction, realism, and historical literature.",
        followers: 1250,
        following: 45,
        storiesCount: 24,
        isFollowing: false,
        joinedDate: "2023-01-15T00:00:00.000Z",
      }

      // Mock stories data
      const mockStories: Story[] = [
        {
          id: 1,
          title: language === "ar" ? "رحلة إلى المجهول" : "Journey to the Unknown",
          excerpt:
            language === "ar"
              ? "قصة مثيرة عن مغامرة في عالم غامض..."
              : "An exciting story about an adventure in a mysterious world...",
          coverImage: "/placeholder.svg?height=200&width=400",
          hasAudio: true,
          category: "fiction",
          rating: 4.8,
          createdAt: "2024-03-15T00:00:00.000Z",
        },
        {
          id: 2,
          title: language === "ar" ? "صدى الماضي" : "Echo of the Past",
          excerpt:
            language === "ar" ? "قصة درامية عن ذكريات لا تُنسى..." : "A dramatic story about unforgettable memories...",
          coverImage: "/placeholder.svg?height=200&width=400",
          hasAudio: false,
          category: "non-fiction",
          rating: 4.5,
          createdAt: "2024-02-20T00:00:00.000Z",
        },
        {
          id: 3,
          title: language === "ar" ? "أسرار الليل" : "Secrets of the Night",
          excerpt:
            language === "ar"
              ? "قصة غموض وتشويق تدور أحداثها في ظلام الليل..."
              : "A mystery and suspense story that takes place in the darkness of night...",
          coverImage: "/placeholder.svg?height=200&width=400",
          hasAudio: true,
          category: "mystery",
          rating: 4.7,
          createdAt: "2024-01-10T00:00:00.000Z",
        },
        {
          id: 4,
          title: language === "ar" ? "عندما تتكلم الأشجار" : "When Trees Speak",
          excerpt:
            language === "ar"
              ? "في غابة بعيدة، كانت الأشجار تتهامس بأسرار قديمة..."
              : "In a distant forest, trees whispered ancient secrets...",
          coverImage: "/placeholder.svg?height=200&width=400",
          hasAudio: true,
          category: "fantasy",
          rating: 4.9,
          createdAt: "2023-12-05T00:00:00.000Z",
        },
      ]

      setWriter(mockWriter)
      setStories(mockStories)
      setIsFollowing(mockWriter.isFollowing)
      setIsLoading(false)
    }

    fetchWriter()
  }, [id, language])

  const handleFollowWriter = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsFollowing(!isFollowing)

    // In a real app, you would send this to an API
    if (writer) {
      const updatedWriter = {
        ...writer,
        isFollowing: !isFollowing,
        followers: isFollowing ? writer.followers - 1 : writer.followers + 1,
      }
      setWriter(updatedWriter)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get category name based on value
  const getCategoryName = (value: string) => {
    const categories: Record<string, { ar: string; en: string }> = {
      fiction: { ar: "خيال", en: "Fiction" },
      "non-fiction": { ar: "واقعي", en: "Non-Fiction" },
      poetry: { ar: "شعر", en: "Poetry" },
      mystery: { ar: "غموض", en: "Mystery" },
      romance: { ar: "رومانسية", en: "Romance" },
      "sci-fi": { ar: "خيال علمي", en: "Sci-Fi" },
      fantasy: { ar: "فانتازيا", en: "Fantasy" },
    }

    return categories[value] ? (language === "ar" ? categories[value].ar : categories[value].en) : value
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  if (!writer) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-muted-foreground">{language === "ar" ? "لم يتم العثور على الكاتب" : "Writer not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      {/* Writer Profile Header */}
      <div className="relative mb-8">
        {/* Background with LED effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent/30 rounded-full filter blur-2xl opacity-70 animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={writer.avatar || "/placeholder.svg"} alt={writer.name} />
              <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-background">
              {writer.storiesCount}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{writer.name}</h1>
            <p className="text-muted-foreground mb-4">{writer.bio}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <div className="flex items-center">
                <span className="font-bold mr-1 rtl:ml-1 rtl:mr-0">{writer.followers}</span>
                <span className="text-muted-foreground">{language === "ar" ? "متابع" : "Followers"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-1 rtl:ml-1 rtl:mr-0">{writer.following}</span>
                <span className="text-muted-foreground">{language === "ar" ? "يتابع" : "Following"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-1 rtl:ml-1 rtl:mr-0">{writer.storiesCount}</span>
                <span className="text-muted-foreground">{language === "ar" ? "قصة" : "Stories"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground">
                  {language === "ar" ? "انضم في " : "Joined "} {formatDate(writer.joinedDate)}
                </span>
              </div>
            </div>

            <Button
              size="lg"
              variant={isFollowing ? "default" : "outline"}
              className="led-button"
              onClick={handleFollowWriter}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "متابَع" : "Following"}
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "متابعة" : "Follow"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Writer's Stories */}
      <div>
        <Tabs defaultValue="stories">
          <TabsList className="mb-6 led-tabs">
            <TabsTrigger value="stories">{language === "ar" ? "القصص" : "Stories"}</TabsTrigger>
            <TabsTrigger value="about">{language === "ar" ? "نبذة" : "About"}</TabsTrigger>
          </TabsList>

          <TabsContent value="stories">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <Card key={story.id} className="overflow-hidden led-card">
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
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{formatDate(story.createdAt)}</div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1 rtl:mr-1">{story.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{story.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full led-button-subtle" asChild>
                      <Link href={`/stories/${story.id}`}>
                        <BookOpen className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {t("readMore")}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="led-card">
              <CardHeader>
                <CardTitle>{language === "ar" ? "نبذة عن الكاتب" : "About the Writer"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>{writer.bio}</p>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{language === "ar" ? "تاريخ الانضمام:" : "Joined:"}</span>
                      <span>{formatDate(writer.joinedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">{language === "ar" ? "عدد القصص:" : "Stories:"}</span>
                      <span>{writer.storiesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">{language === "ar" ? "المتابعون:" : "Followers:"}</span>
                      <span>{writer.followers}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
