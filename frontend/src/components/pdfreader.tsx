interface PDFReaderProps {
    papersBarWidth: string;
    chatBarWidth: string;
}

export default function PDFReader({ papersBarWidth, chatBarWidth }: PDFReaderProps) {
    const marginLeft = papersBarWidth === "w-[15vw]" ? "ml-[15vw]" : "ml-0";
    const marginRight = chatBarWidth === "w-[15vw]" ? "mr-[15vw]" : "mr-0";
    
    return (
        <div
            className={`${marginLeft} ${marginRight} h-screen bg-gray-400 transition-all duration-300`}
        >
            <div className="p-8 overflow-auto">
                <h1 className="text-2xl font-bold">Main Content</h1>
            </div>
        </div>
    );
}
