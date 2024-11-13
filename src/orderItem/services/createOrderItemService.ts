import { OrderItem } from '@prisma/client';
import { CreateOrderItemDto } from '../dto/createOrderItemDto';
import { OrderItemRepository } from '../repositories/orderItemRepository';

export class CreateOrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async create(orderItemData: CreateOrderItemDto): Promise<OrderItem> {
    const { orderId, productId, quantity } = orderItemData;

    const orderItem = await this.orderItemRepository.create({
      orderId,
      productId,
      quantity,
    });

    return orderItem;
  }
}
