'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
// crypto.randomUUID() is used below (available in Node 19+/Edge runtime)

export async function uploadPortfolioPhoto(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autenticado' };

  const file = formData.get('photo') as File;
  const caption = formData.get('caption') as string || null;
  if (!file) return { error: 'No se seleccionó ningún archivo' };
  if (file.size > 5 * 1024 * 1024) return { error: 'La imagen no puede superar los 5MB' };

  // Obtener perfil profesional
  const { data: prof } = await supabase
    .from('professional_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!prof) return { error: 'No se encontró tu perfil profesional' };

  // Verificar límite de fotos
  const { count } = await supabase
    .from('portfolio_images')
    .select('*', { count: 'exact', head: true })
    .eq('professional_id', prof.id);

  if ((count || 0) >= 10) return { error: 'Alcanzaste el máximo de 10 fotos' };

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileId = crypto.randomUUID();
  const path = `${user.id}/${fileId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('portfolio')
    .upload(path, file, { contentType: file.type });

  if (uploadError) return { error: 'Error al subir la imagen' };

  const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(path);

  const { error: dbError } = await supabase.from('portfolio_images').insert({
    professional_id: prof.id,
    image_url: publicUrl,
    caption,
    sort_order: (count || 0) + 1,
  });

  if (dbError) return { error: 'Error al guardar la imagen' };

  revalidatePath('/panel/fotos');
  return { success: 'Foto subida correctamente' };
}

export async function deletePortfolioPhoto(photoId: string) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'No autenticado' };

  // Verificar propiedad
  const { data: photo } = await supabase
    .from('portfolio_images')
    .select('*, professional:professional_profiles!professional_id(user_id)')
    .eq('id', photoId)
    .single();

  if (!photo || (photo as any).professional?.user_id !== user.id) {
    return { error: 'No tenés permiso para eliminar esta foto' };
  }

  // Eliminar de storage
  const urlParts = photo.image_url.split('/portfolio/');
  if (urlParts[1]) {
    await supabase.storage.from('portfolio').remove([urlParts[1]]);
  }

  // Eliminar de DB
  await supabase.from('portfolio_images').delete().eq('id', photoId);

  revalidatePath('/panel/fotos');
  return { success: 'Foto eliminada' };
}
