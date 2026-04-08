"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section id="kontakt" className="py-20 bg-muted">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-border">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">&#10003;</div>
            <h3 className="mt-4 text-xl font-bold text-foreground">Mottatt!</h3>
            <p className="mt-2 text-muted-foreground">Vi tar kontakt innen kort tid.</p>
            <button onClick={() => setStatus("idle")} className="mt-6 text-primary text-sm font-medium hover:underline">
              Send ny henvendelse
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-20 bg-muted">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
          Fortell oss hva du trenger
        </h2>
        <p className="mt-3 text-muted-foreground text-center">
          Uforpliktende — vi svarer innen 24 timer.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 bg-white rounded-2xl p-8 shadow-sm border border-border space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              required
              placeholder="Navn"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
            <input
              type="text"
              required
              placeholder="Bedrift"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="email"
              required
              placeholder="E-post"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
          <textarea
            required
            rows={4}
            placeholder="Hva trenger dere hjelp med?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
          />

          {status === "error" && (
            <p className="text-red-600 text-sm">Noe gikk galt. Ring oss gjerne på 71 20 29 70.</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {status === "sending" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sender...</>
            ) : (
              <><Send className="w-4 h-4" /> Send forespørsel</>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
