"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { ProfessionalCard, ProfessionalCardData } from '@/components/profesionales/ProfessionalCard';

export interface FeaturedProfessionalsProps {
  professionals: ProfessionalCardData[];
  className?: string;
}

const FeaturedProfessionals = React.forwardRef<HTMLDivElement, FeaturedProfessionalsProps>(
  ({ professionals, className }, ref) => (
    <div
      ref={ref}
      className={cn('w-full py-12 sm:py-16', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] mb-8 text-center">
          Profesionales destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
            />
          ))}
        </div>
      </div>
    </div>
  )
);

FeaturedProfessionals.displayName = 'FeaturedProfessionals';

export { FeaturedProfessionals };
