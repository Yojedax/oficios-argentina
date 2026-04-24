# Oficios Argentina

Marketplace web para conectar profesionales de oficios (gasistas, plomeros, electricistas, pintores, etc.) con clientes en toda Argentina.

## Stack Tecnologico

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Validacion**: React Hook Form + Zod
- **Emails**: Resend
- **Hosting**: Vercel

## Inicio Rapido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiar `.env.local.example` a `.env.local` y completar con tus credenciales de Supabase:

```bash
cp .env.local.example .env.local
```

Variables requeridas:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 3. Configurar base de datos

Ejecutar las migraciones en tu proyecto de Supabase (SQL Editor):

1. `supabase/migrations/001_initial_schema.sql` - Tablas, RLS, triggers, indices
2. `supabase/migrations/002_seed_data.sql` - Categorias, ubicaciones, planes

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

1. Subir el repositorio a GitHub
2. Importar en [vercel.com](https://vercel.com)
3. Configurar las variables de entorno en el dashboard de Vercel
4. Deploy automatico

## Estructura del Proyecto

```
src/
  app/                    # Rutas (App Router)
    (auth)/               # Registro, login, recuperar contrasena
    (public)/             # Paginas publicas (oficios, buscar, etc.)
    (dashboard)/          # Panel del profesional
    (admin)/              # Panel de administracion
    api/                  # API routes
  components/
    ui/                   # Componentes base (Button, Input, Card, etc.)
    layout/               # Header, Footer, MobileNav
    home/                 # HeroSection, CategoryGrid, etc.
    profesionales/        # ProfessionalCard, ReviewList, etc.
    search/               # SearchBar
    forms/                # ReviewForm, ContactForm, etc.
    dashboard/            # DashboardSidebar, StatsCards
    admin/                # AdminSidebar, AdminStats
  lib/
    supabase/             # Clientes de Supabase (browser + server)
    queries/              # Consultas a la base de datos
    actions/              # Server Actions (auth, profiles, reviews, etc.)
    validations/          # Esquemas Zod
    utils.ts              # Utilidades generales
    constants.ts          # Constantes de la app
    seo.ts                # Helpers de SEO y metadata
    types.ts              # Tipos TypeScript
supabase/
  migrations/             # SQL para crear tablas y seed data
```

## Funcionalidades

- Registro y login con roles (cliente / profesional)
- Perfil profesional con bio, categorias, ubicacion, galeria de fotos
- Busqueda por categoria, ubicacion y texto libre
- Sistema de resenas y calificaciones
- Contacto via WhatsApp y telefono
- Panel de profesional (editar perfil, fotos, ver resenas)
- Panel de administracion (moderar resenas, reportes, profesionales)
- SEO optimizado con metadata dinamica y JSON-LD
- Responsive (mobile-first)

## Licencia

Proyecto privado. Todos los derechos reservados.
