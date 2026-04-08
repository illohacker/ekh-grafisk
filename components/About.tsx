import { CheckCircle, Shield, Clock, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Ekte",
    description: "Pålitelige og ærlige i alt vi gjør.",
  },
  {
    icon: Users,
    title: "Tilgjengelige",
    description: "Servicefokusert i hele prosessen.",
  },
  {
    icon: Clock,
    title: "Til å stole på",
    description: "Leverer til avtalt tid og kvalitet.",
  },
  {
    icon: Lightbulb,
    title: "Kunnskapsrike",
    description: "Sterk fagkompetanse som møter dine behov.",
  },
];

const milestones = [
  "Grunnlagt 1898 — over 125 års erfaring",
  "Svanemerket trykkeri siden 2007",
  "Først i Norden med fargestyringssertifisering (2008)",
  "Fusjonert med Arkeoplan AS og Helge Norli AS (2023)",
  "Nytt MarketHouse i Malmefjorden (2025)",
  "5. generasjon under ledelse av Kjetil Moen",
];

export default function About() {
  return (
    <section id="om-oss" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Din markedspartner i{" "}
              <span className="text-primary">Møre og Romsdal</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              EKH Grafisk er et designbyrå, trykkeri og folieverksted med
              lokaler i Molde og Hustadvika. Vi er totalleverandør av grafiske
              løsninger for bedrifter i Molde, Hustadvika og Kristiansund.
            </p>
            <p className="mt-4 text-muted-foreground">
              Gjennom fem generasjoner har vi levert trykksaker og grafiske
              tjenester til næringslivet i Nordmøre og Romsdal. I dag tilbyr vi
              alt fra logo og profil, til trykk, skilt, dekor, nettsider og
              komplett markedsføring.
            </p>

            <div className="mt-8 space-y-3">
              {milestones.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              Våre verdier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-muted rounded-xl p-6 border border-border"
                >
                  <value.icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-foreground">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Betjener bedrifter i hele regionen
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">Molde</div>
                  <div className="text-sm text-white/70 mt-1">Hovedkontor</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Hustadvika</div>
                  <div className="text-sm text-white/70 mt-1">Avdeling</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Kristiansund</div>
                  <div className="text-sm text-white/70 mt-1">Betjener</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
