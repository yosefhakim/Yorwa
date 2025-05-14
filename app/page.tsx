"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Bookmark, Flame, Star, Tv } from "lucide-react"

export default function Home() {
  const { t, language } = useLanguage()

  // أقسام أنواع القصص
  const storyCategories = [
    {
      id: "fiction",
      name: language === "ar" ? "خيال" : "Fiction",
      icon: <BookOpen className="h-5 w-5" />,
      description: language === "ar" ? "قصص خيالية وروايات إبداعية" : "Creative fiction and novels",
      color: "bg-blue-500",
    },
    {
      id: "anime",
      name: language === "ar" ? "أنمي" : "Anime",
      icon: <Tv className="h-5 w-5" />,
      description: language === "ar" ? "قصص مستوحاة من عالم الأنمي والمانجا" : "Stories inspired by anime and manga",
      color: "bg-pink-500",
    },
    {
      id: "non-fiction",
      name: language === "ar" ? "واقعي" : "Non-Fiction",
      icon: <Star className="h-5 w-5" />,
      description: language === "ar" ? "قصص واقعية وتجارب حقيقية" : "Real stories and experiences",
      color: "bg-green-500",
    },
    {
      id: "poetry",
      name: language === "ar" ? "شعر" : "Poetry",
      icon: <Bookmark className="h-5 w-5" />,
      description: language === "ar" ? "قصائد وأشعار متنوعة" : "Various poems and poetry",
      color: "bg-purple-500",
    },
    {
      id: "mystery",
      name: language === "ar" ? "غموض" : "Mystery",
      icon: <Flame className="h-5 w-5" />,
      description: language === "ar" ? "قصص غموض وتشويق" : "Mystery and suspense stories",
      color: "bg-red-500",
    },
  ]

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

      {/* Story Categories Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl led-glow">
              {language === "ar" ? "أقسام القصص" : "Story Categories"}
            </h2>
            <p className="text-muted-foreground max-w-[700px]">
              {language === "ar"
                ? "استكشف مجموعة متنوعة من القصص المصنفة حسب النوع"
                : "Explore a variety of stories categorized by type"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyCategories.map((category) => (
              <Link href={`/stories?category=${category.id}`} key={category.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full led-card">
                  <div className={`h-2 ${category.color}`}></div>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div
                      className={`w-12 h-12 rounded-full ${category.color} bg-opacity-20 flex items-center justify-center`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Writer Section with LED effect - Simplified */}
      <section className="w-full py-12 md:py-24 bg-muted relative overflow-hidden">
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

            <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-0 rounded-full led-ring"></div>
                <div className="absolute inset-[3px] rounded-full bg-background overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="Weekly Writer"
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">{language === "ar" ? "قريباً" : "Coming Soon"}</h3>
                <p className="text-muted-foreground">
                  {language === "ar"
                    ? "سيتم اختيار الكاتب الأسبوعي قريباً بناءً على تفاعل القراء"
                    : "The weekly writer will be selected soon based on reader engagement"}
                </p>
              </div>

              <Button variant="outline" asChild className="led-button">
                <Link href="/writers">{language === "ar" ? "استكشف الكُتّاب" : "Explore Writers"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {language === "ar" ? "شارك قصتك الآن" : "Share Your Story Now"}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {language === "ar"
                  ? "انضم إلى مجتمع الكتّاب وشارك إبداعاتك مع العالم"
                  : "Join our community of writers and share your creations with the world"}
              </p>
            </div>
            <div className="space-x-4 rtl:space-x-reverse">
              <Button asChild size="lg" className="led-button">
                <Link href="/register">{language === "ar" ? "سجل الآن" : "Register Now"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
