import { PrismaClient, Order, Prisma } from '@prisma/client';
import { OrderRepository } from './orderRepository';
import { CreateOrderDto } from '../dto/createOrderDto';

export class OrderPrismaRepository implements OrderRepository {
  private prisma = new PrismaClient();

  async create(data: CreateOrderDto): Promise<Order> {
    let totalPrice = 0;

    const orderItemsData = await Promise.all(
      data.products.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) {
          throw new Error(`Produto com ID ${item.productId} não encontrado`);
        }

        totalPrice += product.price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      })
    );

    return await this.prisma.order.create({
      data: {
        userId: data.userId,
        totalPrice,
        status: 'PENDENTE',
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async findById(id: string): Promise<Order | null> {
    return await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });
  }
}
