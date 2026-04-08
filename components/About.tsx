import { CheckCircle } from "lucide-react";

const highlights = [
  "Más de 10 años de experiencia",
  "Diseño gráfico incluido",
  "Envío a toda Europa",
  "Presupuestos sin compromiso",
  "Muestras antes de producción",
  "Plazos de entrega garantizados",
];

export default function About() {
  return (
    <section id="nosotros" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              ¿Por qué elegir <span className="text-primary">EKH Grafisk</span>?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Somos especialistas en artículos promocionales con un enfoque en
              calidad y servicio personalizado. Trabajamos contigo para crear
              productos que representen tu marca de la mejor manera.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-12 text-white text-center">
            <div className="text-6xl font-bold">500+</div>
            <div className="mt-2 text-xl text-white/80">Clientes satisfechos</div>
            <div className="mt-8 text-5xl font-bold">10K+</div>
            <div className="mt-2 text-xl text-white/80">Productos entregados</div>
            <div className="mt-8 text-5xl font-bold">98%</div>
            <div className="mt-2 text-xl text-white/80">Tasa de satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  );
}
