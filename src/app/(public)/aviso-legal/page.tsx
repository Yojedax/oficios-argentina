import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal | Oficios Argentina',
  description: 'Aviso legal de Oficios Argentina',
};

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1B4332] mb-8">Aviso Legal</h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                1. Naturaleza de la Plataforma
              </h2>
              <p className="leading-relaxed">
                Oficios Argentina es una plataforma de intermediación digital que
                conecta clientes con profesionales. No somos:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Empleadores de los profesionales que usan la Plataforma</li>
                <li>Proveedores de los servicios ofrecidos</li>
                <li>Responsables de ejecutar trabajos o proyectos</li>
                <li>Asesores legales, financieros o técnicos</li>
                <li>Intermediarios en transacciones comerciales</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                La relación entre profesionales y clientes es directa e independiente.
                Cada usuario es responsable de negociar, acordar y cumplir sus propias
                obligaciones comerciales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                2. Sin Garantías
              </h2>
              <p className="leading-relaxed mb-4">
                Oficios Argentina se proporciona &quot;tal cual&quot; sin garantías de ningún tipo.
                Específicamente:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  No garantizamos que los profesionales completarán trabajos
                  satisfactoriamente
                </li>
                <li>
                  No garantizamos la calidad, seguridad o legalidad de servicios
                </li>
                <li>
                  No garantizamos disponibilidad continua de la Plataforma sin
                  interrupciones
                </li>
                <li>No garantizamos ausencia de errores de seguridad</li>
                <li>
                  No garantizamos que los datos personales no se filtrarán (aunque
                  implementamos medidas de seguridad)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                3. Limitación de Responsabilidad
              </h2>
              <p className="leading-relaxed mb-4">
                Bajo ninguna circunstancia Oficios Argentina será responsable por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Daños directos, indirectos, incidentales, especiales o punitivos
                </li>
                <li>Pérdida de ganancias, ingresos o datos</li>
                <li>Costo de bienes o servicios sustitutos</li>
                <li>Negligencia de profesionales contratados</li>
                <li>Incumplimiento de servicios por terceros</li>
                <li>Lesiones personales o daño a propiedad causados por terceros</li>
                <li>Cualquier otro daño, incluso si fuimos advertidos de su posibilidad</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Esta limitación aplica incluso si Oficios Argentina ha sido negligente
                o incumplidor de garantías.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                4. Responsabilidad del Usuario
              </h2>
              <p className="leading-relaxed mb-4">
                Sos completamente responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tu cuenta y contraseña</li>
                <li>Información que proporcionás</li>
                <li>Cumplimiento de leyes y regulaciones aplicables</li>
                <li>Obtención de licencias y seguros necesarios (profesionales)</li>
                <li>Evaluación independiente de profesionales antes de contratar</li>
                <li>Negociación y cumplimiento de acuerdos comerciales</li>
                <li>Verificación de credenciales y antecedentes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                5. Verificación de Profesionales
              </h2>
              <p className="leading-relaxed">
                Los profesionales verificados en la Plataforma han completado procesos
                de verificación básica. Sin embargo, esto NO garantiza:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Competencia o experiencia real en el oficio</li>
                <li>Cumplimiento de leyes y regulaciones</li>
                <li>Comportamiento ético o profesional</li>
                <li>Posesión de licencias o certificaciones válidas</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                La verificación es un indicador general de credibilidad, no una garantía
                de calidad. Mantené el derecho de investigar independientemente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                6. Reseñas y Opiniones
              </h2>
              <p className="leading-relaxed mb-4">
                Las reseñas publicadas en la Plataforma:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Son opiniones subjetivas de usuarios individuales</li>
                <li>No representan la opinión de Oficios Argentina</li>
                <li>Pueden estar sujetas a errores o manipulación</li>
                <li>
                  No deberías confiar exclusivamente en reseñas para decisiones
                  comerciales
                </li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Oficios Argentina se esfuerza por moderar reseñas falsas, pero no
                garantiza su exactitud o veracidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                7. Contenido de Terceros
              </h2>
              <p className="leading-relaxed">
                Oficios Argentina no es responsable por contenido publicado por
                terceros (fotos, descripciones, mensajes). Los usuarios publican
                contenido bajo su responsabilidad. Podemos remover contenido que
                viole nuestros términos, pero no garantizamos monitoreo continuo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                8. Cumplimiento Normativo
              </h2>
              <p className="leading-relaxed mb-4">
                Profesionales: Sos responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Obtener y mantener todas las licencias requeridas</li>
                <li>Cumplir con regulaciones laborales y de seguridad</li>
                <li>Pagar impuestos y contribuciones</li>
                <li>Mantener seguros de responsabilidad civil si corresponde</li>
                <li>Cumplir con leyes de protección al consumidor</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Oficios Argentina no asesora sobre cumplimiento normativo. Consultá con
                profesionales legales para tu jurisdicción.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                9. Indemnización
              </h2>
              <p className="leading-relaxed">
                Aceptás indemnizar y mantener indemne a Oficios Argentina, sus
                empleados, directores y agentes contra cualquier reclamación, demanda,
                pérdida, daño, costo (incluyendo honorarios legales) derivado de tu
                violación de estos términos, tu uso de la Plataforma, o daño a terceros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                10. Modificación de Servicios
              </h2>
              <p className="leading-relaxed">
                Oficios Argentina puede modificar, suspender o discontinuar servicios o
                características sin previo aviso. No somos responsables por cualquier
                pérdida resultante de tales cambios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                11. Ley Aplicable
              </h2>
              <p className="leading-relaxed">
                Este aviso se rige por las leyes de la República Argentina. Cualquier
                litigio debe iniciarse en los tribunales competentes de Argentina.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
                12. Integración
              </h2>
              <p className="leading-relaxed">
                Este aviso, junto con los Términos y Condiciones y la Política de
                Privacidad, constituyen el acuerdo completo entre vos y Oficios
                Argentina respecto al uso de la Plataforma.
              </p>
            </section>
          </div>

          <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-900 font-semibold">
              ADVERTENCIA IMPORTANTE: Al usar Oficios Argentina, aceptás que asumís
              todo riesgo asociado con transacciones comerciales, contratación de
              servicios, y cualquier disputa que pueda surgir. Oficios Argentina no
              proporciona garantías sobre servicios de terceros y no es responsable
              por daños causados por profesionales o clientes. Consultá con
              profesionales legales si tienes preocupaciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
