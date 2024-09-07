import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const message = await userService.register(username, password);
		res.status(201).json({ message });
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unexpected error occurred" });
		}
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Username and password are required" });
	}

	try {
		const token = await userService.login(username, password);
		res.json({ token });
	} catch (err) {
		if (err instanceof Error) {
			// If the error is related to invalid credentials
			if (err.message === "Invalid credentials") {
				return res.status(401).json({ error: "Invalid credentials" });
			}
			return res.status(400).json({ error: err.message });
		} else {
			// For unexpected errors
			return res
				.status(500)
				.json({ error: "An unexpected error occurred" });
		}
	}
};

export const verifyToken = async (req: Request, res: Response) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const isValid = await userService.verifyToken(token);
		if (isValid) {
			res.json({ message: "Token is valid" });
		} else {
			res.status(401).json({ error: "Invalid token" });
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unexpected error occurred" });
		}
	}
};
