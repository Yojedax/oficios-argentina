'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface UserProfile {
  email: string;
  full_name: string;
  is_active: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: professionalData } = await supabase
        .from('professional_profiles')
        .select('email, full_name, is_active')
        .eq('user_id', user.id)
        .single();

      if (professionalData) {
        setProfile(professionalData);
      }

      setIsLoading(false);
    };

    loadProfile();
  }, []);

  const handleToggleActive = async () => {
    if (!profile) return;

    setIsUpdating(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('professional_profiles')
        .update({ is_active: !profile.is_active })
        .eq('email', profile.email);

      if (!error) {
        setProfile({ ...profile, is_active: !profile.is_active });
        setSuccessMessage(
          profile.is_active ? 'Perfil desactivado' : 'Perfil activado'
        );
      }
    } catch (error) {
      console.error('Error al actualizar perfil');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Configuración</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {successMessage}
        </div>
      )}

      {profile && (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1B4332] mb-4">
              Información de Cuenta
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nombre
                </label>
                <p className="text-gray-900 font-medium">{profile.full_name}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Correo Electrónico
                </label>
                <p className="text-gray-900 font-medium">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1B4332] mb-4">
              Estado del Perfil
            </h2>

            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900 mb-2">
                  {profile.is_active ? 'Perfil Activo' : 'Perfil Desactivado'}
                </p>
                <p className="text-sm text-gray-600">
                  {profile.is_active
                    ? 'Tu perfil está visible para potenciales clientes'
                    : 'Tu perfil no es visible para otros usuarios'}
                </p>
              </div>
              <button
                onClick={handleToggleActive}
                disabled={isUpdating}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  profile.is_active
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                } disabled:opacity-50`}
              >
                {isUpdating
                  ? 'Actualizando...'
                  : profile.is_active
                    ? 'Desactivar'
                    : 'Activar'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1B4332] mb-4">Seguridad</h2>

            <div className="space-y-3">
              <Link
                href="/recuperar-contrasena"
                className="block px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
              >
                Cambiar Contraseña
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-red-700 mb-4">Zona de Peligro</h2>

            <p className="text-gray-700 mb-4">
              Si cancelas tu cuenta, se desactivará permanentemente tu perfil. Los datos
              se conservarán según nuestra política de privacidad.
            </p>

            <button
              onClick={() => {
                if (
                  confirm(
                    '¿Estás seguro de que querés cancelar tu cuenta? Esta acción no se puede deshacer.'
                  )
                ) {
                  handleLogout();
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Cancelar Cuenta
            </button>
          </div>
        </>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#0f2818] transition-colors font-medium"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
