import {
  Palette,
  Printer,
  PanelTop,
  Car,
  Globe,
  Camera,
  BookOpen,
  Megaphone,
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Grafisk design",
    description:
      "Logo, visuell identitet, profileringsmanualer og illustrasjoner. Vi skaper helhetlig design som styrker merkevaren din.",
  },
  {
    icon: Printer,
    title: "Trykksaker",
    description:
      "Brosjyrer, magasiner, bøker, kalendere og kontortrykksaker. Eget offset- og digitaltrykkeri med fargestyringssertifisering.",
  },
  {
    icon: PanelTop,
    title: "Skilt og dekor",
    description:
      "Fasadeskilt, vindusfoliering, innendørs dekor og ARKEOPLAN® kulturskilt. Produksjon og montering i hele regionen.",
  },
  {
    icon: Car,
    title: "Bilfoliering",
    description:
      "Helfoliering og delfoliering av firmabiler. Gjør kjøretøyene til rullende reklame for bedriften din.",
  },
  {
    icon: Megaphone,
    title: "Profilering og markedsmateriell",
    description:
      "Messemateriell, roll-ups, beachflagg og profileringsartikler. Alt du trenger for å synes på messer og events.",
  },
  {
    icon: Globe,
    title: "Nettsider",
    description:
      "Moderne, brukervennlige nettsider med fokus på konvertering. Også via vår egen plattform Steinbyggeren.",
  },
  {
    icon: Camera,
    title: "Foto, video og illustrasjon",
    description:
      "Profesjonell foto og film til markedsføring, samt skreddersydde illustrasjoner og infografikk.",
  },
  {
    icon: BookOpen,
    title: "Markedsføring",
    description:
      "Kampanjer, annonsering og markedsstrategi. Vi hjelper deg fra idé til gjennomføring — en komplett markedspartner.",
  },
];

export default function Services() {
  return (
    <section id="tjenester" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Alt din bedrift trenger — under ett tak
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Som totalleverandør håndterer vi hele prosessen fra design til
            ferdig produkt, med eget trykkeri og produksjon lokalt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border group"
            >
              <service.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Snakk med oss om ditt prosjekt
          </a>
        </div>
      </div>
    </section>
  );
}
