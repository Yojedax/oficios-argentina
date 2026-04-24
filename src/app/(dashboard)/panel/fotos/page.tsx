'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { uploadPortfolioPhoto, deletePortfolioPhoto } from '@/lib/actions/photos';

interface PortfolioPhoto {
  id: string;
  photo_url: string;
}

export default function PhotoManagementPage() {
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_PHOTOS = 10;

  useEffect(() => {
    const loadPhotos = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('professional_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const { data: photosData } = await supabase
          .from('portfolio_photos')
          .select('*')
          .eq('professional_id', profile.id)
          .order('created_at', { ascending: false });

        if (photosData) {
          setPhotos(photosData);
        }
      }

      setIsLoading(false);
    };

    loadPhotos();
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (photos.length >= MAX_PHOTOS) {
      setErrorMessage(`Máximo ${MAX_PHOTOS} fotos permitidas`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('El archivo debe ser una imagen');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('La imagen no debe superar 5MB');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await uploadPortfolioPhoto(file);

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage('Foto subida exitosamente');
        setPhotos([...photos, result.photo]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      setErrorMessage('Error al subir la foto');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('¿Estás seguro de que querés eliminar esta foto?')) return;

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await deletePortfolioPhoto(photoId);

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setPhotos(photos.filter((p) => p.id !== photoId));
        setSuccessMessage('Foto eliminada');
      }
    } catch (error) {
      setErrorMessage('Error al eliminar la foto');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1B4332] mb-6">Galería de Fotos</h1>

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

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Fotos subidas: {photos.length}/{MAX_PHOTOS}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-[#1B4332] h-2 rounded-full transition-all"
              style={{ width: `${(photos.length / MAX_PHOTOS) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={photos.length >= MAX_PHOTOS || isUploading}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1B4332] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            hidden
          />
          <div className="text-4xl mb-2">📸</div>
          <p className="font-medium text-gray-900">
            {isUploading ? 'Subiendo...' : 'Sube una foto'}
          </p>
          <p className="text-sm text-gray-600">
            o arrastrá una aquí (máx. 5MB)
          </p>
        </button>
      </div>

      {photos.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-[#1B4332] mb-4">Mis Fotos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group rounded-lg overflow-hidden bg-gray-100"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={photo.photo_url}
                    alt="Portfolio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {photos.length === 0 && !isUploading && (
        <div className="text-center text-gray-600 py-12">
          <p>Aún no has subido fotos. ¡Comenzá ahora!</p>
        </div>
      )}
    </div>
  );
}
