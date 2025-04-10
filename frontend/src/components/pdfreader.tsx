import React, { useState, useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PDFReader: React.FC<{ pdfId: string }> = ({ pdfId }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pdfFile, setPdfFile] = useState<string | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="h-full overflow-auto p-4 bg-gray-100">
            {pdfFile ? (
                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages || 0), (el, index) => (
                        <div key={`page_${index + 1}`} className="mb-4">
                            <Page pageNumber={index + 1} />
                        </div>
                    ))}
                </Document> 
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PDFReader;