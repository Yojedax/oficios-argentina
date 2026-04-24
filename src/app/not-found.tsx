import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-bold text-[#1B4332] mb-4 select-none">
          404
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          La página que buscás no existe. Probá buscando un profesional o volvé al inicio.
        </p>

        <div className="mb-12">
          <SearchBar />
        </div>

        <Link
          href="/"
          className="inline-block bg-[#1B4332] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0f2818] transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
