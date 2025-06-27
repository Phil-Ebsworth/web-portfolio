// /main/showcase/api/img/route.ts
import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit  = Number(searchParams.get('limit'))  || 20;   // Default 20
    const offset = Number(searchParams.get('offset')) || 0;

    // nimm statt random() lieber eine feste Sortierung,
    // damit die Paginierung nicht dupliziert
    const result = await sql`
      SELECT id, title, url, description, slug, category, created_at, prompt
      FROM images
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;

    return NextResponse.json(result);
  } catch (err) {
    console.error('Fehler beim Abrufen der Bilder:', err);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
