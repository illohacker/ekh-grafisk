import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-16 min-h-[90vh] flex items-center overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-24">
        <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-6">
          Totalleverandør siden 1898
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
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
