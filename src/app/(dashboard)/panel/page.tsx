'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface ProfileStats {
  view_count: number;
  contact_count: number;
  avg_rating: number;
  review_count: number;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer_name: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('professional_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setStats({
          view_count: profile.view_count || 0,
          contact_count: profile.contact_count || 0,
          avg_rating: profile.avg_rating || 0,
          review_count: profile.review_count || 0,
        });

        setProfileComplete(
          !!(
            profile.full_name &&
            profile.province &&
            profile.city &&
            profile.categories &&
            profile.categories.length > 0
          )
        );

        const { data: reviews } = await supabase
          .from('reviews')
          .select('*')
          .eq('professional_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (reviews) {
          setRecentReviews(reviews);
        }
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1B4332] mb-8">Mi Panel</h1>

      {!profileComplete && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-4">
          <div className="text-yellow-600 text-2xl">⚠</div>
          <div>
            <h3 className="font-bold text-yellow-900 mb-1">Completá tu perfil</h3>
            <p className="text-yellow-800 mb-3">
              Tu perfil está incompleto. Completalo ahora para que más clientes te
              encuentren.
            </p>
            <Link
              href="/panel/perfil"
              className="text-yellow-700 hover:text-yellow-900 font-semibold underline"
            >
              Completar perfil →
            </Link>
          </div>
        </div>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">
                Visualizaciones
              </div>
              <div className="text-3xl font-bold text-[#1B4332]">
                {stats.view_count}
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Personas vieron tu perfil
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">Contactos</div>
              <div className="text-3xl font-bold text-[#1B4332]">
                {stats.contact_count}
              </div>
              <p className="text-gray-500 text-sm mt-2">Mensajes recibidos</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">
                Calificación
              </div>
              <div className="text-3xl font-bold text-[#1B4332]">
                {stats.avg_rating > 0 ? stats.avg_rating.toFixed(1) : '—'}
              </div>
              <p className="text-gray-500 text-sm mt-2">Promedio de reseñas</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">Reseñas</div>
              <div className="text-3xl font-bold text-[#1B4332]">
                {stats.review_count}
              </div>
              <p className="text-gray-500 text-sm mt-2">Reseñas recibidas</p>
            </div>
          </div>

          {recentReviews.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                Reseñas Recientes
              </h2>

              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-gray-900">
                        {review.reviewer_name || 'Cliente anónimo'}
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(review.created_at).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/panel/resenas"
                className="text-[#1B4332] hover:underline font-medium mt-4 inline-block"
              >
                Ver todas las reseñas →
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
