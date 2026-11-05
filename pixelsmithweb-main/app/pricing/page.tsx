import Link from "next/link"
import type { Metadata } from "next"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { BallparkNote, ContactCta, PricingTierGrid, SectionHeading } from "@/components/pricing-cards"
import {
  bundleOffer,
  quickFixPackage,
  seoPricing,
  socialPricing,
  socialScopeNote,
  websitePricing,
} from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Pricing | Pixel Smith",
  description:
    "Simple, transparent pricing for websites, SEO management, social media management and quick website fixes.",
}

const jumpLinks = [
  { href: "#websites", label: "Websites" },
  { href: "#seo", label: "SEO" },
  { href: "#social-media", label: "Social Media" },
  { href: "#quick-fixes", label: "Quick Fixes" },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-green-400 text-glow animate-fade-in">
              Pricing
            </h1>
            <p className="text-base md:text-xl text-green-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Here's a rough idea of what things cost. Every project is different, so we'll put together something that fits once we know more. Monthly plans are month-to-month, with no long-term contracts.
            </p>
          </div>

          <nav aria-label="Pricing sections" className="flex flex-wrap justify-center gap-3 mb-16">
            {jumpLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border border-green-700 rounded-full px-4 py-2 text-sm text-green-300 hover:border-accent hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <section id="websites" className="scroll-mt-28 mb-20">
            <SectionHeading
              eyebrow="Get Online"
              title="Websites"
              subtitle="Refresh the site you have or start from scratch. Every site includes 30 days of free support."
            />
            <PricingTierGrid tiers={websitePricing} ctaLabel="Get a Free Quote" />
          </section>

          <section id="seo" className="scroll-mt-28 mb-20">
            <SectionHeading
              eyebrow="Get Found"
              title="SEO Management"
              subtitle="Rank higher on Google and Google Maps."
            />
            <PricingTierGrid tiers={seoPricing} ctaLabel="Start Getting Found" />
            <p className="text-center mt-6">
              <Link href="/services/seo" className="text-green-300 underline hover:text-accent">
                Learn more about SEO Management
              </Link>
            </p>
          </section>

          <section id="social-media" className="scroll-mt-28 mb-12">
            <SectionHeading
              eyebrow="Get Clicks"
              title="Social Media Management"
              subtitle={socialScopeNote}
            />
            <PricingTierGrid tiers={socialPricing} ctaLabel="Book a Quick Call" />
            <p className="text-center mt-6">
              <Link href="/services/social-media" className="text-green-300 underline hover:text-accent">
                Learn more about Social Media Management
              </Link>
            </p>
          </section>

          <section className="mb-20 bg-black/70 border border-accent rounded-lg p-6 text-center">
            <p className="text-accent uppercase tracking-widest text-sm mb-2">Bundle & Save {bundleOffer.discount}</p>
            <h2 className="text-xl md:text-2xl font-bold text-green-400 text-glow mb-2">{bundleOffer.name}</h2>
            <p className="text-green-200">{bundleOffer.description}</p>
          </section>

          <section id="quick-fixes" className="scroll-mt-28 mb-16">
            <SectionHeading
              eyebrow="Get It Fixed"
              title="Quick Fixes"
              subtitle="Fix what's broken on the site you already have. We review your site first for free."
            />
            <PricingTierGrid tiers={[quickFixPackage]} ctaLabel="Get a Free Site Review" />
            <p className="text-center mt-6">
              <Link href="/services/quick-fixes" className="text-green-300 underline hover:text-accent">
                See what we fix
              </Link>
            </p>
          </section>

          <BallparkNote />
          <div className="mt-12">
            <ContactCta title="Not sure what you need?" label="Book a Quick Call" />
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
