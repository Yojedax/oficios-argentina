'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '@/lib/validations/profile';
import { updateProfessionalProfile } from '@/lib/actions/profiles';
import { createClient } from '@/lib/supabase/client';

interface CategoryOption {
  id: number;
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
    defaultValues: {
      category_ids: [],
    },
  });

  const selectedProvince = watch('province');
  const selectedCategoryIds = watch('category_ids') || [];

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('professional_profiles')
        .select('*, professional_categories(category_id)')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setValue('business_name', profile.business_name || '');
        setValue('description', profile.description || '');
        setValue('whatsapp', profile.whatsapp || '');
        setValue('phone', profile.phone || '');
        setValue('email_contact', profile.email_contact || '');
        setValue('experience_years', profile.experience_years || 0);
        setValue('availability', profile.availability || '');
        setValue('province', profile.province || '');
        setValue('city', profile.city || '');
        setValue('zone_details', profile.zone_details || '');
        const catIds = (profile.professional_categories as { category_id: number }[] | null)?.map(
          (pc: { category_id: number }) => pc.category_id
        ) || [];
        setValue('category_ids', catIds);
      }

      const { data: catsData } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (catsData) {
        setCategories(
          catsData.map((cat: { id: number; name: string }) => ({ id: cat.id, name: cat.name }))
        );
      }

      const { data: provsData } = await supabase
        .from('provinces')
        .select('name, cities')
        .order('name');

      if (provsData) {
        setProvinces(provsData as unknown as Province[]);
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

  const handleCategoryToggle = (catId: number) => {
    const current = selectedCategoryIds;
    if (current.includes(catId)) {
      setValue('category_ids', current.filter((id) => id !== catId), { shouldValidate: true });
    } else {
      setValue('category_ids', [...current, catId], { shouldValidate: true });
    }
  };

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
    } catch {
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
            Nombre del Negocio / Nombre Profesional
          </label>
          <input
            {...register('business_name')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
            placeholder="Ej: Electricidad García, Juan Plomero..."
          />
          {errors.business_name && (
            <p className="text-red-600 text-sm mt-1">{errors.business_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email de Contacto
          </label>
          <input
            {...register('email_contact')}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
            placeholder="email@ejemplo.com"
          />
          {errors.email_contact && (
            <p className="text-red-600 text-sm mt-1">{errors.email_contact.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp *
          </label>
          <input
            {...register('whatsapp')}
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
            placeholder="Ej: 1155667788"
          />
          {errors.whatsapp && (
            <p className="text-red-600 text-sm mt-1">{errors.whatsapp.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
            placeholder="Ej: 011-4555-6677"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provincia *
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
            Ciudad *
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detalles de zona
          </label>
          <input
            {...register('zone_details')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
            placeholder="Ej: Zona Norte, Capital Federal, etc."
          />
          {errors.zone_details && (
            <p className="text-red-600 text-sm mt-1">{errors.zone_details.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Especialidades * (máximo 5)
          </label>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(cat.id)}
                  onChange={() => handleCategoryToggle(cat.id)}
                  className="w-4 h-4 text-[#1B4332] rounded"
                />
                <span className="ml-3 text-gray-700">{cat.name}</span>
              </label>
            ))}
          </div>
          {errors.category_ids && (
            <p className="text-red-600 text-sm mt-1">{errors.category_ids.message}</p>
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
            Descripción *
          </label>
          <textarea
            {...register('description')}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent resize-none"
            placeholder="Contá sobre tu experiencia, especialidades y lo que te diferencia... (mínimo 50 caracteres)"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
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
