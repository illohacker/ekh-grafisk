import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Klar for å styrke bedriftens profil?
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
          Vi hjelper bedriften din med alt fra design til ferdig produkt.
          Kontakt oss for et uforpliktende tilbud i dag.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kontakt"
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            Få tilbud nå
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="tel:+4771202970"
            className="border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
          >
            Ring 71 20 29 70
          </a>
        </div>
      </div>
    </section>
  );
}
