import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfessionalCard } from '@/components/profesionales/ProfessionalCard';
import { Pagination } from '@/components/ui/Pagination';
import { getCategoryBySlug } from '@/lib/queries/categories';
import { getProfessionalsByCategory } from '@/lib/queries/professionals';
import { getProvinces } from '@/lib/queries/locations';

interface PageProps {
  params: { slug: string };
  searchParams: { page?: string; province?: string; city?: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }

  return {
    title: `${category.name} en Argentina | Oficios Argentina`,
    description: `Encontrá profesionales de ${category.name} en Argentina. Verificados, calificados y listos para trabajar.`,
    openGraph: {
      title: `${category.name} en Argentina`,
      description: `Encontrá profesionales de ${category.name} en Argentina.`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const page = parseInt(searchParams.page || '1');
  const province = searchParams.province || '';
  const city = searchParams.city || '';

  const { professionals, total, totalPages } =
    await getProfessionalsByCategory(category.id, {
      page,
      province,
      city,
    });

  const provinces = await getProvinces();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-600 mb-8 max-w-2xl">{category.description}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-card p-5 shadow-card sticky top-20">
              <h3 className="font-semibold text-foreground mb-4">Filtrar por ubicación</h3>
              <form className="space-y-4">
                <input type="hidden" name="page" value="1" />
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                    Provincia
                  </label>
                  <select
                    id="province"
                    name="province"
                    defaultValue={province}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Todas las provincias</option>
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6 text-gray-600">
              Se encontraron <span className="font-semibold">{total}</span>{' '}
              profesionales
            </div>

            {(professionals || []).length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {(professionals || []).map((professional) => (
                    <ProfessionalCard
                      key={professional.id}
                      professional={professional}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseUrl={`/oficios/${params.slug}?province=${province}&city=${city}`}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No se encontraron profesionales con los filtros seleccionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
