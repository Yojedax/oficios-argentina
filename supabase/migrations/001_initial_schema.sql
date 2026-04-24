-- ============================================
-- OFICIOS ARGENTINA - Schema Inicial Completo
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsqueda fuzzy

-- ============================================
-- ENUM TYPES
-- ============================================
CREATE TYPE user_role AS ENUM ('client', 'professional', 'admin');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE report_status AS ENUM ('open', 'in_review', 'resolved', 'dismissed');
CREATE TYPE contact_method AS ENUM ('whatsapp', 'phone', 'form');

-- ============================================
-- TABLA: profiles
-- Extiende auth.users con datos de la app
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'client',
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  phone TEXT,
  email_visible TEXT, -- email público (puede diferir del de auth)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TABLA: categories
-- Categorías de oficios con soporte para subcategorías
-- ============================================
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT, -- nombre del ícono de Lucide
  parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- ============================================
-- TABLA: locations
-- Provincias y ciudades argentinas
-- ============================================
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_locations_province ON locations(province);
CREATE INDEX idx_locations_slug ON locations(slug);

-- ============================================
-- TABLA: professional_profiles
-- Perfil extendido para profesionales
-- ============================================
CREATE TABLE professional_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  business_name TEXT, -- nombre comercial opcional
  description TEXT NOT NULL DEFAULT '',
  whatsapp TEXT NOT NULL DEFAULT '',
  phone TEXT,
  email_contact TEXT,
  experience_years INTEGER DEFAULT 0,
  availability TEXT, -- texto libre: "Lunes a viernes 8-18"
  zone_details TEXT, -- barrios/zonas en texto libre

  -- Ubicación principal
  province TEXT,
  city TEXT,

  -- Estado
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,

  -- Métricas (actualizadas por triggers)
  avg_rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  contact_count INTEGER DEFAULT 0,

  -- Futuro
  verification_data JSONB, -- para almacenar docs de verificación

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_prof_user ON professional_profiles(user_id);
CREATE INDEX idx_prof_slug ON professional_profiles(slug);
CREATE INDEX idx_prof_active ON professional_profiles(is_active);
CREATE INDEX idx_prof_province_city ON professional_profiles(province, city);
CREATE INDEX idx_prof_rating ON professional_profiles(avg_rating DESC);
CREATE INDEX idx_prof_featured ON professional_profiles(is_featured DESC, avg_rating DESC);

-- Índice para búsqueda full-text
CREATE INDEX idx_prof_search ON professional_profiles
  USING GIN (to_tsvector('spanish', coalesce(description, '') || ' ' || coalesce(zone_details, '') || ' ' || coalesce(business_name, '')));

-- ============================================
-- TABLA: professional_categories (many-to-many)
-- ============================================
CREATE TABLE professional_categories (
  id SERIAL PRIMARY KEY,
  professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(professional_id, category_id)
);

CREATE INDEX idx_pc_professional ON professional_categories(professional_id);
CREATE INDEX idx_pc_category ON professional_categories(category_id);

-- ============================================
-- TABLA: professional_locations (many-to-many)
-- ============================================
CREATE TABLE professional_locations (
  id SERIAL PRIMARY KEY,
  professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  UNIQUE(professional_id, location_id)
);

CREATE INDEX idx_pl_professional ON professional_locations(professional_id);
CREATE INDEX idx_pl_location ON professional_locations(location_id);

-- ============================================
-- TABLA: portfolio_images
-- Fotos de trabajos realizados
-- ============================================
CREATE TABLE portfolio_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_portfolio_professional ON portfolio_images(professional_id);

-- ============================================
-- TABLA: reviews
-- Reseñas de clientes a profesionales
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL CHECK (char_length(comment) >= 20),
  status review_status NOT NULL DEFAULT 'pending',
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(professional_id, author_id) -- una reseña por cliente por profesional
);

CREATE INDEX idx_reviews_professional ON reviews(professional_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_author ON reviews(author_id);

-- ============================================
-- TABLA: reports
-- Denuncias / reportes
-- ============================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  description TEXT NOT NULL,
  status report_status NOT NULL DEFAULT 'open',
  admin_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_professional ON reports(reported_professional_id);

-- ============================================
-- TABLA: contacts
-- Registros de contacto (solo formulario interno)
-- ============================================
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  from_name TEXT NOT NULL,
  from_email TEXT NOT NULL,
  from_phone TEXT,
  message TEXT NOT NULL,
  contact_method contact_method NOT NULL DEFAULT 'form',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_professional ON contacts(professional_id);

-- ============================================
-- TABLA: favorites
-- ============================================
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, professional_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);

