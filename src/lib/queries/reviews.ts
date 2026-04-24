import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Review } from '@/lib/types';

export async function getReviewsByProfessional(professionalId: string): Promise<Review[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*, author:profiles!author_id(full_name, avatar_url)')
    .eq('professional_id', professionalId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getPendingReviews(): Promise<Review[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      author:profiles!author_id(full_name, avatar_url),
      professional:professional_profiles!professional_id(slug, business_name, user_id)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getReviewsForProfessionalDashboard(userId: string): Promise<Review[]> {
  const supabase = createServerSupabaseClient();

  // Obtener professional_id del usuario
  const { data: prof } = await supabase
    .from('professional_profiles')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (!prof) return [];

  const { data, error } = await supabase
    .from('reviews')
    .select('*, author:profiles!author_id(full_name, avatar_url)')
    .eq('professional_id', prof.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
