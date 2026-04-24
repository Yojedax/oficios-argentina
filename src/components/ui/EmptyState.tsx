"use client";

import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon: Icon, title, description, action, className }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col items-center justify-center py-12 px-4', className)}
    >
      {Icon && (
        <div className="mb-4 p-3 rounded-full bg-gray-100">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#1C1917] mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} size="md">
          {action.label}
        </Button>
      )}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
