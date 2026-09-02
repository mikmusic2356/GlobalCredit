import { createClient, Client } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

let dbClient: Client | null = null;
let connectionStatus: 'connected' | 'unavailable' | 'unconfigured' = 'unconfigured';
let lastError: string | null = null;

export function getTursoClient(): Client {
  if (dbClient) {
    return dbClient;
  }

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    connectionStatus = 'unconfigured';
    console.warn('[Turso DB] TURSO_DATABASE_URL is not set.');
    // Create an in-memory/fallback client for development resilience
    dbClient = createClient({
      url: 'file::memory:',
    });
    return dbClient;
  }

  try {
    dbClient = createClient({
      url,
      authToken: authToken || undefined,
    });
    connectionStatus = 'connected';
    return dbClient;
  } catch (error: any) {
    connectionStatus = 'unavailable';
    lastError = error.message;
    console.error('[Turso DB] Client initialization failed:', error);
    dbClient = createClient({
      url: 'file::memory:',
    });
    return dbClient;
  }
}

export async function checkDatabaseHealth(): Promise<{
  status: 'ok' | 'error';
  database: 'connected' | 'unavailable' | 'unconfigured';
  latencyMs?: number;
  error?: string;
}> {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    return {
      status: 'error',
      database: 'unconfigured',
      error: 'TURSO_DATABASE_URL environment variable is missing',
    };
  }

  const client = getTursoClient();
  const start = Date.now();

  try {
    await client.execute('SELECT 1 as ping');
    const latencyMs = Date.now() - start;
    connectionStatus = 'connected';
    return {
      status: 'ok',
      database: 'connected',
      latencyMs,
    };
  } catch (err: any) {
    connectionStatus = 'unavailable';
    lastError = err.message;
    return {
      status: 'error',
      database: 'unavailable',
      error: 'Database query failed or timed out',
    };
  }
}

export const db = {
  execute: async (stmt: string | { sql: string; args: any[] }) => {
    const client = getTursoClient();
    return await client.execute(stmt);
  },
  batch: async (stmts: (string | { sql: string; args: any[] })[]) => {
    const client = getTursoClient();
    return await client.batch(stmts, 'write');
  },
};
