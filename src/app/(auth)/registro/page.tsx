'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';
import { signUp } from '@/lib/actions/auth';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const role = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await signUp(data);

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage(
          'Registro completado. Revisa tu correo para confirmar tu cuenta.'
        );
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error al registrarse. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#1B4332] text-center mb-2">
          Crear Cuenta
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Registrate en Oficios Argentina
        </p>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              {...register('full_name')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              placeholder="Tu nombre completo"
            />
            {errors.full_name && (
              <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              placeholder="Mínimo 8 caracteres"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="py-4 border-y">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ¿Cuál es tu rol?
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  {...register('role')}
                  type="radio"
                  value="client"
                  className="w-4 h-4 text-[#1B4332] cursor-pointer"
                />
                <span className="ml-3 text-gray-700">Busco profesionales</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register('role')}
                  type="radio"
                  value="professional"
                  className="w-4 h-4 text-[#1B4332] cursor-pointer"
                />
                <span className="ml-3 text-gray-700">Soy profesional</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-600 text-sm mt-2">{errors.role.message}</p>
            )}
          </div>

          <div className="flex items-start">
            <input
              {...register('accept_terms')}
              type="checkbox"
              className="w-4 h-4 text-[#1B4332] rounded mt-1"
            />
            <label className="ml-3 text-sm text-gray-600">
              Acepto los{' '}
              <Link
                href="/terminos"
                className="text-[#1B4332] hover:underline font-medium"
              >
                términos y condiciones
              </Link>
            </label>
          </div>
          {errors.accept_terms && (
            <p className="text-red-600 text-sm -mt-2">{errors.accept_terms.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1B4332] text-white py-2 rounded-lg font-semibold hover:bg-[#0f2818] disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-[#1B4332] hover:underline font-medium">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
