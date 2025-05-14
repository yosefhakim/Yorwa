"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCheck, UserPlus } from "lucide-react"
import Link from "next/link"

export default function WriterPage() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleFollowWriter = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsFollowing(!isFollowing)
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
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Writer" />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-background">
              0
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{language === "ar" ? "اسم الكاتب" : "Writer Name"}</h1>
            <p className="text-muted-foreground mb-4">
              {language === "ar"
                ? "لا توجد معلومات متاحة حالياً عن هذا الكاتب."
                : "No information available about this writer yet."}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <div className="flex items-center">
                <span className="font-bold mr-1 rtl:ml-1 rtl:mr-0">0</span>
                <span className="text-muted-foreground">{language === "ar" ? "متابع" : "Followers"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-1 rtl:ml-1 rtl:mr-0">0</span>
                <span className="text-muted-foreground">{language === "ar" ? "يتابع" : "Following"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-1 rtl:ml-1 rtl:mr-0">0</span>
                <span className="text-muted-foreground">{language === "ar" ? "قصة" : "Stories"}</span>
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

      {/* Writer's Content */}
      <div>
        <Tabs defaultValue="stories">
          <TabsList className="mb-6 led-tabs">
            <TabsTrigger value="stories">{language === "ar" ? "القصص" : "Stories"}</TabsTrigger>
            <TabsTrigger value="about">{language === "ar" ? "نبذة" : "About"}</TabsTrigger>
          </TabsList>

          <TabsContent value="stories">
            <Card className="led-card">
              <CardHeader>
                <CardTitle>{language === "ar" ? "لا توجد قصص" : "No Stories"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {language === "ar"
                    ? "لم يقم هذا الكاتب بنشر أي قصص بعد."
                    : "This writer hasn't published any stories yet."}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/stories">{language === "ar" ? "استكشف قصص أخرى" : "Explore Other Stories"}</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="led-card">
              <CardHeader>
                <CardTitle>{language === "ar" ? "نبذة عن الكاتب" : "About the Writer"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {language === "ar"
                    ? "لا توجد معلومات متاحة حالياً عن هذا الكاتب."
                    : "No information available about this writer yet."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
