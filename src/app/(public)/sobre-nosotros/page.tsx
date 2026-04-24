import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Oficios Argentina',
  description:
    'Conocé la misión y visión de Oficios Argentina, la plataforma que conecta clientes con profesionales.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1B4332] mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-gray-600 mb-12">
            Conectando profesionales con clientes en toda Argentina
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1B4332] mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              En Oficios Argentina, nuestra misión es facilitar la conexión entre clientes
              que buscan servicios profesionales de calidad y profesionales que desean
              expandir su negocio. Creemos en la importancia de conectar la demanda con
              la oferta de forma segura, transparente y accesible para todos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Queremos ser la plataforma de referencia donde argentinos encuentren
              profesionales confiables en cualquier oficio, desde plomería hasta
              consultoría, garantizando experiencias positivas para ambas partes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1B4332] mb-4">Nuestra Visión</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Imaginamos un futuro donde encontrar un profesional confiable sea tan simple
              como buscar en Google. Una Argentina donde los profesionales independientes
              tengan acceso a oportunidades de negocio sin intermediarios costosos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Buscamos construir una comunidad vibrante de profesionales verificados,
              con reputación clara, disponibles cuando los necesitás y comprometidos
              con la excelencia en su trabajo.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1B4332] mb-4">¿Qué Hacemos?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Oficios Argentina es una plataforma digital que funciona como punto de encuentro
              entre clientes que necesitan servicios y profesionales que desean ofrecerlos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#1B4332] mb-2">Para Clientes</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Búsqueda fácil de profesionales por oficio</li>
                  <li>✓ Acceso a reseñas y calificaciones reales</li>
                  <li>✓ Contacto directo con profesionales verificados</li>
                  <li>✓ Información de ubicación y disponibilidad</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-[#1B4332] mb-2">Para Profesionales</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Perfil profesional visible para potenciales clientes</li>
                  <li>✓ Recibir contactos de forma gratuita</li>
                  <li>✓ Construir reputación a través de reseñas</li>
                  <li>✓ Gestión sencilla de tu presencia online</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#1B4332] mb-4">Cómo Funciona</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Regístrate</h3>
                  <p className="text-gray-700">
                    Creá tu cuenta de forma rápida y sencilla. Si sos profesional,
                    completa tu perfil con detalles de tu trabajo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Busca o Conecta</h3>
                  <p className="text-gray-700">
                    Si buscas profesionales, explorá por categoría y ubicación. Si sos
                    profesional, esperá contactos de clientes interesados.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Negocia y Contrata</h3>
                  <p className="text-gray-700">
                    Comunicate directamente, negocia términos y contrata el servicio
                    que necesitás.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Califica y Comenta</h3>
                  <p className="text-gray-700">
                    Después de la experiencia, deja una reseña honesta para ayudar a
                    otros clientes y construir confianza en la comunidad.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#1B4332] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Valores Fundamentales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold mb-2">Transparencia</h3>
                <p>
                  Información clara y honesta en cada transacción y relación comercial.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Confianza</h3>
                <p>
                  Verificación de perfiles y moderación de reseñas para garantizar
                  seguridad.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Accesibilidad</h3>
                <p>
                  Una plataforma gratuita y fácil de usar para profesionales y clientes.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
