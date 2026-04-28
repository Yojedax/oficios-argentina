"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva('inline-flex items-center justify-center rounded-full font-medium text-white', {
  variants: {
    size: {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  name?: string;
  className?: string;
}

const getInitials = (name?: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name, size = 'md', className, alt, ...props }, ref) => {
    const initials = getInitials(name);
    const bgColor = src ? 'bg-gray-100' : 'bg-[#1B4332]';

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), bgColor, className)}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={cn('w-full h-full rounded-full object-cover', className)}
            {...props}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
