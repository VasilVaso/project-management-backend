import express from "express";
import {
	getTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
} from "../controllers/TaskController";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.get("/tasks/:id", getTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
