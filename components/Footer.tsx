export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <div>
          <span className="font-bold text-lg">EKH <span className="text-white/80">Grafisk</span></span>
          <span className="hidden sm:inline text-white/40 ml-3">Siden 1898</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-white/60">
          <a href="tel:+4771202970" className="hover:text-white transition-colors">+47 71 20 29 70</a>
          <span className="hidden sm:inline">·</span>
          <a href="mailto:post@ekh.no" className="hover:text-white transition-colors">post@ekh.no</a>
          <span className="hidden sm:inline">·</span>
          <span>Molde &amp; Hustadvika</span>
        </div>
      </div>
    </footer>
  );
}
