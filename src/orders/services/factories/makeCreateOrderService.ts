import { OrderPrismaRepository } from '../../repositories/orderPrismaRepository';
import { CreateOrderService } from '../createOrderService';

export function makeCreateOrderService() {
  const ordersRepository = new OrderPrismaRepository();
  const createOrderService = new CreateOrderService(ordersRepository);

  return createOrderService;
}
