import express from 'express';
import usersRoute from './user';
import taskRoute from './task'
import { protectRoute } from '../controller/auth';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRoute);
router.use('/task', protectRoute, taskRoute);

export default router;


