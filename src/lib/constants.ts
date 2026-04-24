// Constantes de la aplicación

export const APP_NAME = 'Oficios Argentina';
export const APP_DESCRIPTION = 'Encontrá al profesional indicado, cerca tuyo. Gasistas, plomeros, electricistas, albañiles, pintores y más oficios en toda Argentina.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.oficiosargentina.com.ar';

// Límites
export const MAX_PORTFOLIO_IMAGES = 10;
export const MAX_CATEGORIES_PER_PROFESSIONAL = 5;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const MAX_REVIEW_LENGTH = 1000;
export const MIN_REVIEW_LENGTH = 20;
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

// Mapeo de íconos de categorías (Lucide icon names)
export const CATEGORY_ICONS: Record<string, string> = {
  gasista: 'Flame',
  plomero: 'Droplets',
  electricista: 'Zap',
  albanil: 'Hammer',
  pintor: 'Paintbrush',
  carpintero: 'Hammer',
  herrero: 'Shield',
  cerrajero: 'Key',
  techista: 'Home',
  'aire-acondicionado': 'Wind',
  refrigeracion: 'Thermometer',
  'tecnico-pc': 'Monitor',
  jardinero: 'Trees',
  'maestro-mayor-de-obras': 'HardHat',
  limpieza: 'Sparkles',
  mudanzas: 'Truck',
  vidriero: 'Square',
  durlock: 'Layers',
  piletero: 'Waves',
  fumigador: 'Bug',
  impermeabilizador: 'Umbrella',
  electrodomesticos: 'Wrench',
  cortinas: 'Blinds',
  tapicero: 'Armchair',
};

// Navegación principal
export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/oficios', label: 'Oficios' },
  { href: '/buscar', label: 'Buscar' },
  { href: '/faq', label: 'Ayuda' },
];

export const FOOTER_LINKS = {
  plataforma: [
    { href: '/oficios', label: 'Oficios' },
    { href: '/buscar', label: 'Buscar profesionales' },
    { href: '/registro', label: 'Registrarse' },
    { href: '/faq', label: 'Preguntas frecuentes' },
  ],
  empresa: [
    { href: '/sobre-nosotros', label: 'Sobre nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ],
  legal: [
    { href: '/terminos', label: 'Términos y condiciones' },
    { href: '/privacidad', label: 'Política de privacidad' },
    { href: '/aviso-legal', label: 'Aviso legal' },
  ],
};
