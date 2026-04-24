'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createReport(data: {
  reported_professional_id: string;
  reason: string;
  description: string;
}) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Debés iniciar sesión para reportar un perfil' };

  const { error } = await supabase.from('reports').insert({
    reporter_id: user.id,
    reported_professional_id: data.reported_professional_id,
    reason: data.reason,
    description: data.description,
    status: 'open',
  });

  if (error) return { error: 'Error al enviar el reporte. Intentá de nuevo.' };

  return { success: 'Tu reporte fue enviado. Lo revisaremos a la brevedad.' };
}

export async function resolveReport(reportId: string, action: 'resolved' | 'dismissed', notes?: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from('reports')
    .update({
      status: action,
      admin_notes: notes || null,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', reportId);

  if (error) return { error: 'Error al resolver el reporte' };

  revalidatePath('/admin/reportes');
  return { success: action === 'resolved' ? 'Reporte resuelto' : 'Reporte descartado' };
}
