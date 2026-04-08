import { Palette, Printer, PanelTop, Car, Megaphone, Globe } from "lucide-react";

const services = [
  { icon: Palette, title: "Design og identitet", text: "Logo, profil og visuelt uttrykk som skiller deg ut." },
  { icon: Printer, title: "Trykk", text: "Brosjyrer, kataloger, bøker — eget trykkeri, full kontroll." },
  { icon: PanelTop, title: "Skilt og dekor", text: "Fasadeskilt, vindusfolie og innendørs profilering." },
  { icon: Car, title: "Bilfoliering", text: "Firmabilene dine blir rullende reklame." },
  { icon: Megaphone, title: "Profilering", text: "Messemateriell, roll-ups og alt som gjør deg synlig." },
  { icon: Globe, title: "Nettsider", text: "Moderne nettsider som konverterer besøk til kunder." },
];

export default function Services() {
  return (
    <section id="tjenester" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
          Alt du trenger for å bygge merkevare
        </h2>
        <p className="mt-3 text-muted-foreground text-center max-w-xl mx-auto">
          Én leverandør, ingen mellomhender, raskere leveranse.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-muted rounded-xl p-6 border border-border hover:border-primary/20 transition-colors">
              <s.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
