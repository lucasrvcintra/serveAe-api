import { OrderPrismaRepository } from '../../repositories/orderPrismaRepository';
import { GetAllOrdersService } from '../getAllOrdersService';

export function makeGetAllOrdersService() {
  const ordersRepository = new OrderPrismaRepository();
  const getAllOrdersService = new GetAllOrdersService(ordersRepository);

  return getAllOrdersService;
}
