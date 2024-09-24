import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  relatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
