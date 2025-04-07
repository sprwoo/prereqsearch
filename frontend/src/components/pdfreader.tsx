import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Use the local worker file
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PDFReader: React.FC = () => {
    const [numPages, setNumPages] = useState<number | null>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="h-full overflow-auto p-4 bg-gray-100">
            <Document file="/exmaple.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages || 0), (el, index) => (
                    <div key={`page_${index + 1}`} className="mb-4">
                        <Page pageNumber={index + 1} />
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default PDFReader;