"use client";

'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, className }, ref) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visiblePages = pageNumbers.slice(
      Math.max(0, currentPage - 2),
      Math.min(totalPages, currentPage + 1)
    );

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-2', className)}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 text-sm font-medium text-[#1C1917] hover:bg-gray-100 rounded-md transition-colors"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="text-gray-400">...</span>
            )}
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'px-3 py-1 text-sm font-medium rounded-md transition-colors',
              currentPage === page
                ? 'bg-[#1B4332] text-white'
                : 'text-[#1C1917] hover:bg-gray-100'
            )}
          >
            {page}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 text-sm font-medium text-[#1C1917] hover:bg-gray-100 rounded-md transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination };
