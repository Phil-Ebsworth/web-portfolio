import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function DELETE(
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

    const isPlayer = game.player_x === player || game.player_o === player;
    if (!isPlayer) {
      return NextResponse.json({ error: 'Du bist kein Teilnehmer dieses Spiels' }, { status: 403 });
    }

    await sql`DELETE FROM games WHERE id = ${gameId};`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE]', err);
    return NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 });
  }
}
