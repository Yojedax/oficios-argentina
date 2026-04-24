"use client";

'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const starVariants = cva('transition-all duration-200', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface StarRatingProps extends VariantProps<typeof starVariants> {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  ({ value, onChange, readOnly = false, size = 'md', className }, ref) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const handleClick = (rating: number) => {
      if (!readOnly && onChange) {
        onChange(rating);
      }
    };

    const displayValue = hoverValue || value;

    return (
      <div
        ref={ref}
        className={cn('flex gap-1', !readOnly && 'cursor-pointer', className)}
        onMouseLeave={() => setHoverValue(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && setHoverValue(star)}
            disabled={readOnly}
            className={cn(
              'focus:outline-none focus:ring-2 focus:ring-[#1B4332] rounded-full',
              readOnly && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                starVariants({ size }),
                displayValue >= star
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          </button>
        ))}
      </div>
    );
  }
);

StarRating.displayName = 'StarRating';

export { StarRating };
