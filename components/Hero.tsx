export default function Hero() {
  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-primary to-primary-light text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Artículos promocionales que{" "}
            <span className="text-accent">destacan tu marca</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl">
            Desde merchandising corporativo hasta regalos personalizados.
            Calidad premium con tu logo, entregado a tiempo.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
            >
              Solicitar Presupuesto
            </a>
            <a
              href="#servicios"
              className="border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
            >
              Ver Servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
