import { Request, Response } from "express";
import {
	getAllTasks,
	createNewTask,
	getTaskById,
	updateTaskById,
	deleteTaskById,
} from "../services/TaskService";

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await getAllTasks();
		res.json(tasks);
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
	try {
		const task = await createNewTask(req.body);
		res.status(201).json(task);
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message });
		} else {
			res.status(400).json({ error: "An unknown error occurred" });
		}
	}
};

// Get a task by ID
export const getTask = async (req: Request, res: Response) => {
	try {
		const task = await getTaskById(req.params.id);
		if (task) {
			res.json(task);
		} else {
			res.status(404).json({ error: "Task not found" });
		}
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
	try {
		const task = await updateTaskById(req.params.id, req.body);
		if (task) {
			res.json(task);
		} else {
			res.status(404).json({ error: "Task not found" });
		}
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(400).json({ error: err.message });
		} else {
			res.status(400).json({ error: "An unknown error occurred" });
		}
	}
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
	try {
		const task = await deleteTaskById(req.params.id);
		if (task) {
			res.status(204).end();
		} else {
			res.status(404).json({ error: "Task not found" });
		}
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: "An unknown error occurred" });
		}
	}
};
