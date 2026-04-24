'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AdminStats {
  total_users: number;
  total_professionals: number;
  total_reviews: number;
  pending_reviews: number;
  active_professionals: number;
  verified_professionals: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const supabase = createClient();

      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      const { count: totalProfessionals } = await supabase
        .from('professional_profiles')
        .select('*', { count: 'exact', head: true });

      const { count: totalReviews } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true });

      const { count: pendingReviews } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: activeProfessionals } = await supabase
        .from('professional_profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      const { count: verifiedProfessionals } = await supabase
        .from('professional_profiles')
        .select('*', { count: 'exact', head: true })
        .eq('verified', true);

      setStats({
        total_users: totalUsers || 0,
        total_professionals: totalProfessionals || 0,
        total_reviews: totalReviews || 0,
        pending_reviews: pendingReviews || 0,
        active_professionals: activeProfessionals || 0,
        verified_professionals: verifiedProfessionals || 0,
      });

      setIsLoading(false);
    };

    loadStats();
  }, []);

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (!stats) {
    return <div className="text-center py-12">Error al cargar estadísticas</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1B4332] mb-8">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium mb-2">
            Usuarios Totales
          </div>
          <div className="text-3xl font-bold text-[#1B4332]">
            {stats.total_users}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium mb-2">
            Profesionales
          </div>
          <div className="text-3xl font-bold text-[#1B4332]">
            {stats.total_professionals}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium mb-2">
            Profesionales Activos
          </div>
          <div className="text-3xl font-bold text-[#1B4332]">
            {stats.active_professionals}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium mb-2">
            Profesionales Verificados
          </div>
          <div className="text-3xl font-bold text-[#1B4332]">
            {stats.verified_professionals}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium mb-2">
            Total de Reseñas
          </div>
          <div className="text-3xl font-bold text-[#1B4332]">
            {stats.total_reviews}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="text-gray-600 text-sm font-medium mb-2">
            Reseñas Pendientes
          </div>
          <div className="text-3xl font-bold text-yellow-600">
            {stats.pending_reviews}
          </div>
        </div>
      </div>
    </div>
  );
}
