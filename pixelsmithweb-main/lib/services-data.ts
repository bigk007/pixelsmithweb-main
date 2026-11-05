// Single source of truth for Pixel Smith services and pricing.
// Edit prices/features here — the Services, individual service pages and Pricing page all read from this file.

export type PricingTier = {
  name: string
  price: string
  priceNote?: string
  period?: string
  tagline: string
  features: string[]
  popular?: boolean
}

export type QuickFix = {
  name: string
  description: string
}

export type Service = {
  slug: string
  href: string
  title: string
  tagline: string
  description: string
  highlights: string[]
}

export const services: Service[] = [
  {
    slug: "websites",
    href: "/contact",
    title: "Website Creation & Redesign",
    tagline: "Get online",
    description:
      "Custom websites built fast. From brand-new business sites to a full refresh of the site you already have.",
    highlights: ["Full site refresh from $1,500", "Mobile-first design", "30 days of free support"],
  },
  {
    slug: "seo",
    href: "/services/seo",
    title: "SEO Management",
    tagline: "Get found",
    description:
      "Ongoing search engine optimization that puts your business in front of local customers on Google and Google Maps.",
    highlights: ["Google Business Profile optimization", "On-page & technical SEO", "Monthly ranking reports"],
  },
  {
    slug: "social-media",
    href: "/services/social-media",
    title: "Social Media Management",
    tagline: "Get clicks",
    description:
      "We plan, create and post content for your brand so you stay active, build a following and drive traffic back to your site.",
    highlights: ["From $500/mo", "3 posts a week", "1 content shoot a month"],
  },
  {
    slug: "quick-fixes",
    href: "/services/quick-fixes",
    title: "Quick Fixes",
    tagline: "Get it fixed",
    description:
      "Don't need a new site? We find and fix what's costing you customers on the site you already have, from broken checkouts to slow pages.",
    highlights: ["Fix-up packages from around $500", "Free review of your current site", "No contract required"],
  },
]

export const websitePricing: PricingTier[] = [
  {
    name: "Full Site Refresh",
    price: "$1,500",
    priceNote: "starting at",
    tagline: "A modern redesign of the site you already have.",
    features: [
      "New modern, mobile-first design",
      "Updated layout, content and images",
      "Speed and basic SEO cleanup",
      "30 days of free support",
    ],
    popular: true,
  },
  {
    name: "New Website",
    price: "Custom",
    tagline: "A brand-new site built from scratch, quoted to your needs.",
    features: ["Multiple pages", "Booking, store, menus or galleries", "Basic SEO setup", "30 days of free support"],
  },
]

export const seoPricing: PricingTier[] = [
  {
    name: "Local Starter",
    price: "$149",
    period: "/mo",
    tagline: "Get your business showing up in local searches.",
    features: [
      "Google Business Profile optimization",
      "On-page SEO for up to 5 pages",
      "Keyword research (up to 10 keywords)",
      "Google Search Console & Analytics setup",
      "Monthly ranking report",
    ],
  },
  {
    name: "Growth",
    price: "$299",
    period: "/mo",
    tagline: "Climb the rankings and outrank local competitors.",
    features: [
      "Everything in Local Starter",
      "On-page SEO for up to 15 pages",
      "Up to 25 tracked keywords",
      "2 SEO blog posts per month",
      "Local citation & directory building",
      "Competitor tracking",
    ],
    popular: true,
  },
  {
    name: "Dominate",
    price: "$499",
    period: "/mo",
    tagline: "Full-service SEO for businesses ready to lead their market.",
    features: [
      "Everything in Growth",
      "Unlimited pages optimized",
      "4 SEO blog posts per month",
      "Backlink outreach",
      "Quarterly technical SEO audit",
      "Bi-weekly reports + strategy call",
    ],
  },
]

export const socialPricing: PricingTier[] = [
  {
    name: "Social Media Management",
    price: "$500",
    priceNote: "starting at",
    period: "/mo",
    tagline: "Consistent, on-brand content without you lifting a finger.",
    features: [
      "3 posts per week (about 12 per month)",
      "1 photo/video content shoot per month",
      "Up to 2 platforms",
      "Captions, hashtags & scheduling",
      "Monthly content calendar for your approval",
      "Monthly performance report",
    ],
    popular: true,
  },
  {
    name: "Custom Plan",
    price: "Custom",
    tagline: "Need more? We'll build a plan that fits.",
    features: [
      "Extra posts, reels or shoots",
      "More platforms",
      "Comment & DM management",
      "Paid ad campaign management (ad spend separate)",
    ],
  },
]

export const socialScopeNote =
  "Each plan has a set scope, so you always know what you're getting. Extra posts, shoots or platforms are quoted separately."

export const bundleOffer = {
  name: "Get Found + Get Clicks Bundle",
  description: "Combine any SEO Management plan with any Social Media Management plan and save 15% every month.",
  discount: "15% off",
}

export const quickFixPackage: PricingTier = {
  name: "Quick Fix Package",
  price: "$500",
  priceNote: "around",
  tagline: "We review your current site, then fix the issues costing you customers.",
  features: [
    "Free review of your current site",
    "A clear list of what we'll fix before we start",
    "Most fixes done within a week",
    "30 days of free support after",
  ],
}

export const quickFixes: QuickFix[] = [
  { name: "Store & Inventory Issues", description: "Products wrongly showing sold out, broken carts or checkout." },
  { name: "Broken Links & Buttons", description: "Find and fix links, buttons and pages that go nowhere." },
  { name: "Mobile Layout Fixes", description: "Fix pages that look broken or cramped on phones." },
  { name: "Contact & Booking Forms", description: "Repair broken forms or add booking, reviews or chat widgets." },
  { name: "Speed Optimization", description: "Compress images and clean up code for faster load times." },
  { name: "Content & Image Updates", description: "Refresh outdated copy, photos, hours, prices or your logo." },
  { name: "Domain & SSL Setup", description: "Connect your domain and get the secure padlock (https)." },
  { name: "SEO & Analytics Basics", description: "Meta titles, sitemap, Google Analytics and Search Console." },
]
