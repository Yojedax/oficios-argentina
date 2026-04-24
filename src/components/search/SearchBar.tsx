"use client";

'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  ({ defaultValue = '', placeholder = '¿Qué servicio necesitás?', className }, ref) => {
    const router = useRouter();
    const [query, setQuery] = useState(defaultValue);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/buscar?q=${encodeURIComponent(query)}`);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn('flex gap-2 w-full max-w-md', className)}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'flex-1 h-12 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-[#1C1917] placeholder:text-gray-500 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent'
          )}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="px-4"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Buscar</span>
        </Button>
      </form>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
