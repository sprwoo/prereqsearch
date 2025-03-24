"use client";

interface ChatBarProps { 
  chatBarWidth: number;
  setChatBarWidth: (width: number) => void;
}

export default function ChatBar({ chatBarWidth, setChatBarWidth }: ChatBarProps) {
  return (
    <div className="flex-col">
      {/* Sidebar on the Right */}
      <div
        className="h-full bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden fixed top-0 right-0"
        style={{ width: `${chatBarWidth}vw` }}>
       
        {/* ChatBar Content */}
        <div className="p-4 truncate">
          <h1 className="text-xl font-bold">Chat History</h1>
          <ul>
            <li>Chat 1</li>
            <li>Chat 2</li>
            <li>Chat 3</li>
            <li>Chat 4</li>
          </ul>
        </div>
      </div>

      {/* Toggle Button inside the Sidebar */}
      <button
        onClick={() => setChatBarWidth(chatBarWidth === 30 ? 0 : 30)}
        className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded"
      >
        {chatBarWidth == 0 ? ">" : "<"}
      </button>
    </div>
  );
}
