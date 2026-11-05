import Link from "next/link"
import type { Metadata } from "next"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { BallparkNote, ContactCta, PricingTierGrid, SectionHeading } from "@/components/pricing-cards"
import { bundleOffer, socialPricing, socialScopeNote } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Social Media Management | Pixel Smith",
  description:
    "Social media management for small businesses from $500/mo: 3 posts a week, a monthly content shoot, captions and reporting.",
}

const included = [
  {
    title: "Monthly Content Shoot",
    description: "Once a month we shoot photos and video of your business, so your feed is real, not stock.",
  },
  {
    title: "3 Posts a Week",
    description: "A monthly content calendar you approve, then we post 3 times a week so you never go quiet.",
  },
  {
    title: "Captions & Hashtags",
    description: "Every post gets on-brand captions and hashtags written to reach local customers.",
  },
  {
    title: "Reporting",
    description: "Monthly reports on reach, engagement, followers and clicks back to your website.",
  },
]

export default function SocialMediaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent uppercase tracking-widest text-sm mb-2 animate-fade-in">Get Clicks</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-green-400 text-glow animate-fade-in">
              Social Media Management
            </h1>
            <p className="text-base md:text-xl text-green-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Stay active on Instagram, Facebook, TikTok and more without lifting a finger. We create, post and manage
              your content so your social pages bring in real customers.
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
              title="Social Media Pricing"
              subtitle={`Month-to-month, no long-term contracts. ${socialScopeNote}`}
            />
            <PricingTierGrid tiers={socialPricing} ctaLabel="Book a Quick Call" />
            <BallparkNote />
            <p className="text-center text-green-200 mt-8">
              <span className="text-accent font-semibold">{bundleOffer.discount}:</span> pair social with{" "}
              <Link href="/services/seo" className="text-green-300 underline hover:text-accent">
                SEO Management
              </Link>{" "}
              and save every month.
            </p>
          </section>

          <ContactCta title="Ready to grow your following?" label="Book a Quick Call" />
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
