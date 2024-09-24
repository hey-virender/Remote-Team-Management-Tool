import api from "./axios"; // Import the axios instance

// Fetch all tasks
export const getTasks = () => {
  return api.get("/tasks");
};

// Create a new task
export const createTask = (taskData) => {
  return api.post("/tasks", taskData);
};

// Update an existing task
export const updateTask = (taskId, updatedData) => {
  return api.put(`/tasks/${taskId}`, updatedData);
};

//Mark task as completed
export const markTaskCompleted = (taskId) => {
  return api.patch(`/tasks/${taskId}/completed`);
};

// Delete a task
export const deleteTask = (taskId) => {
  return api.delete(`/tasks/${taskId}`);
};
