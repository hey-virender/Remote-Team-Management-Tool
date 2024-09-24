import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { fileUpload } from "../middlewares/fileMiddleware.js";
import {
  uploadFile,
  getFiles,
  getFileById,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

// File routes
router.post("/files", protect, fileUpload, uploadFile);
router.get("/files", protect, getFiles);
router.get("/files/:id", protect, getFileById);
router.delete("/files/:id", protect, deleteFile);

export default router;
