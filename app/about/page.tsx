"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full led-ring-solid-small"></div>
            <div className="absolute inset-[2px] rounded-full bg-background overflow-hidden">
              <Image
                src="/images/yorwa-logo.png"
                alt="Yorwa Logo"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{language === "ar" ? "عن منصة يُروى" : "About Yorwa"}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {language === "ar"
              ? "منصة يُروى هي مساحة إبداعية للكتّاب والقرّاء لمشاركة القصص والإبداعات الأدبية"
              : "Yorwa is a creative space for writers and readers to share stories and literary creations"}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "رؤيتنا ورسالتنا" : "Our Vision & Mission"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">{language === "ar" ? "رؤيتنا" : "Our Vision"}</h3>
            <p>
              {language === "ar"
                ? "نسعى لأن نكون المنصة الرائدة في العالم العربي لمشاركة القصص والإبداعات الأدبية، وأن نكون جسراً يربط بين الكتّاب والقرّاء من مختلف أنحاء العالم."
                : "We strive to be the leading platform in the Arab world for sharing stories and literary creations, and to be a bridge connecting writers and readers from around the world."}
            </p>

            <h3 className="text-xl font-semibold pt-4">{language === "ar" ? "رسالتنا" : "Our Mission"}</h3>
            <p>
              {language === "ar"
                ? "توفير منصة سهلة الاستخدام وآمنة للكتّاب لمشاركة إبداعاتهم، وللقرّاء لاكتشاف محتوى أدبي متنوع وثري. نهدف إلى تشجيع المواهب الأدبية ودعم الكتّاب الناشئين وإثراء المحتوى العربي على الإنترنت."
                : "To provide an easy-to-use and secure platform for writers to share their creations, and for readers to discover diverse and rich literary content. We aim to encourage literary talents, support emerging writers, and enrich Arabic content on the internet."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "قصتنا" : "Our Story"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === "ar"
                ? "بدأت فكرة منصة يُروى من إيماننا بأن لكل شخص قصة تستحق أن تُروى. في عالم يتسارع فيه إيقاع الحياة، أردنا خلق مساحة هادئة للإبداع والتأمل، حيث يمكن للكتّاب مشاركة أفكارهم وقصصهم بحرية، وللقرّاء اكتشاف عوالم جديدة من خلال الكلمات."
                : "The idea of Yorwa platform started from our belief that everyone has a story worth telling. In a world where the pace of life is accelerating, we wanted to create a quiet space for creativity and reflection, where writers can freely share their ideas and stories, and readers can discover new worlds through words."}
            </p>
            <p>
              {language === "ar"
                ? "تأسست المنصة بهدف سد الفجوة بين الكتّاب والقرّاء، وتوفير منصة سهلة الاستخدام تتيح للجميع المشاركة في إثراء المحتوى الأدبي العربي. نؤمن بأن القصص تملك القدرة على تغيير العالم، وأن كل صوت يستحق أن يُسمع."
                : "The platform was established with the aim of bridging the gap between writers and readers, and providing an easy-to-use platform that allows everyone to participate in enriching Arabic literary content. We believe that stories have the power to change the world, and that every voice deserves to be heard."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "ما يميزنا" : "What Makes Us Special"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 list-disc pl-6">
              <li>
                <span className="font-semibold">{language === "ar" ? "منصة متكاملة:" : "Integrated Platform:"}</span>{" "}
                {language === "ar"
                  ? "نوفر بيئة متكاملة للكتابة والنشر والتفاعل، مع أدوات سهلة الاستخدام تناسب جميع المستويات."
                  : "We provide an integrated environment for writing, publishing, and interaction, with easy-to-use tools suitable for all levels."}
              </li>
              <li>
                <span className="font-semibold">{language === "ar" ? "مجتمع داعم:" : "Supportive Community:"}</span>{" "}
                {language === "ar"
                  ? "نحرص على بناء مجتمع إيجابي وداعم يشجع على التطور والإبداع المستمر."
                  : "We are keen to build a positive and supportive community that encourages continuous development and creativity."}
              </li>
              <li>
                <span className="font-semibold">{language === "ar" ? "تنوع المحتوى:" : "Content Diversity:"}</span>{" "}
                {language === "ar"
                  ? "نرحب بجميع أنواع القصص والإبداعات الأدبية، من القصص القصيرة إلى الروايات والشعر."
                  : "We welcome all types of stories and literary creations, from short stories to novels and poetry."}
              </li>
              <li>
                <span className="font-semibold">
                  {language === "ar" ? "الخصوصية والأمان:" : "Privacy and Security:"}
                </span>{" "}
                {language === "ar"
                  ? "نضع خصوصية وأمان مستخدمينا على رأس أولوياتنا، مع توفير بيئة آمنة للجميع."
                  : "We put the privacy and security of our users at the top of our priorities, providing a safe environment for everyone."}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === "ar" ? "انضم إلينا اليوم" : "Join Us Today"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {language === "ar"
                ? "سواء كنت كاتباً تبحث عن منصة لمشاركة إبداعاتك، أو قارئاً تبحث عن محتوى أدبي متميز، فإن منصة يُروى ترحب بك. انضم إلينا اليوم وكن جزءاً من مجتمعنا المتنامي."
                : "Whether you are a writer looking for a platform to share your creations, or a reader looking for distinguished literary content, Yorwa platform welcomes you. Join us today and be part of our growing community."}
            </p>
            <p>
              {language === "ar"
                ? "لأن لكل قصة صوت، ولكل صوت أثر... يُروى، حيث تُروى القصص."
                : "Because every story has a voice, and every voice has an impact... Yorwa, where stories are told."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
