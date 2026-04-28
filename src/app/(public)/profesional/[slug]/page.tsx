import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProfessionalBySlug } from '@/lib/queries/professionals';
import ReviewForm from '@/components/forms/ReviewForm';

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

  const categoryNames = (professional.categories || []).map((c) => c.name);
  const fullName = professional.profile?.full_name || professional.business_name || 'Profesional';

  return {
    title: `${fullName} - ${categoryNames.join(', ')} | Oficios Argentina`,
    description: `${fullName} - ${professional.description || ''}. ${
      professional.is_verified ? 'Profesional verificado.' : ''
    }`,
    openGraph: {
      title: fullName,
      description: professional.description || '',
      images: professional.profile?.avatar_url ? [professional.profile.avatar_url] : [],
    },
  };
}

export default async function ProfessionalPage({ params }: PageProps) {
  const professional = await getProfessionalBySlug(params.slug);

  if (!professional) {
    notFound();
  }

  const fullName = professional.profile?.full_name || professional.business_name || 'Profesional';
  const avatarUrl = professional.profile?.avatar_url;
  const categories = professional.categories || [];
  const reviews = (professional.reviews || []).filter((r) => r.status === 'approved');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: fullName,
    image: avatarUrl,
    description: professional.description,
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
              <div className="bg-gray-50 rounded-xl p-6 sticky top-20 shadow-sm">
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

                <h1 className="text-2xl font-bold text-[#1B4332] mb-2">
                  {fullName}
                </h1>

                {professional.is_verified && (
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
                  {(professional.city || professional.province) && (
                    <div>
                      <p className="text-sm text-gray-500 mb-0.5">Ubicación</p>
                      <p className="font-medium text-gray-900">
                        {[professional.city, professional.province].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  )}

                  {professional.experience_years > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-0.5">Experiencia</p>
                      <p className="font-medium text-gray-900">
                        {professional.experience_years} años
                      </p>
                    </div>
                  )}

                  {professional.availability && (
                    <div>
                      <p className="text-sm text-gray-500 mb-0.5">Disponibilidad</p>
                      <p className="font-medium text-gray-900">
                        {professional.availability}
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact buttons */}
                <div className="space-y-2">
                  {professional.whatsapp && (
                    <a
                      href={`https://wa.me/${professional.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2.5 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      WhatsApp
                    </a>
                  )}
                  {professional.phone && (
                    <a
                      href={`tel:${professional.phone}`}
                      className="flex items-center justify-center gap-2 w-full bg-[#1B4332] text-white py-2.5 rounded-lg font-medium hover:bg-[#0f2818] transition-colors"
                    >
                      Llamar
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-2">
              {categories.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#1B4332] mb-4">Especialidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/oficios/${cat.slug}`}
                        className="inline-block bg-[#1B4332] text-white px-4 py-2 rounded-full text-sm hover:bg-[#0f2818] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {professional.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#1B4332] mb-4">Sobre mí</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {professional.description}
                  </p>
                </div>
              )}

              {professional.portfolio_images && professional.portfolio_images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#1B4332] mb-4">Galería de trabajos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {professional.portfolio_images.map((photo, idx) => (
                      <div
                        key={photo.id}
                        className="relative w-full aspect-square rounded-lg overflow-hidden"
                      >
                        <Image
                          src={photo.image_url}
                          alt={photo.caption || `Foto del trabajo ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#1B4332] mb-6">Reseñas</h2>

                <ReviewForm professionalId={professional.id} professionalName={fullName} />

                {reviews.length > 0 ? (
                  <div className="mt-8 space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString('es-AR')}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        {review.author && (
                          <p className="text-sm text-gray-500 mt-2">
                            — {review.author.full_name}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-4">
                    Aún no hay reseñas. Sé el primero en dejar una opinión.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
