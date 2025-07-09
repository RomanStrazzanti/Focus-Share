const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');

router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
