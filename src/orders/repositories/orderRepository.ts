import { Order } from '@prisma/client';
import { CreateOrderDto } from '../dto/createOrderDto';

type OrderWithoutUserId = {
  id: string;
  status: Order['status'];
  createdAt: Date;
  totalPrice: number;
  orderItems: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

export interface OrderRepository {
  create(data: CreateOrderDto): Promise<Order>;
  findById(id: string): Promise<OrderWithoutUserId | null>;
}
