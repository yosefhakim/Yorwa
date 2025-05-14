"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Headphones, Heart, MessageSquare, Share2, Star, UserCheck, UserPlus, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"

interface Story {
  id: number
  title: string
  content: string
  category: string
  coverImage: string | null
  audioURL: string | null
  createdAt: string
  isDraft: boolean
  author?: {
    id: number
    name: string
    avatar: string
    bio: string
    followers: number
    isFollowing?: boolean
  }
  comments?: Comment[]
  likes?: number
  isLiked?: boolean
  rating?: number
}

interface Comment {
  id: number
  userId: number
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export default function StoryPage() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [commentText, setCommentText] = useState("")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    // Fetch story data
    const fetchStory = () => {
      setIsLoading(true)

      // In a real app, you would fetch from an API
      // For demo, we'll use mock data and localStorage

      // Check localStorage for stories
      const storiesJSON = localStorage.getItem("stories")
      const stories = storiesJSON ? JSON.parse(storiesJSON) : []

      // Find the story with matching ID
      const storyId = Array.isArray(id) ? Number.parseInt(id[0]) : Number.parseInt(id as string)
      const foundStory = stories.find((s: any) => s.id === storyId)

      if (foundStory) {
        // Add mock author data
        const storyWithAuthor = {
          ...foundStory,
          author: {
            id: 1,
            name: language === "ar" ? "أحمد محمود" : "Ahmed Mahmoud",
            avatar: "/placeholder.svg?height=64&width=64",
            bio:
              language === "ar"
                ? "كاتب قصص قصيرة وروايات، مهتم بالأدب العربي المعاصر"
                : "Writer of short stories and novels, interested in contemporary Arabic literature",
            followers: 1250,
            isFollowing: false,
          },
          comments: [
            {
              id: 1,
              userId: 2,
              userName: language === "ar" ? "سارة خالد" : "Sara Khalid",
              userAvatar: "/placeholder.svg?height=40&width=40",
              content:
                language === "ar"
                  ? "قصة رائعة! أحببت الأسلوب والفكرة."
                  : "Amazing story! I loved the style and the idea.",
              createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            },
            {
              id: 2,
              userId: 3,
              userName: language === "ar" ? "محمد علي" : "Mohammed Ali",
              userAvatar: "/placeholder.svg?height=40&width=40",
              content:
                language === "ar"
                  ? "استمتعت كثيرًا بقراءة هذه القصة. أتطلع لقراءة المزيد من أعمالك."
                  : "I really enjoyed reading this story. Looking forward to reading more of your work.",
              createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            },
          ],
          likes: 42,
          isLiked: false,
          rating: 4.7,
        }

        setStory(storyWithAuthor)
        setComments(storyWithAuthor.comments || [])
        setIsFollowing(storyWithAuthor.author.isFollowing)
        setIsLiked(storyWithAuthor.isLiked)
      } else {
        // If story not found, create mock data
        const mockStory: Story = {
          id: storyId,
          title: language === "ar" ? "رحلة إلى المجهول" : "Journey to the Unknown",
          content:
            language === "ar"
              ? `في صباح أحد الأيام، استيقظ أحمد على صوت غريب قادم من خارج نافذة غرفته. كان الصوت يشبه همسات متداخلة، كأنها لغة غير مفهومة. شعر بفضول شديد دفعه للنهوض من سريره والاقتراب من النافذة.

            عندما أزاح الستائر، رأى ضوءًا أزرق خافتًا يتراقص في الهواء. كان الضوء يتحرك ببطء، كأنه يدعوه للخروج واتباعه. تردد أحمد للحظات، لكن فضوله كان أقوى من خوفه.

            ارتدى ملابسه بسرعة وخرج من المنزل بهدوء حتى لا يوقظ أحدًا. كان الضوء الأزرق ينتظره خارج المنزل، وبدأ يتحرك بمجرد رؤيته. اتبع أحمد الضوء الذي قاده عبر شوارع المدينة النائمة، ثم إلى غابة صغيرة في أطراف المدينة لم يكن يعلم بوجودها من قبل.

            في قلب الغابة، توقف الضوء أمام شجرة عملاقة. اقترب أحمد من الشجرة، وفجأة ظهر باب صغير في جذعها. فتح الباب ببطء، ليجد نفسه أمام نفق مضيء يؤدي إلى مكان مجهول.

            قرر أحمد أن يدخل النفق، وبمجرد دخوله، أغلق الباب خلفه. سار في النفق لمدة بدت له كساعات، حتى وصل إلى نهايته. عندما خرج من النفق، وجد نفسه في عالم مختلف تمامًا.

            كان السماء هناك بلون أرجواني، والأشجار بألوان زاهية لم يرها من قبل. كانت هناك مخلوقات غريبة تطير في السماء، وأخرى تتنقل بين الأشجار. شعر أحمد بمزيج من الخوف والإثارة.

            اقترب منه كائن صغير يشبه الإنسان، لكن بجلد أزرق وعينين كبيرتين. تحدث إليه الكائن بلغة غريبة، لكن أحمد فهمها بطريقة ما. قال له الكائن إنه في عالم يسمى "لوميرا"، وأنهم اختاروه ليساعدهم في مهمة مهمة.

            كانت المهمة هي العثور على حجر سحري مفقود يحافظ على توازن عالمهم. بدون هذا الحجر، سيبدأ عالمهم بالتلاشي تدريجيًا. قبل أحمد المساعدة، وبدأت رحلته في هذا العالم الغريب.

            خلال رحلته، تعرف على العديد من المخلوقات الغريبة، بعضها ودود وبعضها خطير. تعلم أسرار هذا العالم وتاريخه، واكتشف قدرات لم يكن يعلم أنه يمتلكها.

            بعد مغامرات عديدة ومواجهات خطيرة، نجح أحمد في العثور على الحجر السحري. عندما أعاده إلى مكانه الصحيح، بدأ العالم يستعيد توازنه وبهاءه.

            شكره سكان لوميرا على مساعدته، وعرضوا عليه البقاء معهم. لكن أحمد كان يعلم أن عائلته ستقلق عليه، لذا قرر العودة إلى عالمه.

            قاده الكائن الأزرق إلى بوابة تعيده إلى عالمه، لكنه وعده بأنه سيتمكن من زيارة لوميرا مرة أخرى إذا رغب في ذلك. عاد أحمد إلى منزله، ليجد أن الوقت لم يمر سوى ساعات قليلة رغم أنه قضى أيامًا في لوميرا.

            احتفظ أحمد بسر رحلته لنفسه، لكنه كان ينظر دائمًا إلى النجوم في الليل، متذكرًا مغامرته في العالم الغريب، ومنتظرًا اليوم الذي سيتمكن فيه من العودة إلى لوميرا.`
              : `One morning, Ahmed woke up to a strange sound coming from outside his bedroom window. The sound resembled intertwined whispers, like an incomprehensible language. He felt an intense curiosity that drove him to get out of bed and approach the window.

            When he pulled back the curtains, he saw a faint blue light dancing in the air. The light moved slowly, as if inviting him to come out and follow it. Ahmed hesitated for a moment, but his curiosity was stronger than his fear.

            He quickly got dressed and quietly left the house so as not to wake anyone. The blue light was waiting for him outside the house and began to move as soon as it saw him. Ahmed followed the light, which led him through the sleeping city streets, then to a small forest on the outskirts of the city that he didn't know existed before.

            In the heart of the forest, the light stopped in front of a giant tree. Ahmed approached the tree, and suddenly a small door appeared in its trunk. He slowly opened the door to find a luminous tunnel leading to an unknown place.

            Ahmed decided to enter the tunnel, and as soon as he entered, the door closed behind him. He walked through the tunnel for what seemed like hours until he reached its end. When he emerged from the tunnel, he found himself in a completely different world.

            The sky there was purple, and the trees were in vibrant colors he had never seen before. There were strange creatures flying in the sky and others moving between the trees. Ahmed felt a mixture of fear and excitement.

            A small creature resembling a human approached him, but with blue skin and large eyes. The creature spoke to him in a strange language, but somehow Ahmed understood it. The creature told him he was in a world called "Lumira," and they had chosen him to help them with an important mission.

            The mission was to find a lost magical stone that maintains the balance of their world. Without this stone, their world would gradually fade away. Ahmed accepted to help, and his journey in this strange world began.

            During his journey, he met many strange creatures, some friendly and some dangerous. He learned the secrets of this world and its history, and discovered abilities he didn't know he possessed.

            After many adventures and dangerous confrontations, Ahmed succeeded in finding the magical stone. When he returned it to its rightful place, the world began to regain its balance and splendor.

            The inhabitants of Lumira thanked him for his help and offered him to stay with them. But Ahmed knew his family would worry about him, so he decided to return to his world.

            The blue creature led him to a portal that would return him to his world, but promised that he would be able to visit Lumira again if he wished. Ahmed returned to his home to find that only a few hours had passed despite spending days in Lumira.

            Ahmed kept the secret of his journey to himself, but he always looked at the stars at night, remembering his adventure in the strange world, and waiting for the day when he would be able to return to Lumira.`,
          category: "fiction",
          coverImage: "/placeholder.svg?height=400&width=800",
          audioURL: null,
          createdAt: new Date().toISOString(),
          isDraft: false,
          author: {
            id: 1,
            name: language === "ar" ? "أحمد محمود" : "Ahmed Mahmoud",
            avatar: "/placeholder.svg?height=64&width=64",
            bio:
              language === "ar"
                ? "كاتب قصص قصيرة وروايات، مهتم بالأدب العربي المعاصر"
                : "Writer of short stories and novels, interested in contemporary Arabic literature",
            followers: 1250,
            isFollowing: false,
          },
          comments: [
            {
              id: 1,
              userId: 2,
              userName: language === "ar" ? "سارة خالد" : "Sara Khalid",
              userAvatar: "/placeholder.svg?height=40&width=40",
              content:
                language === "ar"
                  ? "قصة رائعة! أحببت الأسلوب والفكرة."
                  : "Amazing story! I loved the style and the idea.",
              createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            },
            {
              id: 2,
              userId: 3,
              userName: language === "ar" ? "محمد علي" : "Mohammed Ali",
              userAvatar: "/placeholder.svg?height=40&width=40",
              content:
                language === "ar"
                  ? "استمتعت كثيرًا بقراءة هذه القصة. أتطلع لقراءة المزيد من أعمالك."
                  : "I really enjoyed reading this story. Looking forward to reading more of your work.",
              createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            },
          ],
          likes: 42,
          isLiked: false,
          rating: 4.7,
        }

        setStory(mockStory)
        setComments(mockStory.comments || [])
      }

      setIsLoading(false)
    }

