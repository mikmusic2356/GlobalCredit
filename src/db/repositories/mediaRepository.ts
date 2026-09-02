import { getTursoClient } from '../client';
import { MediaItem } from '../../types/cms';

export class MediaRepository {
  public static async getAllMedia(): Promise<MediaItem[]> {
    const client = getTursoClient();
    const result = await client.execute(`
      SELECT * FROM media ORDER BY created_at DESC
    `);

    return result.rows.map((row: any) => ({
      id: String(row.id),
      filename: String(row.filename),
      url: String(row.url),
      alt: String(row.alt_text || 'Editorial media'),
      caption: row.caption ? String(row.caption) : undefined,
      source: row.credit ? String(row.credit) : undefined,
      dimensions: {
        width: Number(row.width || 1200),
        height: Number(row.height || 800),
      },
      fileSize: String(row.file_size || '240 KB'),
      usageCount: 2,
      uploadedAt: String(row.created_at || '2026-08-15'),
    }));
  }

  public static async saveMedia(item: MediaItem): Promise<MediaItem> {
    const client = getTursoClient();
    await client.execute({
      sql: `INSERT INTO media (
        id, filename, url, alt_text, caption, credit, width, height, file_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        alt_text=excluded.alt_text,
        caption=excluded.caption,
        credit=excluded.credit`,
      args: [
        item.id,
        item.filename,
        item.url,
        item.alt,
        item.caption || null,
        item.source || null,
        item.dimensions?.width || 1200,
        item.dimensions?.height || 800,
        item.fileSize || '150 KB',
      ],
    });
    return item;
  }

  public static async deleteMedia(id: string): Promise<boolean> {
    const client = getTursoClient();
    const res = await client.execute({
      sql: 'DELETE FROM media WHERE id = ?',
      args: [id],
    });
    return res.rowsAffected > 0;
  }
}
