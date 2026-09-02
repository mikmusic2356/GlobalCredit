import React from 'react';
import { Cookie, ShieldCheck, Lock, ExternalLink, ArrowLeft, RefreshCw } from 'lucide-react';
import { DEFAULT_COOKIE_CATEGORIES } from '../../data/articles/articleStore';
import { AdSlotTop, AdSlotBottom } from '../ads/AdSlots';

interface CookiePolicyViewProps {
  onBackHome: () => void;
  onOpenPreferences: () => void;
}

export const CookiePolicyView: React.FC<CookiePolicyViewProps> = ({
  onBackHome,
  onOpenPreferences,
}) => {
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
            <Cookie className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Política de Cookies y Tecnologías de Rastreo
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Última revisión: 1 de Septiembre de 2026 &bull; Plataforma Oficial: <strong>cardinsight.online</strong>
            </p>
          </div>
        </div>
      </div>

      <AdSlotTop slotId="cookie-policy-top" label="Políticas de Transparencia y Cookies" />

      {/* Main Content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. ¿Qué son las Cookies y el Almacenamiento Local?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo para recordar preferencias, optimizar el rendimiento técnico de las calculadoras y permitir la entrega de publicidad no invasiva mediante Google AdSense.
          </p>
          <p>
            En <strong>CardInsight Online</strong> (<code>https://cardinsight.online</code>), además de cookies estándar, utilizamos <code>localStorage</code> para recordar su país seleccionado, las tarjetas que ha agregado a su comparador y su estado de consentimiento de privacidad, sin enviar sus datos personales a servidores externos.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">2. Categories of Cookies We Use</h2>
          <div className="space-y-4">
            {DEFAULT_COOKIE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">{cat.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    {cat.required ? 'Strictly Required' : 'Optional (User Configurable)'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{cat.description}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs bg-white rounded-lg border border-slate-200">
                    <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Identifier</th>
                        <th className="p-2.5">Provider</th>
                        <th className="p-2.5">Purpose</th>
                        <th className="p-2.5">Retention</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cat.cookies.map((c, i) => (
                        <tr key={i}>
                          <td className="p-2.5 font-mono font-bold text-slate-800">{c.name}</td>
                          <td className="p-2.5 text-slate-600">{c.provider}</td>
                          <td className="p-2.5 text-slate-600">{c.purpose}</td>
                          <td className="p-2.5 text-slate-500">{c.expiry}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Managing and Revoking Your Consent</h2>
          <p>
            You have the statutory right to withdraw or customize your cookie consent at any time. Clicking the button below allows you to alter your preferences immediately without penalty.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenPreferences}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Open Cookie Preferences Manager
            </button>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">4. Browser-Level Controls</h2>
          <p>
            Most web browsers allow control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">allaboutcookies.org</a>.
          </p>
        </section>
      </div>

      <AdSlotBottom slotId="cookie-policy-bottom" label="Sponsored Educational Resources" />
    </div>
  );
};
