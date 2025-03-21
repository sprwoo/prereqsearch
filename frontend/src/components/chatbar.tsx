"use client";

interface ChatBarProps {
  isChatVisible: boolean;
  setIsChatVisible: (visible: boolean) => void;
}

export default function ChatBar({ isChatVisible, setIsChatVisible }: ChatBarProps) {
  return (
    <div className="flex-col">
      {/* Sidebar on the Right */}
      <div
        className={`h-full bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden fixed top-0 right-0 ${isChatVisible ? "w-1/4" : "w-0" // Change width when collapsed
          }`}
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
        onClick={() => setIsChatVisible(!isChatVisible)}
        className={`absolute top-4 right-4 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full z-50`}
      >
        {isChatVisible ? ">" : "<"}
      </button>

    </div>
  );
}
