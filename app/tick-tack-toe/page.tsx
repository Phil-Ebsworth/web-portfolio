'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameCard } from '@/app/ui/game-card';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';

type GameMeta = {
  id: string;
  status: string;
  player_x: string | null;
  player_o: string | null;
  winner: string | null;
};

export default function Page() {
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
    router.push(`/tick-tack-toe/game/${gameId}`);
  };

  // Spiele löschen
  const deleteGame = async (gameId: string) => {
    if (!playerId) return;
    const res = await fetch(`/api/game/${gameId}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: playerId }),
    });
    const result = await res.json();
    if (res.ok) {
      setGames(games.filter((g) => g.id !== gameId)); // Lokale Aktualisierung
    } else {
      alert('Fehler: ' + result.error);
    }
  };

  return (
    <div className="flex-col items-center justify-center w-full h-full p-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={createGame}>
          <Plus/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Neues Spiel</p>
        </TooltipContent>
      </Tooltip>
      <div className="w-full max-w-md mt-4">
        {loading ? (
          <p>Lade laufende Spiele ...</p>
        ) : games.length === 0 ? (
          <p>Keine Spiele gefunden.</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '95vw' }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {games.map((game) => (
              <GameCard
                key={game.id}
                gameId={game.id}
                status={game.status}
                winner={game.winner}
                deleteGame={() => deleteGame(game.id)}
              />
            ))}
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
