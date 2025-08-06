import Link from "next/link"
import Image from "next/image"
import LiveClock from "./live-clock"
import { Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function MainHeader() {
  const menuItems = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/faq", label: "FAQs" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 md:p-6 bg-black/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center space-x-2 group">
        <div className="relative h-8 w-8 md:h-12 md:w-12 group-hover:animate-pulse">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pixelated%20Hammer%20and%20Mouse%20Cursor%20Logo-cQ6l991ccvXyj1QaZFGiu9vquCVMl8.png"
            alt="Pixel Smith Logo"
            fill
            className="object-contain invert"
          />
        </div>
        <h1 className="text-lg md:text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors text-glow">
          Pixel Smith
        </h1>
      </Link>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="hidden sm:block">
          <LiveClock />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-green-700 bg-black/50 text-green-400 hover:bg-green-700 hover:text-white hover:border-accent button-glow h-10 w-10"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black border-green-700 text-green-300 w-48 shadow-lg shadow-green-900/50"
          >
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild className="focus:bg-green-800 focus:text-accent">
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-base hover:text-accent hover:text-glow transition-colors"
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
