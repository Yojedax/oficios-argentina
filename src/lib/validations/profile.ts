import { z } from 'zod';

export const profileSchema = z.object({
  business_name: z.string().max(100, 'Máximo 100 caracteres').optional().or(z.literal('')),
  description: z
    .string()
    .min(50, 'La descripción debe tener al menos 50 caracteres')
    .max(2000, 'La descripción no puede superar los 2000 caracteres'),
  whatsapp: z
    .string()
    .min(8, 'Ingresá un número de WhatsApp válido')
    .max(20, 'Número demasiado largo'),
  phone: z.string().max(20).optional().or(z.literal('')),
  email_contact: z.string().email('Email inválido').optional().or(z.literal('')),
  experience_years: z
    .number({ invalid_type_error: 'Ingresá un número' })
    .min(0, 'No puede ser negativo')
    .max(60, 'Máximo 60 años')
    .optional(),
  availability: z.string().max(200, 'Máximo 200 caracteres').optional().or(z.literal('')),
  province: z.string().min(1, 'Seleccioná una provincia'),
  city: z.string().min(1, 'Seleccioná una ciudad'),
  zone_details: z.string().max(500, 'Máximo 500 caracteres').optional().or(z.literal('')),
  category_ids: z
    .array(z.number())
    .min(1, 'Seleccioná al menos una categoría')
    .max(5, 'Máximo 5 categorías'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
