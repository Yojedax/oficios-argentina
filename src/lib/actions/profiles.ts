'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/utils';

export async function updateProfessionalProfile(data: {
  business_name?: string;
  description: string;
  whatsapp: string;
  phone?: string;
  email_contact?: string;
  experience_years?: number;
  availability?: string;
  province: string;
  city: string;
  zone_details?: string;
  category_ids: number[];
}) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autenticado' };

  // Verificar si ya existe un perfil profesional
  const { data: existing } = await supabase
    .from('professional_profiles')
    .select('id, slug')
    .eq('user_id', user.id)
    .single();

  const profileData = {
    user_id: user.id,
    business_name: data.business_name || null,
    description: data.description,
    whatsapp: data.whatsapp,
    phone: data.phone || null,
    email_contact: data.email_contact || null,
    experience_years: data.experience_years || 0,
    availability: data.availability || null,
    province: data.province,
    city: data.city,
    zone_details: data.zone_details || null,
  };

  let professionalId: string;

  if (existing) {
    // Actualizar
    const { error } = await supabase
      .from('professional_profiles')
      .update(profileData)
      .eq('id', existing.id);

    if (error) return { error: 'Error al actualizar el perfil' };
    professionalId = existing.id;
  } else {
    // Crear nuevo
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    const slug = slugify(data.business_name || profile?.full_name || user.id);

    const { data: created, error } = await supabase
      .from('professional_profiles')
      .insert({ ...profileData, slug })
      .select('id')
      .single();

    if (error || !created) return { error: 'Error al crear el perfil profesional' };
    professionalId = created.id;
  }

  // Actualizar categorías
  await supabase
    .from('professional_categories')
    .delete()
    .eq('professional_id', professionalId);

  if (data.category_ids.length > 0) {
    const categoryRows = data.category_ids.map(catId => ({
      professional_id: professionalId,
      category_id: catId,
    }));
    await supabase.from('professional_categories').insert(categoryRows);
  }

  revalidatePath('/panel/perfil');
  revalidatePath('/oficios');
  return { success: 'Perfil actualizado correctamente' };
}

export async function uploadAvatar(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autenticado' };

  const file = formData.get('avatar') as File;
  if (!file) return { error: 'No se seleccionó ningún archivo' };

  if (file.size > 5 * 1024 * 1024) return { error: 'La imagen no puede superar los 5MB' };

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${user.id}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) return { error: 'Error al subir la imagen' };

  const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);

  await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id);

  revalidatePath('/panel/perfil');
  return { success: 'Foto de perfil actualizada', url: publicUrl };
}

export async function toggleProfileActive(active: boolean) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autenticado' };

  const { error } = await supabase
    .from('professional_profiles')
    .update({ is_active: active })
    .eq('user_id', user.id);

  if (error) return { error: 'Error al cambiar el estado del perfil' };

  revalidatePath('/panel');
  return { success: active ? 'Perfil activado' : 'Perfil desactivado' };
}
