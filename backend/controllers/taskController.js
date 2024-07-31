const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
  try {
    console.log('Creating task for user:', req.user.userId); // Debugging line
    const { title, description, priority, deadline } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      deadline,
      owner: req.user.userId, // Use req.user.userId
    });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    console.log('Fetching tasks for user:', req.user.userId); // Debugging line
    const userId = req.user.userId;

    // Directly test this query in MongoDB Compass or another client
    const tasks = await Task.find({ owner: userId }).exec();

    console.log('Tasks found:', tasks); // Debugging line
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, owner: req.user.userId }, // Use req.user.userId
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findOneAndDelete(
      { _id: taskId, owner: req.user.userId } // Use req.user.userId
    );
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
