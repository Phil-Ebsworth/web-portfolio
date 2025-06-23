'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameCard } from './ui/game-card';
import { useSession } from 'next-auth/react';
import { NewGame } from './ui/new-game';
import { GamesGridSkeleton, ProjectsGridSkeleton } from '@/app/ui/skeletons';

type GameMeta = {
  id: string;
  status: string;
  player_x: string | null;
  player_o: string | null;
  winner: string | null;
  created_at: string;
  player_x_name?: string;
  player_o_name?: string;
  game_name?: string;
};

export default function Page() {
  const { data: session } = useSession();
  const username = session?.user?.name ?? 'Gast';
  const [games, setGames] = useState<GameMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!session) {
      router.push('/main/login');
    }
  }, [session, router]);

  // Spieler-ID setzen (einmalig)
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
      <NewGame />
      <div className="w-full mt-4">
        {loading ? (
          <GamesGridSkeleton />
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
                playerXName={game.player_x_name ? game.player_x_name : null}
                playerOName={game.player_o_name ? game.player_o_name : null}
                gameName={game.game_name || 'Unbenanntes Spiel'}
                deleteGame={() => deleteGame(game.id)}
              />
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
