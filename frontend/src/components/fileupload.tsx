"use client";

import React, { useRef } from "react";

interface FileUploadButtonProps {
    setUploadedPDF: (file: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ setUploadedPDF }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log("Selected file:", file);

            // Pass the selected file to the parent component
            setUploadedPDF(file);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://127.0.0.1:8000/get_prerequisite", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("File uploaded successfully:", data);
                } else {
                    console.error("File upload failed:", response.statusText);
                }
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Upload File</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUploadButton;