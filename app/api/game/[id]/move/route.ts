import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


const MoveSchema = z.object({
    player: z.string(),
    index: z.number().min(0).max(8),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: gameId } = await params;
    const body = await req.json();
    const parsed = MoveSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 });
    }

    const { player, index } = parsed.data;

    try {
        const result = await sql`SELECT * FROM games WHERE id = ${gameId};`;
        const game = result[0];

        if (!game) return NextResponse.json({ error: 'Spiel nicht gefunden' }, { status: 404 });

        const { board, current_turn, player_x, player_o, status, player_x_score, player_o_score } = game;

        if (status !== 'in_progress') {
            return NextResponse.json({ error: 'Spiel ist nicht aktiv' }, { status: 400 });
        }

        const symbol = player_x === player ? 'X' : player_o === player ? 'O' : null;
        if (!symbol) return NextResponse.json({ error: 'Unberechtigter Spieler' }, { status: 403 });
        if (symbol !== current_turn) return NextResponse.json({ error: 'Nicht dein Zug' }, { status: 400 });

        const boardArr = board.split('');
        if (boardArr[index] !== ' ') {
            return NextResponse.json({ error: 'Feld belegt' }, { status: 400 });
        }

        // Zug setzen
        boardArr[index] = symbol;

        const winner = checkWinner(boardArr);
        let newStatus: 'in_progress' | 'finished' = 'in_progress';
        let winnerChar: 'X' | 'O' | 'D' | null = null;

        if (winner) {
            newStatus = 'finished';
            winnerChar = winner;
            if (winner === 'X') {
                await sql`
                    UPDATE users
                    SET wins = wins + 1
                    WHERE id = ${player_x};
                `;
            } else if (winner === 'O') {
                await sql`
                    UPDATE users
                    SET wins = wins + 1
                    WHERE id = ${player_o};
                `;
            }
        } else if (!boardArr.includes(' ')) {
            newStatus = 'finished';
            winnerChar = 'D';
        }

        await sql`
        UPDATE games
        SET 
            board = ${boardArr.join('')},
            current_turn = ${symbol === 'X' ? 'O' : 'X'},
            status = ${newStatus},
            winner = ${winnerChar},
            player_x_score = ${winnerChar === 'X' ? player_x_score + 1 : player_x_score},
            player_o_score = ${winnerChar === 'O' ? player_o_score + 1 : player_o_score}
        WHERE id = ${gameId};
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Fehler beim Zug:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}

function checkWinner(board: string[]): 'X' | 'O' | null {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as 'X' | 'O';
    }
  }
  return null;
}
