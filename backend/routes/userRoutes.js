import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validateUserRegistration } from "../middlewares/validationMiddleware.js";
import {
  registerUser,
  authenticateUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// User routes
router.post("/register", validateUserRegistration, registerUser);
router.post("/login", authenticateUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
