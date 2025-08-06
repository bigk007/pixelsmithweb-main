"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Download, Calendar, Menu, DoorClosedIcon as CloseIcon } from "lucide-react"
import { Button } from "@/components/ui/button" // Assuming shadcn/ui Button
import { Input } from "@/components/ui/input" // Assuming shadcn/ui Input
import Link from "next/link"

// Types for quiz data
interface QuizAnswers {
  challenge: string
  businessType: string
  budget: string
  goal: string
}

interface QuizState {
  currentStep: "landing" | "quiz" | "results"
  currentQuestion: number // 0-indexed for questions, quizQuestions.length for email form
  answers: QuizAnswers
  email: string
  businessName: string
  isSubmitting: boolean
  error: string
}

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    key: "challenge" as keyof QuizAnswers,
    question: "What's your biggest website challenge?",
    options: [
      { value: "slow-loading", label: "Slow loading" },
      { value: "outdated-design", label: "Outdated design" },
      { value: "low-traffic", label: "Low traffic" },
      { value: "other-challenge", label: "Other" },
    ],
  },
  {
    id: 2,
    key: "businessType" as keyof QuizAnswers,
    question: "What's your business type?",
    options: [
      { value: "freelancer", label: "Freelancer" },
      { value: "small-business", label: "Small business" },
      { value: "startup", label: "Startup" },
      { value: "other-business", label: "Other" },
    ],
  },
  {
    id: 3,
    key: "budget" as keyof QuizAnswers,
    question: "What's your monthly marketing budget?",
    options: [
      { value: "0-500", label: "$0-$500" },
      { value: "500-2000", label: "$500-$2,000" },
      { value: "2000+", label: "$2,000+" },
    ],
  },
  {
    id: 4,
    key: "goal" as keyof QuizAnswers,
    question: "What's your top goal?",
    options: [
      { value: "more-leads", label: "More leads" },
      { value: "better-branding", label: "Better branding" },
      { value: "ecommerce-sales", label: "E-commerce sales" },
    ],
  },
]

export default function QuizFunnel() {
  // State management for the quiz funnel
  const [state, setState] = useState<QuizState>({
    currentStep: "landing",
    currentQuestion: 0,
    answers: {
      challenge: "",
      businessType: "",
      budget: "",
      goal: "",
    },
    email: "",
    businessName: "",
    isSubmitting: false,
    error: "",
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // Ensure component is mounted before animations or client-side logic
  }, [])

  // Analytics tracking function (placeholder for Google Analytics)
  const trackEvent = (eventName: string, properties?: any) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventName, {
        event_category: "Quiz Funnel",
        ...properties,
      })
    }
    // console.log("Analytics Event:", eventName, properties); // For debugging
  }

  // Handler to start the quiz
  const startQuiz = () => {
    setState((prev) => ({ ...prev, currentStep: "quiz", currentQuestion: 0 }))
    trackEvent("quiz_started")
  }

  // Handler for selecting an answer
  const handleAnswerChange = (questionKey: keyof QuizAnswers, value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionKey]: value },
      error: "", // Clear error on new selection
    }))
  }

  // Get current answer value based on current question index
  const getCurrentAnswer = () => {
    if (state.currentQuestion < quizQuestions.length) {
      const currentQuestionKey = quizQuestions[state.currentQuestion].key
      return state.answers[currentQuestionKey]
    }
    return null
  }

  // Handler to navigate to the next question or email capture
  const nextQuestion = () => {
    const currentAnswerSelected = getCurrentAnswer()
    if (!currentAnswerSelected) {
      setState((prev) => ({ ...prev, error: "Please select an answer to continue." }))
      return
    }

    setState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      error: "",
    }))
  }

  // Handler to navigate to the previous question
  const prevQuestion = () => {
    if (state.currentQuestion > 0) {
      setState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion - 1, error: "" }))
    }
  }

  // Handler to submit quiz results (email and answers)
  const submitQuiz = async () => {
    if (!state.email.trim()) {
      setState((prev) => ({ ...prev, error: "Please fill in your email!" }))
      return
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(state.email)) {
      setState((prev) => ({ ...prev, error: "Please enter a valid email address." }))
      return
    }

    setState((prev) => ({ ...prev, isSubmitting: true, error: "" }))

    try {
      // Supabase integration: POST quiz data to API endpoint
      const response = await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          businessName: state.businessName,
          answers: state.answers,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setState((prev) => ({ ...prev, currentStep: "results", isSubmitting: false }))
        trackEvent("quiz_completed", { email_provided: true })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit quiz results.")
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message || "Something went wrong. Please try again.",
        isSubmitting: false,
      }))
      trackEvent("quiz_submission_error", { error_message: error.message })
    }
  }

  // Function to generate personalized results based on quiz answers
  const getPersonalizedResults = () => {
    const { challenge, budget, goal } = state.answers
    let mainRecommendation = "Your business has unique needs, and we can help you address them effectively!"
    const recommendations = [
      "A professional website tailored to your brand.",
      "SEO strategies to increase online visibility.",
      "Engaging content to attract and retain customers.",
    ]

    if (challenge === "outdated-design") {
      mainRecommendation = "A modern website redesign will significantly boost your brand image and user engagement!"
      recommendations.unshift("Visually stunning and user-friendly redesign.")
    } else if (challenge === "low-traffic") {
      mainRecommendation =
        "Targeted digital marketing and SEO can dramatically increase your website traffic and leads."
      recommendations.unshift("Comprehensive SEO audit and optimization.")
    }

    if (goal === "more-leads") {
      recommendations.push("Conversion-optimized landing pages and lead magnets.")
    } else if (goal === "ecommerce-sales") {
      recommendations.push("Robust e-commerce platform integration and optimization.")
    }

    if (budget === "2000+") {
      recommendations.push("Advanced marketing automation and analytics.")
    }

    return { mainRecommendation, recommendations: recommendations.slice(0, 3) } // Show top 3
  }

  // Navigation component for header
  const Navigation = () => (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-opacity-50 bg-[#1A1A1A] md:bg-transparent">
      <Link
        href="/"
        className="font-mono text-xl md:text-2xl font-bold text-white hover:text-[#2E7D32] transition-colors"
      >
        PixelSmith
      </Link>
      <div className="hidden md:flex space-x-6">
        {["Home", "Services", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
            className="text-white hover:text-[#2E7D32] transition-colors font-sans"
          >
            {item}
          </Link>
        ))}
      </div>
      <button
        className="md:hidden text-white z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
      </button>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col items-center justify-center md:hidden">
          {["Home", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="text-white text-2xl font-sans py-4 hover:text-[#2E7D32] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )

  // Conditional rendering based on currentStep
  // Landing Page
  if (state.currentStep === "landing") {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-white relative overflow-hidden font-sans">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' x='0' y='0' fill='%232E7D32'/%3E%3C/svg%3E")`,
            backgroundSize: "5px 5px",
          }}
        />
        <Navigation />
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 pt-24 lg:pt-0">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-10">
            <h1
              className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Discover Your Website's Growth Potential in 2 Minutes!
            </h1>
            <p className="text-lg md:text-xl text-[#B0BEC5] mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              Take our free quiz to get a personalized plan for your business.
            </p>
            <Button
              onClick={startQuiz}
              className="bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-3 px-10 rounded-md text-xl transition-all duration-300 w-[200px] h-[50px] animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              Start the Quiz
            </Button>
            <div
              className="mt-8 flex flex-col items-center lg:items-start animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <p className="text-[#B0BEC5] text-sm mb-1">Trusted by 50+ small businesses</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
            </div>
          </div>
          <div
            className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            {/* Placeholder for modern website mockup */}
            <div className="w-full max-w-md h-64 md:h-80 bg-gray-800/30 border border-gray-700 rounded-lg p-2 transform lg:rotate-3 shadow-xl flex items-center justify-center">
              <p className="text-gray-500 font-mono text-center">
                Modern Website Mockup <br /> (Laptop Screen)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Interface
  if (state.currentStep === "quiz") {
    const isEmailCaptureStep = state.currentQuestion >= quizQuestions.length
    const progressPercentage = isEmailCaptureStep ? 100 : (state.currentQuestion / quizQuestions.length) * 100

    return (
      <div className="min-h-screen bg-[#1A1A1A] text-black flex items-center justify-center p-4 font-sans">
        <div
          className={`bg-white rounded-lg shadow-2xl w-full max-w-xl p-6 md:p-8 transition-opacity duration-300 ease-in-out ${isMounted ? "opacity-100" : "opacity-0"}`}
        >
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E7D32] transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-right mt-1 font-mono">
              {isEmailCaptureStep ? "Final Step" : `Question ${state.currentQuestion + 1} of ${quizQuestions.length}`}
            </p>
          </div>

          {/* Question or Email Form */}
          {isEmailCaptureStep ? (
            // Email Capture Form
            <div className="animate-fade-in">
              <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4 text-center">Get Your Personalized Plan!</h2>
              <p className="text-[#B0BEC5] text-center mb-6">We'll send your personalized report to your email.</p>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={state.email}
                  onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value, error: "" }))}
                  aria-label="Email address"
                  className="w-full p-3 border-gray-300 rounded-md focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                />
                <Input
                  type="text"
                  placeholder="Business Name (Optional)"
                  value={state.businessName}
                  onChange={(e) => setState((prev) => ({ ...prev, businessName: e.target.value }))}
                  aria-label="Business Name"
                  className="w-full p-3 border-gray-300 rounded-md focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                />
              </div>
              {state.error && <p className="text-red-500 text-sm mt-2 text-center">{state.error}</p>}
              <Button
                onClick={submitQuiz}
                disabled={state.isSubmitting}
                className="w-full bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-3 mt-6 rounded-md text-lg h-[50px]"
              >
                {state.isSubmitting ? "Submitting..." : "Get Your Results"}
              </Button>
            </div>
          ) : (
            // Quiz Question
            <div className="animate-fade-in">
              <h2 className="font-mono text-xl md:text-2xl font-bold mb-6">
                {quizQuestions[state.currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {quizQuestions[state.currentQuestion].options.map((option) => {
                  const questionKey = quizQuestions[state.currentQuestion].key
                  const isSelected = state.answers[questionKey] === option.value
                  return (
                    <label
                      key={option.value}
                      className={`flex items-center p-3 border-2 rounded-md cursor-pointer transition-all duration-200 ${
                        isSelected ? "border-[#2E7D32] bg-green-500/10" : "border-gray-300 hover:border-[#2E7D32]/50"
                      }`}
                      htmlFor={`option-${option.value}`}
                    >
                      <input
                        type="radio"
                        id={`option-${option.value}`}
                        name={`question-${state.currentQuestion}`}
                        value={option.value}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(questionKey, option.value)}
                        className="sr-only" // Visually hidden, but accessible
                        aria-labelledby={`label-${option.value}`}
                      />
                      <span
                        className={`w-5 h-5 mr-3 border-2 rounded-full flex items-center justify-center ${isSelected ? "border-[#2E7D32]" : "border-gray-400"}`}
                      >
                        {isSelected && <span className="w-2.5 h-2.5 bg-[#2E7D32] rounded-full"></span>}
                      </span>
                      <span id={`label-${option.value}`} className="text-base md:text-lg">
                        {option.label}
                      </span>
                    </label>
                  )
                })}
              </div>
              {state.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevQuestion}
              disabled={state.currentQuestion === 0 && !isEmailCaptureStep}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-mono py-2 px-6 rounded-md h-[44px]"
              variant="outline"
            >
              <ChevronLeft size={18} className="mr-1" /> Back
            </Button>
            {!isEmailCaptureStep && (
              <Button
                onClick={nextQuestion}
                className="bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-2 px-6 rounded-md h-[44px]"
              >
                {state.currentQuestion === quizQuestions.length - 1 ? "See Results Form" : "Next"}{" "}
                <ChevronRight size={18} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Results Page
  if (state.currentStep === "results") {
    const { mainRecommendation, recommendations } = getPersonalizedResults()
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-black flex items-center justify-center p-4 font-sans">
        <div
          className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 md:p-8 text-center transition-opacity duration-300 ease-in-out ${isMounted ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">Your Website Growth Plan</h2>
          <div
            className="text-left bg-gray-50 p-6 rounded-md mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-lg md:text-xl text-gray-700 mb-4">{mainRecommendation}</p>
            <h3 className="font-mono text-lg font-semibold mb-2">Key Recommendations:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
          <div
            className="space-y-4 md:space-y-0 md:flex md:space-x-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              onClick={() => {
                trackEvent("consultation_cta_clicked")
                // Add link to consultation booking page or Calendly
                window.open("/contact", "_self")
              }}
              className="w-full md:w-auto bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-3 px-6 rounded-md text-lg h-[50px]"
            >
              <Calendar size={20} className="mr-2" /> Book a Free Consultation
            </Button>
            <Button
              onClick={() => {
                trackEvent("download_report_cta_clicked")
                // Placeholder for PDF download logic
                alert("PDF Download functionality coming soon!")
              }}
              className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-mono py-3 px-6 rounded-md text-lg h-[50px]"
              variant="outline"
            >
              <Download size={20} className="mr-2" /> Download Your Report
            </Button>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <p className="text-[#B0BEC5] text-sm mb-1">Trusted by 50+ small businesses</p>
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null // Should not happen if logic is correct
}
