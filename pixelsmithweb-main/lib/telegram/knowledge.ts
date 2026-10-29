// Business facts the bot answers from. Keep this in sync with the FAQ,
// Services and About pages so the bot never contradicts the website.

// Set NEXT_PUBLIC_SITE_URL to your domain; on Vercel this falls back to the production URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
export const CONTACT_EMAIL = "pixelsmithinfo@gmail.com"

export const services = [
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

export const faqs = [
  {
    question: "How fast can you build my website?",
    answer: "We can deliver a fully functional website in as little as 24–48 hours, depending on your needs.",
    keywords: ["fast", "long", "time", "quick", "deliver", "turnaround", "when", "days"],
  },
  {
    question: "How much does it cost?",
    answer: "Our pricing starts at $100 for a basic site and scales based on complexity. Contact us for a free quote!",
    keywords: ["cost", "price", "pricing", "much", "cheap", "budget", "pay", "$", "quote", "rate"],
  },
  {
    question: "Do you offer support after launch?",
    answer: "Yes! We provide 30 days of free support to ensure your site runs smoothly.",
    keywords: ["support", "after", "launch", "maintenance", "help", "broken", "fix"],
  },
  {
    question: "Can you help with marketing too?",
    answer: "Absolutely—we offer SEO, social media, and ad services to grow your online presence.",
    keywords: ["marketing", "seo", "social", "ads", "advert", "google", "instagram", "grow"],
  },
  {
    question: "What if I need changes later?",
    answer: "We’re here for you! We can make updates or redesigns anytime—just email us.",
    keywords: ["change", "update", "edit", "later", "redesign", "modify"],
  },
]

export const portfolio = [
  { name: "Galleria by Johnny", url: "https://galleria-by-johnny.lovable.app/" },
  { name: "Pristine Gardens", url: "https://pristine-gardens.lovable.app/" },
]

export const socials = [
  { name: "Instagram", url: "https://www.instagram.com/pixelsmth_/" },
  { name: "X (Twitter)", url: "https://x.com/pxl_smth" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/kaje/" },
]

export const about =
  "At PixelSmith, we believe every small business deserves a website that shines. We’re a small team of digital craftsmen who use AI to build fast, stunning websites tailored to your needs—whether you’re a freelancer, local shop, or growing brand."

// Plain-text knowledge block handed to the AI model as its source of truth.
export function knowledgeText(): string {
  return [
    `# About PixelSmith\n${about}`,
    `# Services\n${services.map((s) => `- ${s.title}: ${s.description}`).join("\n")}`,
    `# FAQ\n${faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}`,
    `# Portfolio\n${portfolio.map((p) => `- ${p.name}: ${p.url}`).join("\n")}`,
    `# Contact\nEmail: ${CONTACT_EMAIL}\nWebsite: ${SITE_URL}\nContact form: ${SITE_URL}/contact\nFree website quiz: ${SITE_URL}/quiz\nSocials: ${socials
      .map((s) => `${s.name} ${s.url}`)
      .join(", ")}`,
  ].join("\n\n")
}
