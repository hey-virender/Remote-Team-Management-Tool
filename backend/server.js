import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import timeLogRoutes from "./routes/timeLogRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { initializeSocket } from "./configs/socket.js";
import dbConnection from "./configs/dbConnect.js";
const app = express();

const server = http.createServer(app);

const io = initializeSocket(server);
dbConnection();

app.use(
  cors({
    origin: "https://remoteteammanagement.netlify.app",
    methods: ["GET", "DELETE", "POST", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);
app.use("/api", timeLogRoutes);
app.use("/api", fileRoutes);
app.use("/api", notificationRoutes);

app.use(errorHandler);
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
