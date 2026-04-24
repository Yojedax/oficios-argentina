import type { Metadata } from 'next';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { getCategoriesWithCounts } from '@/lib/queries/categories';

export const metadata: Metadata = {
  title: 'Oficios y Servicios Profesionales en Argentina | Oficios Argentina',
  description:
    'Encontrá profesionales en diferentes oficios y servicios en Argentina. Plomeros, electricistas, carpinteros, pintores y más.',
};

export default async function OficiosPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">
            Oficios y servicios profesionales
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorá todas las categorías de oficios disponibles y encontrá al profesional que necesitás
          </p>
        </div>

        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}
