const clients = [
  "ELEMENT 29",
  "Drågen Smokehouse",
  "We Escape",
  "Midthaug",
  "Romsdalsmuseet",
  "Romsdal Sogelag",
];

export default function Clients() {
  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
          Bedrifter som stoler på oss
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client) => (
            <div
              key={client}
              className="flex items-center justify-center h-16 bg-muted rounded-lg px-4"
            >
              <span className="text-sm font-semibold text-foreground/60 text-center">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
