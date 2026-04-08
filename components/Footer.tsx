export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">
              EKH <span className="text-accent">Grafisk</span>
            </h3>
            <p className="mt-4 text-white/70">
              Artículos promocionales de calidad para empresas que quieren destacar.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-white/70">
              <p>info@ekhgrafisk.com</p>
              <p>+47 000 00 000</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <div className="space-y-2 text-white/70">
              <p>Textil Personalizado</p>
              <p>Regalos Corporativos</p>
              <p>Impresión Gran Formato</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} EKH Grafisk. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
