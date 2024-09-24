import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  changeTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

// Task routes
router.post("/tasks", protect, createTask);
router.get("/tasks", protect, getTasks);
router.get("/tasks/:id", protect, getTaskById);
router.put("/tasks/:id", protect, updateTask);
router.patch("/tasks/:id/completed", protect, changeTaskStatus);
router.delete("/tasks/:id", protect, deleteTask);

export default router;
