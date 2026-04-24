"use client";

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations/review';
import { Send } from 'lucide-react';

interface ContactFormProps {
  professionalId: string;
  professionalName: string;
  onSuccess?: () => void;
}

export default function ContactForm({ professionalId, professionalName, onSuccess }: ContactFormProps) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, professional_id: professionalId }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Mensaje enviado correctamente. El profesional se pondrá en contacto.' });
        reset();
        onSuccess?.();
      } else {
        setMessage({ type: 'error', text: result.error || 'Error al enviar el mensaje.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión. Intentá de nuevo.' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Enviar consulta a {professionalName}</h3>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-1">
            Tu nombre *
          </label>
          <input
            id="from_name"
            {...register('from_name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            placeholder="Nombre completo"
          />
          {errors.from_name && <p className="mt-1 text-xs text-red-600">{errors.from_name.message}</p>}
        </div>

        <div>
          <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-1">
            Tu email *
          </label>
          <input
            id="from_email"
            type="email"
            {...register('from_email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            placeholder="tu@email.com"
          />
          {errors.from_email && <p className="mt-1 text-xs text-red-600">{errors.from_email.message}</p>}
        </div>

        <div>
          <label htmlFor="from_phone" className="block text-sm font-medium text-gray-700 mb-1">
            Tu teléfono (opcional)
          </label>
          <input
            id="from_phone"
            {...register('from_phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            placeholder="11 1234-5678"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje *
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            placeholder="Describí qué servicio necesitás, zona, y cualquier detalle relevante..."
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
        </button>
      </form>
    </div>
  );
}
