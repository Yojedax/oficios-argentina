'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createReview(data: {
  professional_id: string;
  rating: number;
  comment: string;
}) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Debés iniciar sesión para dejar una reseña' };

  // Verificar que no sea auto-reseña
  const { data: prof } = await supabase
    .from('professional_profiles')
    .select('user_id, slug')
    .eq('id', data.professional_id)
    .single();

  if (prof?.user_id === user.id) {
    return { error: 'No podés dejar una reseña sobre vos mismo' };
  }

  const { error } = await supabase.from('reviews').insert({
    professional_id: data.professional_id,
    author_id: user.id,
    rating: data.rating,
    comment: data.comment,
    status: 'pending',
  });

  if (error) {
    if (error.code === '23505') {
      return { error: 'Ya dejaste una reseña para este profesional' };
    }
    return { error: 'Error al enviar la reseña. Intentá de nuevo.' };
  }

  if (prof?.slug) revalidatePath(`/profesional/${prof.slug}`);
  return { success: 'Tu reseña fue enviada y está pendiente de aprobación.' };
}

export async function moderateReview(reviewId: string, action: 'approved' | 'rejected', reason?: string) {
  const supabase = createServerSupabaseClient();

  const updateData: Record<string, unknown> = { status: action };
  if (action === 'rejected' && reason) {
    updateData.rejection_reason = reason;
  }

  const { error } = await supabase
    .from('reviews')
    .update(updateData)
    .eq('id', reviewId);

  if (error) return { error: 'Error al moderar la reseña' };

  revalidatePath('/admin/resenas');
  return { success: action === 'approved' ? 'Reseña aprobada' : 'Reseña rechazada' };
}
