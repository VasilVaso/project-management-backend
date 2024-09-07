import { Request, Response, NextFunction } from "express";

// Validate task input
export const validateTask = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title, description, status } = req.body;

	if (!title || typeof title !== "string") {
		return res.status(400).json({ error: "Invalid or missing title" });
	}

	if (description && typeof description !== "string") {
		return res.status(400).json({ error: "Description must be a string" });
	}

	if (status && !["To Do", "In Progress", "Done"].includes(status)) {
		return res.status(400).json({ error: "Invalid status" });
	}

	next();
};
