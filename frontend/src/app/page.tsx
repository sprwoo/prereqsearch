"use client";

import PapersBar from "@/components/papersbar";
import ChatBar from "@/components/chatbar";
import PDFReader from "@/components/pdfreader";
import { useState } from "react";

export default function Page() {
    const [isPapersVisible, setIsPapersVisible] = useState(true);
    const [papersBarWidth, setPapersBarWidth] = useState("w-[15vw]");

    const [isChatVisible, setIsChatVisible] = useState(true);
    
    return (
        <div className="flex-row h-screen">
            <PapersBar papersBarWidth={papersBarWidth} setPapersBarWidth={setPapersBarWidth}/>

            <div className="flex-1">
                <PDFReader papersBarWidth={papersBarWidth} isChatVisible={isChatVisible} />
            </div>
                
            <ChatBar isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible} />
        </div>
    );
}