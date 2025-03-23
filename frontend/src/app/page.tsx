"use client";

import PapersBar from "@/components/papersbar";
import ChatBar from "@/components/chatbar";
import PDFReader from "@/components/pdfreader";
import { useState } from "react";

export default function Page() {
    const [papersBarWidth, setPapersBarWidth] = useState("w-[15vw]");
    const [chatBarWidth, setChatBarWidth] = useState("w-[15vw]");
    
    return (
        <div className="flex-row h-screen">
            <PapersBar papersBarWidth={papersBarWidth} setPapersBarWidth={setPapersBarWidth}/>

            <div className="flex-1">
                <PDFReader papersBarWidth={papersBarWidth} chatBarWidth={chatBarWidth} />
            </div>
                
            <ChatBar chatBarWidth={chatBarWidth} setChatBarWidth={setChatBarWidth} />
        </div>
    );
}