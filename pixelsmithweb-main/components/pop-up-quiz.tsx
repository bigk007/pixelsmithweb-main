"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star, Download, Calendar, DoorClosedIcon as CloseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Types (can be shared if QuizFunnel is also kept or moved to a types file)
interface QuizAnswers {
  challenge: string
  businessType: string
  budget: string
  goal: string
}

interface PopUpQuizState {
  isOpen: boolean
  currentStep: "landing" | "quiz" | "results"
  currentQuestion: number
  answers: QuizAnswers
  email: string
  businessName: string
  isSubmitting: boolean
  error: string
  hasBeenTriggered: boolean // To ensure it only triggers once per session or based on localStorage
}

// Quiz questions data (same as before)
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

interface PopUpQuizProps {
  triggerDelay?: number // in milliseconds, e.g., 5000 for 5 seconds
  showOnLoad?: boolean
}

export default function PopUpQuiz({ triggerDelay = 5000, showOnLoad = true }: PopUpQuizProps) {
  const [state, setState] = useState<PopUpQuizState>({
    isOpen: false,
    currentStep: "landing",
    currentQuestion: 0,
    answers: { challenge: "", businessType: "", budget: "", goal: "" },
    email: "",
    businessName: "",
    isSubmitting: false,
    error: "",
    hasBeenTriggered: false,
  })

  // Trigger logic
  useEffect(() => {
    if (!showOnLoad || state.hasBeenTriggered) return

    // Optional: Check localStorage to prevent showing again if already interacted with
    const quizInteracted = localStorage.getItem("pixelSmithQuizInteracted")
    if (quizInteracted) {
      setState((prev) => ({ ...prev, hasBeenTriggered: true }))
      return
    }

    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, isOpen: true, hasBeenTriggered: true }))
      trackEvent("popup_quiz_shown")
    }, triggerDelay)

    return () => clearTimeout(timer)
  }, [triggerDelay, showOnLoad, state.hasBeenTriggered])

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
    localStorage.setItem("pixelSmithQuizInteracted", "true") // Mark as interacted
    trackEvent("popup_quiz_closed")
  }, [])

  // Reset quiz to initial landing state if user reopens (if applicable) or for internal reset
  const resetQuizState = () => {
    setState((prev) => ({
      ...prev,
      currentStep: "landing",
      currentQuestion: 0,
      answers: { challenge: "", businessType: "", budget: "", goal: "" },
      email: "",
      businessName: "",
      isSubmitting: false,
      error: "",
    }))
  }

  const openModal = () => {
    resetQuizState() // Reset to landing step when opening
    setState((prev) => ({ ...prev, isOpen: true }))
    trackEvent("popup_quiz_opened_manually") // If you add a manual trigger
  }

  // Analytics tracking (placeholder) - same as before
  const trackEvent = (eventName: string, properties?: any) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventName, { event_category: "PopUp Quiz", ...properties })
    }
    // console.log("PopUp Quiz Analytics:", eventName, properties)
  }

  // Quiz logic handlers (adapted from QuizFunnel)
  const startQuizFlow = () => {
    setState((prev) => ({ ...prev, currentStep: "quiz", currentQuestion: 0 }))
    trackEvent("popup_quiz_started")
  }

  const handleAnswerChange = (questionKey: keyof QuizAnswers, value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionKey]: value },
      error: "",
    }))
  }

  const getCurrentAnswer = () => {
    if (state.currentQuestion < quizQuestions.length) {
      const currentQuestionKey = quizQuestions[state.currentQuestion].key
      return state.answers[currentQuestionKey]
    }
    return null
  }

  const nextQuestion = () => {
    const currentAnswerSelected = getCurrentAnswer()
    if (!currentAnswerSelected) {
      setState((prev) => ({ ...prev, error: "Please select an answer." }))
      return
    }
    setState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1, error: "" }))
  }

  const prevQuestion = () => {
    if (state.currentQuestion > 0) {
      setState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion - 1, error: "" }))
    }
  }

  const submitQuizData = async () => {
    if (!state.email.trim()) {
      setState((prev) => ({ ...prev, error: "Please provide your email." }))
      return
    }
    if (!/\S+@\S+\.\S+/.test(state.email)) {
      setState((prev) => ({ ...prev, error: "Please enter a valid email." }))
      return
    }
    setState((prev) => ({ ...prev, isSubmitting: true, error: "" }))
    try {
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
        trackEvent("popup_quiz_completed", { email_provided: true })
        localStorage.setItem("pixelSmithQuizInteracted", "true") // Mark as completed
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Submission failed.")
      }
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, isSubmitting: false }))
      trackEvent("popup_quiz_submission_error", { error_message: error.message })
    }
  }

  const getPersonalizedResults = () => {
    // Same logic as QuizFunnel
    const { challenge, budget, goal } = state.answers
    let mainRec = "Your business has unique needs we can help with!"
    const recs = ["Custom website design", "SEO optimization", "Targeted marketing"]
    if (challenge === "outdated-design") mainRec = "A modern redesign will boost your brand!"
    if (goal === "ecommerce-sales") recs.push("E-commerce solutions")
    return { mainRecommendation: mainRec, recommendations: recs.slice(0, 3) }
  }

  if (!state.isOpen) {
    return null // Don't render anything if pop-up is closed
  }

  // Pop-up Modal Structure
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-popup-title"
    >
      <div className="bg-[#1A1A1A] text-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative border border-[#2E7D32]/50">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-gray-700/50" // Added some padding and hover bg for better UX
          aria-label="Close quiz"
        >
          <CloseIcon size={24} /> {/* Adjusted size slightly if needed, 28 might be too large for an X */}
        </button>

        {/* Landing Step */}
        {state.currentStep === "landing" && (
          <div className="p-6 md:p-8 text-center">
            <div
              className="absolute inset-0 opacity-[0.02] z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' x='0' y='0' fill='%232E7D32'/%3E%3C/svg%3E")`,
                backgroundSize: "5px 5px",
              }}
            />
            <div className="relative z-[1]">
              <h2 id="quiz-popup-title" className="font-mono text-2xl md:text-3xl font-bold mb-3 text-green-400">
                Unlock Your Website's Potential!
              </h2>
              <p className="text-[#B0BEC5] mb-6 text-sm md:text-base">
                Take our quick 2-minute quiz for a FREE personalized action plan.
              </p>
              <Button
                onClick={startQuizFlow}
                className="bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-3 px-8 rounded-md text-lg w-full md:w-auto h-[50px]"
              >
                Start the Quiz
              </Button>
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Trusted by 50+ businesses</p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Steps (Questions & Email Capture) */}
        {state.currentStep === "quiz" && (
          <div className="p-6 md:p-8">
            {/* Progress Bar */}
            <div className="mb-5">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2E7D32] transition-all duration-300 ease-out"
                  style={{
                    width: `${state.currentQuestion >= quizQuestions.length ? 100 : (state.currentQuestion / quizQuestions.length) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 text-right mt-1 font-mono">
                {state.currentQuestion >= quizQuestions.length
                  ? "Final Step"
                  : `Question ${state.currentQuestion + 1}/${quizQuestions.length}`}
              </p>
            </div>

            {state.currentQuestion < quizQuestions.length ? (
              // Display Question
              <div className="animate-fade-in">
                <h3 className="font-mono text-lg md:text-xl font-semibold mb-4 text-green-300">
                  {quizQuestions[state.currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {quizQuestions[state.currentQuestion].options.map((option) => {
                    const questionKey = quizQuestions[state.currentQuestion].key
                    const isSelected = state.answers[questionKey] === option.value
                    return (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 border-2 rounded-md cursor-pointer transition-all duration-200 ${
                          isSelected ? "border-[#2E7D32] bg-[#2E7D32]/20" : "border-gray-600 hover:border-[#2E7D32]/70"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${state.currentQuestion}`}
                          value={option.value}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(questionKey, option.value)}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 mr-3 border-2 rounded-full flex items-center justify-center ${isSelected ? "border-[#2E7D32]" : "border-gray-400"}`}
                        >
                          {isSelected && <span className="w-2 h-2 bg-[#2E7D32] rounded-full"></span>}
                        </span>
                        <span className="text-sm md:text-base text-gray-200">{option.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ) : (
              // Email Capture Form
              <div className="animate-fade-in text-center">
                <h3 className="font-mono text-xl md:text-2xl font-bold mb-3 text-green-300">Almost there!</h3>
                <p className="text-[#B0BEC5] mb-5 text-sm md:text-base">
                  Enter your email to get your personalized plan.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={state.email}
                    onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value, error: "" }))}
                    className="w-full p-3 bg-gray-800 border-gray-600 text-white rounded-md focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                  />
                  <Input
                    type="text"
                    placeholder="Business Name (Optional)"
                    value={state.businessName}
                    onChange={(e) => setState((prev) => ({ ...prev, businessName: e.target.value }))}
                    className="w-full p-3 bg-gray-800 border-gray-600 text-white rounded-md focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                  />
                </div>
              </div>
            )}

            {state.error && <p className="text-red-400 text-xs mt-3 text-center">{state.error}</p>}

            {/* Navigation Buttons for Quiz/Email */}
            <div className="flex justify-between mt-6">
              <Button
                onClick={prevQuestion}
                disabled={state.currentQuestion === 0}
                className="bg-gray-600 hover:bg-gray-500 text-white font-mono py-2 px-5 rounded-md text-sm h-[44px]"
                variant="outline"
              >
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              {state.currentQuestion < quizQuestions.length ? (
                <Button
                  onClick={nextQuestion}
                  className="bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-2 px-5 rounded-md text-sm h-[44px]"
                >
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={submitQuizData}
                  disabled={state.isSubmitting}
                  className="bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-2 px-5 rounded-md text-sm h-[44px]"
                >
                  {state.isSubmitting ? "Sending..." : "Get My Plan"}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Results Step */}
        {state.currentStep === "results" && (
          <div className="p-6 md:p-8 text-center animate-fade-in">
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4 text-green-400">Your Personalized Plan!</h2>
            <div className="text-left bg-gray-800/50 p-4 rounded-md mb-5 border border-gray-700">
              <p className="text-base md:text-lg text-gray-200 mb-3">{getPersonalizedResults().mainRecommendation}</p>
              <h4 className="font-mono text-sm font-semibold mb-1 text-green-300">Key Focus Areas:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-300">
                {getPersonalizedResults().recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-gray-400 mb-4">A detailed report has been sent to {state.email}.</p>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  trackEvent("popup_consultation_cta_clicked")
                  window.open("/contact", "_blank") // Open contact page in new tab
                  closeModal()
                }}
                className="w-full bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-mono py-3 rounded-md text-base h-[50px]"
              >
                <Calendar size={18} className="mr-2" /> Book Free Consultation
              </Button>
              <Button
                onClick={() => {
                  trackEvent("popup_download_report_cta_clicked")
                  alert("Report download coming soon!") // Placeholder
                }}
                className="w-full bg-gray-600 hover:bg-gray-500 text-white font-mono py-3 rounded-md text-base h-[50px]"
                variant="outline"
              >
                <Download size={18} className="mr-2" /> Download Summary (PDF)
              </Button>
            </div>
            <button onClick={closeModal} className="text-xs text-gray-500 hover:text-gray-300 mt-4 underline">
              No thanks, close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
