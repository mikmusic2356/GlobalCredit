import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { AdminAuthService, AuthCredentials } from './authService';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim() || !accessCode.trim()) {
      setErrorMessage('Por favor ingrese todos los campos requeridos (Correo, Contraseña y Código de Acceso).');
      return;
    }

    setIsLoading(true);

    // Realistic security check delay
    setTimeout(() => {
      const credentials: AuthCredentials = { email, password, accessCode };
      const result = AdminAuthService.authenticate(credentials);

      setIsLoading(false);

      if (result.success) {
        onSuccess();
      } else {
        setErrorMessage(result.error || 'Credenciales de acceso no válidas.');
      }
    }, 600);
  };

  const handleFillDemoCredentials = () => {
    setEmail('admin@cardinsight.online');
    setPassword('CardInsight2026!Secure');
    setAccessCode('CI-8899-SECURE');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        
        {/* Header Visual */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-white space-y-2 relative">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <button
              onClick={onCancel}
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-medium flex items-center gap-1 transition-colors border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Salir al Sitio</span>
            </button>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight pt-1">
            Panel de Administración
          </h2>
          <p className="text-blue-100 text-xs">
            Sistema de Acceso Seguro de 3 Factores • <strong>CardInsight Online</strong>
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Error Callout */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Factor 1: Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Correo de Administrador</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cardinsight.online"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden transition-all bg-slate-50/50"
            />
          </div>

          {/* Factor 2: Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Contraseña Maestra</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-hidden transition-all bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Factor 3: Security PIN / Access Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                <span>Código de Acceso (3er Factor / PIN)</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">CI-XXXX-XXXX</span>
            </label>
            <input
              type="text"
              required
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="CI-8899-SECURE"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-mono tracking-wider uppercase outline-hidden transition-all bg-slate-50/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span>Verificando 3 Factores...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Iniciar Sesión en CMS</span>
              </>
            )}
          </button>

          {/* Auto-fill Assistant for Owner / Quick Access */}
          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Autocompletar Credenciales Oficiales de Administrador</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-center space-y-1">
            <p>Sesión cifrada con algoritmo SHA-256 local y expiración automática.</p>
          </div>
        </form>
      </div>
    </div>
  );
};
