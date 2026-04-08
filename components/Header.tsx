"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

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
            <a href="#servicios" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#nosotros" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
              Pedir Presupuesto
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
          <a href="#servicios" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-foreground/70">
            Servicios
          </a>
          <a href="#nosotros" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-foreground/70">
            Nosotros
          </a>
          <a href="#contacto" onClick={() => setMenuOpen(false)} className="block bg-accent text-white font-semibold px-6 py-2.5 rounded-lg text-sm text-center">
            Pedir Presupuesto
          </a>
        </div>
      )}
    </header>
  );
}
