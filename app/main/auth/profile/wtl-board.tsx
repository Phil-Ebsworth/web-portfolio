
export function WTLBoard( { wins , losses, ties } : { wins: number, losses: number, ties: number } ) {
    return (
        <div className="rounded-lg shadow-md p-6">
            <div className="grid grid-cols-3 gap-4">
                <div className=" p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">Wins</h3>
                    <p className="text-2xl">{wins}</p>
                </div>
                <div className=" p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">Losses</h3>
                    <p className="text-2xl">{losses}</p>
                </div>
                <div className=" p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold">Ties</h3>
                    <p className="text-2xl">{ties}</p>
                </div>
            </div>
        </div>
    );
}