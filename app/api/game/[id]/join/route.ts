import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const JoinSchema = z.object({
  player: z.string(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
   const { id: gameId } = await params;
  const body = await req.json();
  const parsed = JoinSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 });
  }

  const { player } = parsed.data;

  try {
    const result = await sql`SELECT * FROM games WHERE id = ${gameId};`;
    const game = result[0];

    if (!game) {
      return NextResponse.json({ error: 'Spiel nicht gefunden' }, { status: 404 });
    }

    const { player_x, player_o, status } = game;

    // Spieler ist bereits X oder O → nichts tun
    if (player === player_x || player === player_o) {
      return NextResponse.json({ message: 'Bereits beigetreten' });
    }

    // Fall 1: Spiel komplett leer (player_x und player_o null)
    if (!player_x && !player_o) {
      await sql`
        UPDATE games
        SET player_x = ${player}, status = 'waiting'
        WHERE id = ${gameId};
      `;
      return NextResponse.json({ message: 'Beigetreten als X (neu erstellt)' });
    }

    // Fall 2: X ist belegt, O ist noch frei → beitreten als O
    if (player_x && !player_o && status === 'waiting') {
      await sql`
        UPDATE games
        SET player_o = ${player}, status = 'in_progress'
        WHERE id = ${gameId};
      `;
      return NextResponse.json({ message: 'Beigetreten als O' });
    }

    // Fall 3: Spiel ist voll
    return NextResponse.json({ error: 'Spiel ist voll' }, { status: 403 });

  } catch (error) {
    console.error('Fehler beim Beitritt:', error);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
