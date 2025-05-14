"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"

export default function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full led-ring-solid-small"></div>
            <div className="absolute inset-[2px] rounded-full bg-background overflow-hidden">
              <Image
                src="/images/yorwa-logo.png"
                alt="Yorwa Logo"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">{t("footer")}</p>
        </div>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:underline hover:text-foreground">
            About
          </Link>
          <Link href="/privacy" className="hover:underline hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline hover:text-foreground">
            Terms
          </Link>
          <Link href="/contact" className="hover:underline hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
