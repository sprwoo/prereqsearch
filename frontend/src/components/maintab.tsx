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

    const handleUploadPDF = async (file: File) => {
        // Check the first page first
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const checkPaper = await fetch("http://localhost:8000/prerequisites/get_metadata", {
                method: "POST",
                body: formData,
            })

            if (!checkPaper.ok) {
                throw new Error(`HTTP error. `)
            }
            
            const result = await checkPaper.json();
            console.log("PDF Uploaded.");
        } catch (error) {
            console.error("Error. ")
        }
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
            <FileUploadButton setUploadedPDF={handleUploadPDF} />

            {/* Centered PDF Reader */}
            {/* <div className="flex flex-col items-center justify-center"
                style={{
                    height: "70%",
                }}>
                <PDFReader pdfId={""} />
            </div> */}
        </div>
    );
}
