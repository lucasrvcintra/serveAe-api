import { Order } from '@prisma/client';
import { OrderRepository } from '../repositories/orderRepository';

export class GetAllOrdersService {
  constructor(private orderRepository: OrderRepository) {}

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
