"use client";

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

export interface Category {
  id: string | number;
  name: string;
  slug: string;
  icon?: string | null;
  professional_count?: number;
}

export interface CategoryGridProps {
  categories: Category[];
  className?: string;
}

const getIconComponent = (iconName?: string): LucideIcon => {
  if (!iconName) return Icons.Wrench;
  const Icon = Icons[iconName as keyof typeof Icons] as LucideIcon | undefined;
  return Icon || Icons.Wrench;
};

const CategoryGrid = React.forwardRef<HTMLDivElement, CategoryGridProps>(
  ({ categories, className }, ref) => (
    <div
      ref={ref}
      className={cn('w-full', className)}
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category) => {
          const IconComponent = getIconComponent(category.icon ?? undefined);

          return (
            <Link key={category.id} href={`/oficios/${category.slug}`}>
              <Card hover className="h-full">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B4332] to-[#153a28] flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#1C1917] mb-1">
                    {category.name}
                  </h3>
                  {category.professional_count !== undefined && (
                    <p className="text-sm text-gray-500">
                      {category.professional_count} profesionales
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  )
);

CategoryGrid.displayName = 'CategoryGrid';

export { CategoryGrid };
