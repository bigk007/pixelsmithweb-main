import QuizFunnel from "@/components/quiz-funnel"
import type { Metadata } from "next"

// SEO Metadata for the quiz page
export const metadata: Metadata = {
  title: "Free Website & Marketing Quiz | PixelSmith",
  description:
    "Discover your website's growth potential in 2 minutes! Take our free quiz for a personalized action plan for your small business, startup, or freelance venture.",
  keywords: [
    "small business website quiz",
    "web design lead magnet",
    "digital marketing assessment",
    "PixelSmith quiz",
    "free website plan",
  ],
  openGraph: {
    title: "PixelSmith | Free Website & Marketing Quiz",
    description:
      "Get a personalized action plan to boost your online presence. Perfect for small businesses and freelancers.",
    type: "website",
    // url: "https://yourdomain.com/quiz", // Replace with your actual URL
    // images: [ // Add an image for social sharing
    //   {
    //     url: "https://yourdomain.com/og-quiz-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "PixelSmith Quiz Funnel",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelSmith | Free Website & Marketing Quiz",
    description: "Take our 2-minute quiz for a free, personalized website and marketing plan.",
    // images: ["https://yourdomain.com/twitter-quiz-image.png"], // Replace with your actual URL
  },
}

export default function QuizPage() {
  return (
    <>
      {/* The QuizFunnel component handles its own full-screen layout */}
      <QuizFunnel />
    </>
  )
}
