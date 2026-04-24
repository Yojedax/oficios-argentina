'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Review {
  id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewer_name: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('professional_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*')
          .eq('professional_id', profile.id)
          .order('created_at', { ascending: false });

        if (reviewsData) {
          setReviews(reviewsData);
        }
      }

      setIsLoading(false);
    };

    loadReviews();
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Mis Reseñas</h1>

      {reviews.length > 0 ? (
        <div className="bg-white rounded-lg shadow divide-y">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {review.reviewer_name || 'Cliente anónimo'}
                  </h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating
                            ? 'text-yellow-400 text-lg'
                            : 'text-gray-300 text-lg'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                    review.status
                  )}`}
                >
                  {getStatusLabel(review.status)}
                </span>
              </div>

              {review.comment && (
                <p className="text-gray-700 mb-3">{review.comment}</p>
              )}

              <p className="text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString('es-AR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Aún no tenés reseñas
          </h3>
          <p className="text-gray-600">
            Cuando clientes dejen reseñas sobre tu trabajo, aparecerán aquí.
          </p>
        </div>
      )}
    </div>
  );
}
