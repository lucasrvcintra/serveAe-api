import { OrderItem } from '@prisma/client';
import { CreateOrderItemDto } from '../dto/createOrderItemDto';

export interface OrderItemRepository {
  create(data: CreateOrderItemDto): Promise<OrderItem>;
}
