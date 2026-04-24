import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Oficios Argentina',
  description: 'Política de privacidad de Oficios Argentina',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1B4332] mb-8">
            Política de Privacidad
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                1. Información que Recolectamos
              </h2>
              <p className="leading-relaxed mb-4">
                Recolectamos información que proporcionás directamente:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Información de registro: nombre, correo, contraseña, rol</li>
                <li>Información de perfil: descripción, ubicación, fotos, experiencia</li>
                <li>Información de comunicación: mensajes entre usuarios</li>
                <li>Información de contacto: teléfono (opcional)</li>
                <li>Reseñas y calificaciones que publicás</li>
              </ul>
              <p className="leading-relaxed">
                También recolectamos información automáticamente:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Información de dispositivo: tipo, sistema operativo, navegador</li>
                <li>Información de uso: páginas visitadas, tiempo de sesión</li>
                <li>Información de ubicación: aproximada, basada en IP</li>
                <li>Cookies y tecnologías similares para mejorar la experiencia</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                2. Cómo Usamos tu Información
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar y mejorar los servicios de la Plataforma</li>
                <li>Procesar transacciones y enviar confirmaciones</li>
                <li>Comunicarnos sobre cambios, actualizaciones y nuevas funciones</li>
                <li>Responder a consultas y solicitudes de soporte</li>
                <li>Personalizar tu experiencia en la Plataforma</li>
                <li>Detectar y prevenir fraude, abuso y violaciones de seguridad</li>
                <li>Cumplir con obligaciones legales y normativas</li>
                <li>Análisis y mejora de la Plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                3. Almacenamiento de Información
              </h2>
              <p className="leading-relaxed mb-4">
                Tu información se almacena en servidores ubicados en Argentina y
                plataformas de terceros (como Supabase) que garantizan seguridad con
                encriptación estándar de la industria.
              </p>
              <p className="leading-relaxed">
                Retenemos tu información mientras tu cuenta esté activa. Si cancelas tu
                cuenta, conservaremos datos según obligaciones legales (impuestos,
                auditorías) típicamente por 5 años. Podés solicitar la eliminación de
                datos contactándonos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                4. Cookies y Tecnologías de Seguimiento
              </h2>
              <p className="leading-relaxed mb-4">
                Usamos cookies para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantener tu sesión iniciada</li>
                <li>Recordar tus preferencias</li>
                <li>Análisis de uso (Google Analytics)</li>
                <li>Personalizar contenido y anuncios</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Podés controlar cookies mediante las opciones de tu navegador. Sin
                embargo, desactivar cookies puede afectar funcionalidades de la
                Plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                5. Compartir Información
              </h2>
              <p className="leading-relaxed mb-4">
                No vendemos tu información personal. Compartimos información solo en
                estos casos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Entre usuarios:</strong> Información de perfil visible es
                  accesible a otros usuarios
                </li>
                <li>
                  <strong>Proveedores de servicios:</strong> Empresas que nos ayudan
                  (correo, almacenamiento, análisis) bajo acuerdos confidenciales
                </li>
                <li>
                  <strong>Requerimientos legales:</strong> Cuando es requerido por ley o
                  autoridades
                </li>
                <li>
                  <strong>Protección de derechos:</strong> Para prevenir actividades
                  ilegales o incumplimiento de términos
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                6. Tus Derechos y Opciones
              </h2>
              <p className="leading-relaxed mb-4">Tenés derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Acceso:</strong> Solicitar una copia de tus datos personales
                </li>
                <li>
                  <strong>Corrección:</strong> Actualizar información inexacta
                </li>
                <li>
                  <strong>Eliminación:</strong> Solicitar eliminación de tus datos
                </li>
                <li>
                  <strong>Portabilidad:</strong> Recibir tus datos en formato estructurado
                </li>
                <li>
                  <strong>No procesamiento:</strong> Optar por no recibir marketing
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                Para ejercer estos derechos, contactá a{' '}
                <a href="mailto:info@oficiosargentina.com" className="text-[#1B4332] hover:underline font-medium">
                  info@oficiosargentina.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                7. Seguridad
              </h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas, administrativas y físicas
                para proteger tu información. Usamos encriptación HTTPS, contraseñas
                hasheadas y acceso restringido. Sin embargo, ningún sistema es
                completamente seguro. Sos responsable de mantener tu contraseña
                confidencial.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                8. Enlaces Externos
              </h2>
              <p className="leading-relaxed">
                La Plataforma puede contener enlaces a sitios externos. No somos
                responsables por sus prácticas de privacidad. Revisá sus políticas
                antes de proporcionar información.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                9. Cambios a Esta Política
              </h2>
              <p className="leading-relaxed">
                Podemos actualizar esta política ocasionalmente. Cambios significativos
                serán notificados vía correo o notificación en la Plataforma. Tu uso
                continuado implica aceptación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                10. Contacto
              </h2>
              <p className="leading-relaxed">
                Para preguntas sobre privacidad, solicitar acceso a datos, o reportar
                problemas:
              </p>
              <p className="mt-4 font-medium">
                Correo:{' '}
                <a href="mailto:info@oficiosargentina.com" className="text-[#1B4332] hover:underline">
                  info@oficiosargentina.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Última actualización: 2024. Esta política se rige por las leyes de
              Argentina.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
