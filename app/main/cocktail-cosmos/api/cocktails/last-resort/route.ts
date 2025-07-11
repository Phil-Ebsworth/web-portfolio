import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const slugs = [
  'wodka-lemon',
  'cuba-libre',
  'limoncello-spritz',
  'gin-basil-smash',
  'moscow-mule',
  'lillet-buck',
  'sekt-mate',
  'sekt-mate-lateralis',
  'aperol-spritz',
  'zitronen-limetten-limonade',
  'holunder-zitrone',
  'tropical-karsten',
];

export async function GET() {
  try {
    const drinks = await sql`
      SELECT id, name, slug, description, image_url, ingredients, instructions
      FROM cocktails
      WHERE slug = ANY(${slugs})
      ORDER BY array_position(${slugs}::text[], slug)
    `;
    return NextResponse.json(drinks);
  } catch (error) {
    console.error('Fehler beim Abrufen der Sommerdrinks:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}
