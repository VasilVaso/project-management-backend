import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { logger } from "./middlewares/Logger";
import { errorHandler } from "./middlewares/ErrorHandler";
import dbConfig from "./config/dbConfig"; // Import database configuration
import { authenticateToken } from "./middlewares/authMiddleware"; // Import authentication middleware

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
	cors({
		origin: "http://localhost:3000", // Replace with your frontend URL
		credentials: true, // Allow cookies to be sent with requests
	})
);
app.use(express.json());
app.use(logger);

// Connect to MongoDB
mongoose
	.connect(dbConfig.uri, dbConfig.options as ConnectOptions)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("MongoDB connection error:", err));

// Public routes
app.use("/api/auth", authRoutes); // No authentication required for auth routes

// Protected routes
app.use("/api/tasks", authenticateToken, taskRoutes); // Apply middleware to protect task routes

// Apply error handler middleware
app.use(errorHandler);

// Basic route
app.get("/", (req, res) => {
	res.send("Hello, Task Management App!");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default app; // Export for testing or future use
