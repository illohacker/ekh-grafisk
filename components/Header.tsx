"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-2xl font-bold text-primary">
            EKH <span className="text-accent">Grafisk</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#tjenester" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Tjenester
            </a>
            <a href="#om-oss" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Om oss
            </a>
            <a href="#kontakt" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Kontakt
            </a>
            <a href="tel:+4771202970" className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Phone className="w-4 h-4" />
              71 20 29 70
            </a>
            <a href="#kontakt" className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
              Få tilbud
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          <a href="#tjenester" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-foreground/70">
            Tjenester
          </a>
          <a href="#om-oss" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-foreground/70">
            Om oss
          </a>
          <a href="#kontakt" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-foreground/70">
            Kontakt
          </a>
          <a href="tel:+4771202970" className="block text-sm font-medium text-muted-foreground">
            71 20 29 70
          </a>
          <a href="#kontakt" onClick={() => setMenuOpen(false)} className="block bg-accent text-white font-semibold px-6 py-2.5 rounded-lg text-sm text-center">
            Få tilbud
          </a>
        </div>
      )}
    </header>
  );
}
