import { Router, Request, Response } from 'express';
import usersController from '../users/controller/usersController';
import productsController from '../products/controller/productsController';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/auth/register', async (req: Request, res: Response) => {
  await usersController.createUser(req.body, res);
});

router.get('/api/products', async (req: Request, res: Response) => {
  await productsController.getProducts(req, res);
});
router.post('/api/products', async (req: Request, res: Response) => {
  await productsController.createProduct(req.body, res);
});

export { router };
