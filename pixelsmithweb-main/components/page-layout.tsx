import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import SocialIcons from "@/components/social-icons"
import BackgroundElement from "@/components/background-element"

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-black text-white">
      {/* Background Element */}
      <BackgroundElement />

      {/* Header */}
      <header className="fixed top-0 z-10 flex w-full items-center justify-between px-4 py-6 md:px-8">
        <Link href="/" className="relative h-12 w-12 md:h-16 md:w-16">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pixelated%20Hammer%20and%20Mouse%20Cursor%20Logo-cQ6l991ccvXyj1QaZFGiu9vquCVMl8.png"
            alt="PixelSmith Logo"
            fill
            className="object-contain invert"
            priority
          />
        </Link>
        {/* Timestamp */}
        <div className="text-sm text-gray-400">05/22/2025 05:48 AM LA</div>
      </header>

      {/* Main Content */}
      <main className="flex w-full flex-1 flex-col items-center px-4 py-20">
        {/* Page Header */}
        <div className="mb-12 mt-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{title}</h1>
          {description && <p className="text-gray-400">{description}</p>}
        </div>

        {/* Content Container - Updated to center content */}
        <div className="w-full max-w-4xl mx-auto text-center">{children}</div>
      </main>

      {/* Footer */}
      <SocialIcons />
    </div>
  )
}
