import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Save lead to Supabase
    try {
      const supabase = getSupabase();
      await supabase.from("leads").insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
        status: "new",
      });
    } catch (dbError) {
      console.error("Supabase error:", dbError);
    }

    // Send notification email
    try {
      const resend = getResend();
      await resend.emails.send({
        from: "EKH Grafisk <onboarding@resend.dev>",
        to: "post@ekh.no",
        subject: `Ny henvendelse fra ${name}${company ? ` (${company})` : ""}`,
        html: `
          <h2>Ny henvendelse fra nettsiden</h2>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
          ${company ? `<p><strong>Bedrift:</strong> ${company}</p>` : ""}
          <p><strong>Melding:</strong></p>
          <p>${message}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
