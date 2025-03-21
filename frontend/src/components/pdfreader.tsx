interface PDFReaderProps {
    papersBarWidth: string;
    isChatVisible: boolean;
}

export default function PDFReader({ papersBarWidth, isChatVisible }: PDFReaderProps) {
    const marginLeft = papersBarWidth === "w-[15vw]" ? "ml-[15vw]" : "ml-0";
    
    return (
        <div
            className={`${marginLeft} h-screen bg-gray-400 transition-all duration-300`}
        >
            <div className="p-8">
                <h1 className="text-2xl font-bold">Main Content</h1>
                <p>This area expands and collapses when the sidebar is toggled. This area expands and collapses when the sidebar is toggled. This area expands and collapses when the sidebar is toggled. </p>
            </div>
        </div>
    );
}
