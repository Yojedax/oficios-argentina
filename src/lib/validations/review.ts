import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, 'Seleccioná una calificación')
    .max(5, 'La calificación máxima es 5'),
  comment: z
    .string()
    .min(20, 'El comentario debe tener al menos 20 caracteres')
    .max(1000, 'El comentario no puede superar los 1000 caracteres'),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

export const reportSchema = z.object({
  reason: z.string().min(1, 'Seleccioná un motivo'),
  description: z
    .string()
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(500, 'La descripción no puede superar los 500 caracteres'),
});

export type ReportFormData = z.infer<typeof reportSchema>;

export const contactSchema = z.object({
  from_name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  from_email: z.string().email('Ingresá un email válido'),
  from_phone: z.string().max(20).optional().or(z.literal('')),
  message: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(1000, 'El mensaje no puede superar los 1000 caracteres'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
