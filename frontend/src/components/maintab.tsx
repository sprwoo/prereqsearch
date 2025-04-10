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
        let author, title;

        // Check the first page first
        const formData = new FormData();
        formData.append("file", file);

        try {
            const paperMetadata = await fetch("http://localhost:8000/prerequisites/get_metadata", {
                method: "POST",
                body: formData,
            })

            if (!paperMetadata.ok) {
                throw new Error(`HTTP error. `)
            }
            
            const result = await paperMetadata.json();
            author = result.Author;
            title = result.Title;
        } catch (error) {
            console.error("Error. ")
        }

        try {
            const findPaper = await fetch(`http://localhost:8000/db/check_for_paper/${author}&${title}`);
            
            if (!findPaper.ok) {
                throw new Error(`HTTP error. `);
            }
            
            const result = await findPaper.json();
            console.log(result);
        } catch (error) {
            console.error("Error trying to find the paper in the database. ");
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
