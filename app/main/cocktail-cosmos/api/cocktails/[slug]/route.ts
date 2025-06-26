import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

// Sichere Verbindung zur PostgreSQL-Datenbank (z. B. Neon)
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function GET(
  req: NextRequest,
  { params } : { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;

  try {
    const result = await sql`
      SELECT * FROM cocktails WHERE slug = ${slug}
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Cocktail not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]); // Einzelnes Cocktail zurückgeben
  } catch (error) {
    console.error('[API ERROR]:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
