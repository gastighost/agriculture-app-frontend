import { FormEvent, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface ChatPopupProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: string;
  text: string;
}

const ChatPopup = (props: ChatPopupProps) => {
  const { userId } = props;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);

    setSocket(socket);

    socket.on("connect", () => {
      console.log(socket.connected);
    });

    socket.on(userId, (message: string) => {
      setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        { sender: "recipient", text: message },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket) {
      socket.emit("message", { id: userId, message: newMessage });
      setMessages((prevState: Message[]) => [
        ...prevState,
        { sender: "user", text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md w-full mx-auto absolute bottom-0 right-0 mb-16 mr-4 z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chat with Host</h2>
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div ref={chatContainerRef} className="overflow-y-auto max-h-96 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-4 rounded-lg w-1/2 ${
              message.sender === "user" ? "bg-blue-200 ml-auto" : "bg-gray-100"
            }`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPopup;
