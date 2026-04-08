"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    name: "Kopper med logo",
    description: "Hver morgenkaffe = en påminnelse om merkevaren din.",
    color: "#C2267A",
    icon: "☕",
  },
  {
    name: "Penner",
    description: "Den mest delte reklameartikkelen. Alltid i bruk.",
    color: "#9E1D63",
    icon: "🖊️",
  },
  {
    name: "T-skjorter",
    description: "Teamet ditt blir et gående reklameskilt.",
    color: "#D4408E",
    icon: "👕",
  },
  {
    name: "Bagger og sekker",
    description: "Stor flate, stor synlighet — overalt.",
    color: "#C2267A",
    icon: "🎒",
  },
  {
    name: "Notatbøker",
    description: "Kvalitetsfølelse som reflekterer merkevaren.",
    color: "#9E1D63",
    icon: "📒",
  },
  {
    name: "Caps og luer",
    description: "Uformell profilering som folk elsker å bruke.",
    color: "#D4408E",
    icon: "🧢",
  },
];

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Produkter som gjør jobben for deg
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Hver artikkel er en mulighet til å bli husket.
          </p>
        </div>

        {/* Featured product - animated */}
        <div className="relative bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-10 sm:p-16 text-white text-center mb-12 overflow-hidden min-h-[320px] flex flex-col items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/20" />
          </div>

          {products.map((product, i) => (
            <div
              key={product.name}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                i === activeIndex
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-8"
              }`}
            >
              <span className="text-7xl sm:text-8xl mb-6 drop-shadow-lg block">
                {product.icon}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">{product.name}</h3>
              <p className="mt-3 text-white/70 text-lg max-w-md">
                {product.description}
              </p>
            </div>
          ))}

          {/* Progress dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    setActiveIndex((prev) => (prev + 1) % products.length);
                  }, 2500);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex ? "bg-white w-6" : "bg-white/30"
                }`}
                aria-label={`Vis produkt ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product, i) => (
            <button
              key={product.name}
              onClick={() => {
                setActiveIndex(i);
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                  setActiveIndex((prev) => (prev + 1) % products.length);
                }, 2500);
              }}
              className={`rounded-xl p-4 text-center transition-all border ${
                i === activeIndex
                  ? "bg-primary/5 border-primary/30 scale-105"
                  : "bg-muted border-border hover:border-primary/20"
              }`}
            >
              <span className="text-3xl block mb-2">{product.icon}</span>
              <span className="text-xs font-medium text-foreground">{product.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
