import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // In a real application, you would send this data to an email service
    // or store it in a database. For now, we'll just log it.
    console.log("Contact form submission:", { name, email, subject, message })

    // Here you would typically integrate with an email service like SendGrid, Mailchimp, etc.

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { success: false, message: "There was an error submitting your message." },
      { status: 500 },
    )
  }
}
