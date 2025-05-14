"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageSquare, Share2, UserCheck, UserPlus } from "lucide-react"
import Link from "next/link"

export default function StoryPage() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [commentText, setCommentText] = useState("")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleFollowAuthor = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsFollowing(!isFollowing)
  }

  const handleLikeStory = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsLiked(!isLiked)
  }

  const handleAddComment = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      userName: user?.name || "Guest",
      userAvatar: user?.avatar || "/placeholder.svg?height=40&width=40",
      content: commentText,
      createdAt: new Date().toISOString(),
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
      <div className="max-w-4xl mx-auto">
        {/* Story Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 led-glow">
            {language === "ar" ? "عنوان القصة" : "Story Title"}
          </h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href={`/writers/1`} className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 rtl:ml-3 rtl:mr-0">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium hover:underline">{language === "ar" ? "اسم الكاتب" : "Author Name"}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {formatDate(new Date().toISOString())}
                  </div>
                </div>
              </Link>
            </div>

            <Button
              variant={isFollowing ? "default" : "outline"}
              size="sm"
              onClick={handleFollowAuthor}
              className="led-button"
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

          {/* Cover Image */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg overflow-hidden">
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent/20 rounded-full filter blur-2xl opacity-50 animate-pulse" />
            </div>
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Story Cover"
              className="w-full h-auto rounded-lg object-cover max-h-[400px] relative z-10"
            />
          </div>
        </div>

        {/* Story Content */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="mb-4">
            {language === "ar"
              ? "لا يوجد محتوى متاح لهذه القصة حالياً."
              : "No content available for this story at the moment."}
          </p>
        </div>

        {/* Story Actions */}
        <div className="flex items-center justify-between mb-8 py-4 border-t border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className={isLiked ? "text-red-500" : ""} onClick={handleLikeStory}>
              <Heart className={`h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0 ${isLiked ? "fill-red-500" : ""}`} />0
            </Button>

            <Button variant="ghost" size="sm">
              <MessageSquare className="h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0" />
              {comments.length}
            </Button>

            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0" />
              {language === "ar" ? "مشاركة" : "Share"}
            </Button>
          </div>
        </div>

        {/* Author Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4 rtl:ml-4 rtl:mr-0">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Author" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>
                    <Link href={`/writers/1`} className="hover:underline">
                      {language === "ar" ? "اسم الكاتب" : "Author Name"}
                    </Link>
                  </CardTitle>
                  <CardDescription>0 {language === "ar" ? "متابع" : "followers"}</CardDescription>
                </div>
              </div>

              <Button variant={isFollowing ? "default" : "outline"} onClick={handleFollowAuthor}>
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
          </CardHeader>
          <CardContent>
            <p>
              {language === "ar"
                ? "لا توجد معلومات متاحة عن هذا الكاتب حالياً."
                : "No information available about this author at the moment."}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link href={`/writers/1`}>{language === "ar" ? "عرض الملف الشخصي" : "View Profile"}</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {language === "ar" ? "التعليقات" : "Comments"} ({comments.length})
          </h2>

          {/* Add Comment */}
          <div className="mb-6">
            <Textarea
              placeholder={language === "ar" ? "أضف تعليقًا..." : "Add a comment..."}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleAddComment}>{language === "ar" ? "إضافة تعليق" : "Add Comment"}</Button>
          </div>

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "لا توجد تعليقات بعد. كن أول من يعلق!"
                  : "No comments yet. Be the first to comment!"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-2 rtl:ml-2 rtl:mr-0">
                      <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                      <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{comment.userName}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
                    </div>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
