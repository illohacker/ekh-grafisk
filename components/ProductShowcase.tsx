"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const products = [
  {
    name: "Kopper med logo",
    description: "Hver morgenkaffe — en påminnelse om merkevaren din.",
    image: "/images/product-6.jpg",
  },
  {
    name: "Penner og skrivesaker",
    description: "Den mest delte reklameartikkelen. Alltid i bruk.",
    image: "/images/product-1.jpg",
  },
  {
    name: "T-skjorter og klær",
    description: "Teamet ditt blir et gående reklameskilt.",
    image: "/images/product-3.jpg",
  },
  {
    name: "Bagger og sekker",
    description: "Stor flate, stor synlighet — overalt.",
    image: "/images/product-5.jpg",
  },
  {
    name: "Notatbøker",
    description: "Kvalitetsfølelse som reflekterer merkevaren.",
    image: "/images/product-4.jpg",
  },
  {
    name: "Emballasje og innpakning",
    description: "Førsteinntrykket starter med innpakningen.",
    image: "/images/product-2.jpg",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  function startInterval() {
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      setActive((p) => (p + 1) % products.length);
    }, 3500);
  }

  useEffect(() => {
    startInterval();
    return () => { if (interval.current) clearInterval(interval.current); };
  }, []);

  function select(i: number) {
    setActive(i);
    startInterval();
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Produkter som gjør jobben for deg
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Hver artikkel er en mulighet til å bli husket.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            {products.map((product, i) => (
              <div
                key={product.name}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === active
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                  <p className="mt-2 text-white/80">{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {products.map((product, i) => (
              <button
                key={product.name}
                onClick={() => select(i)}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                  i === active
                    ? "ring-2 ring-primary ring-offset-2 scale-[1.02]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                  <span className="text-white text-xs font-medium leading-tight">
                    {product.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
