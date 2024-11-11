import { Router, Request, Response } from 'express';
import UsersController from '../users/controller/usersController';
import ProductsController from '../products/controller/productsController';

const router = Router();

const usersController = new UsersController();
const productsController = new ProductsController();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/auth/register', async (req: Request, res: Response) => {
  await usersController.createUser(req.body, res);
});

router.get('/api/products', async (req: Request, res: Response) => {
  await productsController.getAllProducts(req, res);
});
router.get('/api/products/:id', async (req: Request, res: Response) => {
  await productsController.getProductById(req, res);
});
router.post('/api/products', async (req: Request, res: Response) => {
  await productsController.createProduct(req.body, res);
});
router.put('/api/products/:id', async (req: Request, res: Response) => {
  await productsController.updateProduct(req, res);
});
router.delete('/api/products/:id', async (req: Request, res: Response) => {
  await productsController.deleteProduct(req, res);
});

export { router };
