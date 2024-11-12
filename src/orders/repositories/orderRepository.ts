import { Order } from '@prisma/client';
import { CreateOrderDto } from '../dto/createOrderDto';

export interface OrderRepository {
  create(data: CreateOrderDto): Promise<Order>;
  findById(id: string): Promise<Order | null>;
}
