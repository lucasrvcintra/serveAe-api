import { Order } from '@prisma/client';
import { OrderRepository } from '../repositories/orderRepository';
import { CustomError } from '../../middlewares/errorHandler';

export class GetOrderByIdService {
  constructor(private orderRepository: OrderRepository) {}

  async findOrderById(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      const error = new Error() as CustomError;
      error.status = 404;
      error.message = 'Produto não encontrado';
      throw error;
    }

    return order;
  }
}
