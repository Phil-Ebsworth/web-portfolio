import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const slugs = [
  'old-fashioned',
  'martini',
  'manhattan',
  'negroni',
  'daiquiri',
  'margarita',
  'whiskey-sour',
  'mojito',
  'cosmopolitan',
  'mai-tai',
  'sidecar',
  'sazerac',
  'gimlet',
  'boulevardier',
  'moscow-mule',
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
