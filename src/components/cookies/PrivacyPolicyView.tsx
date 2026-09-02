import React from 'react';
import { ShieldCheck, Lock, ArrowLeft, Building2, Scale } from 'lucide-react';
import { AdSlotTop, AdSlotBottom } from '../ads/AdSlots';

interface PrivacyPolicyViewProps {
  onBackHome: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBackHome }) => {
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
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Política Global de Privacidad y Protección de Datos
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Fecha de Entrada en Vigor: 1 de Septiembre de 2026 &bull; Dominio Oficial: <strong>cardinsight.online</strong>
            </p>
          </div>
        </div>
      </div>

      <AdSlotTop slotId="privacy-policy-top" label="Información sobre Gobernanza y Privacidad de Datos" />

      {/* Main Content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Nuestro Compromiso Central con la Privacidad</h2>
          <p>
            <strong>CardInsight Online</strong> (<code>https://cardinsight.online</code>) es una plataforma estrictamente educativa, investigativa y de comparación de tarjetas de crédito. No originamos tarjetas de crédito, no prestamos dinero ni actuamos como correduría de seguros. <strong>Nunca recopilamos, almacenamos ni vendemos</strong> identificadores financieros personales sensibles como Números de Seguro Social (SSN), contraseñas de cuentas bancarias ni historiales de crédito crudos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Información que NO Recopilamos</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
            <li>No consultamos archivos de burós de crédito (Equifax, Experian, TransUnion) sin redirección voluntaria del usuario.</li>
            <li>No almacenamos números de tarjeta de crédito (PAN), códigos CVV ni fechas de vencimiento.</li>
            <li>No solicitamos credenciales de banca en línea ni registros contables privados.</li>
            <li>No comercializamos datos de usuarios con intermediarios (*data brokers*) ni empresas de telemercadeo.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Información Procesada Local y Anónimamente</h2>
          <p>
            Cuando usted utiliza nuestras herramientas interactivas (matriz comparativa, calculadoras de amortización, explorador de tasas de interés o guías):
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
            <li><strong>Interactive Inputs:</strong> Balance amounts, payoff goals, and credit score tiers entered into calculators are processed locally in your browser memory and are not persisted to external servers.</li>
            <li><strong>Telemetry & Usage Data:</strong> Anonymized page view statistics, referrer URLs, and device types to ensure site speed and mobile responsiveness.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Links & Advertising</h2>
          <p>
            Our website displays Google AdSense advertising slots and provides external links to statutory regulators (e.g., CFPB, FCA, FCAC, ASIC) and official card issuer product pages. Clicking an external link directs you to a third-party website governed by its own independent privacy statement.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Data Privacy Officer</h2>
          <p>
            For questions regarding this policy or compliance auditing, please contact our compliance desk at <code>privacy@cardinsight.online</code>.
          </p>
        </section>
      </div>

      <AdSlotBottom slotId="privacy-policy-bottom" label="Sponsored Regulatory Disclosures" />
    </div>
  );
};
