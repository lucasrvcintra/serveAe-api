import { PrismaClient, OrderItem, Prisma } from '@prisma/client';
import { OrderItemRepository } from './orderItemRepository';
import { CreateOrderItemDto } from '../dto/createOrderItemDto';

export class OrderItemPrismaRepository implements OrderItemRepository {
  private prisma = new PrismaClient();

  async create(data: CreateOrderItemDto): Promise<OrderItem> {
    return await this.prisma.orderItem.create({
      data,
    });
  }
}
