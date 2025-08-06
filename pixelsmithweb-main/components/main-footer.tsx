import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

// Custom X icon component
function XIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default function MainFooter() {
  return (
    <footer className="w-full py-8 md:py-12 mt-16 bg-black/50 border-t border-green-700/50 relative z-10">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <div className="mb-6">
          <p className="text-green-400">Get in touch:</p>
          <a
            href="mailto:pixelsmithinfo@gmail.com"
            className="text-lg text-green-300 hover:text-accent transition-colors hover:text-glow"
          >
            pixelsmithinfo@gmail.com
          </a>
        </div>
        <div className="flex space-x-6 mb-6">
          <Link
            href="https://www.instagram.com/pixelsmth_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-accent transition-colors"
          >
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://x.com/pxl_smth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-accent transition-colors"
          >
            <XIcon size={24} />
            <span className="sr-only">X (Twitter)</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/kaje/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-accent transition-colors"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        <p className="text-sm text-green-600">&copy; {new Date().getFullYear()} Pixel Smith. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
