import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useTaskContext, useAuth } from "../context/ContextProviders";

const socket = io("https://remote-team-management-tool-production.up.railway.app"); // Ensure this URL matches your backend server

function ChatComponent() {
  const { currentTask } = useTaskContext();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentTask) return;

    // Join the conversation room for the current task

    // Join the conversation room for the current task
    socket.emit("joinConversation", {
      taskId: currentTask._id,
      userId: user._id,
    });

    // Listen for messages when joining the conversation
    socket.on("conversationMessages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Listen for incoming messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("conversationMessages");
      socket.off("receiveMessage");
    };
  }, [currentTask]);

  const handleSend = () => {
    console.log("sending message from from frontend");
    if (message.trim() && currentTask) {
      // Emit the message to the server
      socket.emit("sendMessage", {
        taskId: currentTask._id,
        content: message,
        senderId: user._id,
      });

      // Clear the input field
      setMessage("");
    }
  };

  console.log(messages);

  return (
    <div className="p-2 bg-slate-900 rounded shadow w-2/3  lg:h-1/2">
      <h2 className="text-lg font-bold mb-2">Chat</h2>
      <div className="p-2 mb-2 h-64 overflow-y-scroll scrollbar-hidden">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col p-2 mb-1 border-b lg:text-sm ${
              msg.sender.name == user.name ? "text-green-400" : "text-white"
            }`}
          >
            <span className="lg:text-xs">
              {msg.sender.name == user.name ? "You" : msg.sender.name}
            </span>

            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 bg-transparent sm:w-1/3"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 ml-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
