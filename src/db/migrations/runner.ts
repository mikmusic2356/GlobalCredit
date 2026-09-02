import { getTursoClient } from '../client';
import fs from 'fs';
import path from 'path';

export async function runMigrations() {
  const client = getTursoClient();

  console.log('[Migration] Checking migrations table...');

  // Ensure migrations tracking table exists
  await client.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT (DATETIME('now'))
    );
  `);

  const appliedRows = await client.execute('SELECT name FROM _migrations');
  const appliedNames = new Set(appliedRows.rows.map((r: any) => String(r.name)));

  const migrationsDir = path.resolve(process.cwd(), 'src/db/migrations');
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (appliedNames.has(file)) {
      console.log(`[Migration] Already applied: ${file}`);
      continue;
    }

    console.log(`[Migration] Applying migration: ${file}...`);
    const filePath = path.join(migrationsDir, file);
    const sqlContent = fs.readFileSync(filePath, 'utf-8');

    // Split SQL by semicolons that are not inside quotes or comments
    // Strip comments first
    const cleanSql = sqlContent
      .replace(/--.*$/gm, '')
      .trim();

    const statements = cleanSql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      try {
        console.log(`[Migration] Executing: ${stmt.slice(0, 60).replace(/\n/g, ' ')}...`);
        await client.execute(stmt);
      } catch (err: any) {
        console.error(`[Migration Error] Failed on statement in ${file}:\n${stmt}\n`, err);
        throw err;
      }
    }

    await client.execute({
      sql: 'INSERT INTO _migrations (name) VALUES (?)',
      args: [file],
    });

    console.log(`[Migration] Successfully applied: ${file}`);
  }

  console.log('[Migration] All migrations completed successfully.');
}

// Direct execution CLI support
if (process.argv[1] && process.argv[1].includes('runner')) {
  runMigrations()
    .then(() => {
      console.log('[Migration CLI] Done.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Migration CLI] Failed:', err);
      process.exit(1);
    });
}
