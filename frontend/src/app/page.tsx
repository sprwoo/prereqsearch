"use client";

import PapersBar from "@/components/papersbar";
import ChatBar from "@/components/chatbar";
import PDFReader from "@/components/pdfreader";
import { useState } from "react";

export default function Home() {
    return (
        <div className="flex h-screen">
            <div className="w-1/7 bg-gray-800 text-white p-4">
                <PapersBar />
            </div>

            <div className="flex-1 bg-gray-500 text-white p-4">
                <PDFReader />
            </div>
                
            <ChatBar />
        </div>

        
    );
}