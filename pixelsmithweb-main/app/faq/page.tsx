import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How fast can you build my website?",
    answer: "We can deliver a fully functional website in as little as 24–48 hours, depending on your needs.",
  },
  {
    question: "How much does it cost?",
    answer: "Our pricing starts at $100 for a basic site and scales based on complexity. Contact us for a free quote!",
  },
  {
    question: "Do you offer support after launch?",
    answer: "Yes! We provide 30 days of free support to ensure your site runs smoothly.",
  },
  {
    question: "Can you help with marketing too?",
    answer: "Absolutely—we offer SEO, social media, and ad services to grow your online presence.",
  },
  {
    question: "What if I need changes later?",
    answer: "We’re here for you! We can make updates or redesigns anytime—just email us.",
  },
]

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400 text-glow animate-fade-in">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-green-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Got questions? We’ve got answers.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-black/70 border border-green-700 rounded-lg px-2 hover:border-accent transition-colors"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl text-green-300 hover:text-accent p-4 focus:text-accent focus:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-green-100 p-4 pt-0 text-base">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="text-green-200">
              Still have questions? Email us at{" "}
              <a href="mailto:pixelsmithinfo@gmail.com" className="text-accent hover:underline hover:text-glow">
                pixelsmithinfo@gmail.com
              </a>
              !
            </p>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
