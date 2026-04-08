import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-br from-primary-dark to-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-6">
          Totalleverandør siden 1898
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
          Vi gjør bedriften din{" "}
          <span className="text-white">umulig å overse</span>
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Design, trykk, skilt, foliering og profilering — alt fra ett hus.
          Du forteller oss hva du trenger, vi leverer det ferdig.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kontakt"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            Start et prosjekt
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="tel:+4771202970"
            className="border-2 border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors text-center"
          >
            71 20 29 70
          </a>
        </div>
      </div>
    </section>
  );
}
