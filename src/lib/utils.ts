/**
 * Genera URL de WhatsApp con mensaje pre-armado
 */
export function getWhatsAppUrl(phone: string, categoryName?: string): string {
  // Formatear número argentino: quitar espacios, guiones, paréntesis
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Si empieza con 0, quitar el 0
  if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
  // Si no tiene código de país, agregar +549
  if (!cleaned.startsWith('+')) {
    // Si empieza con 15, quitar el 15 y agregar código de área
    if (cleaned.startsWith('15')) cleaned = cleaned.substring(2);
    cleaned = `549${cleaned}`;
  } else {
    cleaned = cleaned.substring(1); // quitar el +
  }

  const message = categoryName
    ? `Hola, te contacto desde Oficios Argentina. Estoy buscando un servicio de ${categoryName}. ¿Podrías darme información sobre disponibilidad y presupuesto?`
    : 'Hola, te contacto desde Oficios Argentina. ¿Podrías darme información sobre tus servicios?';

  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera URL de llamada telefónica
 */
export function getPhoneUrl(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return `tel:${cleaned}`;
}

/**
 * Genera slug a partir de texto
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Formatea calificación para mostrar (ej: 4.5)
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Formatea fecha relativa en español argentino
 */
export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
}

/**
 * Formatea fecha en formato legible
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Trunca texto con elipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '...';
}

/**
 * Combina class names condicionalmente
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Genera URL de imagen de Supabase Storage con transformación
 */
export function getStorageUrl(path: string, options?: { width?: number; height?: number }): string {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let url = `${baseUrl}/storage/v1/object/public/${path}`;
  if (options?.width || options?.height) {
    const params = new URLSearchParams();
    if (options.width) params.set('width', options.width.toString());
    if (options.height) params.set('height', options.height.toString());
    url = `${baseUrl}/storage/v1/render/image/public/${path}?${params.toString()}`;
  }
  return url;
}

/**
 * Validar formato de teléfono argentino básico
 */
export function isValidArgentinePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Acepta formatos: 1123456789, 01123456789, 5491123456789, etc.
  return /^\d{8,13}$/.test(cleaned);
}
