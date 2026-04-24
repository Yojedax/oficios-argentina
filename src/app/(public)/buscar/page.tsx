import type { Metadata } from 'next';
import { SearchBar } from '@/components/search/SearchBar';
import { ProfessionalCard } from '@/components/profesionales/ProfessionalCard';
import { searchProfessionals } from '@/lib/queries/professionals';

interface PageProps {
  searchParams: { q?: string; province?: string; city?: string };
}

export const metadata: Metadata = {
  title: 'Resultados de Búsqueda | Oficios Argentina',
  description: 'Resultados de búsqueda de profesionales en Argentina',
};

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';
  const province = searchParams.province || '';
  const city = searchParams.city || '';

  let results: Awaited<ReturnType<typeof searchProfessionals>> = [];
  let hasSearched = false;

  if (query || province || city) {
    hasSearched = true;
    results = await searchProfessionals({
      query,
      province,
      city,
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-8 text-center">
          Buscar profesionales
        </h1>

        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar initialQuery={query} />
        </div>

        {hasSearched ? (
          <>
            <div className="mb-6 text-gray-600 text-center">
              {results.length > 0 ? (
                <p>
                  Se encontraron <span className="font-semibold">{results.length}</span>{' '}
                  resultados
                  {query && ` para "${query}"`}
                </p>
              ) : (
                <p>
                  No se encontraron resultados
                  {query && ` para "${query}"`}. Intentá con otros términos.
                </p>
              )}
            </div>

            {results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    professional={professional}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p className="text-lg">
              Usá la barra de búsqueda para encontrar profesionales
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
