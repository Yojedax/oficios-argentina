import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Category } from '@/lib/types';

export async function getCategories(): Promise<Category[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) return null;
  return data;
}

export async function getCategoriesWithSubcategories(): Promise<Category[]> {
  const supabase = createServerSupabaseClient();
  const { data: all, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  if (!all) return [];

  const parents = all.filter(c => !c.parent_id);
  return parents.map(p => ({
    ...p,
    subcategories: all.filter(c => c.parent_id === p.id),
  }));
}

export async function getCategoriesWithCounts(): Promise<(Category & { professional_count: number })[]> {
  const supabase = createServerSupabaseClient();

  // Obtener categorías principales
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .eq('is_active', true)
    .order('sort_order');

  if (catError) throw catError;
  if (!categories) return [];

  // Obtener conteos
  const { data: counts, error: countError } = await supabase
    .from('professional_categories')
    .select('category_id, professional_id');

  if (countError) throw countError;

  const countMap: Record<number, number> = {};
  (counts || []).forEach(pc => {
    countMap[pc.category_id] = (countMap[pc.category_id] || 0) + 1;
  });

  return categories.map(c => ({
    ...c,
    professional_count: countMap[c.id] || 0,
  }));
}
