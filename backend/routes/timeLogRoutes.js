import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTimeLog,
  getTimeLogs,
  getTimeLogById,
  updateTimeLog,
  deleteTimeLog,
} from "../controllers/timeLogController.js";

const router = express.Router();

// Time log routes
router.post("/time-logs", protect, createTimeLog);
router.get("/time-logs", protect, getTimeLogs);
router.get("/time-logs/:id", protect, getTimeLogById);
router.put("/time-logs/:id", protect, updateTimeLog);
router.delete("/time-logs/:id", protect, deleteTimeLog);

export default router;
