"use client";

interface PapersBarProps{
    papersBarWidth: number;
    setPapersBarWidth: (width: number) => void;
}

export default function PapersBar( {papersBarWidth, setPapersBarWidth} : PapersBarProps) {
    const width = papersBarWidth == 0 ? "w-0" : "w-["+papersBarWidth+"vw]";
    
    return (
        <div>
            <div 
                className={`h-full bg-gray-800 text-white transition-all duration-300 ease-in-out 
                            overflow-hidden fixed top-0 left-0`}
                style={{ width: `${papersBarWidth}vw` }}>
                <div className="p-4 truncate">
                    <h1 className="text-xl font-bold">Papers</h1>
                    <p>Content of the Papers</p>
                </div>

            </div>

            <div>
                <button
                    onClick={() => setPapersBarWidth(papersBarWidth == 15 ? 0 : 15)}
                    className="absolute top-4 left-4 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full"
                >
                    {papersBarWidth == 0 ? ">" : "<"}
                </button>
            </div>
        </div>
    );
}
