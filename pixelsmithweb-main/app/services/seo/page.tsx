import Link from "next/link"
import type { Metadata } from "next"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { ContactCta, PricingTierGrid, SectionHeading } from "@/components/pricing-cards"
import { bundleOffer, seoPricing } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "SEO Management | Pixel Smith",
  description:
    "Monthly SEO management for small businesses: Google Business Profile, on-page SEO, local citations, content and ranking reports.",
}

const included = [
  {
    title: "Local SEO",
    description: "Show up in the Google Map Pack with an optimized Google Business Profile and consistent listings.",
  },
  {
    title: "On-Page SEO",
    description: "Keyword-targeted titles, descriptions, headings and content so Google knows exactly what you do.",
  },
  {
    title: "Technical SEO",
    description: "Site speed, sitemaps, indexing and mobile fixes that keep your site healthy in search.",
  },
  {
    title: "Reporting",
    description: "Plain-English reports showing your rankings, traffic and calls — no jargon.",
  },
]

export default function SeoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent uppercase tracking-widest text-sm mb-2 animate-fade-in">Get Found</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-green-400 text-glow animate-fade-in">
              SEO Management
            </h1>
            <p className="text-base md:text-xl text-green-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              When customers search for what you do, they should find you first. We handle your SEO month after month
              so you can focus on running your business.
            </p>
          </div>

          <section className="mb-16 md:mb-20">
            <SectionHeading title="What's Included" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {included.map((item) => (
                <div
                  key={item.title}
                  className="bg-black/70 border border-green-700 rounded-lg p-5 hover:border-accent transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-green-300 mb-2">{item.title}</h3>
                  <p className="text-green-100 text-sm md:text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 md:mb-16">
            <SectionHeading
              title="SEO Pricing"
              subtitle="Month-to-month plans. No long-term contracts — cancel anytime."
            />
            <PricingTierGrid tiers={seoPricing} ctaLabel="Start Getting Found" />
            <p className="text-center text-green-200 mt-8">
              <span className="text-accent font-semibold">{bundleOffer.discount}:</span> pair SEO with{" "}
              <Link href="/services/social-media" className="text-green-300 underline hover:text-accent">
                Social Media Management
              </Link>{" "}
              and save every month.
            </p>
          </section>

          <ContactCta title="Ready to climb the rankings?" label="Get a Free SEO Check" />
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
