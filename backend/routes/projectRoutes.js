import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Project routes
router.post("/projects", protect, createProject);
router.get("/projects", protect, getProjects);
router.get("/projects/:id", protect, getProjectById);
router.put("/projects/:id", protect, updateProject);
router.delete("/projects/:id", protect, deleteProject);

export default router;
