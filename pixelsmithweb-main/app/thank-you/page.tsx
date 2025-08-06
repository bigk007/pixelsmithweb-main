import Link from "next/link"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="w-full max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400 text-glow">Thank You!</h1>
          <div className="bg-black/70 border border-green-700 p-8 rounded-lg mb-8">
            <p className="text-xl text-green-200 mb-6">
              Your message has been received. We'll get back to you within 24 hours.
            </p>
            <p className="text-green-300">While you wait, feel free to explore more of our services or portfolio.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-green-600 hover:bg-accent text-white font-bold py-3 px-6 transition-all duration-300 button-glow w-full md:w-auto">
                Return Home
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-700 hover:text-white transition-colors button-glow w-full md:w-auto"
              >
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
