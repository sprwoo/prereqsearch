"use client";

import FileUploadButton from "./fileupload";
import PDFReader from "./pdfreader";
import { useState } from "react";

interface MainTab {
    papersBarWidth: number;
    chatBarWidth: number;
}

export default function MainTab({ papersBarWidth, chatBarWidth }: MainTab) {
    const [uploadedPDF, setUploadedPDF] = useState<File | null>(null);
    const [pdfURL, setPDFURL] = useState<string | null>(null); 

    const handleSetUploadedPDF = (file: File) => {
        setUploadedPDF(file);

        // Create a URL for the uploaded PDF
        // TODO: upload the pdf to the database first, then retrieve it from the database.
        // Setting up the database should be the next thing i do actually
        const fileURL = URL.createObjectURL(file);
        setPDFURL(fileURL);
    };

    return (
        <div
            style={{
                marginLeft: `${papersBarWidth}vw`,
                marginRight: `${chatBarWidth}vw`,
            }}
            className="h-screen bg-gray-400 transition-all duration-300 flex flex-col items-center justify-center"
        >
            {/* PDF Upload */}
            <div className="p-8 overflow-auto">
                <h1 className="text-2xl font-bold">Main Content</h1>
            </div>
            <FileUploadButton setUploadedPDF={handleSetUploadedPDF} />

            {/* Centered PDF Reader */}
            <div className="flex flex-col items-center justify-center"
                style={{
                    height: "70%",
                }}>
                <PDFReader />
            </div>
        </div>
    );
}
