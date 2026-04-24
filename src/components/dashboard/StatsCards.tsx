"use client";

import { Eye, Phone, Star, MessageSquare } from 'lucide-react';

interface StatsCardsProps {
  viewCount: number;
  contactCount: number;
  avgRating: number;
  reviewCount: number;
}

export default function StatsCards({ viewCount, contactCount, avgRating, reviewCount }: StatsCardsProps) {
  const stats = [
    {
      label: 'Visitas al perfil',
      value: viewCount.toLocaleString('es-AR'),
      icon: Eye,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Contactos recibidos',
      value: contactCount.toLocaleString('es-AR'),
      icon: Phone,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Calificación promedio',
      value: avgRating > 0 ? avgRating.toFixed(1) : '—',
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Total de reseñas',
      value: reviewCount.toLocaleString('es-AR'),
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
