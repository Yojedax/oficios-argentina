"use client";

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reportSchema, type ReportFormData } from '@/lib/validations/review';
import { createReport } from '@/lib/actions/reports';
import { REPORT_REASONS } from '@/lib/types';
import { AlertTriangle } from 'lucide-react';

interface ReportFormProps {
  professionalId: string;
  onSuccess?: () => void;
}

export default function ReportForm({ professionalId, onSuccess }: ReportFormProps) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    const result = await createReport({
      reported_professional_id: professionalId,
      reason: data.reason,
      description: data.description,
    });

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result.success) {
      setMessage({ type: 'success', text: result.success });
      reset();
      onSuccess?.();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-amber-600">
        <AlertTriangle className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Reportar este perfil</h3>
      </div>

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
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Motivo del reporte *
          </label>
          <select
            id="reason"
            {...register('reason')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="">Seleccioná un motivo</option>
            {REPORT_REASONS.map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
          {errors.reason && <p className="mt-1 text-xs text-red-600">{errors.reason.message}</p>}
        </div>

        <div>
          <label htmlFor="report-description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción *
          </label>
          <textarea
            id="report-description"
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            placeholder="Describí el problema con la mayor cantidad de detalle posible (mínimo 20 caracteres)"
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
        </button>

        <p className="text-xs text-gray-500">
          Los reportes falsos o malintencionados pueden resultar en la suspensión de tu cuenta.
        </p>
      </form>
    </div>
  );
}
