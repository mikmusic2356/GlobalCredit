import React from 'react';
import { Scale, ShieldAlert, ArrowLeft, CheckCircle2, FileText, Globe2, AlertCircle } from 'lucide-react';
import { AdSlotTop, AdSlotBottom } from '../ads/AdSlots';

interface TermsOfServiceViewProps {
  onBackHome: () => void;
}

export const TermsOfServiceView: React.FC<TermsOfServiceViewProps> = ({ onBackHome }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="space-y-4">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a la Plataforma Principal
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Última actualización: 1 de Septiembre de 2026 &bull; Plataforma Oficial: <strong>cardinsight.online</strong>
            </p>
          </div>
        </div>
      </div>

      <AdSlotTop slotId="terms-of-service-top" label="Información Legal y Regulatoria" />

      {/* Main Content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            1. Aceptación de los Términos
          </h2>
          <p>
            Bienvenido a <strong>CardInsight Online</strong> (accesible a través de <code>cardinsight.online</code>). Al acceder, navegar o utilizar nuestra plataforma de información de tarjetas de crédito, calculadoras financieras, comparadores o guías educativas, usted acepta de manera vinculante cumplir con los presentes Términos y Condiciones, así como con nuestra Política de Privacidad y Política de Cookies.
          </p>
          <p>
            Si no está de acuerdo con alguno de estos términos, le solicitamos abstenerse de utilizar el sitio web y sus herramientas.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            2. Naturaleza Exclusivamente Informativa y No Financiera (No Somos Prestamistas)
          </h2>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
            <p className="font-bold">
              AVISO LEGAL CRÍTICO: CARDINSIGHT ONLINE NO ES UN BANCO, PRESTAMISTA, BROKER NI ASESOR FINANCIERO CON LICENCIA.
            </p>
            <p>
              La información suministrada en este sitio tiene un propósito 100% educativo, comparativo y referencial. <strong>CardInsight Online</strong> no emite tarjetas de crédito, no evalúa solicitudes crediticias, no capta depósitos ni garantiza la aprobación de ningún producto financiero.
            </p>
          </div>
          <p>
            Las tasas de interés (APR / Tasa Representativa), comisiones por mora, periodos introductorios al 0% y estructuras de recompensas pueden ser modificadas en cualquier momento por las entidades bancarias emisoras (como Chase, Citi, Capital One, American Express, Barclays, etc.) sin previo aviso. Recomendamos verificar siempre los términos oficiales en la caja Schumer (Schumer Box) o contrato del emisor antes de solicitar cualquier producto.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            3. Uso de Calculadoras y Simuladores Financieros
          </h2>
          <p>
            Nuestras herramientas interactivas (calculadoras de amortización, pago de deudas bola de nieve/avalancha, simuladores de transferencias de balance e impacto de utilización) son modelos matemáticos basados en fórmulas estándar del sector. 
          </p>
          <p>
            Los resultados son estimaciones proyectadas y no constituyen promesas contractuales de ahorro ni ofertas vinculantes de crédito.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-blue-600" />
            4. Propiedad Intelectual y Derechos de Autor
          </h2>
          <p>
            Todo el contenido original publicado en <strong>cardinsight.online</strong> —incluyendo artículos de investigación, análisis normativos, estructuras de bases de datos, código fuente, iconos e identidad gráfica— está protegido por las leyes internacionales de derechos de autor y propiedad intelectual.
          </p>
          <p>
            Los logotipos, marcas comerciales y nombres de bancos o redes de pago (Visa, Mastercard, American Express, Discover, etc.) son propiedad exclusiva de sus respectivos titulares y se utilizan únicamente con fines ilustrativos, informativos y de identificación justa (*fair use*).
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-purple-600" />
            5. Enlaces a Terceros y Publicidad
          </h2>
          <p>
            Nuestro sitio puede contener enlaces hacia sitios web de terceros o anuncios servidos por redes publicitarias como Google AdSense. <strong>CardInsight Online</strong> no tiene control ni asume responsabilidad por el contenido, políticas de privacidad o prácticas comerciales de plataformas externas.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">6. Modificaciones a los Términos</h2>
          <p>
            Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento para reflejar cambios legales o mejoras operativas en el portal. Las modificaciones entrarán en vigencia inmediatamente tras su publicación en <code>https://cardinsight.online/terms</code>.
          </p>
        </section>

        {/* Contact info */}
        <section className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          <p>
            Para consultas legales o notificaciones regulatorias relacionadas con <strong>CardInsight Online</strong>, puede escribirnos a través del portal de contacto en <code>support@cardinsight.online</code>.
          </p>
        </section>
      </div>

      <AdSlotBottom slotId="terms-of-service-bottom" label="Transparencia y Normativas de Consumo" />
    </div>
  );
};
