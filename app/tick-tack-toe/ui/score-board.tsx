import { PlayerBoard } from "./player-board";

export function ScoreBoard({
    player_x_name,
    player_o_name, 
    score_x,
    score_o,}:
    {
        player_x_name: string | null;
        player_o_name: string | null;
        score_x: number;
        score_o: number;
    }) {
    return (
        <div className="text-center text-2xl font-bold">
            <div className="flex flex-row items-center justify-between mt-4 gap-2">
                <div className="grid">
                    <PlayerBoard
                        playerName={player_x_name}
                        role="X"
                    />
                    <span className="truncate text-3xl text-center mt-4">{score_x}</span>
                </div>
                <div className="grid">
                    <PlayerBoard
                        playerName={player_o_name}
                        role="O"
                    />
                    <span className="truncate text-3xl text-center mt-4">{score_o}</span>
                </div>
            </div>
        </div>
    );
}