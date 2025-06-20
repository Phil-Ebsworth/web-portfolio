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
    playerXName,
    playerOName,
    gameName,
    deleteGame,
}: {
    gameId: string;
    status: string;
    winner: string | null;
    playerXName: string | null;
    playerOName: string | null;
    gameName: string | null;
    deleteGame: (gameId: string) => void;
}) {
    const router = useRouter();
    return (
        <Card >
            <CardHeader>
                <CardTitle>
                    <div className="flex items-start justify-between w-full">
                        <div>
                             <span className="text-xl">{gameName}</span> <br />
                             
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
                <span>{playerXName ? `Spieler X: ${playerXName}` : "Spieler X: Gast"} <br /></span>
                    <span>
                    {status == 'waiting' ?  "Spieler O: searching..." : playerOName? `Spieler O: ${playerOName}` : "Spieler O: Gast"}
                    </span> <br />
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
