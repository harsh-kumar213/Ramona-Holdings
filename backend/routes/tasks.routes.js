import express from 'express';
const router = express.Router();
import {getTasks,createTask,updateTask,deleteTask} from '../controllers/tasks.controller.js'

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;