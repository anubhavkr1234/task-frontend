import axios from "axios";

const BASE_URL = "https://task-backend-mc8d.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Get the token from localStorage or wherever you store it
    const token = localStorage.getItem("token");

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Function to fetch tasks from the backend
export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching tasks:", error);
  }
};

// Function to add a new task to the backend
export const addTask = async (taskData) => {
  try {
    console.log({ taskData });
    const response = await axiosInstance.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    throw new Error("Error adding task:", error);
  }
};

export const deleteTask = async (task) => {
  try {
    // Make a DELETE request to delete the task
    await axiosInstance.delete(`/tasks/${task._id}`);
    // Fetch updated task list after successful deletion
    const updatedTasks = await getTasks();
    return updatedTasks;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Error deleting task:", error);
  }
};

export const completeTask = async (task) => {
  try {
    // Toggle the completed status
    const updatedTask = { ...task, completed: !task.completed };

    // If the task is being marked as completed, set the completedDate
    if (updatedTask.completed) {
      updatedTask.completedDate = new Date();
    } else {
      // If the task is being marked as incomplete, clear the completedDate
      updatedTask.completedDate = null;
    }

    // Make a PATCH request to update the task
    await axiosInstance.patch(`/tasks/${task._id}`, updatedTask);

    const updatedTasks = await getTasks();
    return updatedTasks;
  } catch (error) {
    console.error("Error completing task:", error);
  }
};

export const editTask = async (task) => {
  try {
    // Make a PATCH request to update the task with the new data
    await axiosInstance.patch(`/tasks/${task._id}`, {
      title: task.title, // You can include other task fields here
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority, // Assuming you have an input field for priority change
    });
    const updatedTasks = await getTasks();
    return updatedTasks;
    // Fetch updated task list after successful edit
  } catch (error) {
    console.error("Error editing task:", error);
  }
};

export const priorityChange = async (task, priority) => {
  try {
    // Update the task priority locally first
    const updatedTask = { ...task, priority: parseInt(priority) };
    // Make a PATCH request to update the task with the new priority
    await axiosInstance.patch(`/tasks/priority/${task._id}`, {
      priority: updatedTask.priority,
    });
    const updatedTasks = await getTasks();
    return updatedTasks;
    // Fetch updated task list after successful priority change
  } catch (error) {
    console.error("Error changing priority:", error);
  }
};

// register user
export const registerUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/register", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Error registering user:", error);
  }
};

// login user
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Error logging in:", error);
  }
};

export default axiosInstance;
