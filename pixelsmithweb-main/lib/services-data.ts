// Single source of truth for Pixel Smith services and pricing.
// Edit prices/features here — the Services, individual service pages and Pricing page all read from this file.

export type PricingTier = {
  name: string
  price: string
  period?: string
  tagline: string
  features: string[]
  popular?: boolean
}

export type QuickFix = {
  name: string
  price: string
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
      "Custom websites built in days, not weeks. From landing pages to full business sites, or a modern refresh of the site you already have.",
    highlights: ["Built in 24–48 hours", "Mobile-first design", "30 days of free support"],
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
    highlights: ["Content calendar & posting", "Custom graphics & reels", "Comment & DM management"],
  },
  {
    slug: "quick-fixes",
    href: "/services/quick-fixes",
    title: "Quick Fixes",
    tagline: "Get it fixed",
    description:
      "Need one thing done fast? Flat-rate fixes for broken links, slow pages, content updates and more — usually done within 48 hours.",
    highlights: ["Flat-rate pricing", "Most fixes done in 24–48 hours", "No contract required"],
  },
]

export const websitePricing: PricingTier[] = [
  {
    name: "Starter Site",
    price: "$100",
    tagline: "A clean one-page site to get your business online.",
    features: ["1-page landing site", "Mobile-friendly design", "Contact form", "30 days of free support"],
  },
  {
    name: "Business Site",
    price: "Custom",
    tagline: "Multi-page sites and redesigns, quoted to your needs.",
    features: ["Multiple pages", "Booking, menus or galleries", "Basic SEO setup", "30 days of free support"],
    popular: true,
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
    name: "Starter",
    price: "$199",
    period: "/mo",
    tagline: "Stay consistent on the platforms that matter most.",
    features: [
      "2 platforms",
      "8 posts per month",
      "Custom branded graphics",
      "Monthly content calendar",
      "Monthly performance report",
    ],
  },
  {
    name: "Growth",
    price: "$349",
    period: "/mo",
    tagline: "Grow your following and turn followers into customers.",
    features: [
      "3 platforms",
      "12 posts + 4 reels/stories per month",
      "Hashtag & audience strategy",
      "Comment management",
      "Monthly performance report",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "$599",
    period: "/mo",
    tagline: "Hands-off social media, fully managed for you.",
    features: [
      "4 platforms",
      "20 posts + 8 reels/stories per month",
      "Comment & DM management",
      "Paid ad campaign management (ad spend separate)",
      "Bi-weekly reports + strategy call",
    ],
  },
]

export const bundleOffer = {
  name: "Get Found + Get Clicks Bundle",
  description: "Combine any SEO Management plan with any Social Media Management plan and save 15% every month.",
  discount: "15% off",
}

export const quickFixes: QuickFix[] = [
  { name: "Text or Image Update", price: "$25", description: "Swap copy, photos, hours, prices or your logo." },
  { name: "Broken Link Fix", price: "$35", description: "Find and fix broken links and buttons across your site." },
  { name: "Mobile Layout Fix", price: "$49", description: "Fix pages that look broken or cramped on phones." },
  { name: "Domain & SSL Setup", price: "$49", description: "Connect your domain and get the secure padlock (https)." },
  { name: "Contact Form Fix or Install", price: "$59", description: "Repair a broken form or add a new one that emails you." },
  { name: "Booking / Widget Install", price: "$59", description: "Add Calendly, booking, reviews, chat or map widgets." },
  { name: "Analytics Setup", price: "$59", description: "Google Analytics 4 + Search Console, set up and verified." },
  { name: "Google Business Profile Setup", price: "$75", description: "Create or claim and fully optimize your profile." },
  { name: "SEO Tune-Up", price: "$79", description: "Meta titles, descriptions, sitemap and indexing check." },
  { name: "Speed Optimization", price: "$99", description: "Compress images and clean up code for faster load times." },
]
