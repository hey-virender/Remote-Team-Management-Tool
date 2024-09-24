import Notification from "../models/Notification.js"; // Adjust path as needed

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("relatedTask"); // Fetch notifications from the database
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const emitNotification = async (io, task, action) => {
  console.log(`emit notification`);
  const notification = new Notification({
    title: `Task "${task.title}" has been ${action}.`,
    relatedTask: task._id,
  });

  await notification.save(); // Save notification to the database
  io.emit("receiveNotification", notification); // Emit the notification to connected clients
};
