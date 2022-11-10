import express from 'express';
import { signup, login } from '../controller/auth';
import middleware from '../middleware/validationMiddleware';
import { validateUser } from '../utils/validation';

const router = express.Router();

router.post('/signup', [middleware(validateUser)], signup);
router.post('/login', [middleware(validateUser)], login);


export default router;