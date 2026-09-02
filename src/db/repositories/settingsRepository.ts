import { getTursoClient } from '../client';

export class SettingsRepository {
  public static async getSetting(key: string): Promise<string | null> {
    const client = getTursoClient();
    const result = await client.execute({
      sql: 'SELECT value FROM site_settings WHERE key = ? LIMIT 1',
      args: [key],
    });
    if (result.rows.length === 0) return null;
    return String(result.rows[0].value);
  }

  public static async setSetting(key: string, value: string, type = 'string'): Promise<void> {
    const client = getTursoClient();
    await client.execute({
      sql: `INSERT INTO site_settings (id, key, value, type, updated_at)
            VALUES (?, ?, ?, ?, DATETIME('now'))
            ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=DATETIME('now')`,
      args: [`setting-${key}`, key, value, type],
    });
  }

  public static async getAllSettings(): Promise<Record<string, string>> {
    const client = getTursoClient();
    const result = await client.execute('SELECT key, value FROM site_settings');
    const settings: Record<string, string> = {};
    for (const r of result.rows) {
      settings[String(r.key)] = String(r.value);
    }
    return settings;
  }
}
