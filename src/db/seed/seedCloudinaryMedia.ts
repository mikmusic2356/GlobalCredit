import { getTursoClient } from '../client';
import { CLOUDINARY_MEDIA_LIBRARY } from '../../data/media/cloudinaryMedia';

export async function seedCloudinaryMedia() {
  console.log(`[Seed Cloudinary] Ingesting ${CLOUDINARY_MEDIA_LIBRARY.length} media items into Turso DB...`);
  const client = getTursoClient();

  let insertedCount = 0;
  for (const m of CLOUDINARY_MEDIA_LIBRARY) {
    await client.execute({
      sql: `INSERT INTO media (
        id, filename, url, alt_text, caption, credit, source_url, width, height, file_size
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        url = excluded.url,
        alt_text = excluded.alt_text,
        caption = excluded.caption,
        credit = excluded.credit,
        source_url = excluded.source_url,
        filename = excluded.filename`,
      args: [
        m.id,
        m.filename,
        m.url,
        m.alt,
        m.caption || null,
        m.title || m.source || null,
        m.url,
        m.dimensions?.width || 1200,
        m.dimensions?.height || 800,
        m.fileSize || '150 KB',
      ],
    });
    insertedCount++;
  }

  console.log(`[Seed Cloudinary] Successfully synced ${insertedCount} media assets into Turso media table!`);
}

if (process.argv[1] && process.argv[1].includes('seedCloudinaryMedia')) {
  seedCloudinaryMedia()
    .then(() => {
      console.log('[Seed Cloudinary CLI] Done!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed Cloudinary CLI] Failed with error:', err);
      process.exit(1);
    });
}
