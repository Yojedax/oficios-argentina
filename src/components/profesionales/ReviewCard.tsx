"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';

export interface ReviewCardData {
  id: string;
  author_name: string;
  author_avatar?: string;
  rating: number;
  comment: string;
  created_at: string | Date;
}

export interface ReviewCardProps {
  review: ReviewCardData;
  className?: string;
}

const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const reviewDate = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - reviewDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Hace 1 día';
  if (diffDays < 30) return `Hace ${diffDays} días`;
  if (diffMonths === 1) return 'Hace 1 mes';
  if (diffMonths < 12) return `Hace ${diffMonths} meses`;
  if (diffYears === 1) return 'Hace 1 año';
  return `Hace ${diffYears} años`;
};

const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  ({ review, className }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 border border-gray-200 rounded-lg', className)}
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar
          src={review.author_avatar}
          name={review.author_name}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#1C1917] truncate">
            {review.author_name}
          </h4>
          <p className="text-xs text-gray-500">
            {getRelativeTime(review.created_at)}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <StarRating value={review.rating} size="sm" readOnly />
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">
        {review.comment}
      </p>
    </div>
  )
);

ReviewCard.displayName = 'ReviewCard';

export { ReviewCard };
