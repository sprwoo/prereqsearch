"use client";

interface ChatBarProps { 
  chatBarWidth: string;
  setChatBarWidth: (visible: string) => void;
}

export default function ChatBar({ chatBarWidth, setChatBarWidth }: ChatBarProps) {
  return (
    <div className="flex-col">
      {/* Sidebar on the Right */}
      <div
        className={`h-full bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden fixed top-0 right-0 ${chatBarWidth}
        `}
      >
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
        onClick={() => setChatBarWidth(chatBarWidth == "w-[15vw]" ? "w-0" : "w-[15vw]")}
        className={`absolute top-4 right-4 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full z-50`}
      >
        {chatBarWidth == "w-0" ? ">" : "<"}
      </button>

    </div>
  );
}
