import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { ProfessionalProfile, ProfessionalCardData } from '@/lib/types';

export async function getProfessionalsByCategory(
  categorySlug: string,
  options?: { province?: string; city?: string; page?: number; limit?: number }
): Promise<{ data: ProfessionalCardData[]; count: number }> {
  const supabase = createServerSupabaseClient();
  const page = options?.page || 1;
  const limit = options?.limit || 12;
  const offset = (page - 1) * limit;

  // Obtener IDs de profesionales en esta categoría
  const { data: catData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (!catData) return { data: [], count: 0 };

  const { data: pcData } = await supabase
    .from('professional_categories')
    .select('professional_id')
    .eq('category_id', catData.id);

  const profIds = (pcData || []).map(pc => pc.professional_id);
  if (profIds.length === 0) return { data: [], count: 0 };

  let query = supabase
    .from('professional_profiles')
    .select(`
      id, slug, business_name, description, province, city,
      avg_rating, review_count, is_verified, is_featured, whatsapp,
      user_id
    `, { count: 'exact' })
    .in('id', profIds)
    .eq('is_active', true);

  if (options?.province) query = query.eq('province', options.province);
  if (options?.city) query = query.eq('city', options.city);

  const { data, count, error } = await query
    .order('is_featured', { ascending: false })
    .order('avg_rating', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  // Enriquecer con datos del perfil y categorías
  const enriched: ProfessionalCardData[] = await Promise.all(
    (data || []).map(async (prof) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', prof.user_id)
        .single();

      const { data: cats } = await supabase
        .from('professional_categories')
        .select('category_id')
        .eq('professional_id', prof.id);

      const catIds = (cats || []).map(c => c.category_id);
      const { data: catNames } = await supabase
        .from('categories')
        .select('name, slug')
        .in('id', catIds);

      return {
        ...prof,
        full_name: profile?.full_name || '',
        avatar_url: profile?.avatar_url || null,
        categories: catNames || [],
      };
    })
  );

  return { data: enriched, count: count || 0 };
}

export async function getProfessionalBySlug(slug: string): Promise<ProfessionalProfile | null> {
  const supabase = createServerSupabaseClient();

  const { data: prof, error } = await supabase
    .from('professional_profiles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !prof) return null;

  // Obtener perfil de usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', prof.user_id)
    .single();

  // Obtener categorías
  const { data: pcData } = await supabase
    .from('professional_categories')
    .select('category_id')
    .eq('professional_id', prof.id);

  const catIds = (pcData || []).map(c => c.category_id);
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .in('id', catIds.length > 0 ? catIds : [-1]);

  // Obtener fotos
  const { data: photos } = await supabase
    .from('portfolio_images')
    .select('*')
    .eq('professional_id', prof.id)
    .order('sort_order');

  // Obtener reseñas aprobadas
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, author:profiles!author_id(full_name, avatar_url)')
    .eq('professional_id', prof.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  // Incrementar view_count
  await supabase
    .from('professional_profiles')
    .update({ view_count: (prof.view_count || 0) + 1 })
    .eq('id', prof.id);

  return {
    ...prof,
    profile: profile || undefined,
    categories: categories || [],
    portfolio_images: photos || [],
    reviews: reviews || [],
  };
}

export async function searchProfessionals(
  query: string,
  options?: { province?: string; city?: string; page?: number; limit?: number }
): Promise<{ data: ProfessionalCardData[]; count: number }> {
  const supabase = createServerSupabaseClient();
  const page = options?.page || 1;
  const limit = options?.limit || 12;
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from('professional_profiles')
    .select(`
      id, slug, business_name, description, province, city,
      avg_rating, review_count, is_verified, is_featured, whatsapp,
      user_id
    `, { count: 'exact' })
    .eq('is_active', true)
    .or(`description.ilike.%${query}%,zone_details.ilike.%${query}%,business_name.ilike.%${query}%`);

  if (options?.province) dbQuery = dbQuery.eq('province', options.province);
  if (options?.city) dbQuery = dbQuery.eq('city', options.city);

  const { data, count, error } = await dbQuery
    .order('is_featured', { ascending: false })
    .order('avg_rating', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  const enriched: ProfessionalCardData[] = await Promise.all(
    (data || []).map(async (prof) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', prof.user_id)
        .single();

      const { data: cats } = await supabase
        .from('professional_categories')
        .select('category_id')
        .eq('professional_id', prof.id);

      const catIds = (cats || []).map(c => c.category_id);
      const { data: catNames } = await supabase
        .from('categories')
        .select('name, slug')
        .in('id', catIds.length > 0 ? catIds : [-1]);

      return {
        ...prof,
        full_name: profile?.full_name || '',
        avatar_url: profile?.avatar_url || null,
        categories: catNames || [],
      };
    })
  );

  return { data: enriched, count: count || 0 };
}

export async function getFeaturedProfessionals(limit = 6): Promise<ProfessionalCardData[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('professional_profiles')
    .select(`
      id, slug, business_name, description, province, city,
      avg_rating, review_count, is_verified, is_featured, whatsapp,
      user_id
    `)
    .eq('is_active', true)
    .order('avg_rating', { ascending: false })
    .order('review_count', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return Promise.all(
    (data || []).map(async (prof) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', prof.user_id)
        .single();

      const { data: cats } = await supabase
        .from('professional_categories')
        .select('category_id')
        .eq('professional_id', prof.id);

      const catIds = (cats || []).map(c => c.category_id);
      const { data: catNames } = await supabase
        .from('categories')
        .select('name, slug')
        .in('id', catIds.length > 0 ? catIds : [-1]);

      return {
        ...prof,
        full_name: profile?.full_name || '',
        avatar_url: profile?.avatar_url || null,
        categories: catNames || [],
      };
    })
  );
}
