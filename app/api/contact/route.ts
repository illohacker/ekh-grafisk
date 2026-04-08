import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

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
    const supabase = getSupabase();
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      message,
      status: "new",
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
    }

    // Send notification email
    try {
      await resend.emails.send({
        from: "EKH Grafisk <onboarding@resend.dev>",
        to: "info@ekhgrafisk.com",
        subject: `Nuevo presupuesto de ${name}${company ? ` (${company})` : ""}`,
        html: `
          <h2>Nuevo contacto desde la web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
          ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}
          <p><strong>Mensaje:</strong></p>
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
