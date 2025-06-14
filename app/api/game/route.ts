import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST() {
  try {
    const result = await sql`
      INSERT INTO games (board, current_turn, status)
      VALUES ('         ', 'X', 'waiting')
      RETURNING id;
    `;
    const gameId = result[0].id;

    return NextResponse.json({ gameId });
  } catch (error) {
    console.error('Fehler beim Erstellen des Spiels:', error);
    return NextResponse.json({ error: 'Fehler beim Erstellen' }, { status: 500 });
  }
}
