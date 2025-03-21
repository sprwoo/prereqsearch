"use client";

import { useState } from "react";

export default function ChatBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={`h-full ${isVisible ? "block" : "hidden"} bg-gray-800 text-white`}>
      <div className="p-4">
        <h1 className="text-xl font-bold">ChatBar</h1>
        <p>Content of the ChatBar goes here...</p>
      </div>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isVisible ? "Hide ChatBar" : "Show ChatBar"}
      </button>
    </div>
  );
}