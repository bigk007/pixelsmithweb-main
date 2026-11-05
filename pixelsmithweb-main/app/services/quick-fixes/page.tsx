import type { Metadata } from "next"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { BallparkNote, ContactCta, PricingTierGrid, QuickFixGrid, SectionHeading } from "@/components/pricing-cards"
import { quickFixPackage, quickFixes } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Quick Fixes | Pixel Smith",
  description:
    "Fix-up packages for your current website: store and inventory issues, broken links, mobile layout, speed, forms and more.",
}

const steps = [
  { title: "1. Free site review", description: "Send us your site link. We'll look it over and find what's broken." },
  { title: "2. Get a quote", description: "We hop on a quick call and agree on exactly what gets fixed and the price." },
  { title: "3. It's fixed", description: "We fix everything on the list and give you 30 days of free support after." },
]

export default function QuickFixesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent uppercase tracking-widest text-sm mb-2 animate-fade-in">Get It Fixed</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-green-400 text-glow animate-fade-in">
              Quick Fixes
            </h1>
            <p className="text-base md:text-xl text-green-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Don't need a whole new website? We find and fix the things on your current site that are costing you
              customers.
            </p>
          </div>

          <section className="mb-16 md:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {steps.map((step) => (
                <div key={step.title} className="bg-black/70 border border-green-700 rounded-lg p-5 text-center">
                  <h3 className="text-lg font-semibold text-green-300 mb-2">{step.title}</h3>
                  <p className="text-green-100 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 md:mb-20">
            <SectionHeading title="Common Fixes" subtitle="Here's what we fix most often. Don't see yours? Just ask." />
            <QuickFixGrid fixes={quickFixes} />
          </section>

          <section className="mb-12 md:mb-16">
            <SectionHeading title="Quick Fix Pricing" />
            <PricingTierGrid tiers={[quickFixPackage]} ctaLabel="Get a Free Site Review" />
            <BallparkNote />
          </section>

          <ContactCta title="Something broken?" label="Book a Quick Call" />
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
