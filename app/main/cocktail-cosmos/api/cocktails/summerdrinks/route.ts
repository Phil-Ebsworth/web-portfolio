import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const slugs = [
  'mojito-spritz',
  'aperol-spritz',
  'limoncello-tonic',
  'gin-basil-smash-light',
  'vodka-cranberry',
  'tropical-rum-fizz',
  'summer-mule',
  'cranberry-spritz',
  'limoncello-spritz',
  'gin-sunset',
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
