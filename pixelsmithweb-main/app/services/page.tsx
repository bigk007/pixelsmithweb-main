import Link from "next/link"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Website Creation",
    description:
      "Custom websites built in days. From landing pages to e-commerce, we create sites that look great and convert.",
  },
  {
    title: "Website Redesign",
    description: "Transform your outdated site into a modern masterpiece with seamless UX and AI-driven design.",
  },
  {
    title: "Digital Marketing",
    description: "Boost your online presence with SEO, social media strategies, and targeted ad campaigns.",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center justify-center pt-20 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-green-400 text-glow animate-fade-in">
            Our Services
          </h1>
          <p
            className="text-base md:text-xl text-green-200 mb-12 md:mb-16 animate-fade-in px-2"
            style={{ animationDelay: "0.2s" }}
          >
            We build websites and marketing solutions that get results regardless of what stage your business is at
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-black/70 border border-green-700 p-4 md:p-6 rounded-lg hover:border-accent transition-colors group animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-green-300 mb-3 md:mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-green-100 text-sm md:text-base">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-green-400 text-glow">Let's get started</h2>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-accent text-white font-bold py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 button-glow"
              >
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
