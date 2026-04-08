"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold text-primary">
            EKH <span className="text-accent">Grafisk</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#tjenester" className="text-sm text-foreground/60 hover:text-primary transition-colors">
              Tjenester
            </a>
            <a href="#kontakt" className="bg-accent hover:bg-accent-hover text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
              Få tilbud
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Meny"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          <a href="#tjenester" onClick={() => setMenuOpen(false)} className="block text-sm text-foreground/70">
            Tjenester
          </a>
          <a href="#kontakt" onClick={() => setMenuOpen(false)} className="block bg-accent text-white font-semibold px-5 py-2 rounded-lg text-sm text-center">
            Få tilbud
          </a>
        </div>
      )}
    </header>
  );
}
