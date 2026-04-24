'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Review {
  id: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  reviewer_name: string;
  professional_id: string;
}

export default function ReviewsModerationPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (data) {
        setReviews(data);
      }

      setIsLoading(false);
    };

    loadReviews();
  }, []);

  const handleApprove = async (id: string) => {
    const supabase = createClient();

    await supabase
      .from('reviews')
      .update({ status: 'approved' })
      .eq('id', id);

    setReviews(reviews.filter((r) => r.id !== id));
  };

  const handleReject = async (id: string) => {
    const supabase = createClient();

    await supabase
      .from('reviews')
      .update({ status: 'rejected' })
      .eq('id', id);

    setReviews(reviews.filter((r) => r.id !== id));
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">
        Moderación de Reseñas
      </h1>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {review.reviewer_name || 'Cliente anónimo'}
                  </h3>
                  <div className="flex gap-1">
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
                <span className="text-xs text-gray-500">
                  {new Date(review.created_at).toLocaleDateString('es-AR')}
                </span>
              </div>

              {review.comment && (
                <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded">
                  {review.comment}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(review.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Sin reseñas pendientes
          </h3>
          <p className="text-gray-600">Todas las reseñas han sido moderadas</p>
        </div>
      )}
    </div>
  );
}
