import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getNotifications } from "../controllers/notificationController.js";

const router = express.Router();

// Fetch notifications
router.get("/notifications", protect, getNotifications);

export default router;
