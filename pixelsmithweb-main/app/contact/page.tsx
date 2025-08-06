"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitContactForm } from "./actions" // Server Action

export default function ContactPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    budget: "",
    message: "",
  })
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmissionError(null)
    startTransition(async () => {
      const result = await submitContactForm(formData)
      if (result.success) {
        // Redirect to thank you page on success
        router.push("/thank-you")
      } else {
        // Show error message if submission failed
        setSubmissionError(result.message)
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-green-50">
      <MainHeader />
      <main className="flex-grow flex flex-col items-center justify-center pt-20 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-10">
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-green-400 text-glow">
            Let's Build Your Dream Website
          </h1>
          <p className="text-base md:text-lg text-green-200 mb-8 md:mb-10 text-center px-2">
            Tell us about your project, and we'll get back to you within 24 hours.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6 bg-black/70 border border-green-700 p-4 md:p-8 rounded-lg"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-green-300 mb-1">
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-input text-foreground placeholder:text-muted-foreground focus:ring-accent"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-300 mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-input text-foreground placeholder:text-muted-foreground focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-green-300 mb-1">
                Business Type
              </label>
              <Select
                name="businessType"
                onValueChange={(value) => handleSelectChange("businessType", value)}
                value={formData.businessType}
              >
                <SelectTrigger className="w-full bg-input text-foreground focus:ring-accent">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="local_shop">Local Shop</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-green-300 mb-1">
                Budget
              </label>
              <Select
                name="budget"
                onValueChange={(value) => handleSelectChange("budget", value)}
                value={formData.budget}
              >
                <SelectTrigger className="w-full bg-input text-foreground focus:ring-accent">
                  <SelectValue placeholder="Select your budget" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  <SelectItem value="under_500">Under $500</SelectItem>
                  <SelectItem value="500_1000">$500 – $1,000</SelectItem>
                  <SelectItem value="1000_2000">$1,000 – $2,000</SelectItem>
                  <SelectItem value="over_2000">Over $2,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-green-300 mb-1">
                Message
              </label>
              <Textarea
                name="message"
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="bg-input text-foreground placeholder:text-muted-foreground focus:ring-accent"
                placeholder="Tell us about your project..."
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-accent text-white font-bold py-4 text-base md:text-lg transition-all duration-300 button-glow"
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
            {submissionError && <p className="mt-4 text-center text-sm text-red-400">{submissionError}</p>}
          </form>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
