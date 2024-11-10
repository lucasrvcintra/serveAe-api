import { Router } from 'express';
import usersController from '../users/controller/usersController';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/auth/register', (req, res) =>
  usersController.createUser(req.body, res)
);

export { router };
