"use client";

import FileUploadButton from "./fileupload";
import { useState } from "react";

interface PDFReaderProps {
    papersBarWidth: number;
    chatBarWidth: number;
}

export default function PDFReader({ papersBarWidth, chatBarWidth }: PDFReaderProps) {
    const [uploadedPDF, setUploadedPDF] = useState<File | null>(null);
    const [pdfURL, setPdfURL] = useState<string | null>(null);

    const handleSetUploadedPDF = (file: File) => {
        setUploadedPDF(file);

        // Create a URL for the uploaded PDF
        const fileURL = URL.createObjectURL(file);
        setPdfURL(fileURL);
    };

    return (
        <div
            style={{
                marginLeft: `${papersBarWidth}vw`,
                marginRight: `${chatBarWidth}vw`,
            }}
            className="h-screen bg-gray-400 transition-all duration-300"
        >
            {/* PDF Upload */}
            <div className="p-8 overflow-auto">
                <h1 className="text-2xl font-bold">Main Content</h1>
                <FileUploadButton setUploadedPDF={handleSetUploadedPDF} />
            </div>

            {/* Display Uploaded PDF */}
            {pdfURL && (
                <div className="p-8">
                    <h2 className="text-xl font-bold">Uploaded PDF:</h2>
                    <embed
                        src={pdfURL}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                    />
                </div>
            )}
        </div>
    );
}
