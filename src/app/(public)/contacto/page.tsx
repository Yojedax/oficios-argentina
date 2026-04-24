'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Oficios Argentina',
  description: 'Contactá con el equipo de Oficios Argentina',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage('Ocurrió un error. Intentá de nuevo más tarde.');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error. Intentá de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold text-[#1B4332] mb-6">Contacto</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              ¿Tenés preguntas o sugerencias? Nos gustaría escucharte. Completá el
              formulario y nos pondremos en contacto lo antes posible.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#1B4332] mb-2">Correo Electrónico</h3>
                <a
                  href="mailto:info@oficiosargentina.com"
                  className="text-[#FF6B35] hover:underline"
                >
                  info@oficiosargentina.com
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-[#1B4332] mb-2">Redes Sociales</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-[#1B4332] hover:text-[#FF6B35] transition-colors"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="text-[#1B4332] hover:text-[#FF6B35] transition-colors"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-[#1B4332] hover:text-[#FF6B35] transition-colors"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1B4332] mb-6">Envía tu Mensaje</h2>

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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent resize-none"
                  placeholder="Tu mensaje..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1B4332] text-white py-2 rounded-lg font-semibold hover:bg-[#0f2818] disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
