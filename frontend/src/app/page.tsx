"use client";

import PapersBar from "@/components/papersbar";
import ChatBar from "@/components/chatbar";
import PDFReader from "@/components/pdfreader";
import { useState } from "react";

export default function Page() {
    const [isPapersVisible, setIsPapersVisible] = useState(true);
    const [isChatVisible, setIsChatVisible] = useState(true);
    
    return (
        <div className="flex h-screen">
            <PapersBar isPapersVisible={isPapersVisible} setIsPapersVisible={setIsPapersVisible}/>

            <div className="flex-1 bg-gray-500 text-white p-4">
                <PDFReader />
            </div>
                
            <ChatBar isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible} />
        </div>
    );
}