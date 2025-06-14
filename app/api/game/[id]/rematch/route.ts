import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: gameId } = await params;
  const { player } = await req.json();

  try {
    const result = await sql`SELECT * FROM games WHERE id = ${gameId};`;
    const game = result[0];

    if (!game) {
      return NextResponse.json({ error: 'Spiel nicht gefunden' }, { status: 404 });
    }

    if (game.status !== 'finished') {
      return NextResponse.json({ error: 'Spiel läuft noch' }, { status: 400 });
    }

    const isPlayer = game.player_x === player || game.player_o === player;
    if (!isPlayer) {
      return NextResponse.json({ error: 'Nur Spieler können ein Rematch starten' }, { status: 403 });
    }

    const randomStart = Math.random() < 0.5 ? 'X' : 'O';

    await sql`
      UPDATE games
      SET board = ${' '.repeat(9)},
          current_turn = ${randomStart},
          status = 'in_progress',
          winner = NULL
      WHERE id = ${gameId};
    `;

    return NextResponse.json({ success: true, message: 'Rematch gestartet' });
  } catch (error) {
    console.error('[REMATCH]', error);
    return NextResponse.json({ error: 'Serverfehler beim Rematch' }, { status: 500 });
  }
}
