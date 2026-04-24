// ============================================
// Oficios Argentina - TypeScript Types
// ============================================

export type UserRole = 'client' | 'professional' | 'admin';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';
export type ReportStatus = 'open' | 'in_review' | 'resolved' | 'dismissed';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  email_visible: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  parent_id: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  // Computed
  subcategories?: Category[];
  professional_count?: number;
}

export interface Location {
  id: number;
  province: string;
  city: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
}

export interface ProfessionalProfile {
  id: string;
  user_id: string;
  slug: string;
  business_name: string | null;
  description: string;
  whatsapp: string;
  phone: string | null;
  email_contact: string | null;
  experience_years: number;
  availability: string | null;
  zone_details: string | null;
  province: string | null;
  city: string | null;
  is_active: boolean;
  is_verified: boolean;
  is_featured: boolean;
  avg_rating: number;
  review_count: number;
  view_count: number;
  contact_count: number;
  created_at: string;
  updated_at: string;
  // Relaciones
  profile?: Profile;
  categories?: Category[];
  portfolio_images?: PortfolioImage[];
  reviews?: Review[];
}

export interface PortfolioImage {
  id: string;
  professional_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface Review {
  id: string;
  professional_id: string;
  author_id: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  // Relación
  author?: Profile;
  professional?: ProfessionalProfile;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_professional_id: string;
  reason: string;
  description: string;
  status: ReportStatus;
  admin_notes: string | null;
  resolved_at: string | null;
  created_at: string;
  reporter?: Profile;
  professional?: ProfessionalProfile;
}

export interface Contact {
  id: string;
  professional_id: string;
  from_name: string;
  from_email: string;
  from_phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  professional_id: string;
  created_at: string;
}

// Para cards y listados
export interface ProfessionalCardData {
  id: string;
  slug: string;
  business_name: string | null;
  full_name: string;
  avatar_url: string | null;
  description: string;
  province: string | null;
  city: string | null;
  avg_rating: number;
  review_count: number;
  is_verified: boolean;
  is_featured: boolean;
  categories: { name: string; slug: string }[];
  whatsapp: string;
}

// Estadísticas del admin
export interface AdminStats {
  total_professionals: number;
  active_professionals: number;
  total_clients: number;
  total_reviews: number;
  pending_reviews: number;
  open_reports: number;
  registrations_last_7_days: number;
}

// Estadísticas del dashboard profesional
export interface ProfessionalStats {
  view_count: number;
  contact_count: number;
  avg_rating: number;
  review_count: number;
}

// Provincias argentinas para el select
export const PROVINCES = [
  'Ciudad Autónoma de Buenos Aires',
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
] as const;

export const REPORT_REASONS = [
  'Información falsa o engañosa',
  'Contenido inapropiado',
  'Spam o publicidad',
  'El profesional no responde o no existe',
  'Mala experiencia grave',
  'Suplantación de identidad',
  'Otro',
] as const;
