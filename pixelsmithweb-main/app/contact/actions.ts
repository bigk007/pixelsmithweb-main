"use server"

import { createServerClient } from "@/lib/supabase/server" // Ensure this path is correct

interface ContactFormData {
  name: string
  email: string
  businessType?: string
  budget?: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const supabase = createServerClient()

    // Validate data (basic example)
    if (!formData.name || !formData.email || !formData.message) {
      return { success: false, message: "Name, email, and message are required." }
    }

    const { data, error } = await supabase
      .from("contact_submissions") // Make sure this table exists
      .insert([
        {
          name: formData.name,
          email: formData.email,
          business_type: formData.businessType,
          budget: formData.budget,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      // Check for specific Supabase errors, e.g., if table doesn't exist
      if (error.message && error.message.includes('relation "contact_submissions" does not exist')) {
        return { success: false, message: "Database error: The contact submissions table is not set up." }
      }
      return { success: false, message: `Error submitting form: ${error.message || "Unknown database error"}` }
    }

    // console.log("Form submitted successfully:", data);
    return { success: true, message: "Thanks for reaching out! We’ll email you within 24 hours." }
  } catch (e: any) {
    console.error("Server action error:", e)
    return { success: false, message: `An unexpected error occurred: ${e.message}` }
  }
}
