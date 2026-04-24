import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProfessionalBySlug } from '@/lib/queries/professionals';
import { getReviewsByProfessional } from '@/lib/queries/reviews';
import ReviewForm from '@/components/forms/ReviewForm';
import { ReviewList } from '@/components/profesionales/ReviewList';
import { ContactButtons } from '@/components/profesionales/ContactButtons';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const professional = await getProfessionalBySlug(params.slug);

  if (!professional) {
    return {
      title: 'Profesional no encontrado',
    };
  }

  const categoryNames = professional.professional_categories?.map(
    (pc: { categories: { name: string } }) => pc.categories.name
  ) || [];

  return {
    title: `${professional.profiles?.full_name} - ${categoryNames.join(', ')} | Oficios Argentina`,
    description: `${professional.profiles?.full_name} - ${professional.bio || ''}. ${
      professional.verified ? 'Profesional verificado.' : ''
    }`,
    openGraph: {
      title: professional.profiles?.full_name || '',
      description: professional.bio || '',
      images: professional.profiles?.avatar_url ? [professional.profiles.avatar_url] : [],
    },
  };
}

export default async function ProfessionalPage({ params }: PageProps) {
  const professional = await getProfessionalBySlug(params.slug);

  if (!professional) {
    notFound();
  }

  const reviews = await getReviewsByProfessional(professional.id);

  const fullName = professional.profiles?.full_name || 'Profesional';
  const avatarUrl = professional.profiles?.avatar_url;
  const categoryNames = professional.professional_categories?.map(
    (pc: { categories: { name: string; slug: string } }) => pc.categories
  ) || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: fullName,
    image: avatarUrl,
    description: professional.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: professional.city,
      addressRegion: professional.province,
      addressCountry: 'AR',
    },
    aggregateRating:
      professional.avg_rating > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: professional.avg_rating,
            reviewCount: professional.review_count,
          }
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-card p-6 sticky top-20 shadow-card">
                {avatarUrl && (
                  <div className="mb-6 relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={avatarUrl}
                      alt={fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h1 className="text-2xl font-bold text-primary-600 mb-2">
                  {fullName}
                </h1>

                {professional.verified && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Verificado
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  {professional.avg_rating > 0 && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.round(professional.avg_rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {professional.avg_rating.toFixed(1)} ({professional.review_count}{' '}
                        reseñas)
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-0.5">Ubicación</p>
                    <p className="font-medium text-foreground">
                      {professional.city}, {professional.province}
                    </p>
                  </div>

                  {professional.experience_years && (
                    <div>
                      <p className="text-sm text-gray-500 mb-0.5">Experiencia</p>
                      <p className="font-medium text-foreground">
                        {professional.experience_years} años
                      </p>
                    </div>
                  )}

                  {professional.availability && (
                    <div>
                      <p className="text-sm text-gray-500 mb-0.5">Disponibilidad</p>
                      <p className="font-medium text-foreground">
                        {professional.availability}
                      </p>
                    </div>
                  )}
                </div>

                <ContactButtons
                  phone={professional.phone}
                  whatsapp={professional.whatsapp}
                  professionalId={professional.id}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary-600 mb-4">Especialidades</h2>
                <div className="flex flex-wrap gap-2">
                  {categoryNames.map((cat: { name: string; slug: string }) => (
                    <Link
                      key={cat.slug}
                      href={`/oficios/${cat.slug}`}
                      className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm hover:bg-primary-700 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {professional.bio && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary-600 mb-4">Sobre mí</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {professional.bio}
                  </p>
                </div>
              )}

              {professional.portfolio_images && professional.portfolio_images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary-600 mb-4">Galería de trabajos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {professional.portfolio_images.map((photo: { id: string; image_url: string; description?: string }, idx: number) => (
                      <div
                        key={photo.id || idx}
                        className="relative w-full aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={photo.image_url}
                          alt={photo.description || `Foto del trabajo ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary-600 mb-6">Reseñas</h2>

                <ReviewForm professionalId={professional.id} />

                <div className="mt-8">
                  <ReviewList reviews={reviews} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
