"use client";

import { ArrowRight } from "lucide-react";

const floatingProducts = [
  { emoji: "🖊️", label: "Penner", x: "10%", y: "20%", delay: "0s", size: "text-4xl" },
  { emoji: "👕", label: "T-skjorter", x: "85%", y: "15%", delay: "1s", size: "text-5xl" },
  { emoji: "☕", label: "Kopper", x: "75%", y: "65%", delay: "0.5s", size: "text-4xl" },
  { emoji: "🎒", label: "Bagger", x: "5%", y: "70%", delay: "1.5s", size: "text-5xl" },
  { emoji: "🧢", label: "Caps", x: "90%", y: "42%", delay: "2s", size: "text-3xl" },
  { emoji: "📒", label: "Notatbøker", x: "15%", y: "45%", delay: "0.8s", size: "text-3xl" },
];

export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 min-h-[90vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden">
      {/* Floating product icons */}
      {floatingProducts.map((p) => (
        <div
          key={p.label}
          className={`absolute ${p.size} opacity-20 animate-float select-none pointer-events-none`}
          style={{
            left: p.x,
            top: p.y,
            animationDelay: p.delay,
          }}
          aria-hidden="true"
        >
          {p.emoji}
        </div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-sm text-white/80 mb-8 border border-white/10">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Kampanje: Profileringsartikler for bedrifter
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
          Sett merkevaren din
          <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10">i hendene på kundene</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-white/20 -skew-x-3 rounded" />
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Profileringsartikler som folk faktisk bruker. Penner, kopper, klær,
          bagger og mer — alt med ditt design, levert fra vårt eget trykkeri.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kontakt"
            className="group bg-white text-primary hover:bg-white/90 font-bold px-10 py-5 rounded-xl text-lg transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-black/20"
          >
            Bestill profileringsartikler
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="tel:+4771202970"
            className="border-2 border-white/20 hover:border-white/40 text-white font-medium px-10 py-5 rounded-xl text-lg transition-colors text-center"
          >
            Ring 71 20 29 70
          </a>
        </div>

      </div>
    </section>
  );
}
