import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PortfolioPage() {
  const workItems = [
    {
      id: 1,
      title: "The Cozy Corner Cafe",
      imagePlaceholder: "Sample Site Coming Soon",
      description: "A charming website for a local cafe, featuring online ordering and an events calendar.",
    },
    {
      id: 2,
      title: "Jane Doe - Freelance Writer",
      imagePlaceholder: "Sample Site Coming Soon",
      description:
        "A sleek portfolio site showcasing writing samples and client testimonials for a freelance professional.",
    },
    {
      id: 3,
      title: "Tech Innovators Inc.",
      imagePlaceholder: "Sample Site Coming Soon",
      description: "A modern corporate site for a startup, highlighting their services and team.",
    },
    {
      id: 4,
      title: "Artisan Goods E-Shop",
      imagePlaceholder: "Sample Site Coming Soon",
      description: "An e-commerce platform for handcrafted goods with a focus on beautiful product presentation.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center pt-24 md:pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="w-full max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-green-400 text-glow">Our Portfolio</h1>
          <p className="text-lg text-green-200 mb-12 max-w-2xl mx-auto">
            Here are some examples of the digital experiences we've crafted for our clients. Each project is tailored to
            meet unique business goals and brand identities.
          </p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {workItems.map((item) => (
              <div
                key={item.id}
                className="bg-black/70 border border-green-700 p-6 rounded-lg flex flex-col items-center justify-between hover:border-accent transition-colors group"
              >
                <div className="w-full h-48 bg-black flex items-center justify-center mb-4 border border-dashed border-green-600 rounded group-hover:border-accent/70">
                  <p className="text-green-500 text-lg">{item.imagePlaceholder}</p>
                </div>
                <h2 className="text-2xl font-semibold text-green-300 mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h2>
                <p className="text-green-100 text-sm mb-4 flex-grow">{item.description}</p>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-700 hover:text-white transition-colors button-glow w-full group-hover:border-accent group-hover:text-accent"
                >
                  View Project (Coming Soon)
                </Button>
              </div>
            ))}
          </div>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 button-glow"
            >
              Start Your Project
            </Button>
          </Link>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
