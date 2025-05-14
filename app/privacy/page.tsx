"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  const { language } = useLanguage()

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <p className="text-muted-foreground mb-10 text-center">
          {language === "ar" ? "آخر تحديث: 14 مايو 2025" : "Last Updated: May 14, 2025"}
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "مقدمة" : "Introduction"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === "ar"
                ? "نحن في منصة يُروى نقدر خصوصيتك ونلتزم بحمايتها. تصف سياسة الخصوصية هذه كيفية جمعنا واستخدامنا ومشاركتنا وحمايتنا لمعلوماتك الشخصية عند استخدامك لموقعنا الإلكتروني وخدماتنا."
                : "At Yorwa, we value your privacy and are committed to protecting it. This Privacy Policy describes how we collect, use, share, and protect your personal information when you use our website and services."}
            </p>
            <p>
              {language === "ar"
                ? "باستخدامك لمنصة يُروى، فإنك توافق على ممارسات جمع البيانات واستخدامها الموضحة في سياسة الخصوصية هذه. نحتفظ بالحق في تغيير سياسة الخصوصية هذه في أي وقت، وسنخطرك بأي تغييرات من خلال نشر السياسة المحدثة على موقعنا."
                : "By using Yorwa, you agree to the data collection and use practices described in this Privacy Policy. We reserve the right to change this Privacy Policy at any time, and we will notify you of any changes by posting the updated policy on our website."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "المعلومات التي نجمعها" : "Information We Collect"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">
              {language === "ar" ? "معلومات التسجيل" : "Registration Information"}
            </h3>
            <p>
              {language === "ar"
                ? "عندما تقوم بإنشاء حساب على منصة يُروى، نجمع معلومات مثل اسمك وعنوان بريدك الإلكتروني وكلمة المرور وصورة الملف الشخصي (اختيارية)."
                : "When you create an account on Yorwa, we collect information such as your name, email address, password, and profile picture (optional)."}
            </p>

            <h3 className="text-xl font-semibold pt-4">{language === "ar" ? "المحتوى المنشور" : "Posted Content"}</h3>
            <p>
              {language === "ar"
                ? "نجمع ونخزن القصص والتعليقات والمحتوى الآخر الذي تنشره على المنصة."
                : "We collect and store the stories, comments, and other content you post on the platform."}
            </p>

            <h3 className="text-xl font-semibold pt-4">
              {language === "ar" ? "معلومات الاستخدام" : "Usage Information"}
            </h3>
            <p>
              {language === "ar"
                ? "نجمع معلومات حول كيفية استخدامك للمنصة، بما في ذلك الصفحات التي تزورها، والقصص التي تقرأها، والتفاعلات مثل الإعجابات والتعليقات."
                : "We collect information about how you use the platform, including the pages you visit, the stories you read, and interactions such as likes and comments."}
            </p>

            <h3 className="text-xl font-semibold pt-4">
              {language === "ar" ? "معلومات الجهاز" : "Device Information"}
            </h3>
            <p>
              {language === "ar"
                ? "نجمع معلومات حول الأجهزة التي تستخدمها للوصول إلى منصتنا، بما في ذلك نوع الجهاز ونظام التشغيل والمتصفح وعنوان IP."
                : "We collect information about the devices you use to access our platform, including device type, operating system, browser, and IP address."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "كيف نستخدم معلوماتك" : "How We Use Your Information"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 list-disc pl-6">
              <li>
                {language === "ar"
                  ? "توفير وتحسين خدماتنا، بما في ذلك تخصيص المحتوى وتقديم توصيات مخصصة."
                  : "To provide and improve our services, including personalizing content and offering tailored recommendations."}
              </li>
              <li>
                {language === "ar"
                  ? "التواصل معك بشأن حسابك، والتحديثات، والإشعارات المتعلقة بالمنصة."
                  : "To communicate with you about your account, updates, and notifications related to the platform."}
              </li>
              <li>
                {language === "ar"
                  ? "تحليل كيفية استخدام المستخدمين لمنصتنا لتحسين تجربة المستخدم وتطوير ميزات جديدة."
                  : "To analyze how users interact with our platform to improve user experience and develop new features."}
              </li>
              <li>
                {language === "ar"
                  ? "اكتشاف ومنع الاحتيال والأنشطة غير المصرح بها وانتهاكات شروط الخدمة الخاصة بنا."
                  : "To detect and prevent fraud, unauthorized activities, and violations of our terms of service."}
              </li>
              <li>
                {language === "ar"
                  ? "الامتثال للالتزامات القانونية والاستجابة للطلبات القانونية."
                  : "To comply with legal obligations and respond to legal requests."}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "مشاركة المعلومات" : "Information Sharing"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === "ar"
                ? "نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة. ومع ذلك، قد نشارك معلوماتك في الحالات التالية:"
                : "We do not sell your personal information to third parties. However, we may share your information in the following cases:"}
            </p>
            <ul className="space-y-2 list-disc pl-6">
              <li>
                {language === "ar"
                  ? "مع مقدمي الخدمات الذين يساعدوننا في تشغيل منصتنا وتقديم خدماتنا."
                  : "With service providers who help us operate our platform and deliver our services."}
              </li>
              <li>
                {language === "ar"
                  ? "عندما تختار مشاركة معلوماتك علنًا على المنصة، مثل نشر قصة أو تعليق."
                  : "When you choose to share your information publicly on the platform, such as posting a story or comment."}
              </li>
              <li>
                {language === "ar"
                  ? "للامتثال للقانون أو استجابةً لطلب قانوني أو لحماية حقوقنا أو حقوق الآخرين."
                  : "To comply with the law or in response to a legal request, or to protect our rights or the rights of others."}
              </li>
              <li>
                {language === "ar"
                  ? "في حالة الاندماج أو الاستحواذ أو بيع الأصول، قد يتم نقل معلوماتك إلى الشركة المستحوذة."
                  : "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring company."}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "أمان البيانات" : "Data Security"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === "ar"
                ? "نحن نتخذ تدابير أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به والاستخدام والإفصاح. ومع ذلك، لا يمكن ضمان أمان أي نظام عبر الإنترنت بنسبة 100٪. نحن نستخدم تشفير SSL لحماية البيانات المرسلة بين متصفحك وخوادمنا، ونخزن كلمات المرور بتنسيق مشفر."
                : "We take reasonable security measures to protect your personal information from unauthorized access, use, and disclosure. However, no online system can be 100% secure. We use SSL encryption to protect data transmitted between your browser and our servers, and we store passwords in an encrypted format."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "حقوقك وخياراتك" : "Your Rights and Choices"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === "ar"
                ? "يمكنك الوصول إلى معلوماتك الشخصية وتحديثها من خلال إعدادات حسابك. يمكنك أيضًا:"
                : "You can access and update your personal information through your account settings. You can also:"}
            </p>
            <ul className="space-y-2 list-disc pl-6">
              <li>
                {language === "ar"
                  ? "طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك."
                  : "Request a copy of the personal information we hold about you."}
              </li>
              <li>
                {language === "ar"
                  ? "طلب حذف حسابك والمعلومات الشخصية المرتبطة به."
                  : "Request deletion of your account and associated personal information."}
              </li>
              <li>
                {language === "ar"
                  ? "الاعتراض على معالجة معلوماتك الشخصية لأغراض معينة."
                  : "Object to the processing of your personal information for certain purposes."}
              </li>
              <li>
                {language === "ar"
                  ? "تعديل إعدادات الإشعارات والاتصالات التي تتلقاها منا."
                  : "Modify the notification and communication settings you receive from us."}
              </li>
            </ul>
            <p>
              {language === "ar"
                ? "لممارسة هذه الحقوق، يرجى الاتصال بنا عبر صفحة الاتصال أو عبر البريد الإلكتروني على privacy@yorwa.com."
                : "To exercise these rights, please contact us through our contact page or via email at privacy@yorwa.com."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === "ar" ? "الاتصال بنا" : "Contact Us"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {language === "ar"
                ? "إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو ممارسات الخصوصية لدينا، يرجى الاتصال بنا عبر البريد الإلكتروني على privacy@yorwa.com أو من خلال صفحة الاتصال على موقعنا."
                : "If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us via email at privacy@yorwa.com or through the contact page on our website."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
