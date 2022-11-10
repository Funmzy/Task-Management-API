import express from 'express';
import { createTask, updateTask, deleteTask } from '../controller/task';
import middleware from '../middleware/validationMiddleware';
import { validateTask, validateUpdateTask } from '../utils/validation';

const router = express.Router();

router.post('/newTask', [middleware(validateTask)], createTask);
router.put('/updateTask', [middleware(validateUpdateTask)], updateTask);
router.delete('/deleteTask/:id', deleteTask);


export default router;