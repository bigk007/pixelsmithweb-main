import { type NextRequest, NextResponse } from "next/server"
// Ensure you have a way to create Supabase server client
// This might be from '@supabase/ssr' or a custom utility
// For this example, assuming a utility function like the one in your project
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, businessName, answers, timestamp } = body

    // Basic validation
    if (!email || !answers || !answers.challenge || !answers.businessType || !answers.budget || !answers.goal) {
      return NextResponse.json({ error: "Email and all answers are required." }, { status: 400 })
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 })
    }

    const supabase = createServerClient() // Use your server client creation method

    // Data to insert into Supabase
    const { data, error } = await supabase
      .from("quiz_results") // Make sure this table name matches your Supabase table
      .insert([
        {
          email,
          business_name: businessName || null, // Handle optional field
          challenge: answers.challenge,
          business_type: answers.businessType,
          budget: answers.budget,
          goal: answers.goal,
          submitted_at: timestamp || new Date().toISOString(), // Use provided timestamp or current time
        },
      ])
      .select() // Optionally select the inserted data

    if (error) {
      console.error("Supabase Insert Error:", error)
      // Provide a more specific error if possible, or a generic one
      let errorMessage = "Failed to save quiz results due to a database error."
      if (error.message.includes("duplicate key value violates unique constraint")) {
        errorMessage = "This email has already submitted the quiz."
      } else if (error.message.includes("quiz_results_email_check")) {
        errorMessage = "Invalid email format according to database constraint."
      }
      return NextResponse.json({ error: errorMessage, details: error.message }, { status: 500 })
    }

    // Placeholder: Here you might trigger an email to the user with their results
    // e.g., await sendQuizResultsEmail(email, answers, data[0]);

    return NextResponse.json({
      success: true,
      message: "Quiz results saved successfully!",
      data: data ? data[0] : null, // Return the first inserted record if available
    })
  } catch (e: any) {
    console.error("API Route Error:", e)
    return NextResponse.json(
      { error: "An unexpected error occurred on the server.", details: e.message },
      { status: 500 },
    )
  }
}
