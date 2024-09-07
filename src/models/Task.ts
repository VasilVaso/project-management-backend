// src/models/Task.ts
import { Schema, model } from "mongoose";

const taskSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	status: {
		type: String,
		enum: ["To Do", "In Progress", "Done"],
		default: "To Do",
	},
	createdAt: { type: Date, default: Date.now },
});

export default model("Task", taskSchema);
