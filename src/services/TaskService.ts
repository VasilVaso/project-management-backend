import Task from "../models/Task";

// Get all tasks
export const getAllTasks = async () => {
	return Task.find();
};

// Create a new task
export const createNewTask = async (taskData: any) => {
	const task = new Task(taskData);
	return task.save();
};

// Get a task by ID
export const getTaskById = async (taskId: string) => {
	return Task.findById(taskId);
};

// Update a task by ID
export const updateTaskById = async (taskId: string, updateData: any) => {
	return Task.findByIdAndUpdate(taskId, updateData, { new: true });
};

// Delete a task by ID
export const deleteTaskById = async (taskId: string) => {
	return Task.findByIdAndDelete(taskId);
};
