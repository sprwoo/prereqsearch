"use client";


interface PDFReaderProps {
    papersBarWidth: number;
    chatBarWidth: number;
}

export default function PDFReader({ papersBarWidth, chatBarWidth }: PDFReaderProps) {
    const marginLeft = papersBarWidth !== 0 ? `ml-[${papersBarWidth}vw]` : "ml-0";
    const marginRight = chatBarWidth !== 0 ? `mr-[${chatBarWidth}vw]` : "mr-0";
    
    return (
        <div
            className={`${marginLeft} ${marginRight} h-screen bg-gray-400 transition-all duration-300`}
        >
            <div className="p-8 overflow-auto">
                <h1 className="text-2xl font-bold">Main Content</h1>
                <form>
                    <input type="file" id="fileUpload" name="fileUpload"></input>
                    <input type="submit" value="Upload"></input>
                </form>
            </div>
        </div>
    );
}
