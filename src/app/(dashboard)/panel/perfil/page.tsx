'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '@/lib/validations/profile';
import { updateProfessionalProfile } from '@/lib/actions/profiles';
import { createClient } from '@/lib/supabase/client';

interface CategoryOption {
  id: string;
  name: string;
}

interface Province {
  name: string;
  cities: string[];
}

export default function ProfileEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const selectedProvince = watch('province');
  const selectedCategories = watch('categories') || [];

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('professional_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setValue('full_name', profile.full_name || '');
        setValue('email', user.email || '');
        setValue('province', profile.province || '');
        setValue('city', profile.city || '');
        setValue('bio', profile.bio || '');
        setValue('experience_years', profile.experience_years || 0);
        setValue('availability', profile.availability || '');
        setValue('categories', profile.categories || []);
      }

      const { data: catsData } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (catsData) {
        setCategories(
          catsData.map((cat: any) => ({ id: cat.id, name: cat.name }))
        );
      }

      const { data: provsData } = await supabase
        .from('provinces')
        .select('name, cities')
        .order('name');

      if (provsData) {
        setProvinces(provsData as any);
      }

      setIsLoading(false);
    };

    loadData();
  }, [setValue]);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find((p) => p.name === selectedProvince);
      setCities(province?.cities || []);
    }
  }, [selectedProvince, provinces]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await updateProfessionalProfile(data);

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage('Perfil actualizado exitosamente');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error. Intentá de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Editar Perfil</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            {...register('full_name')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
          />
          {errors.full_name && (
            <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo (no editable)
          </label>
          <input
            {...register('email')}
            type="email"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provincia
          </label>
          <select
            {...register('province')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
          >
            <option value="">Seleccionar provincia</option>
            {provinces.map((prov) => (
              <option key={prov.name} value={prov.name}>
                {prov.name}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-red-600 text-sm mt-1">{errors.province.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <select
            {...register('city')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
            disabled={!selectedProvince}
          >
            <option value="">Seleccionar ciudad</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Especialidades
          </label>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={cat.name}
                  {...register('categories')}
                  className="w-4 h-4 text-[#1B4332] rounded"
                />
                <span className="ml-3 text-gray-700">{cat.name}</span>
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="text-red-600 text-sm mt-1">{errors.categories.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Años de Experiencia
          </label>
          <input
            {...register('experience_years', { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
          />
          {errors.experience_years && (
            <p className="text-red-600 text-sm mt-1">{errors.experience_years.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disponibilidad
          </label>
          <select
            {...register('availability')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
          >
            <option value="">Seleccionar disponibilidad</option>
            <option value="Disponible ahora">Disponible ahora</option>
            <option value="Disponible en 1-2 semanas">Disponible en 1-2 semanas</option>
            <option value="Solo proyectos puntuales">Solo proyectos puntuales</option>
            <option value="No disponible actualmente">No disponible actualmente</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sobre ti
          </label>
          <textarea
            {...register('bio')}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent resize-none"
            placeholder="Contá sobre tu experiencia, especialidades y lo que te diferencia..."
          />
          {errors.bio && (
            <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#1B4332] text-white py-2 rounded-lg font-semibold hover:bg-[#0f2818] disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}
