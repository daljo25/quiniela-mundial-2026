import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Términos y Condiciones · Quiniela Mundialista',
}

export default function TermsPage() {
  const adminEmail = process.env.ADMIN_EMAIL ?? ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-950 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-sm text-green-100 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Términos y Condiciones
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Quiniela Mundialista · Mundial 2026
            </p>
          </div>

          <Section title="1. Naturaleza de la plataforma">
            <p>
              Quiniela Mundialista no es una plataforma de apuestas ni de juego
              regulado. Se trata de una iniciativa privada y recreativa entre
              amigos y participantes invitados, creada con el objetivo de
              gestionar una quiniela relacionada con el Mundial de Fútbol 2026.
            </p>

            <p>
              La plataforma se ofrece únicamente con fines recreativos y de
              entretenimiento.
            </p>
          </Section>

          <Section title="2. Elegibilidad y mayoría de edad">
            <p>Para participar en la quiniela, el usuario debe:</p>

            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Ser <strong>mayor de 18 años</strong>.
              </li>

              <li>
                Registrarse utilizando información real y un correo electrónico
                válido.
              </li>

              <li>
                Mantener un comportamiento adecuado dentro de la plataforma.
              </li>
            </ul>

            <p>
              El uso de información falsa o la suplantación de identidad podrá
              resultar en la suspensión o eliminación de la cuenta.
            </p>
          </Section>

          <Section title="3. Participación y pagos">
            <p>
              La participación en la quiniela puede requerir un aporte económico
              destinado exclusivamente a conformar el pozo de premios entre los
              participantes.
            </p>

            <p>
              Los organizadores no utilizan los fondos con fines comerciales,
              financieros o de inversión.
            </p>

            <p>
              Una vez iniciado el torneo, cualquier aporte realizado será
              considerado no reembolsable, salvo situaciones excepcionales de
              cancelación total del torneo o imposibilidad de continuar la
              competición.
            </p>
          </Section>

          <Section title="4. Premios y responsabilidad fiscal">
            <p>
              Cada participante es responsable de cumplir con cualquier obligación
              fiscal o tributaria que pudiera derivarse de los premios recibidos,
              de acuerdo con la legislación aplicable en su país de residencia.
            </p>

            <p>
              Los organizadores no asumen responsabilidades tributarias ni actúan
              como agentes retenedores.
            </p>
          </Section>

          <Section title="5. Cancelación o suspensión del torneo">
            <p>
              En caso de cancelación, suspensión o interrupción definitiva del
              Mundial 2026 por causas ajenas a la organización —incluyendo fuerza
              mayor, conflictos internacionales, pandemias, decisiones deportivas
              o gubernamentales— los organizadores podrán suspender o finalizar la
              quiniela anticipadamente.
            </p>

            <p>
              En ese caso, se evaluará la forma más razonable y justa de proceder
              con los aportes y puntuaciones acumuladas.
            </p>
          </Section>

          <Section title="6. Disponibilidad del servicio">
            <p>
              La plataforma se ofrece &quot;tal cual&quot; y puede experimentar
              interrupciones, errores técnicos o caídas temporales.
            </p>

            <p>
              Los organizadores harán esfuerzos razonables para mantener el
              servicio operativo, pero no garantizan disponibilidad permanente ni
              ausencia total de errores.
            </p>

            <p>
              En caso de incidencias técnicas que afecten el desarrollo de la
              quiniela, los organizadores podrán tomar decisiones razonables para
              preservar la integridad de la competición.
            </p>
          </Section>

          <Section title="7. Uso adecuado de la plataforma">
            <p>
              Los participantes se comprometen a utilizar la plataforma de forma
              responsable y respetuosa.
            </p>

            <p>
              Cualquier intento de manipular resultados, puntuaciones, pagos,
              cuentas o funcionalidades podrá resultar en descalificación inmediata.
            </p>
          </Section>

          <Section title="8. Responsabilidad del usuario">
            <p>
              Cada usuario es responsable de la seguridad de su cuenta y de la
              información proporcionada durante el registro y uso de la plataforma.
            </p>

            <p>
              Los organizadores no se responsabilizan por pérdidas de acceso,
              errores derivados del uso indebido de la cuenta o acciones realizadas
              por terceros utilizando credenciales compartidas.
            </p>
          </Section>

          <Section title="9. Comunicaciones">
            <p>
              Al registrarte aceptas recibir comunicaciones relacionadas con la
              quiniela, incluyendo recordatorios, resultados, cambios en reglas o
              avisos importantes sobre el torneo.
            </p>

            <p>
              Estas comunicaciones serán exclusivamente informativas y relacionadas
              con el funcionamiento de la plataforma.
            </p>
          </Section>

          <Section title="10. Propiedad intelectual">
            <p>
              El diseño, código, contenido y elementos visuales de la plataforma
              pertenecen a sus respectivos autores y organizadores.
            </p>

            <p>
              No está permitido copiar, redistribuir o explotar comercialmente la
              plataforma sin autorización previa.
            </p>
          </Section>

          <Section title="11. Privacidad y datos personales">
            <p>
              La información proporcionada por los participantes será utilizada
              únicamente para el funcionamiento de la quiniela.
            </p>

            <p>
              Los datos personales no serán vendidos ni compartidos con terceros,
              salvo obligación legal.
            </p>

            <p>
              Los usuarios pueden solicitar la modificación o eliminación de sus
              datos escribiendo al correo del administrador.
            </p>
          </Section>

          <Section title="12. Modificaciones">
            <p>
              Los organizadores se reservan el derecho de modificar estos términos,
              reglas o funcionalidades cuando sea necesario para mejorar la
              plataforma o resolver situaciones operativas.
            </p>

            <p>
              Los cambios importantes serán comunicados oportunamente a los
              participantes.
            </p>
          </Section>

          <Section title="13. Jurisdicción">
            <p>
              Estos términos se interpretarán de acuerdo con la legislación
              aplicable en el país de residencia de los organizadores.
            </p>

            <p>
              Cualquier conflicto será tratado inicialmente de forma amistosa entre
              las partes antes de recurrir a instancias legales.
            </p>
          </Section>

          <Section title="14. Aceptación y contacto">
            <p>
              La creación de una cuenta implica la aceptación de estos términos y
              de las{' '}
              <Link
                href="/rules"
                className="text-green-700 hover:underline font-medium"
              >
                reglas de la quiniela
              </Link>
              .
            </p>

            <p>
              Para consultas o soporte puedes contactar al administrador en{' '}
              <a
                href={`mailto:${adminEmail}`}
                className="text-green-700 hover:underline font-medium"
              >
                {adminEmail}
              </a>
              .
            </p>
          </Section>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Última actualización: 28 de mayo de 2026
            </p>
          </div>
        </div>

        <div className="text-center py-6">
          <p className="text-xs text-gray-400">
            Hecho por{' '}
            <a
              href="https://github.com/daljo25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              daljo25
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-900 mb-2">
        {title}
      </h2>

      <div className="text-sm text-gray-700 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  )
}