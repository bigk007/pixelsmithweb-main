import Link from "next/link"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400 text-glow animate-fade-in">
            ABOUT PIXELSMITH
          </h1>
          <p className="text-lg md:text-xl text-green-200 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
             Your Partners in Digital Success Crafting websites that tell your story and drive results, powered by AI and a passion for design.
          </p>
          <div
            className="text-left space-y-6 text-green-100 bg-black/70 border border-green-700 p-6 md:p-8 rounded-lg mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <p>
              At Pixel Smith, we believe every small business deserves a website that shines. We’re a small team of
              digital craftsmen who use AI to build fast, stunning websites tailored to your needs—whether you’re a
              freelancer, local shop, or growing brand.
            </p>
            <p>
              Our founder started this journey to make professional web design accessible, and we’ve been turning ideas
              into digital realities ever since. Let’s create something amazing together!
            </p>
          </div>

          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-3xl font-bold mb-6 text-green-400 text-glow">Meet the Team</h2>
            <div className="w-full max-w-md h-64 bg-black border-2 border-dashed border-green-600 rounded-lg flex items-center justify-center mx-auto">
              <p className="text-green-500 text-xl">Team Photo Coming Soon</p>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-400 text-glow">Ready to start?</h2>
            <p className="text-green-200 mb-6">
              Email us at{" "}
              <a href="mailto:pixelsmithinfo@gmail.com" className="text-accent hover:underline hover:text-glow">
                pixelsmithinfo@gmail.com
              </a>{" "}
              to bring your vision to life.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 button-glow"
                variant="default"
              >
                Contact Us Now
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
