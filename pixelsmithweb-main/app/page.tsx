import Link from "next/link"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import TestimonialCarousel from "@/components/testimonial-carousel"
import FuzzyText from "@/components/fuzzy-text"
import { Button } from "@/components/ui/button"

const portfolioItems = [
  {
    id: 1,
    title: "SD Jewelry",
    placeholderText: "SD Jewelry",
    description:
      "A sleek website for SD Jewelry, showcasing handcrafted custom jewelry in San Diego with a focus of elegance and user-friendly navigation.",
    url: "https://galleria-by-johnny.lovable.app/",
  },
  {
    id: 2,
    title: "Pristine Gardens",
    placeholderText: "Pristine Gardens",
    description:
      "A nature-inspired website for Pristine Gardens, offering expert gardening services in Los Angeles with a modern, easy-to-use design.",
    url: "https://pristine-gardens.lovable.app/",
  },
  {
    id: 3,
    title: "Coastal Cafe (Sample)",
    placeholderText: "Coastal Cafe",
    description:
      "A vibrant website for a fictional coastal cafe, featuring a menu, booking form, and a warm, inviting design to attract local customers.",
    url: "#",
  },
  {
    id: 4,
    title: "Freelance Studio (Sample)",
    placeholderText: "Freelance Studio",
    description:
      "A minimalist website for a fictional freelance studio, highlighting services, portfolio, and a contact form to connect with clients.",
    url: "#",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />

      <main className="flex-grow flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-20 md:mb-32 w-full max-w-7xl mx-auto">
          <div className="mb-4 flex justify-center overflow-hidden">
            <FuzzyText
              fontSize="clamp(2.5rem, 8vw, 10rem)"
              fontWeight={800}
              color="#4ade80" // text-green-400 equivalent
              baseIntensity={0.12}
              hoverIntensity={0.35}
              fontFamily="VCR OSD Mono, Courier New, monospace"
              className="max-w-full leading-none"
            >
              Stunning Websites
            </FuzzyText>
          </div>
          <div className="mb-10 flex justify-center overflow-hidden">
            <FuzzyText
              fontSize="clamp(2rem, 7vw, 8.5rem)"
              fontWeight={700}
              color="#22c55e" // text-green-500 equivalent - slightly different shade for hierarchy
              baseIntensity={0.1}
              hoverIntensity={0.3}
              fontFamily="VCR OSD Mono, Courier New, monospace"
              className="max-w-full leading-none"
            >
              Built Fast with AI
            </FuzzyText>
          </div>
          <p
            className="text-lg md:text-2xl text-green-200 mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in px-4"
            style={{ animationDelay: "0.3s" }}
          >
            Pixel Smith creates custom websites for small businesses in days, not weeks. Let's bring your vision to
            life.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-accent text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 button-glow animate-fade-in"
              style={{ animationDelay: "0.6s" }}
              variant="default"
            >
              Get Started – Contact Us Today
            </Button>
          </Link>
        </section>

        {/* Our Work Section (Portfolio) - Moved Up */}
        <section
          className="w-full max-w-5xl mx-auto text-center animate-fade-in mb-20 md:mb-32"
          style={{ animationDelay: "0.9s" }} // Adjusted delay
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white text-glow">
            Our Work – See What We Can Do for You
          </h3>
          <p className="text-lg md:text-xl text-green-300 mb-12">
            Custom websites built fast with AI, tailored to your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-black/70 border border-green-700 p-6 rounded-lg group transition-all duration-300 ease-out hover:shadow-[0_0_20px_theme(colors.accent)] hover:-translate-y-2 hover:border-accent animate-fade-in" // Added animate-fade-in here
                style={{ animationDelay: `${1.1 + index * 0.15}s` }} // Adjusted delay for items
              >
                <div className="aspect-video bg-black border border-dashed border-green-600 rounded-md flex items-center justify-center mb-4 group-hover:border-accent/70">
                  <span className="text-green-400 text-xl font-semibold group-hover:text-accent transition-colors">
                    {item.placeholderText}
                  </span>
                </div>
                <h4 className="text-2xl font-semibold text-green-300 mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="text-green-100 text-sm mb-6 h-16 overflow-hidden">{item.description}</p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-accent text-white font-semibold py-3 transition-all duration-300 button-glow group-hover:bg-accent"
                >
                  <Link href={item.url} target={item.url === "#" ? "_self" : "_blank"} rel="noopener noreferrer">
                    Visit Site
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 button-glow animate-fade-in" // Added animate-fade-in
              style={{ animationDelay: `${1.1 + portfolioItems.length * 0.15 + 0.1}s` }} // Adjusted delay for button
            >
              Ready for your own website? Let's get started!
            </Button>
          </Link>
        </section>

        {/* Testimonials Section - Moved Down */}
        <section className="w-full max-w-5xl mx-auto mb-20 md:mb-32 animate-fade-in" style={{ animationDelay: "1.6s" }}>
          {" "}
          {/* Adjusted delay */}
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-400 text-glow">
            Why Small Businesses Love Pixel Smith
          </h3>
          <TestimonialCarousel />
        </section>
      </main>
      <MainFooter />
    </div>
  )
}
