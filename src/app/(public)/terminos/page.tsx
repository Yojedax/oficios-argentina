import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Oficios Argentina',
  description: 'Términos y condiciones de uso de Oficios Argentina',
};

const TermsContent = `TÉRMINOS Y CONDICIONES DE USO - OFICIOS ARGENTINA

Última actualización: 2024

1. NATURALEZA DEL SERVICIO Y ACEPTACIÓN

1.1 Oficios Argentina ("la Plataforma") es un servicio de intermediación digital que conecta clientes con profesionales que ofrecen servicios diversos. No somos empleadores de los profesionales ni empleados de los clientes.

1.2 Al registrarte y usar esta Plataforma, aceptás estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con algún término, no debés usar la Plataforma.

1.3 Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán comunicados a través de la Plataforma. Tu uso continuado implica aceptación de los cambios.

2. RESPONSABILIDADES Y LIMITACIONES DE RESPONSABILIDAD

2.1 Oficios Argentina no es responsable por la calidad, seguridad o legalidad de los servicios ofrecidos por los profesionales. Cada usuario es responsable de evaluar independientemente la competencia y confiabilidad de otros usuarios.

2.2 No garantizamos que los servicios se completen satisfactoriamente. Los profesionales y clientes actúan por su cuenta y riesgo.

2.3 Oficios Argentina no será responsable por daños indirectos, incidentales, especiales o punitivos que resulten del uso de la Plataforma, incluso si hemos sido informados de la posibilidad de tales daños.

2.4 La responsabilidad total de Oficios Argentina no superará el monto pagado por el usuario en los últimos 12 meses.

3. ELEGIBILIDAD Y REGISTRO

3.1 Debes tener al menos 18 años para usar esta Plataforma. Al registrarte, confirmas que cumples con este requisito.

3.2 Debes proporcionar información precisa, actual y completa durante el registro. Sos responsable de mantener la confidencialidad de tu contraseña.

3.3 Sos responsable de toda actividad que ocurra bajo tu cuenta. Debes notificar inmediatamente si sospechas acceso no autorizado.

3.4 Profesionales: Si ofrecés servicios, debes cumplir con todas las leyes y regulaciones aplicables, incluyendo licencias y seguros requeridos.

4. USO ACEPTABLE

4.1 Aceptás usar la Plataforma solamente para propósitos legales y de conformidad con estos términos.

4.2 Está prohibido:
- Usar lenguaje ofensivo, intimidatorio o discriminatorio
- Publicar contenido falso o engañoso
- Intentar acceder a cuentas no autorizadas
- Interferir con la funcionalidad de la Plataforma
- Acosar, amenazar o intimidar a otros usuarios
- Publicar contenido sexual, violento o ilegal
- Usar la Plataforma para estafas o fraudes
- Realizar spam o enviar mensajes no solicitados
- Incumplir derechos de propiedad intelectual

4.3 Violaciones pueden resultar en advertencias, restricciones de cuenta o terminación permanente sin reembolso.

5. CONTENIDO Y DERECHOS DE PROPIEDAD INTELECTUAL

5.1 Mantenés todos los derechos de contenido que publicás. Al publicar, otorgás a Oficios Argentina una licencia no exclusiva para usar, reproducir y distribuir tu contenido en la Plataforma.

5.2 No publicarás contenido que infrinja derechos de terceros. Sos responsable de obtener todos los permisos necesarios.

5.3 Oficios Argentina puede remover contenido que viole estos términos en cualquier momento.

6. TRANSACCIONES Y PAGOS

6.1 Los pagos entre clientes y profesionales son responsabilidad de ambas partes. Oficios Argentina no procesa pagos ni actúa como intermediario financiero.

6.2 Aceptás usar métodos de pago legales. Cualquier disputa de pago deberá resolverse entre las partes involucradas.

6.3 Cada usuario es responsable de sus obligaciones tributarias y contables derivadas de transacciones en la Plataforma.

7. RESEÑAS Y CALIFICACIONES

7.1 Las reseñas deben ser honestas y basadas en experiencia real. Está prohibido publicar reseñas falsas o coercitivas.

7.2 Oficios Argentina puede moderar, editar o remover reseñas que violen estos términos.

7.3 No somos responsables por el contenido de reseñas publicadas por terceros.

8. TERMINACIÓN DE CUENTA

8.1 Podés cancelar tu cuenta en cualquier momento desde la configuración de tu perfil.

8.2 Oficios Argentina puede terminar tu cuenta si:
- Violas estos términos repetidamente
- Participas en fraude o actividad ilegal
- Representás un riesgo de seguridad
- Solicitud de autoridades legales

8.3 La terminación es permanente. Los datos pueden retenerse según nuestra Política de Privacidad.

9. DISPUTAS Y RESOLUCIÓN DE CONFLICTOS

9.1 Si tienes una disputa, primero intentá resolverla directamente con la otra parte.

9.2 Si no se puede resolver, reportá el problema a través del formulario de contacto en la Plataforma.

9.3 Oficios Argentina investigará disputas razonables, pero no será árbitro obligatorio de conflictos comerciales.

9.4 Los litigios derivados de esta Plataforma se someten a las leyes de Argentina.

10. EXCLUSIÓN DE GARANTÍAS

10.1 La Plataforma se proporciona "tal cual" sin garantías de ningún tipo. Específicamente, no garantizamos:
- Disponibilidad continua de la Plataforma
- Ausencia de errores o vulnerabilidades de seguridad
- Que los servicios satisfarán tus necesidades específicas
- Resultados de uso de la Plataforma

10.2 Usás la Plataforma bajo tu propio riesgo.

11. INDEMNIZACIÓN

Aceptás indemnizar a Oficios Argentina y sus empleados, directores y agentes contra reclamaciones, demandas, daños y costos derivados de tu violación de estos términos o daño a terceros.

12. CONTACTO Y CAMBIOS

12.1 Para contactos legales: info@oficiosargentina.com

12.2 Estos términos pueden ser modificados en cualquier momento. Continuando el uso de la Plataforma después de cambios implica aceptación.

12.3 Si no aceptás los cambios, tu único recurso es dejar de usar la Plataforma.
`;

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1B4332] mb-8">
            Términos y Condiciones
          </h1>

          <div className="prose prose-lg max-w-none">
            {TermsContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.match(/^\d+\./)) {
                const [title, ...rest] = paragraph.split('\n');
                return (
                  <div key={index} className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1B4332] mb-3">
                      {title}
                    </h2>
                    <div className="text-gray-700 space-y-3">
                      {rest.map((line, i) =>
                        line.trim() ? (
                          <p key={i} className="leading-relaxed">
                            {line.trim()}
                          </p>
                        ) : null
                      )}
                    </div>
                  </div>
                );
              }
              return paragraph.trim() ? (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph.trim()}
                </p>
              ) : null;
            })}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Al usar Oficios Argentina, aceptás estos términos y condiciones en su
              totalidad. Si tenés preguntas, contactá con nuestro equipo en{' '}
              <a
                href="mailto:info@oficiosargentina.com"
                className="text-[#1B4332] hover:underline font-medium"
              >
                info@oficiosargentina.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
