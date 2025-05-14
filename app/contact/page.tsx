"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const { language } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // محاكاة إرسال النموذج
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">{language === "ar" ? "اتصل بنا" : "Contact Us"}</h1>
        <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
          {language === "ar"
            ? "نحن هنا للإجابة على أسئلتك ومساعدتك في أي استفسارات. يمكنك التواصل معنا من خلال النموذج أدناه أو عبر معلومات الاتصال المباشرة."
            : "We're here to answer your questions and help with any inquiries. You can reach out to us through the form below or via our direct contact information."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === "ar" ? "معلومات الاتصال" : "Contact Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary rtl:ml-3 rtl:mr-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === "ar" ? "البريد الإلكتروني" : "Email"}</h3>
                    <p className="text-muted-foreground">info@yorwa.com</p>
                    <p className="text-muted-foreground">support@yorwa.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary rtl:ml-3 rtl:mr-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === "ar" ? "الهاتف" : "Phone"}</h3>
                    <p className="text-muted-foreground">+966 12 345 6789</p>
                    <p className="text-muted-foreground">+966 12 345 6780</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary rtl:ml-3 rtl:mr-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{language === "ar" ? "العنوان" : "Address"}</h3>
                    <p className="text-muted-foreground">
                      {language === "ar"
                        ? "شارع الملك فهد، برج المملكة، الطابق 20، الرياض، المملكة العربية السعودية"
                        : "King Fahd Road, Kingdom Tower, 20th Floor, Riyadh, Saudi Arabia"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === "ar" ? "ساعات العمل" : "Working Hours"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{language === "ar" ? "الأحد - الخميس" : "Sunday - Thursday"}</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "ar" ? "الجمعة" : "Friday"}</span>
                    <span>{language === "ar" ? "مغلق" : "Closed"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "ar" ? "السبت" : "Saturday"}</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{language === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}</CardTitle>
                <CardDescription>
                  {language === "ar"
                    ? "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن."
                    : "Fill out the form below and we'll get back to you as soon as possible."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md text-center">
                    <h3 className="font-bold text-lg mb-2">
                      {language === "ar" ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent successfully!"}
                    </h3>
                    <p>
                      {language === "ar"
                        ? "شكراً للتواصل معنا. سنرد عليك في أقرب وقت ممكن."
                        : "Thank you for contacting us. We will respond to you as soon as possible."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{language === "ar" ? "الاسم الكامل" : "Full Name"}</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{language === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email address"}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{language === "ar" ? "الموضوع" : "Subject"}</Label>
                      <Select value={subject} onValueChange={setSubject} required>
                        <SelectTrigger id="subject">
                          <SelectValue
                            placeholder={language === "ar" ? "اختر موضوع رسالتك" : "Select your message subject"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            {language === "ar" ? "استفسار عام" : "General Inquiry"}
                          </SelectItem>
                          <SelectItem value="support">
                            {language === "ar" ? "الدعم الفني" : "Technical Support"}
                          </SelectItem>
                          <SelectItem value="feedback">
                            {language === "ar" ? "اقتراحات وملاحظات" : "Feedback & Suggestions"}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {language === "ar" ? "فرص التعاون" : "Partnership Opportunities"}
                          </SelectItem>
                          <SelectItem value="other">{language === "ar" ? "أخرى" : "Other"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{language === "ar" ? "الرسالة" : "Message"}</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={language === "ar" ? "اكتب رسالتك هنا..." : "Write your message here..."}
                        rows={6}
                        required
                      />
                    </div>
                  </form>
                )}
              </CardContent>
              {!isSubmitted && (
                <CardFooter>
                  <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      language === "ar" ? (
                        "جاري الإرسال..."
                      ) : (
                        "Sending..."
                      )
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                      </>
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
