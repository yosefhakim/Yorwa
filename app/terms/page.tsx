"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  const { language } = useLanguage()

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {language === "ar" ? "شروط الاستخدام" : "Terms of Service"}
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
                ? "مرحبًا بك في منصة يُروى. تحكم شروط الاستخدام هذه استخدامك لموقعنا الإلكتروني وخدماتنا وتطبيقاتنا (يشار إليها مجتمعة باسم 'الخدمات'). باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا."
                : "Welcome to Yorwa. These Terms of Service govern your use of our website, services, and applications (collectively referred to as the 'Services'). By using our Services, you agree to be bound by these terms. If you do not agree to these terms, please do not use our Services."}
            </p>
            <p>
              {language === "ar"
                ? "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإخطارك بأي تغييرات من خلال نشر الشروط المحدثة على موقعنا. استمرارك في استخدام خدماتنا بعد نشر التغييرات يشكل قبولًا لهذه التغييرات."
                : "We reserve the right to modify these terms at any time. We will notify you of any changes by posting the updated terms on our website. Your continued use of our Services after the posting of changes constitutes your acceptance of such changes."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "حسابك" : "Your Account"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">{language === "ar" ? "إنشاء الحساب" : "Account Creation"}</h3>
            <p>
              {language === "ar"
                ? "لاستخدام بعض ميزات منصتنا، قد تحتاج إلى إنشاء حساب. يجب أن تكون المعلومات التي تقدمها أثناء عملية التسجيل دقيقة وكاملة وحديثة في جميع الأوقات. أنت مسؤول عن الحفاظ على سرية كلمة المرور الخاصة بك وعن جميع الأنشطة التي تحدث تحت حسابك."
                : "To use certain features of our platform, you may need to create an account. The information you provide during the registration process must be accurate, complete, and current at all times. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account."}
            </p>

            <h3 className="text-xl font-semibold pt-4">{language === "ar" ? "متطلبات العمر" : "Age Requirements"}</h3>
            <p>
              {language === "ar"
                ? "يجب أن يكون عمرك 13 عامًا على الأقل لاستخدام خدماتنا. إذا كان عمرك بين 13 و18 عامًا، يجب أن تحصل على موافقة والديك أو الوصي القانوني عليك لاستخدام خدماتنا."
                : "You must be at least 13 years old to use our Services. If you are between the ages of 13 and 18, you must have permission from your parent or legal guardian to use our Services."}
            </p>

            <h3 className="text-xl font-semibold pt-4">{language === "ar" ? "إنهاء الحساب" : "Account Termination"}</h3>
            <p>
              {language === "ar"
                ? "نحتفظ بالحق في تعليق أو إنهاء حسابك وإمكانية وصولك إلى خدماتنا في أي وقت ولأي سبب، بما في ذلك، على سبيل المثال لا الحصر، انتهاك هذه الشروط. يمكنك أيضًا إنهاء حسابك في أي وقت من خلال اتباع التعليمات الموجودة في إعدادات حسابك."
                : "We reserve the right to suspend or terminate your account and access to our Services at any time for any reason, including, without limitation, a violation of these Terms. You may also terminate your account at any time by following the instructions in your account settings."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "المحتوى والسلوك" : "Content and Conduct"}</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-4">{language === "ar" ? "محتوى المستخدم" : "User Content"}</h3>
            <p className="mb-4">
              {language === "ar"
                ? "أنت تحتفظ بجميع حقوق الملكية الخاصة بك في أي محتوى تنشره على منصتنا ('محتوى المستخدم'). من خلال نشر محتوى المستخدم، فإنك تمنحنا ترخيصًا عالميًا وغير حصري وخاليًا من حقوق الملكية لاستخدام ونسخ وتعديل وتوزيع وعرض محتوى المستخدم الخاص بك فيما يتعلق بتشغيل وتحسين خدماتنا."
                : "You retain all of your ownership rights in any content you post on our platform ('User Content'). By posting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, distribute, and display your User Content in connection with the operation and improvement of our Services."}
            </p>

            <h3 className="text-xl font-semibold mb-4 pt-4">
              {language === "ar" ? "المحتوى المحظور" : "Prohibited Content"}
            </h3>
            <p className="mb-4">
              {language === "ar"
                ? "لا يجوز لك نشر محتوى يكون غير قانوني أو ضار أو مسيء أو مهدد أو مضايق أو تشهيري أو فاحش أو ينتهك حقوق الملكية الفكرية للآخرين أو خصوصيتهم. نحتفظ بالحق في إزالة أي محتوى نعتبره، وفقًا لتقديرنا الخاص، مخالفًا لهذه الشروط."
                : "You may not post content that is illegal, harmful, abusive, threatening, harassing, defamatory, obscene, or that infringes on the intellectual property rights or privacy of others. We reserve the right to remove any content that we deem, in our sole discretion, to be in violation of these terms."}
            </p>

            <h3 className="text-xl font-semibold mb-4 pt-4">
              {language === "ar" ? "قواعد السلوك" : "Code of Conduct"}
            </h3>
            <p>
              {language === "ar"
                ? "عند استخدام خدماتنا، يجب عليك الالتزام بالقوانين المعمول بها واحترام حقوق وكرامة الآخرين. لا يجوز لك استخدام خدماتنا للتحرش أو التهديد أو انتحال شخصية شخص آخر أو التصرف بطريقة تضر بتجربة المستخدمين الآخرين."
                : "When using our Services, you must comply with applicable laws and respect the rights and dignity of others. You may not use our Services to harass, threaten, impersonate another person, or behave in a way that is detrimental to the experience of other users."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "الملكية الفكرية" : "Intellectual Property"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {language === "ar"
                ? "تعود ملكية خدماتنا، بما في ذلك جميع العلامات التجارية وحقوق النشر وحقوق الملكية الفكرية الأخرى، إلى منصة يُروى أو مرخصيها. لا يجوز لك نسخ أو تعديل أو توزيع أو إنشاء أعمال مشتقة من خدماتنا أو محتوانا دون إذن كتابي صريح منا."
                : "Our Services, including all trademarks, copyrights, and other intellectual property rights, are owned by Yorwa or its licensors. You may not copy, modify, distribute, or create derivative works from our Services or our content without our express written permission."}
            </p>
            <p>
              {language === "ar"
                ? "إذا كنت تعتقد أن محتوى على منصتنا ينتهك حقوق النشر الخاصة بك، يرجى إخطارنا عن طريق تقديم إشعار بانتهاك حقوق النشر إلى yosef3mk13@gmail.com."
                : "If you believe that content on our platform infringes your copyright, please notify us by submitting a copyright infringement notice to yosef3mk13@gmail.com."}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === "ar" ? "إخلاء المسؤولية والتعويض" : "Disclaimers and Indemnification"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">{language === "ar" ? "إخلاء المسؤولية" : "Disclaimers"}</h3>
            <p>
              {language === "ar"
                ? "يتم توفير خدماتنا 'كما هي' و'كما هي متاحة' دون أي ضمانات من أي نوع، سواء كانت صريحة أو ضمنية. نحن لا نضمن أن خدماتنا ستكون آمنة أو خالية من الأخطاء أو متاحة في جميع الأوقات."
                : "Our Services are provided 'as is' and 'as available' without any warranties of any kind, either express or implied. We do not guarantee that our Services will be secure, error-free, or available at all times."}
            </p>

            <h3 className="text-xl font-semibold pt-4">
              {language === "ar" ? "تحديد المسؤولية" : "Limitation of Liability"}
            </h3>
            <p>
              {language === "ar"
                ? "إلى أقصى حد يسمح به القانون، لن تكون منصة يُروى مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك خسارة الأرباح، سواء كانت ناشئة عن عقد أو ضرر أو غير ذلك، حتى لو تم إخطارنا بإمكانية حدوث مثل هذه الأضرار."
                : "To the maximum extent permitted by law, Yorwa will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services."}
            </p>

            <h3 className="text-xl font-semibold pt-4">{language === "ar" ? "التعويض" : "Indemnification"}</h3>
            <p>
              {language === "ar"
                ? "أنت توافق على تعويض منصة يُروى والدفاع عنها وإبراء ذمتها من وضد أي مطالبات أو مسؤوليات أو أضرار أو خسائر أو نفقات، بما في ذلك أتعاب المحاماة المعقولة، الناشئة عن انتهاكك لهذه الشروط أو استخدامك لخدماتنا."
                : "You agree to indemnify, defend, and hold harmless Yorwa from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your violation of these Terms or your use of our Services."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === "ar" ? "أحكام متنوعة" : "Miscellaneous"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">{language === "ar" ? "القانون الحاكم" : "Governing Law"}</h3>
            <p>
              {language === "ar"
                ? "تخضع هذه الشروط وأي نزاعات ناشئة عنها أو متعلقة بها لقوانين المملكة العربية السعودية، دون اعتبار لمبادئ تنازع القوانين."
                : "These Terms and any disputes arising out of or related to them will be governed by the laws of Saudi Arabia, without regard to its conflict of law principles."}
            </p>

            <h3 className="text-xl font-semibold pt-4">{language === "ar" ? "الانفصال" : "Severability"}</h3>
            <p>
              {language === "ar"
                ? "إذا تم اعتبار أي حكم من أحكام هذه الشروط غير قانوني أو باطل أو غير قابل للتنفيذ لأي سبب من الأسباب، فسيتم اعتبار هذا الحكم قابلاً للفصل عن هذه الشروط ولن يؤثر على صحة وقابلية تنفيذ أي من الأحكام المتبقية."
                : "If any provision of these Terms is found to be illegal, void, or unenforceable for any reason, that provision will be deemed severable from these Terms and will not affect the validity and enforceability of any remaining provisions."}
            </p>

            <h3 className="text-xl font-semibold pt-4">{language === "ar" ? "الاتصال بنا" : "Contact Us"}</h3>
            <p>
              {language === "ar"
                ? "إذا كان لديك أي أسئلة حول شروط الاستخدام هذه، يرجى الاتصال بنا عبر البريد الإلكتروني على yosef3mk13@gmail.com أو من خلال صفحة الاتصال على موقعنا."
                : "If you have any questions about these Terms of Service, please contact us via email at yosef3mk13@gmail.com or through the contact page on our website."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
