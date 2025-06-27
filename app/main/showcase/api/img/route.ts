// /main/showcase/api/img/route.ts
import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit  = Number(searchParams.get('limit'))  || 20;
    const offset = Number(searchParams.get('offset')) || 0;

    // ‼️ NEU: gemeinsamer Seed, den der Client einmal pro Session erzeugt
    // Wird kein Seed mitgeschickt, erzeugen wir notfalls einen statischen,
    // damit dieselbe Reihenfolge gilt, solange die Seite offen ist.
    const seed   = searchParams.get('seed') || 'defaultSeed';

    /* 
      ► Idee: Wir bilden aus seed+id einen Hash und sortieren danach.
        So steht jedes Bild _einmal_ an einer pseudo-zufälligen Position,
        und LIMIT/OFFSET funktioniert ohne Duplikate.
        md5() liefert einen hex-String; darauf kann Postgres sortieren.
    */
    const result = await sql`
      SELECT id, title, url, description, slug, category, created_at, prompt
      FROM   images
      ORDER  BY md5(${seed} || id)   -- stabile Zufalls­permutation
      LIMIT  ${limit} OFFSET ${offset};
    `;

    return NextResponse.json(result);
  } catch (err) {
    console.error('Fehler beim Abrufen der Bilder:', err);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
