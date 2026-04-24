'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

const faqData = [
  {
    id: 1,
    question: '¿Cómo registro mi cuenta?',
    answer:
      'Hacé clic en "Crear Cuenta" en la página de inicio. Completá tu nombre, correo electrónico y contraseña. Seleccioná tu rol (cliente o profesional) y aceptá los términos y condiciones. Recibirás un correo de confirmación para validar tu cuenta.',
  },
  {
    id: 2,
    question: '¿Es gratis registrarse como profesional?',
    answer:
      'Sí, el registro es completamente gratuito. Podés crear tu perfil, agregar fotos de tu trabajo y comenzar a recibir contactos de clientes sin costo alguno.',
  },
  {
    id: 3,
    question: '¿Cómo busco un profesional?',
    answer:
      'Podés buscar de varias formas: navegando por categorías de oficios, usando la barra de búsqueda para un oficio específico, o filtrando por provincia y ciudad. Los perfiles incluyen información de ubicación, experiencia, calificaciones y reseñas.',
  },
  {
    id: 4,
    question: '¿Cómo contacto a un profesional?',
    answer:
      'En el perfil del profesional encontrarás un botón "Contactar". Podés enviar un mensaje directo que será notificado al profesional. También podés dejar una reseña después de usar sus servicios.',
  },
  {
    id: 5,
    question: '¿Cómo funciona el sistema de reseñas?',
    answer:
      'Después de contratar a un profesional, podés dejar una reseña con calificación de 1 a 5 estrellas y un comentario sobre tu experiencia. Las reseñas se moderan antes de publicarse para garantizar que sean genuinas y respetuosas.',
  },
  {
    id: 6,
    question: '¿Cómo edito mi perfil de profesional?',
    answer:
      'Accedé a tu panel de usuario, luego a "Mi Perfil". Podés actualizar tu información personal, agregar categorías de servicios, cambiar tu disponibilidad, actualizar tu descripción y agregar fotos de tu portafolio.',
  },
  {
    id: 7,
    question: '¿Qué información necesito para registrarme como profesional?',
    answer:
      'Para crear tu perfil inicial necesitás nombre completo, correo electrónico y contraseña. Luego podés agregar detalles como ubicación, categorías de servicios, años de experiencia, descripción, fotos y disponibilidad.',
  },
  {
    id: 8,
    question: '¿Cómo reporto a un profesional o usuario fraudulento?',
    answer:
      'Si encontrás contenido inapropiado o sospechoso, podés reportarlo mediante el formulario de reporte en el perfil del usuario. Nuestro equipo revisará la denuncia y tomará las medidas correspondientes.',
  },
  {
    id: 9,
    question: '¿Cómo protegés mis datos personales?',
    answer:
      'Protegemos tus datos con encriptación de extremo a extremo y cumplimos con todas las regulaciones de privacidad. Tu información personal no se compartirá con terceros sin tu consentimiento. Consultá nuestra política de privacidad para más detalles.',
  },
  {
    id: 10,
    question: '¿Cuál es la política de cancelación de cuenta?',
    answer:
      'Podés cancelar tu cuenta en cualquier momento desde la sección de configuración. Al cancelar, se desactivará tu perfil pero conservaremos tus datos según nuestra política de privacidad. Si sos profesional con reseñas pendientes de respuesta, se notificará a los clientes.',
  },
  {
    id: 11,
    question: '¿Cómo me verifico como profesional?',
    answer:
      'Para ser verificado, completa tu perfil con información detallada. Podés solicitar verificación adicional proporcionando documentación de licencias o certificaciones. El equipo de Oficios Argentina revisará tu solicitud.',
  },
  {
    id: 12,
    question: '¿Hay algún costo por contactar clientes?',
    answer:
      'No. Recibir contactos de clientes es completamente gratuito. Podés gestionar tus contactos y responder mensajes sin costo. El objetivo de Oficios Argentina es conectar profesionales con clientes de forma libre.',
  },
];

function FAQAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqData.map((item) => (
        <div
          key={item.id}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleOpen(item.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-left font-semibold text-gray-900">
              {item.question}
            </span>
            <span
              className={`text-2xl text-[#1B4332] transition-transform ${
                openId === item.id ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>

          {openId === item.id && (
            <div className="px-4 py-4 bg-gray-50 border-t border-gray-300">
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1B4332] text-center mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Encontrá respuestas a las preguntas más comunes sobre Oficios Argentina.
          </p>

          <FAQAccordion />
        </div>
      </div>
    </div>
  );
}
