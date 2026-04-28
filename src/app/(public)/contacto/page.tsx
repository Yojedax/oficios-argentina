"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Mensaje enviado correctamente');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contacto
          </h1>
          <p className="mt-3 text-gray-600">
            Escribinos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) =>
                  setFormData({ ...formData, mensaje: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 min-h-[140px]"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-white font-medium hover:bg-primary-700"
            >
              <Send className="h-4 w-4" />
              Enviar mensaje
            </button>
          </form>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-primary-600" />
              <div>
                <h2 className="font-semibold text-gray-900">Email</h2>
                <p className="text-gray-600">contacto@oficiosargentina.com.ar</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-primary-600" />
              <div>
                <h2 className="font-semibold text-gray-900">Teléfono</h2>
                <p className="text-gray-600">+54 9 11 0000-0000</p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary-600" />
              <div>
                <h2 className="font-semibold text-gray-900">Ubicación</h2>
                <p className="text-gray-600">Argentina</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
