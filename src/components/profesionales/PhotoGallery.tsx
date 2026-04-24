"use client";

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PhotoGalleryProps {
  photos: string[];
  className?: string;
}

const PhotoGallery = React.forwardRef<HTMLDivElement, PhotoGalleryProps>(
  ({ photos, className }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (!photos || photos.length === 0) {
      return null;
    }

    const handlePrevious = () => {
      if (selectedIndex !== null && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    };

    const handleNext = () => {
      if (selectedIndex !== null && selectedIndex < photos.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity"
            >
              <Image
                src={photo}
                alt={`Galería ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50"
              disabled={selectedIndex === 0}
            >
              <X className="w-6 h-6 text-white rotate-45" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-11/12 max-w-2xl aspect-video"
            >
              <Image
                src={photos[selectedIndex]}
                alt={`Galería ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50"
              disabled={selectedIndex === photos.length - 1}
            >
              <X className="w-6 h-6 text-white -rotate-45" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedIndex + 1} de {photos.length}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PhotoGallery.displayName = 'PhotoGallery';

export { PhotoGallery };
