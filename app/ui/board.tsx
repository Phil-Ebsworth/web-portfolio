type BoardProps = {
  board: string[]; // Länge 9, Werte: 'X', 'O', ' '
  onCellClick?: (index: number) => void;
  winningLine?: number[]; // Optional, um die Gewinnlinie hervorzuheben
};

export default function Board({ board, onCellClick, winningLine }: BoardProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => {
          const isWinningCell = winningLine?.includes(index);
          return (
            <button
              key={index}
              onClick={() => onCellClick?.(index)}
              className={`w-24 h-24 text-3xl font-bold border-2 border-gray-300 rounded-md hover:bg-gray-300 disabled:cursor-not-allowed ${isWinningCell ? 'bg-green-200' : ''}`}
              disabled={cell !== ' '}
            >
              {cell !== ' ' ? cell : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}

