'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Professional {
  id: string;
  full_name: string;
  categories: string[];
  city: string;
  is_active: boolean;
  verified: boolean;
  avg_rating: number;
}

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfessionals = async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from('professional_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProfessionals(data);
      }

      setIsLoading(false);
    };

    loadProfessionals();
  }, []);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const supabase = createClient();

    await supabase
      .from('professional_profiles')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    setProfessionals(
      professionals.map((p) =>
        p.id === id ? { ...p, is_active: !currentStatus } : p
      )
    );
  };

  const handleToggleVerified = async (id: string, currentStatus: boolean) => {
    const supabase = createClient();

    await supabase
      .from('professional_profiles')
      .update({ verified: !currentStatus })
      .eq('id', id);

    setProfessionals(
      professionals.map((p) =>
        p.id === id ? { ...p, verified: !currentStatus } : p
      )
    );
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Profesionales</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Especialidades
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Ciudad
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Activo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Verificado
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Calificación
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {professionals.map((prof) => (
              <tr key={prof.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {prof.full_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {prof.categories?.join(', ') || '—'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {prof.city}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      prof.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {prof.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      prof.verified
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {prof.verified ? '✓ Verificado' : 'No verificado'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {prof.avg_rating > 0 ? (
                    <span className="text-yellow-600 font-semibold">
                      {prof.avg_rating.toFixed(1)} ★
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() =>
                      handleToggleActive(prof.id, prof.is_active)
                    }
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {prof.is_active ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    onClick={() =>
                      handleToggleVerified(prof.id, prof.verified)
                    }
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    {prof.verified ? 'Desverificar' : 'Verificar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {professionals.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          No hay profesionales registrados
        </div>
      )}
    </div>
  );
}
