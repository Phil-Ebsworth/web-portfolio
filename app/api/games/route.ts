import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const result = await sql`
      SELECT id, status, player_x, player_o, winner, created_at, player_x_name, player_o_name, game_name
      FROM games
      ORDER BY created_at DESC
      LIMIT 20;
    `;

    return NextResponse.json(result);
  } catch (error) {
    console.error('Fehler beim Laden der Spieleliste:', error);
    return NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
}
