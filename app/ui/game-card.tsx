import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

export function GameCard({
    gameId,
    status,
    winner,
    deleteGame,
}: {
    gameId: string;
    status: string;
    winner: string | null;
    deleteGame: (gameId: string) => void;
}) {
    const router = useRouter();
    return (
        <Card >
            <CardHeader>
                <CardTitle>
                    <div className="flex items-start justify-between w-full">
                        <div>
                            Spiel-ID:<br /> {gameId} <br />
                        </div>
                        <Button
                            onClick={() => deleteGame(gameId)}
                            className="bg-red-500 hover:bg-red-600 text-white ml-4"
                        >
                            <Trash />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    {status === "waiting" ? "Warte auf einen zweiten Spieler..." : ""}
                    {status === "in_progress" ? "Das Spiel läuft!" : ""}
                    {status === "finished" ? `Gewinner ist  ${winner}` : ""}
                </CardDescription>
                <div className="flex flex-col gap-2 mt-4">
                    <Button
                        onClick={() => router.push(`/tick-tack-toe/game/${gameId}`)}
                        className=""
                    >
                        Beitreten
                    </Button>
                </div>
            </CardContent>
        </Card>


    );
}
