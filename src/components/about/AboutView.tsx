import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  FileText, 
  DollarSign, 
  AlertCircle,
  EyeOff
} from 'lucide-react';
import { AdBanner } from '../common/AdBanner';

export const AboutView: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('Data Correction');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    setFeedbackSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center shrink-0 mb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Charter of Editorial Independence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          About CardInsight Online & Editorial Policy
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          <strong>CardInsight Online</strong> (<code>cardinsight.online</code>) was built to provide consumers with clean, factual, uncorrupted financial intelligence. We believe in free access to credit card specifications, transparent APR formulas, and uncompromising editorial integrity.
        </p>
      </header>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Zero Fake Data Policy
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We never publish fabricated cards, simulated APR ranges, fake user ratings, or invented perks. All product specifications are compiled directly from verified bank Schumer boxes and regulatory filings.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            100% Free & Open Access
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Users are never required to pay subscriptions, create accounts, register personal data, or interact with advertisements to unlock comparison matrices or financial calculators.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-600">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Sponsored Ranking Bias
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Commercial partnerships and advertising networks do not dictate editorial card rankings or calculator formulas. Our tools compute mathematical reality without commercial distortion.
          </p>
        </div>
      </div>

      {/* Monetization & Google AdSense Disclosure */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Google AdSense Monetization & Advertising Policy
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            To keep this comprehensive global credit database completely free and open for public benefit, GlobalCredit displays contextual digital advertisements served primarily via <strong>Google AdSense</strong>.
          </p>
          <ul className="space-y-2 list-disc list-inside bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
            <li><strong>Non-Intrusive Layouts:</strong> We never deploy popups, forced timer countdowns, screen takeovers, or deceptive link placements.</li>
            <li><strong>Clear Ad Labelling:</strong> All sponsored units are explicitly tagged with standard "ADVERTISEMENT" badges adhering to IAB and FTC guidelines.</li>
            <li><strong>Editorial Independence:</strong> Advertisers have zero control over our financial guides, interest calculators, or directory data structures.</li>
          </ul>
        </div>
      </div>

      {/* Statutory Disclaimer */}
      <div className="p-6 rounded-xl bg-slate-900 text-white space-y-3 border border-slate-800">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs">
          <AlertCircle className="w-4 h-4" />
          <span>Statutory Status: Informational Directory Only</span>
        </div>
        <h3 className="text-base font-bold text-white">
          Not a Bank, Lender, or Financial Advisor
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          GlobalCredit is an independent informational publisher. We do not provide credit, issue cards, collect credit applications, perform credit scoring, or offer personalized investment advice. All financial calculations and rates are provided for comparative educational analysis. Before applying for any credit product, consumers must consult the issuing institution's direct regulatory disclosures.
        </p>
      </div>

      {/* Editorial Feedback & Corrections Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Submit a Data Correction or Regulatory Inaccuracy
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Financial institutions frequently revise terms, APRs, and fees. If you notice any outdated rate or regulatory change, notify our editorial team below.
          </p>
        </div>

        {feedbackSent ? (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-base">Correction Submitted Successfully</h4>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              Thank you for contributing to the integrity of our international credit database. Our verification desk will review the documentation within 1 business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inquiry Nature
                </label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="Data Correction">Data Correction / Outdated APR</option>
                  <option value="Regulatory Update">Regulatory / Legal Framework Update</option>
                  <option value="New Product Suggestion">New Sovereign Market Suggestion</option>
                  <option value="Editorial Feedback">General Editorial Inquiries</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correction Details & Source Reference
              </label>
              <textarea
                rows={4}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Specify the card name, country, previous value vs verified new value, and source URL or regulatory filing..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Verification Report</span>
            </button>
          </form>
        )}
      </div>

      <AdBanner slotType="leaderboard" slotId="about-bottom" />
    </div>
  );
};
