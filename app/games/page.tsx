'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type GameMeta = {
  id: string;
  status: string;
  player_x: string | null;
  player_o: string | null;
  winner: string | null;
};

export default function HomePage() {
  const [games, setGames] = useState<GameMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const router = useRouter();

  // Spieler-ID setzen (einmalig)
  useEffect(() => {
    let stored = localStorage.getItem('playerId');
    if (!stored) {
      stored = crypto.randomUUID();
      localStorage.setItem('playerId', stored);
    }
    setPlayerId(stored);
  }, []);

  // Spiele laden
  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch('/api/games');
      const data = await res.json();
      setGames(data);
      setLoading(false);
    };
    fetchGames();
  }, []);

  // Neues Spiel erstellen
  const createGame = async () => {
    if (!playerId) return;
    const res = await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: playerId }),
    });
    const { gameId } = await res.json();
    router.push(`/game/${gameId}`);
  };

  return (
    <main className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-4xl font-bold">🎮 Tic Tac Toe Lobby</h1>

      <button
        onClick={createGame}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Neues Spiel erstellen
      </button>

      <div className="w-full max-w-md mt-4">
        {loading ? (
          <p>Lade laufende Spiele ...</p>
        ) : games.length === 0 ? (
          <p>Keine Spiele gefunden.</p>
        ) : (
          <div className="space-y-2">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex justify-between items-center px-4 py-2 border rounded bg-white shadow-sm"
              >
                <div>
                  <p className="font-mono text-sm">{game.id.slice(0, 8)}...</p>
                  <p className="text-xs text-gray-500">Status: {game.status}</p>
                </div>
                <button
                  onClick={() => router.push(`/game/${game.id}`)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Beitreten
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
