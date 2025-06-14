type BoardProps = {
  board: string[]; // Länge 9, Werte: 'X', 'O', ' '
  onCellClick?: (index: number) => void;
};

export default function Board({ board, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-1 w-48 h-48">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCellClick?.(index)}
          className="flex items-center justify-center w-full h-full text-2xl font-bold border border-gray-300 bg-white hover:bg-gray-100 disabled:cursor-not-allowed"
          disabled={cell !== ' '}
        >
          {cell !== ' ' ? cell : ''}
        </button>
      ))}
    </div>
  );
}
