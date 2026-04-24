'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Category {
  id: string;
  name: string;
  description: string;
  count?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const supabase = createClient();

      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (data) {
        setCategories(data);
      }

      setIsLoading(false);
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Categorías</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-[#1B4332] mb-2">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>
            )}
            {category.count !== undefined && (
              <div className="text-sm text-gray-500">
                {category.count} profesionales
              </div>
            )}
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">No hay categorías registradas</p>
        </div>
      )}
    </div>
  );
}
