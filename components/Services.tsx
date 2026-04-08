import { Shirt, Gift, Pen, Package, Printer, Award } from "lucide-react";

const services = [
  {
    icon: Shirt,
    title: "Textil Personalizado",
    description: "Camisetas, polos, sudaderas y uniformes con tu marca bordada o estampada.",
  },
  {
    icon: Pen,
    title: "Material de Oficina",
    description: "Bolígrafos, libretas, USB y accesorios de escritorio personalizados.",
  },
  {
    icon: Gift,
    title: "Regalos Corporativos",
    description: "Packs de bienvenida, regalos de empresa y detalles para eventos.",
  },
  {
    icon: Package,
    title: "Packaging Personalizado",
    description: "Cajas, bolsas y embalajes con diseño exclusivo para tu marca.",
  },
  {
    icon: Printer,
    title: "Impresión Gran Formato",
    description: "Banners, roll-ups, lonas y señalética para ferias y eventos.",
  },
  {
    icon: Award,
    title: "Artículos Premium",
    description: "Productos de alta gama: cuero, cristal, madera y metal grabado.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para promocionar tu marca con productos de calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <service.icon className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
