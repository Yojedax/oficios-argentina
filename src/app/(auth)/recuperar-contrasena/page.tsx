'use client';

import { useState } from 'react';
import Link from 'next/link';
import { resetPassword } from '@/lib/actions/auth';

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await resetPassword(email);

      if (result.error) {
        setMessage(result.error);
        setIsSuccess(false);
      } else {
        setMessage(
          'Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.'
        );
        setIsSuccess(true);
        setEmail('');
      }
    } catch (error) {
      setMessage('Ocurrió un error. Intentá de nuevo.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#1B4332] text-center mb-2">
          Recuperar Contraseña
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Ingresá tu correo para recibir un enlace de recuperación
        </p>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg border ${
              isSuccess
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-[#1B4332] text-white py-2 rounded-lg font-semibold hover:bg-[#0f2818] disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya recordaste tu contraseña?{' '}
          <Link href="/login" className="text-[#1B4332] hover:underline font-medium">
            Iniciá sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
