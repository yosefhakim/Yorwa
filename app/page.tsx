"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Headphones, Star, UserCheck } from "lucide-react"

export default function Home() {
  const { t, language } = useLanguage()

  // Mock data for featured stories
  const featuredStories = [
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
      rating: 4.7,
    },
  ]

  // Mock data for weekly writer
  const weeklyWriter = {
    id: 1,
    name: language === "ar" ? "ليلى أحمد" : "Layla Ahmed",
    bio:
      language === "ar"
        ? "كاتبة متميزة في مجال القصص القصيرة والروايات الخيالية، حازت على إعجاب القراء بأسلوبها الفريد في السرد والوصف."
        : "A distinguished writer in the field of short stories and fiction novels, who has won readers' admiration for her unique style of narration and description.",
    avatar: "/placeholder.svg?height=120&width=120",
    followers: 1250,
    stories: 24,
    engagement: 4.9,
    featuredStory: {
      id: 101,
      title: language === "ar" ? "عندما تتكلم الأشجار" : "When Trees Speak",
      excerpt:
        language === "ar"
          ? "في غابة بعيدة، كانت الأشجار تتهامس بأسرار قديمة، وكان هناك فتى صغير يستطيع سماعها..."
          : "In a distant forest, trees whispered ancient secrets, and there was a little boy who could hear them...",
      coverImage: "/placeholder.svg?height=200&width=400",
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with LED effect */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted hero-led relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-accent/20 rounded-full filter blur-2xl opacity-70 animate-pulse" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="mb-8 relative">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full led-ring-large"></div>
                <div className="absolute inset-[6px] rounded-full bg-background/80 dark:bg-background/40 backdrop-blur-sm overflow-hidden">
                  <Image
                    src="/images/yorwa-logo.png"
                    alt="Yorwa Logo"
                    width={180}
                    height={180}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("heroSubtitle")}</p>
            </div>
            <div className="space-x-4 rtl:space-x-reverse">
              <Button asChild className="led-button">
                <Link href="/stories">{t("readMore")}</Link>
              </Button>
              <Button variant="outline" asChild className="led-button">
                <Link href="/write">{t("writeStory")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl led-glow">
                {t("featuredStories")}
              </h2>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {featuredStories.map((story) => (
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
                  </div>
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
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
                    <p className="text-muted-foreground">{story.excerpt}</p>
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
            <Button variant="outline" asChild className="led-button">
              <Link href="/stories">{t("readMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Weekly Writer Section with LED effect */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-accent/20 rounded-full filter blur-2xl opacity-70 animate-pulse" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl led-glow">
                {language === "ar" ? "الكاتِبُ الأُسبوعِيّ" : "Weekly Writer"}
              </h2>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "يتم اختيار الكاتب الأسبوعي بناءً على تفاعل القراء مع قصصه"
                  : "The weekly writer is selected based on reader engagement with their stories"}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center max-w-6xl mx-auto">
              {/* Writer Profile */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={weeklyWriter.avatar || "/placeholder.svg"} alt={weeklyWriter.name} />
                    <AvatarFallback>{weeklyWriter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-background">
                    {weeklyWriter.stories}
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">{weeklyWriter.name}</h3>
                  <p className="text-muted-foreground">{weeklyWriter.bio}</p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div>
                      <span className="font-medium">{weeklyWriter.followers}</span>{" "}
                      <span className="text-muted-foreground">{language === "ar" ? "متابع" : "followers"}</span>
                    </div>
                    <div>
                      <span className="font-medium">{weeklyWriter.stories}</span>{" "}
                      <span className="text-muted-foreground">{language === "ar" ? "قصة" : "stories"}</span>
                    </div>
                    <div>
                      <span className="font-medium">{weeklyWriter.engagement}</span>{" "}
                      <span className="text-muted-foreground">{language === "ar" ? "تقييم" : "rating"}</span>
                    </div>
                  </div>
                  <Button className="mt-2 led-button" asChild>
                    <Link href={`/writers/${weeklyWriter.id}`}>
                      <UserCheck className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                      {language === "ar" ? "متابعة الكاتب" : "Follow Writer"}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Featured Story */}
              <Card className="overflow-hidden led-card">
                <div className="relative">
                  <img
                    src={weeklyWriter.featuredStory.coverImage || "/placeholder.svg"}
                    alt={weeklyWriter.featuredStory.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h4 className="text-white font-bold text-lg">{weeklyWriter.featuredStory.title}</h4>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground">{weeklyWriter.featuredStory.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full led-button-subtle" asChild>
                    <Link href={`/stories/${weeklyWriter.featuredStory.id}`}>
                      <BookOpen className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                      {t("readMore")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Button variant="outline" asChild className="led-button">
              <Link href="/writers">{language === "ar" ? "استكشف المزيد من الكُتّاب" : "Explore More Writers"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
