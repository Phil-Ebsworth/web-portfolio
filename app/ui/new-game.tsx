import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";




export function NewGame({playerName}: { playerName?: string })
{
    const [playerId, setPlayerId] = useState('');
    const [gameName, setGameName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const { data: session } = useSession();
    const username = session?.user?.name ?? 'Gast';

    useEffect(() => {
        if (session?.user?.id){
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
      
    const createGame = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId: playerId, gameName: gameName, username: username }),
        });
        const { gameId } = await res.json();
        router.push(`/tick-tack-toe/game/${gameId}`);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button >
                    <Plus/>
                    </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <form onSubmit={createGame}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="leading-none font-medium">Generate new Game</h4>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="gameName">Name</Label>
                                <Input
                                    id="gameName"
                                    defaultValue=""
                                    className="col-span-2 h-8"
                                    value={gameName}
                                    onChange={(e) => setGameName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Create Game
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}