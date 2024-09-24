import { Server } from "socket.io";
import Conversation from "../models/Conversation.js"; // Ensure the path is correct
import Message from "../models/Message.js"; // Ensure the path is correct

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust as needed
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle when a user joins a conversation
    socket.on("joinConversation", async ({ taskId, userId }) => {
      try {
        if (!taskId || !userId) {
          console.error("Missing taskId or userId");
          return;
        }

        // Find the conversation for the given task
        let conversation = await Conversation.findOne({ task: taskId });

        if (!conversation) {
          // Create a new conversation if it doesn't exist
          conversation = await Conversation.create({
            task: taskId, // Assign the taskId
            participants: [userId], // Add the userId as the first participant
          });
        } else {
          // Add user to participants if not already in the conversation
          if (!conversation.participants.includes(userId)) {
            conversation.participants.push(userId);
            await conversation.save();
          }
        }

        // Join the socket to the conversation room
        socket.join(conversation._id.toString());

        // Fetch and emit all messages for the conversation
        const messages = await Message.find({ conversation: conversation._id })
          .populate("sender") // Assuming you want to populate the sender's name
          .sort({ timestamp: 1 }); // Sort by timestamp

        socket.emit("conversationMessages", messages);
      } catch (error) {
        console.error("Error in joinConversation:", error);
      }
    });

    // Handle chat messages
    socket.on("sendMessage", async ({ taskId, content, senderId }) => {
      try {
        if (!taskId || !content || !senderId) {
          console.error("Missing taskId, content, or senderId");
          return;
        }

        // Find the conversation for the given task
        let conversation = await Conversation.findOne({ task: taskId });
        if (!conversation) {
          console.error("No conversation found for task:", taskId);
          return;
        }

        // Create a new message in the conversation
        const newMessage = new Message({
          sender: senderId,
          content,
          conversation: conversation._id,
        });
        await newMessage.save();

        // Emit the message to all participants in the conversation
        io.to(conversation._id.toString()).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Error in sendMessage:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
