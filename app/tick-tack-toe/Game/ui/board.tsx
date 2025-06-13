type BoardProps = {
  board: (string | null)[];
  onCellClick: (index: number) => void;
};

export default function Board({ board, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {board.map((cell, index) => (
        <button
          key={index}
          className="w-24 h-24 text-3xl font-bold border-2 border-gray-300 rounded-md hover:bg-gray-200"
          onClick={() => onCellClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
