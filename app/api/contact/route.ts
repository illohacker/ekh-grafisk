import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch (e) {
    console.error("Telegram error:", e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, file_url, file_name } = body;

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
      file_url: file_url || null,
      file_name: file_name || null,
      status: "new",
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save contact" },
        { status: 500 }
      );
    }

    // Send Telegram notification
    const tgLines = [
      `<b>Ny lead fra nettsiden!</b>`,
      ``,
      `<b>Navn:</b> ${name}`,
      company ? `<b>Bedrift:</b> ${company}` : "",
      `<b>E-post:</b> ${email}`,
      phone ? `<b>Telefon:</b> ${phone}` : "",
      ``,
      `<b>Melding:</b>`,
      message,
      file_name ? `\n<b>Vedlegg:</b> ${file_name}` : "",
      ``,
      `<a href="https://ekh-grafisk.vercel.app/dashboard">Apne dashboard</a>`,
    ].filter(Boolean).join("\n");

    await sendTelegram(tgLines);

    // Send notification email (optional)
    if (process.env.RESEND_API_KEY) {
      try {
        const { getResend } = await import("@/lib/resend");
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
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
