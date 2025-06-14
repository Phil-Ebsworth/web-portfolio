import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: gameId } = await context.params;
  
  try {
    const result = await sql`SELECT * FROM games WHERE id = ${gameId};`;
    const game = result[0];

    if (!game) {
      return NextResponse.json({ error: 'Spiel nicht gefunden' }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Fehler beim Laden des Spiels:', error);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
