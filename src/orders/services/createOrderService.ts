import { Order } from '@prisma/client';
import { CreateOrderDto } from '../dto/createOrderDto';
import { OrderRepository } from '../repositories/orderRepository';

export class CreateOrderService {
  constructor(private orderRepository: OrderRepository) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    const { userId, products } = orderData;

    const order = await this.orderRepository.create({
      userId,
      products,
    });

    return order;
  }
}
