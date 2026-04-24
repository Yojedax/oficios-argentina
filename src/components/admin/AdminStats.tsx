"use client";

import { Users, UserCheck, Star, Flag, Clock } from 'lucide-react';
import type { AdminStats as AdminStatsType } from '@/lib/types';

interface AdminStatsProps {
  stats: AdminStatsType;
}

export default function AdminStatsCards({ stats }: AdminStatsProps) {
  const items = [
    {
      label: 'Profesionales totales',
      value: stats.total_professionals,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Profesionales activos',
      value: stats.active_professionals,
      icon: UserCheck,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Clientes registrados',
      value: stats.total_clients,
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Reseñas totales',
      value: stats.total_reviews,
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Reseñas pendientes',
      value: stats.pending_reviews,
      icon: Clock,
      color: stats.pending_reviews > 0 ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-600',
    },
    {
      label: 'Reportes abiertos',
      value: stats.open_reports,
      icon: Flag,
      color: stats.open_reports > 0 ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.label} className="bg-white rounded-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
