// Pfad: app/main/tab-bib/api/tabs/route.ts

import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const result = await sql`
      SELECT id, title, artist, difficulty, tuning, chords, tab_data, pdf_url, slug
      FROM tabs
    `;
    return NextResponse.json(result);
  } catch (err) {
    console.error('Fehler beim Abrufen der Tabs:', err);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
