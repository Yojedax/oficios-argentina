'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Report {
  id: string;
  reason: string;
  description: string;
  status: string;
  created_at: string;
  reported_user_id: string;
  reporter_id: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from('reports')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (data) {
        setReports(data);
      }

      setIsLoading(false);
    };

    loadReports();
  }, []);

  const handleResolve = async (id: string) => {
    const supabase = createClient();

    await supabase
      .from('reports')
      .update({ status: 'resolved' })
      .eq('id', id);

    setReports(reports.filter((r) => r.id !== id));
  };

  const handleDismiss = async (id: string) => {
    const supabase = createClient();

    await supabase
      .from('reports')
      .update({ status: 'dismissed' })
      .eq('id', id);

    setReports(reports.filter((r) => r.id !== id));
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Reportes</h1>

      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {report.reason}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(report.created_at).toLocaleDateString('es-AR')}
                </span>
              </div>

              {report.description && (
                <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded">
                  {report.description}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleResolve(report.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Resolver
                </button>
                <button
                  onClick={() => handleDismiss(report.id)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Descartar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Sin reportes abiertos
          </h3>
          <p className="text-gray-600">Todos los reportes han sido procesados</p>
        </div>
      )}
    </div>
  );
}
