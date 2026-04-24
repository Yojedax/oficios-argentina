"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { SearchBar } from '@/components/search/SearchBar';

export interface HeroSectionProps {
  className?: string;
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full py-12 sm:py-16 lg:py-20 px-4',
        'bg-gradient-to-br from-[#1B4332] to-[#153a28]',
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Encontrá al profesional indicado, cerca tuyo
        </h1>

        <p className="text-lg sm:text-xl text-gray-100 mb-8">
          Gasistas, plomeros, electricistas y más oficios en toda Argentina
        </p>

        <div className="flex justify-center mb-8">
          <SearchBar className="max-w-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-white font-semibold">Gratis</p>
            <p className="text-gray-100 text-sm">Completamente gratuito</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-white font-semibold">Sin intermediarios</p>
            <p className="text-gray-100 text-sm">Contacto directo</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-white font-semibold">Contacto directo</p>
            <p className="text-gray-100 text-sm">WhatsApp o teléfono</p>
          </div>
        </div>
      </div>
    </div>
  )
);

HeroSection.displayName = 'HeroSection';

export { HeroSection };
