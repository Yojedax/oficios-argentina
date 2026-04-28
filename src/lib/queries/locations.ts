import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Location } from '@/lib/types';

export async function getLocations(): Promise<Location[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('province')
    .order('sort_order');

  if (error) throw error;
  return data || [];
}

export async function getProvinces(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('locations')
    .select('province')
    .eq('is_active', true)
    .order('province');

  if (error) throw error;
  const unique = Array.from(new Set((data || []).map((l: { province: string }) => l.province)));
  return unique;
}

export async function getCitiesByProvince(province: string): Promise<Location[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('province', province)
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
}
