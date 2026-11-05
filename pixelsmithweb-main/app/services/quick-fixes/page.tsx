import type { Metadata } from "next"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { ContactCta, QuickFixGrid, SectionHeading } from "@/components/pricing-cards"
import { quickFixes } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Quick Fixes | Pixel Smith",
  description:
    "Flat-rate website fixes for small businesses: content updates, broken links, mobile fixes, speed, SEO tune-ups and more.",
}

const steps = [
  { title: "1. Tell us what's wrong", description: "Send us your site link and a quick description of the fix." },
  { title: "2. Get a flat price", description: "We confirm the price up front — no hourly billing, no surprises." },
  { title: "3. It's fixed", description: "Most fixes are done within 24–48 hours. Pay when you're happy." },
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
              Don't need a whole new website? We fix the little things that cost you customers — fast, at a flat rate,
              on any website.
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

          <section className="mb-12 md:mb-16">
            <SectionHeading title="Quick Fix Pricing" subtitle="Flat rates per fix. Don't see yours? Ask for a quote." />
            <QuickFixGrid fixes={quickFixes} />
          </section>

          <ContactCta title="Something broken?" label="Request a Quick Fix" />
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
