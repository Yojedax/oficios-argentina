import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProfessionals } from '@/components/home/FeaturedProfessionals';
import { HowItWorks } from '@/components/home/HowItWorks';
import { getCategoriesWithCounts } from '@/lib/queries/categories';
import { getFeaturedProfessionals } from '@/lib/queries/professionals';

export default async function Home() {
  const categories = await getCategoriesWithCounts();
  const featuredProfessionals = await getFeaturedProfessionals();

  return (
    <>
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-primary-600">
            Oficios y servicios profesionales
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Encontrá al profesional que necesitás entre nuestras categorías de oficios
          </p>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {featuredProfessionals.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-primary-600">
              Profesionales destacados
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Profesionales con las mejores calificaciones de la plataforma
            </p>
            <FeaturedProfessionals professionals={featuredProfessionals} />
          </div>
        </section>
      )}

      <HowItWorks />

      {/* CTA Profesionales */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Sos profesional?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Registrá tu perfil de forma gratuita y empezá a recibir consultas de clientes en tu zona.
          </p>
          <Link
            href="/registro"
            className="inline-block bg-secondary-500 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-secondary-600 transition-colors text-lg"
          >
            Crear mi perfil gratis
          </Link>
        </div>
      </section>
    </>
  );
}
