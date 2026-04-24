"use client";

'use client';

import { useState, useRef } from 'react';
import { uploadPortfolioPhoto, deletePortfolioPhoto } from '@/lib/actions/photos';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import type { PortfolioImage } from '@/lib/types';

interface PhotoUploaderProps {
  photos: PortfolioImage[];
  maxPhotos?: number;
  onUpdate: () => void;
}

export default function PhotoUploader({ photos, maxPhotos = 10, onUpdate }: PhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('photo', file);

    const result = await uploadPortfolioPhoto(formData);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Foto subida correctamente' });
      onUpdate();
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (photoId: string) => {
    if (!confirm('¿Estás seguro de que querés eliminar esta foto?')) return;

    setDeletingId(photoId);
    const result = await deletePortfolioPhoto(photoId);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Foto eliminada' });
      onUpdate();
    }

    setDeletingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {photos.length} de {maxPhotos} fotos
        </p>
        {photos.length < maxPhotos && (
          <label className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium cursor-pointer hover:bg-primary-700 transition-colors text-sm">
            <Upload className="w-4 h-4" />
            {isUploading ? 'Subiendo...' : 'Subir foto'}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        )}
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

      {photos.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-card p-8 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-1">No tenés fotos de trabajos todavía</p>
          <p className="text-sm text-gray-400">
            Subí fotos de tus trabajos para que los clientes vean la calidad de tu trabajo
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden">
              <img
                src={photo.image_url}
                alt={photo.caption || 'Foto de trabajo'}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(photo.id)}
                disabled={deletingId === photo.id}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 disabled:opacity-50"
                title="Eliminar foto"
              >
                <X className="w-4 h-4" />
              </button>
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Formatos aceptados: JPG, PNG, WebP. Tamaño máximo: 5MB por foto.
      </p>
    </div>
  );
}
