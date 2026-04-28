"use client";

import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';

export interface ProfessionalCardData {
  id: string;
  full_name?: string;
  name?: string;
  business_name?: string | null;
  avatar_url?: string | null;
  categories?: (string | { name: string; slug: string })[];
  city?: string | null;
  province?: string | null;
  avg_rating?: number;
  review_count?: number;
  description?: string;
  phone?: string | null;
  whatsapp?: string;
  slug?: string;
  is_verified?: boolean;
  is_featured?: boolean;
}

export interface ProfessionalCardProps {
  professional: ProfessionalCardData;
  className?: string;
}

const ProfessionalCard = React.forwardRef<HTMLDivElement, ProfessionalCardProps>(
  ({ professional, className }, ref) => {
    const displayName = professional.business_name || professional.full_name || professional.name || 'Profesional';
    const location = professional.city
      ? `${professional.city}${professional.province ? ', ' + professional.province : ''}`
      : '';
    const whatsappNumber = professional.whatsapp || professional.phone || '';
    const whatsappLink = whatsappNumber
      ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
      : '';
    const truncatedDescription = professional.description
      ? professional.description.substring(0, 120) + (professional.description.length > 120 ? '...' : '')
      : '';

    return (
      <Card ref={ref} className={cn('overflow-hidden', className)}>
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar
              src={professional.avatar_url ?? undefined}
              name={displayName}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[#1C1917] truncate">
                {displayName}
              </h3>
              {location && (
                <p className="text-sm text-gray-600 truncate">
                  {location}
                </p>
              )}
            </div>
          </div>

          {professional.categories && professional.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {professional.categories.slice(0, 3).map((category, idx) => {
                const catName = typeof category === 'string' ? category : category.name;
                return (
                  <Badge key={catName || idx} variant="secondary" className="text-xs">
                    {catName}
                  </Badge>
                );
              })}
            </div>
          )}

          {(professional.avg_rating || professional.avg_rating === 0) && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating value={Math.round(professional.avg_rating || 0)} size="sm" readOnly />
              <span className="text-sm text-gray-600">
                ({professional.review_count || 0})
              </span>
            </div>
          )}

          {truncatedDescription && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {truncatedDescription}
            </p>
          )}

          <div className="flex gap-2">
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            )}
            {professional.slug && (
              <Link
                href={`/profesionales/${professional.slug}`}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Ver perfil
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

ProfessionalCard.displayName = 'ProfessionalCard';

export { ProfessionalCard };
