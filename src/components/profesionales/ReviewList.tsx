"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { ReviewCard, ReviewCardData } from './ReviewCard';

export interface ReviewListProps {
  reviews: ReviewCardData[];
  className?: string;
}

const ReviewList = React.forwardRef<HTMLDivElement, ReviewListProps>(
  ({ reviews, className }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-bold text-[#1C1917] mb-6">
        Reseñas ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay reseñas aún. Sé el primero en dejar una opinión.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
);

ReviewList.displayName = 'ReviewList';

export { ReviewList };
