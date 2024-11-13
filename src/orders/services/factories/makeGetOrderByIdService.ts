import { OrderPrismaRepository } from '../../repositories/orderPrismaRepository';
import { GetOrderByIdService } from '../getOrderByIdService';

export function makeGetOrderByIdService() {
  const ordersRepository = new OrderPrismaRepository();
  const getOrderByIdService = new GetOrderByIdService(ordersRepository);

  return getOrderByIdService;
}
