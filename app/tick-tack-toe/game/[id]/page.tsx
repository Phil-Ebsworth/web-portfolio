'use client';

import { use, useEffect, useState } from 'react';
import Board from '@/app/ui/board';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Circle } from 'lucide-react';
import { ScoreBoard } from '@/app/ui/score-board';

type GameData = {
  board: string;
  current_turn: string;
  status: string;
  player_x: string | null;
  player_o: string | null;
  winner: string | null;
  game_name: string;
  player_x_name: string | null;
  player_o_name: string | null;
  player_x_score: number;
  player_o_score: number;
};

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: gameId } = use(params);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [game, setGame] = useState<GameData | null>(null);
  const [role, setRole] = useState<'X' | 'O' | 'Zuschauer'>('Zuschauer');
  const [playerName, setPlayerName] = useState<string | null>(null);

  const { data: session } = useSession();

  // 1. Spieler-ID initialisieren (einmalig)
  useEffect(() => {
    if (session?.user?.id) {
      setPlayerId(session.user.id);
      return;
    }
    let stored = localStorage.getItem('playerId');
    if (!stored) {
      stored = crypto.randomUUID();
      localStorage.setItem('playerId', stored);
    }
    setPlayerId(stored);
  }, []);

  // 2. Spielstand laden + Polling
  useEffect(() => {
    if (!playerId) return;

    const fetchGame = async () => {
      const res = await fetch(`/api/game/${gameId}`);
      const data = await res.json();
      setGame(data);

      if (data.player_x === playerId) setRole('X');
      else if (data.player_o === playerId) setRole('O');
      else setRole('Zuschauer');
      setPlayerName(session?.user?.name ?? 'Gast');
    };

    fetchGame();
    const interval = setInterval(fetchGame, 1000);
    return () => clearInterval(interval);
  }, [playerId]);

  // 3. Automatisch Spiel beitreten (wenn nötig)
  useEffect(() => {
    if (!game || !playerId) return;

    const isPlayer = game.player_x === playerId || game.player_o === playerId;
    const needsJoin = game.status === 'waiting' && !isPlayer;

    if (needsJoin) {
      fetch(`/api/game/${gameId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: playerId }),
      })
        .then((res) => res.json())
        .then((data) => console.log('[Auto-Join]', data.message || data.error));
    }
  }, [game, playerId]);

  // 4. Spielzug ausführen
  const makeMove = async (index: number) => {
    console.log('Klick auf Feld', index);
    if (!game || !playerId || game.status !== 'in_progress') return;

    const isYourTurn =
      (game.current_turn === 'X' && role === 'X') ||
      (game.current_turn === 'O' && role === 'O');

    const boardArray = game.board.split('');
    const fieldFree = boardArray[index] === ' ';

    if (!isYourTurn || !fieldFree) return;

    const res = await fetch(`/api/game/${gameId}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: playerId, index }),
    });

    const result = await res.json();
    if (res.ok) {
      const updated = await fetch(`/api/game/${gameId}`);
      setGame(await updated.json());
    }
    if (res.status !== 200) {
      console.warn('Fehler beim Zug:', result.error);
    }
  };

  if (!game || !playerId) return <p className="p-6">Lade Spiel ...</p>;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center">{game.game_name}</h1>
        <ScoreBoard player_x_name={game.player_x_name} player_o_name={game.player_o_name} score_x={game.player_x_score} score_o={game.player_o_score}/>
        <p className="text-center mt-4 mb-4">Du spielst als: <strong>{role}</strong></p>
        <Board
          board={game.board.split('')}
          onCellClick={makeMove}
          winningLine={getWinningLine(game.board)}
        />
        <p  className="text-center">
          {game.status === 'finished'
            ? game.winner === 'D'
              ? 'Unentschieden!'
              : `🎉 Gewinner: ${game.winner}`
            : game.player_o
              ? `Zug: ${game.current_turn}`
              : 'Warte auf zweiten Spieler …'}
        </p>
        {game.status === 'finished' && (
          <button
            onClick={async () => {
              const res = await fetch(`/api/game/${gameId}/rematch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ player: playerId }),
              });
              const result = await res.json();
              if (!res.ok) {
                alert('Fehler: ' + result.error);
              } else {
                console.log('[Rematch]', result.message);
              }
            }}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🔁 Neues Spiel starten
          </button>)}
      </div>
    </div>
  );
}

function getWinningLine(board: string): number[] | undefined {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
      return line; // Rückgabe der Gewinnlinie
    }
  }

  return undefined; // Keine Gewinnlinie gefunden
}