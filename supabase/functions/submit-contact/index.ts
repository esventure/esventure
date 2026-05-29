import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, projectPlan } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email) {
      console.error("Missing required fields:", { firstName: !!firstName, lastName: !!lastName, email: !!email });
      return new Response(
        JSON.stringify({ error: "First name, last name, and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Type + length validation
    const isStr = (v: unknown): v is string => typeof v === "string";
    if (!isStr(firstName) || !isStr(lastName) || !isStr(email) ||
        (phone != null && !isStr(phone)) || (projectPlan != null && !isStr(projectPlan))) {
      return new Response(
        JSON.stringify({ error: "Invalid field types" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (firstName.length > 100 || lastName.length > 100 || email.length > 255 ||
        (phone && phone.length > 50) || (projectPlan && projectPlan.length > 10000)) {
      return new Response(
        JSON.stringify({ error: "Input too long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format");
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert contact submission
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        project_plan: projectPlan || null,
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save contact" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Contact submission saved");

    // Escape HTML to prevent injection in admin email
    const escHtml = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

    // Send email notification
    try {
      const { error: emailError } = await resend.emails.send({
        from: "ES Venture <esther@esventure.nl>",
        to: ["esther@esventure.nl"],
        subject: `New Lead: ${escHtml(firstName)} ${escHtml(lastName)}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escHtml(firstName)} ${escHtml(lastName)}</p>
          <p><strong>Email:</strong> ${escHtml(email)}</p>
          <p><strong>Phone:</strong> ${phone ? escHtml(phone) : "Not provided"}</p>
          ${projectPlan ? `<h3>Project Plan Context:</h3><pre style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 8px;">${escHtml(projectPlan)}</pre>` : ""}
        `,
      });


      if (emailError) {
        console.error("Email send error:", emailError);
      } else {
        console.log("Email notification sent successfully");
      }
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
