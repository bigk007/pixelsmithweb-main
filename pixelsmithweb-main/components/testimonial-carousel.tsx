"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import StarRating from "./star-rating" // Assuming this component exists and is styled

const testimonials = [
  {
    id: 1,
    quote:
      "10/10, I couldn't believe how fast it was done! Pixel Smith transformed our outdated website into a modern masterpiece in just two weeks.",
    name: "Alex Johnson",
    company: "Innovate Tech",
    role: "CEO",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Working with Pixel Smith was the best decision we made for our rebrand. Their attention to detail and creative solutions exceeded our expectations.",
    name: "Sarah Williams",
    company: "Bloom Boutique",
    role: "Founder",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Our e-commerce sales increased by 45% within the first month after Pixel Smith redesigned our website. Their strategic approach to UX made all the difference.",
    name: "Michael Chen",
    company: "Urban Goods",
    role: "Marketing Director",
    rating: 4.5,
  },
]

export default function TestimonialCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollButtons, { passive: true })
      checkScrollButtons() // Initial check
      window.addEventListener("resize", checkScrollButtons)
      return () => {
        carousel.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    const scrollAmount = carouselRef.current.clientWidth * 0.9 // Scroll by 90% of visible width
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="w-full relative px-4 md:px-0">
      <div className="absolute top-1/2 -left-2 md:-left-8 transform -translate-y-1/2 z-20">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="p-2 rounded-full bg-black/50 border border-green-600 text-green-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-700 hover:text-white transition-colors button-glow"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 -right-2 md:-right-8 transform -translate-y-1/2 z-20">
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="p-2 rounded-full bg-black/50 border border-green-600 text-green-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-700 hover:text-white transition-colors button-glow"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 md:gap-8 pb-4 px-1"
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="min-w-[85vw] sm:min-w-[70vw] md:min-w-[400px] flex-shrink-0 snap-center border border-green-700 rounded-lg p-4 md:p-8 bg-black/70 hover:border-accent transition-colors"
          >
            <Quote className="text-accent mb-3 md:mb-4" size={24} />
            <p className="text-green-100 mb-4 md:mb-6 italic text-sm md:text-lg">"{testimonial.quote}"</p>
            <div className="border-t border-green-800 pt-3 md:pt-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-green-300 text-base md:text-lg">{testimonial.name}</p>
                <StarRating rating={testimonial.rating} size={16} />
              </div>
              <p className="text-green-400 text-xs md:text-sm">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
