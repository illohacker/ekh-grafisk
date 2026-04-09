const steps = [
  { num: "01", title: "Du velger", text: "Fortell oss hvilke produkter og mengder du trenger." },
  { num: "02", title: "Vi designer", text: "Vi tilpasser designet med logo og farger — gratis." },
  { num: "03", title: "Vi produserer", text: "Alt trykkes og monteres i vårt eget trykkeri." },
  { num: "04", title: "Du mottar", text: "Levert til døren, klar til bruk." },
];

export default function Services() {
  return (
    <section id="tjenester" className="py-20 bg-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
          Så enkelt er det
        </h2>
        <p className="mt-3 text-muted-foreground text-center max-w-xl mx-auto">
          Fra idé til ferdig produkt — vi tar oss av alt.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative bg-white rounded-xl p-6 border border-border">
              <span className="text-5xl font-black text-primary/10 leading-none">{s.num}</span>
              <h3 className="mt-3 font-semibold text-foreground text-lg">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.text}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-border" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Kom i gang — det er gratis å spørre
          </a>
        </div>
      </div>
    </section>
  );
}
