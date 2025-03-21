"use client";

interface PapersBarProps{
    isPapersVisible: boolean;
    setIsPapersVisible: (visible: boolean) => void;
}

export default function PapersBar( {isPapersVisible, setIsPapersVisible}: PapersBarProps) {
    return (
        <div className={`h-full bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden ${isPapersVisible ? "w-1/7" : "w-0"}`}>
            <div className={`p-4 truncate`}>
                <h1 className="text-xl font-bold">Papers</h1>
                <p>Content of the Papers</p>
            </div>

            <button
                onClick={() => setIsPapersVisible(!isPapersVisible)}
                className="absolute top-4 left-4 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full"
            >
                {isPapersVisible ? "-" : "+"}
            </button>
        </div>
    );
}
