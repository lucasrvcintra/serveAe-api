import { OrderItemPrismaRepository } from '../../repositories/orderItemPrismaRepository';
import { CreateOrderItemService } from '../createOrderItemService';

export function makeCreateOrderItemService() {
  const orderItemsRepository = new OrderItemPrismaRepository();
  const createOrderItemService = new CreateOrderItemService(
    orderItemsRepository
  );

  return createOrderItemService;
}
