import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Assuming shadcn/ui setup
import PopUpQuiz from "@/components/pop-up-quiz" // Import the PopUpQuiz component
// Import your fonts if not already globally available
// import { Inter, VT323 } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
// const vt323 = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt323' })

export const metadata: Metadata = {
  title: "Pixel Smith | AI-Powered Website Creation & Marketing Services",
  description:
    "Custom websites built fast with AI for small businesses. Contact Pixel Smith for professional web design and marketing solutions.",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add Google Fonts link here if not using next/font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=VT323&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics script would also go here if used */}
      </head>
      <body className="font-sans">
        {" "}
        {/* Ensure your base font is set, e.g., Inter */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <PopUpQuiz showOnLoad={true} triggerDelay={7000} /> {/* Add PopUpQuiz here; triggers after 7s */}
        </ThemeProvider>
      </body>
    </html>
  )
}
