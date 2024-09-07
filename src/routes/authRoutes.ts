import express from "express";
import { registerUser, loginUser } from "../controllers/AuthController";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Verify route
router.get("/verify", (req, res) => {
	res.json({ message: "Token is valid" });
});

export default router;
