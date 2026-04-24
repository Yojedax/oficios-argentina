'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleProfessionalStatus(professionalId: string, active: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('professional_profiles')
    .update({ is_active: active })
    .eq('id', professionalId);

  if (error) return { error: 'Error al cambiar el estado' };

  revalidatePath('/admin/profesionales');
  return { success: active ? 'Profesional activado' : 'Profesional desactivado' };
}

export async function toggleProfessionalVerified(professionalId: string, verified: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('professional_profiles')
    .update({ is_verified: verified })
    .eq('id', professionalId);

  if (error) return { error: 'Error al cambiar el estado de verificación' };

  revalidatePath('/admin/profesionales');
  return { success: verified ? 'Profesional verificado' : 'Verificación removida' };
}

export async function getAdminStats() {
  const supabase = createAdminClient();

  const [
    { count: totalProfessionals },
    { count: activeProfessionals },
    { count: totalClients },
    { count: totalReviews },
    { count: pendingReviews },
    { count: openReports },
  ] = await Promise.all([
    supabase.from('professional_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('professional_profiles').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
    supabase.from('reviews').select('*', { count: 'exact', head: true }),
    supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'open'),
  ]);

  return {
    total_professionals: totalProfessionals || 0,
    active_professionals: activeProfessionals || 0,
    total_clients: totalClients || 0,
    total_reviews: totalReviews || 0,
    pending_reviews: pendingReviews || 0,
    open_reports: openReports || 0,
  };
}

export async function getAllProfessionals(page = 1, limit = 20) {
  const supabase = createAdminClient();
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from('professional_profiles')
    .select(`
      *,
      profile:profiles!user_id(full_name, avatar_url)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { data: data || [], count: count || 0 };
}

export async function getAllReports(status?: string) {
  const supabase = createAdminClient();

  let query = supabase
    .from('reports')
    .select(`
      *,
      reporter:profiles!reporter_id(full_name),
      professional:professional_profiles!reported_professional_id(slug, business_name, user_id)
    `)
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}
