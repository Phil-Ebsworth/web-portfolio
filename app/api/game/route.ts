import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: NextRequest) {
  const { playerId , gameName, username } = await req.json();

  if (!playerId || !gameName) {
    return NextResponse.json({ error: 'player and name required' }, { status: 400 });
  }

  const result = await sql`
    INSERT INTO games (player_x, current_turn, status, game_name, player_x_name, player_o_score, player_x_score)
    VALUES (${playerId}, 'X', 'waiting', ${gameName}, ${username} , 0, 0)
    RETURNING id;
  `;

  const gameId = result[0].id;

  return NextResponse.json({ gameId });
}
