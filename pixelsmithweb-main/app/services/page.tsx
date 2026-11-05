import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { ContactCta } from "@/components/pricing-cards"
import { services } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Services | Pixel Smith",
  description:
    "Website creation, SEO management, social media management and quick website fixes for small businesses.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center w-full">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-green-400 text-glow animate-fade-in">
            Our Services
          </h1>
          <p
            className="text-base md:text-xl text-green-200 mb-12 md:mb-16 animate-fade-in px-2"
            style={{ animationDelay: "0.2s" }}
          >
            Get online, get found, get clicks, get paid. We build websites and marketing solutions that get results
            regardless of what stage your business is at.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={service.href}
                className="flex flex-col text-left bg-black/70 border border-green-700 p-5 md:p-6 rounded-lg hover:border-accent hover:-translate-y-1 hover:shadow-[0_0_20px_theme(colors.accent)] transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.15}s` }}
              >
                <p className="text-accent uppercase tracking-widest text-xs mb-2">{service.tagline}</p>
                <h2 className="text-xl md:text-2xl font-semibold text-green-300 mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-green-100 text-sm md:text-base mb-4">{service.description}</p>
                <ul className="text-green-200 text-sm space-y-1 mb-6 list-disc list-inside flex-grow">
                  {service.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:text-accent">
                  {service.slug === "websites" ? "Get a free quote" : "See plans & pricing"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mb-12 md:mb-16 animate-fade-in" style={{ animationDelay: "1s" }}>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-lg text-green-300 hover:text-accent hover:text-glow transition-colors"
            >
              Compare all plans on our pricing page <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "1.1s" }}>
            <ContactCta />
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
