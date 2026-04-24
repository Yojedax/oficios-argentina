"use client";

import React from 'react';
import { Search, Users, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HowItWorksProps {
  className?: string;
}

const steps = [
  {
    number: 1,
    title: 'Buscá',
    description: 'Elegí el oficio que necesitás y tu zona',
    icon: Search,
  },
  {
    number: 2,
    title: 'Elegí',
    description: 'Compará perfiles, fotos y reseñas',
    icon: Users,
  },
  {
    number: 3,
    title: 'Contactá',
    description: 'Escribí por WhatsApp o llamá directamente',
    icon: MessageCircle,
  },
];

const HowItWorks = React.forwardRef<HTMLDivElement, HowItWorksProps>(
  ({ className }, ref) => (
    <div
      ref={ref}
      className={cn('w-full py-12 sm:py-16 bg-gray-50', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] mb-12 text-center">
          Cómo funciona
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-[#1B4332]">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-[#1C1917] mb-2">
                  {step.number}. {step.title}
                </h3>

                <p className="text-gray-600">
                  {step.description}
                </p>

                {step.number < 3 && (
                  <div className="hidden md:block absolute mt-24 ml-40 text-gray-300 text-2xl">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
);

HowItWorks.displayName = 'HowItWorks';

export { HowItWorks };
