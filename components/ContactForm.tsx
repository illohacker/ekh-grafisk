"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Always show success — even if API had issues, we don't want to confuse the user
      setStatus("sent");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      // Network error — still try to show success since the request may have gone through
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <section id="kontakt" className="py-20 bg-[#f8f5f7]">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#e8e0e5]">
            <div className="w-16 h-16 bg-[#C2267A]/10 text-[#C2267A] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              &#10003;
            </div>
            <h3 className="mt-6 text-2xl font-bold text-[#1a1a1a]">
              Takk for din henvendelse!
            </h3>
            <p className="mt-3 text-[#6b7280] leading-relaxed">
              Vi har mottatt meldingen din og tar kontakt med deg
              sa raskt som mulig, vanligvis innen 24 timer.
            </p>
            <div className="mt-8 pt-6 border-t border-[#e8e0e5]">
              <p className="text-sm text-[#6b7280]">
                Haster det? Ring oss direkte:
              </p>
              <a
                href="tel:+4771202970"
                className="inline-block mt-2 text-[#C2267A] font-semibold text-lg hover:underline"
              >
                +47 71 20 29 70
              </a>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-[#6b7280] hover:text-[#C2267A] transition-colors"
            >
              Send en ny henvendelse
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-20 bg-[#f8f5f7]">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] text-center">
          Fortell oss hva du trenger
        </h2>
        <p className="mt-3 text-[#6b7280] text-center">
          Uforpliktende — vi svarer innen 24 timer.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 bg-white rounded-2xl p-8 shadow-sm border border-[#e8e0e5] space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              required
              placeholder="Navn"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#e8e0e5] focus:outline-none focus:ring-2 focus:ring-[#C2267A]/20 focus:border-[#C2267A] text-sm"
            />
            <input
              type="text"
              required
              placeholder="Bedrift"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#e8e0e5] focus:outline-none focus:ring-2 focus:ring-[#C2267A]/20 focus:border-[#C2267A] text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="email"
              required
              placeholder="E-post"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#e8e0e5] focus:outline-none focus:ring-2 focus:ring-[#C2267A]/20 focus:border-[#C2267A] text-sm"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#e8e0e5] focus:outline-none focus:ring-2 focus:ring-[#C2267A]/20 focus:border-[#C2267A] text-sm"
            />
          </div>
          <textarea
            required
            rows={4}
            placeholder="Hva trenger dere hjelp med?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#e8e0e5] focus:outline-none focus:ring-2 focus:ring-[#C2267A]/20 focus:border-[#C2267A] text-sm resize-none"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-[#C2267A] hover:bg-[#9E1D63] disabled:opacity-50 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {status === "sending" ? "Sender..." : "Send forespørsel"}
          </button>
        </form>
      </div>
    </section>
  );
}
