"use client";

import { useState } from "react";
import { Send, Loader2, MapPin, Phone, Mail, Clock } from "lucide-react";

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

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section id="kontakt" className="py-20 bg-muted">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-border">
            <div className="text-5xl mb-4">&#10003;</div>
            <h3 className="text-2xl font-bold text-foreground">Takk for din henvendelse!</h3>
            <p className="mt-4 text-muted-foreground">
              Vi tar kontakt med deg så raskt som mulig.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-primary font-medium hover:underline"
            >
              Send en ny henvendelse
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Få et uforpliktende tilbud
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Fortell oss hva bedriften din trenger, så lager vi et skreddersydd tilbud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-border space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Navn *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Ditt navn"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Bedrift *
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Din bedrift"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    E-post *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="din@bedrift.no"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="+47 000 00 000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Hva trenger du? *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  placeholder="Beskriv prosjektet: type produkter, mengder, tidsfrister..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm">
                  Noe gikk galt. Prøv igjen eller ring oss på 71 20 29 70.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-semibold py-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sender...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send forespørsel
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-semibold text-foreground mb-4">Kontaktinformasjon</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <a href="tel:+4771202970" className="text-muted-foreground hover:text-primary">
                      +47 71 20 29 70
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">E-post</p>
                    <a href="mailto:post@ekh.no" className="text-muted-foreground hover:text-primary">
                      post@ekh.no
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Åpningstider</p>
                    <p className="text-muted-foreground">Man–fre: 08:00–16:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-semibold text-foreground mb-4">Våre lokasjoner</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium">Molde (hovedkontor)</p>
                    <p className="text-sm text-muted-foreground">Holamyra 27, 6445 Malmefjorden</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium">Hustadvika</p>
                    <p className="text-sm text-muted-foreground">Skulemarka 3, 6440 Elnesvågen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
