import React, { useState } from 'react';
import { CountryCode } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { Sparkles, X, Send, Bot, User, Loader2, ShieldCheck, HelpCircle } from 'lucide-react';

interface AiCreditAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryCode;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sourceRegulator?: string;
}

export const AiCreditAssistantModal: React.FC<AiCreditAssistantModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
}) => {
  const currentCountry = COUNTRIES_DATA[selectedCountry];

  const defaultPrompts = [
    `How does credit scoring work in ${currentCountry.name}?`,
    `What are the balance transfer rules and fees in ${currentCountry.name}?`,
    `Explain the difference between standard APR and ${currentCountry.terminology.interestRateLabel}.`,
    `What statutory rights protect credit card consumers under ${currentCountry.regulator.abbreviation}?`,
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am the **CardInsight Online Factual AI Explainer**. I provide structured, mathematically accurate, and legally verified information on credit card terminology, regulations, APR calculations, and credit score mechanics across the **${currentCountry.name}** and other global jurisdictions.\n\n*How can I help clarify your credit questions today?*`,
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/credit-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          country: currentCountry.name,
          contextTopic: currentCountry.regulator.name,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || 'No response returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceRegulator: data.sourceRegulator || currentCountry.regulator.name,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `In ${currentCountry.name}, credit cards are regulated under ${currentCountry.regulator.name} (${currentCountry.regulator.abbreviation}). When researching cards or evaluating debt strategies, always verify official disclosures in the card issuer's agreement. (Note: Server response error, provided fallback guidance).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col h-[85vh] max-h-[750px]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Credit & Regulatory AI Assistant
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {currentCountry?.flag} {currentCountry?.code ? currentCountry.code.toUpperCase() : ''} Focus
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Factual credit terminology and consumer credit legislation explainer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-sm bg-slate-50/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-4 shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-xs'
                }`}
              >
                <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                  {msg.content}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sourceRegulator && (
                    <span className="text-blue-600 font-medium">Ref: {msg.sourceRegulator}</span>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-white">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="p-4 rounded-xl rounded-bl-xs bg-white border border-slate-200 text-slate-600 text-xs flex items-center gap-2 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Consulting verified regulatory frameworks for {currentCountry.name}...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] uppercase text-slate-400 shrink-0 font-semibold flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Quick Questions:
          </span>
          {defaultPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isLoading}
              className="text-xs whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors disabled:opacity-50 shadow-xs"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`Ask about ${currentCountry.name} credit card rules, interest math, or consumer rights...`}
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>

        {/* Disclaimer Bar */}
        <div className="px-4 py-1.5 bg-slate-50 text-[10px] text-slate-400 border-t border-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Educational intelligence only. Not financial or legal advice.
          </span>
          <span className="hidden sm:inline">Powered by Gemini AI (Server-Side)</span>
        </div>
      </div>
    </div>
  );
};
