import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PricingTier, QuickFix } from "@/lib/services-data"

export function PricingTierGrid({ tiers, ctaLabel = "Get Started" }: { tiers: PricingTier[]; ctaLabel?: string }) {
  const cols =
    tiers.length === 1 ? "max-w-md" : tiers.length === 2 ? "md:grid-cols-2 max-w-3xl" : "md:grid-cols-3"
  return (
    <div className={`grid grid-cols-1 ${cols} gap-6 md:gap-8 mx-auto w-full`}>
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col text-left bg-black/70 border rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_20px_theme(colors.accent)] ${
            tier.popular ? "border-accent" : "border-green-700"
          }`}
        >
          {tier.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold uppercase px-3 py-1 rounded-full">
              Most Popular
            </span>
          )}
          <h3 className="text-xl md:text-2xl font-semibold text-green-300 mb-1">{tier.name}</h3>
          <p className="text-green-200 text-sm mb-4 min-h-[2.5rem]">{tier.tagline}</p>
          <p className="mb-6">
            {tier.priceNote && (
              <span className="block text-xs uppercase tracking-widest text-green-300 mb-1">{tier.priceNote}</span>
            )}
            <span className="text-4xl font-bold text-green-400 text-glow">{tier.price}</span>
            {tier.period && <span className="text-green-300 ml-1">{tier.period}</span>}
          </p>
          <ul className="space-y-2 mb-8 flex-grow">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-green-100 text-sm">
                <Check className="h-4 w-4 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="w-full bg-green-600 hover:bg-accent hover:text-black text-white font-semibold py-3 transition-all duration-300 button-glow"
          >
            <Link href="/contact">{ctaLabel}</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}

export function QuickFixGrid({ fixes }: { fixes: QuickFix[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {fixes.map((fix) => (
        <li
          key={fix.name}
          className="flex items-start gap-3 text-left bg-black/70 border border-green-700 rounded-lg p-4 hover:border-accent transition-colors"
        >
          <Check className="h-5 w-5 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <h3 className="text-base md:text-lg font-semibold text-green-300">{fix.name}</h3>
            <p className="text-green-100 text-sm">{fix.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function BallparkNote() {
  return (
    <p className="text-center text-green-200 text-sm md:text-base max-w-2xl mx-auto mt-8">
      All prices are ballpark. The final price depends on what you want done, so we'll put together something that
      fits after a quick call.
    </p>
  )
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      {eyebrow && <p className="text-accent uppercase tracking-widest text-sm mb-2">{eyebrow}</p>}
      <h2 className="text-2xl md:text-4xl font-bold text-green-400 text-glow mb-3">{title}</h2>
      {subtitle && <p className="text-green-200 md:text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

export function ContactCta({ title = "Let's get started", label = "Contact Us Today" }: { title?: string; label?: string }) {
  return (
    <div className="text-center">
      <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-green-400 text-glow">{title}</h2>
      <Link href="/contact">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-accent text-white font-bold py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 button-glow"
        >
          {label}
        </Button>
      </Link>
    </div>
  )
}
