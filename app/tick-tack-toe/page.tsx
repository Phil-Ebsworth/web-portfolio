'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameCard } from '@/app/ui/game-card';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

type GameMeta = {
  id: string;
  status: string;
  player_x: string | null;
  player_o: string | null;
  winner: string | null;
};

export default function Page() {
  const { data: session } = useSession();
  const username = session?.user?.name ?? 'Gast';

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
    <div className="flex-col justify-center w-full p-4">
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
      <div className="w-full mt-4">
        {loading ? (
          <p>Lade laufende Spiele ...</p>
        ) : games.length === 0 ? (
          <p>Keine Spiele gefunden.</p>
        ) : (
          <div className="flex flex-1 flex-col grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 max-w-7xl mx-auto">
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
        )}
      </div>
    </div>
  );
}