-- ============================================
-- TABLA: activity_logs
-- Logs de actividad para auditoría
-- ============================================
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT, -- 'profile', 'review', 'report'
  entity_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_logs_user ON activity_logs(user_id);
CREATE INDEX idx_logs_action ON activity_logs(action);

-- ============================================
-- TABLA: plans (futuro - preparado)
-- ============================================
CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price_ars NUMERIC(10,2),
  features JSONB,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TABLA: subscriptions (futuro - preparado)
-- ============================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES plans(id),
  status TEXT NOT NULL DEFAULT 'inactive',
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, role, full_name)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_professional_profiles_updated_at
  BEFORE UPDATE ON professional_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Recalcular rating promedio cuando se aprueba/elimina una reseña
CREATE OR REPLACE FUNCTION recalculate_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE professional_profiles SET
      avg_rating = COALESCE((SELECT AVG(rating) FROM reviews WHERE professional_id = OLD.professional_id AND status = 'approved'), 0),
      review_count = (SELECT COUNT(*) FROM reviews WHERE professional_id = OLD.professional_id AND status = 'approved')
    WHERE id = OLD.professional_id;
    RETURN OLD;
  ELSE
    UPDATE professional_profiles SET
      avg_rating = COALESCE((SELECT AVG(rating) FROM reviews WHERE professional_id = NEW.professional_id AND status = 'approved'), 0),
      review_count = (SELECT COUNT(*) FROM reviews WHERE professional_id = NEW.professional_id AND status = 'approved')
    WHERE id = NEW.professional_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER recalculate_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION recalculate_rating();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- PROFESSIONAL PROFILES
CREATE POLICY "Active professionals are viewable by everyone" ON professional_profiles
  FOR SELECT USING (is_active = true OR user_id = auth.uid());
CREATE POLICY "Professionals can insert own profile" ON professional_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Professionals can update own profile" ON professional_profiles
  FOR UPDATE USING (user_id = auth.uid());

-- PROFESSIONAL CATEGORIES
CREATE POLICY "Professional categories viewable by all" ON professional_categories FOR SELECT USING (true);
CREATE POLICY "Professionals manage own categories" ON professional_categories
  FOR ALL USING (
    professional_id IN (SELECT id FROM professional_profiles WHERE user_id = auth.uid())
  );

-- PROFESSIONAL LOCATIONS
CREATE POLICY "Professional locations viewable by all" ON professional_locations FOR SELECT USING (true);
CREATE POLICY "Professionals manage own locations" ON professional_locations
  FOR ALL USING (
    professional_id IN (SELECT id FROM professional_profiles WHERE user_id = auth.uid())
  );

-- PORTFOLIO IMAGES
CREATE POLICY "Portfolio images viewable by all" ON portfolio_images FOR SELECT USING (true);
CREATE POLICY "Professionals manage own photos" ON portfolio_images
  FOR ALL USING (
    professional_id IN (SELECT id FROM professional_profiles WHERE user_id = auth.uid())
  );

-- REVIEWS
CREATE POLICY "Approved reviews viewable by all" ON reviews
  FOR SELECT USING (status = 'approved' OR author_id = auth.uid());
CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND author_id = auth.uid());
CREATE POLICY "Authors can update own reviews" ON reviews
  FOR UPDATE USING (author_id = auth.uid());

-- REPORTS
CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND reporter_id = auth.uid());
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (reporter_id = auth.uid());

-- CONTACTS
CREATE POLICY "Anyone can create contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Professionals can view own contacts" ON contacts
  FOR SELECT USING (
    professional_id IN (SELECT id FROM professional_profiles WHERE user_id = auth.uid())
  );

-- FAVORITES
CREATE POLICY "Users manage own favorites" ON favorites
  FOR ALL USING (user_id = auth.uid());

-- CATEGORIES (read-only público)
CREATE POLICY "Categories viewable by all" ON categories FOR SELECT USING (true);

-- LOCATIONS (read-only público)
CREATE POLICY "Locations viewable by all" ON locations FOR SELECT USING (true);

-- ACTIVITY LOGS
CREATE POLICY "Logs viewable by admins only" ON activity_logs FOR SELECT USING (false);
CREATE POLICY "System can insert logs" ON activity_logs FOR INSERT WITH CHECK (true);

-- ============================================
-- STORAGE BUCKETS (ejecutar en Supabase Dashboard > Storage)
-- ============================================
-- Bucket: avatars (público para lectura)
-- Bucket: portfolio (público para lectura)
-- Las políticas de storage se configuran desde el dashboard
