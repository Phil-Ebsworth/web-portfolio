export default function YearLabels() {
    return (
        <div className="w-10">
                <div className="flex flex-col h-full justify-between items-center ml-2 mr-2">
                    {Array.from({ length: 11 }).map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                            <div key={year} className="flex flex-col items-center">
                                <span className="text-mb ">{year}</span>
                                {i < 9 && <div className="h-[10%] bg-gray-400 my-1 w-full" />}
                            </div>
                        );
                    })}
                </div>
            </div>
    );
}