    fetchStory()
  }, [id, language])

  const handleFollowAuthor = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsFollowing(!isFollowing)

    // In a real app, you would send this to an API
    if (story) {
      const updatedStory = {
        ...story,
        author: {
          ...story.author!,
          isFollowing: !isFollowing,
          followers: isFollowing ? story.author!.followers - 1 : story.author!.followers + 1,
        },
      }
      setStory(updatedStory)
    }
  }

  const handleLikeStory = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsLiked(!isLiked)

    // In a real app, you would send this to an API
    if (story) {
      const updatedStory = {
        ...story,
        isLiked: !isLiked,
        likes: isLiked ? (story.likes || 0) - 1 : (story.likes || 0) + 1,
      }
      setStory(updatedStory)
    }
  }

  const handleAddComment = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      userId: user?.email ? 999 : 0, // Use a placeholder ID
      userName: user?.name || "Guest",
      userAvatar: user?.avatar || "/placeholder.svg?height=40&width=40",
      content: commentText,
      createdAt: new Date().toISOString(),
    }

    setComments([newComment, ...comments])
    setCommentText("")

    // In a real app, you would send this to an API
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

  if (!story) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-muted-foreground">{language === "ar" ? "لم يتم العثور على القصة" : "Story not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        {/* Story Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 led-glow">{story.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href={`/writers/${story.author?.id}`} className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 rtl:ml-3 rtl:mr-0">
                  <AvatarImage src={story.author?.avatar || "/placeholder.svg"} alt={story.author?.name} />
                  <AvatarFallback>{story.author?.name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium hover:underline">{story.author?.name}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                    {formatDate(story.createdAt)}
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
          {story.coverImage && (
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent/20 rounded-full filter blur-2xl opacity-50 animate-pulse" />
              </div>
              <img
                src={story.coverImage || "/placeholder.svg"}
                alt={story.title}
                className="w-full h-auto rounded-lg object-cover max-h-[400px] relative z-10"
              />
            </div>
          )}
        </div>

        {/* Audio Player (if available) */}
        {story.audioURL && (
          <div className="mb-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center mb-2">
              <Headphones className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
              <h3 className="font-medium">{language === "ar" ? "الإصدار الصوتي" : "Audio Version"}</h3>
            </div>
            <audio controls className="w-full">
              <source src={story.audioURL} type="audio/mp3" />
              {language === "ar" ? "متصفحك لا يدعم عنصر الصوت." : "Your browser does not support the audio element."}
            </audio>
          </div>
        )}

        {/* Story Content */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          {story.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Story Actions */}
        <div className="flex items-center justify-between mb-8 py-4 border-t border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className={isLiked ? "text-red-500" : ""} onClick={handleLikeStory}>
              <Heart className={`h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0 ${isLiked ? "fill-red-500" : ""}`} />
              {story.likes}
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

          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1 rtl:ml-1 rtl:mr-0" />
            <span>{story.rating}</span>
          </div>
        </div>

        {/* Author Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4 rtl:ml-4 rtl:mr-0">
                  <AvatarImage src={story.author?.avatar || "/placeholder.svg"} alt={story.author?.name} />
                  <AvatarFallback>{story.author?.name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>
                    <Link href={`/writers/${story.author?.id}`} className="hover:underline">
                      {story.author?.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {story.author?.followers} {language === "ar" ? "متابع" : "followers"}
                  </CardDescription>
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
            <p>{story.author?.bio}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link href={`/writers/${story.author?.id}`}>
                <BookOpen className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "عرض جميع القصص" : "View All Stories"}
              </Link>
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
        </div>
      </div>
    </div>
  )
}
