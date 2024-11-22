import { Router, Request, Response } from 'express';
import UsersController from '../users/controller/usersController';
import ProductsController from '../products/controller/productsController';
import OrdersController from '../orders/controller/orderController';

const router = Router();

const usersController = new UsersController();
const productsController = new ProductsController();
const ordersController = new OrdersController();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/auth/register', async (req: Request, res: Response) => {
  await usersController.createUser(req.body, res);
});
router.get('/api/user/:email', async (req: Request, res: Response) => {
  await usersController.getUserByEmail(req, res);
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

router.post('/api/orders', async (req: Request, res: Response) => {
  await ordersController.createOrder(req.body, res);
});
router.get('/api/orders/:id', async (req: Request, res: Response) => {
  await ordersController.getOrderById(req, res);
});
router.get('/api/orders', async (req: Request, res: Response) => {
  await ordersController.getAllOrders(req, res);
});

export { router };
