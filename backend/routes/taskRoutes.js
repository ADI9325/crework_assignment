// const express = require('express');
// const authenticate = require('../middleware/authMiddleware'); 
// const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

// const router = express.Router();
// // app.use(express.json()); 

// // Use the JWT authentication middleware for routes that require login
// router.post('/tasks', authenticate, createTask);
// router.get('/tasks', authenticate, getTasks);
// router.put('/tasks/:id', authenticate, updateTask);
// router.delete('/tasks/:id', authenticate, deleteTask);

// module.exports = router;

//
const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Use the JWT authentication middleware for routes that require login
router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.put('/tasks/:taskId', authenticate, updateTask); // Ensure the parameter name is taskId
router.delete('/tasks/:taskId', authenticate, deleteTask);

module.exports = router;
