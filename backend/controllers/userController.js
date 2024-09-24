import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//register user
export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e);
  }
};

//authenticate user
export const authenticateUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // You can adjust the expiry time as needed
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error authenticating user" });
  }
};

//get user profile
export const getUserProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error getting user profile" });
  }
};

//update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, profilePicture },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error updating user profile" });
  }
};
