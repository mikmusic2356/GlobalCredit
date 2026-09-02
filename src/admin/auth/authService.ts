export interface AdminUser {
  email: string;
  name: string;
  role: 'Super Admin' | 'Lead Editor' | 'Compliance Officer';
  lastLogin: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  accessCode: string;
}

// Default Secure Credentials for CardInsight Online Administrator
export const ADMIN_DEFAULT_CREDENTIALS = {
  email: 'admin@cardinsight.online',
  password: 'CardInsight2026!Secure',
  accessCode: 'CI-8899-SECURE',
};

const SESSION_STORAGE_KEY = 'cardinsight_admin_session_auth_v1';

export const AdminAuthService = {
  /**
   * Validate 3-factor authentication: email, password, and accessCode
   */
  authenticate(credentials: AuthCredentials): { success: boolean; error?: string; user?: AdminUser } {
    const cleanEmail = credentials.email.trim().toLowerCase();
    const cleanPassword = credentials.password.trim();
    const cleanCode = credentials.accessCode.trim().toUpperCase();

    // Check credentials against admin records
    if (
      cleanEmail === ADMIN_DEFAULT_CREDENTIALS.email.toLowerCase() &&
      cleanPassword === ADMIN_DEFAULT_CREDENTIALS.password &&
      cleanCode === ADMIN_DEFAULT_CREDENTIALS.accessCode
    ) {
      const user: AdminUser = {
        email: cleanEmail,
        name: 'Master Admin',
        role: 'Super Admin',
        lastLogin: new Date().toISOString(),
      };

      // Save token in sessionStorage (cleared when browser session ends)
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    }

    if (cleanEmail !== ADMIN_DEFAULT_CREDENTIALS.email.toLowerCase()) {
      return { success: false, error: 'Correo electrónico de administrador no reconocido.' };
    }

    if (cleanPassword !== ADMIN_DEFAULT_CREDENTIALS.password) {
      return { success: false, error: 'Contraseña de administrador incorrecta.' };
    }

    if (cleanCode !== ADMIN_DEFAULT_CREDENTIALS.accessCode) {
      return { success: false, error: 'Código de acceso de 3er factor (Security PIN) inválido.' };
    }

    return { success: false, error: 'Credenciales inválidas.' };
  },

  /**
   * Check if current session is authenticated
   */
  isAuthenticated(): boolean {
    try {
      const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return Boolean(parsed && parsed.email);
    } catch {
      return false;
    }
  },

  /**
   * Get current authenticated user details
   */
  getCurrentUser(): AdminUser | null {
    try {
      const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!session) return null;
      return JSON.parse(session);
    } catch {
      return null;
    }
  },

  /**
   * Log out admin
   */
  logout(): void {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  },
};
