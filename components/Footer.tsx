export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold">
              EKH <span className="text-accent">Grafisk</span>
            </h3>
            <p className="mt-4 text-white/70 text-sm">
              Din totalleverandør av design, trykk, skilt, dekor og profilering
              siden 1898. Fem generasjoner med grafisk kompetanse.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tjenester</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>Grafisk design</p>
              <p>Trykksaker</p>
              <p>Skilt og dekor</p>
              <p>Bilfoliering</p>
              <p>Profilering</p>
              <p>Nettsider</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>
                <a href="tel:+4771202970" className="hover:text-white transition-colors">
                  +47 71 20 29 70
                </a>
              </p>
              <p>
                <a href="mailto:post@ekh.no" className="hover:text-white transition-colors">
                  post@ekh.no
                </a>
              </p>
              <p>Man–fre: 08:00–16:00</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Lokasjoner</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div>
                <p className="text-white/90 font-medium">Molde</p>
                <p>Holamyra 27</p>
                <p>6445 Malmefjorden</p>
              </div>
              <div>
                <p className="text-white/90 font-medium">Hustadvika</p>
                <p>Skulemarka 3</p>
                <p>6440 Elnesvågen</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} EKH Grafisk AS. Alle rettigheter forbeholdt.</p>
          <p>Org.nr: 956 433 460</p>
        </div>
      </div>
    </footer>
  );
}
