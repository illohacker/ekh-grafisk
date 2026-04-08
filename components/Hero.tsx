import { ArrowRight, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-primary to-primary-light text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <Award className="w-4 h-4" />
            Totalleverandør siden 1898
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Design og produksjon{" "}
            <span className="text-accent">fra idé til ferdig produkt</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl">
            Alt av profilering, trykksaker, skilt, dekor, nettsider og
            markedsmateriell for din bedrift. Eget trykkeri i Molde og
            Hustadvika med over 125 års erfaring.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              Få tilbud
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#tjenester"
              className="border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
            >
              Se våre tjenester
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <div className="text-3xl font-bold">125+</div>
              <div className="text-sm text-white/60 mt-1">År erfaring</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2</div>
              <div className="text-sm text-white/60 mt-1">Lokasjoner</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-white/60 mt-1">Spesialister</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
