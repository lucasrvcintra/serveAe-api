import { OrderRepository } from '../repositories/orderRepository';
import { CustomError } from '../../middlewares/errorHandler';

type OrderWithoutUserId = {
  id: string;
  status: string;
  createdAt: Date;
  totalPrice: number;
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
};

export class GetOrderByIdService {
  constructor(private orderRepository: OrderRepository) {}

  async findOrderById(id: string): Promise<OrderWithoutUserId | null> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      const error = new Error() as CustomError;
      error.status = 404;
      error.message = 'Produto não encontrado';
      throw error;
    }

    const { status, createdAt, totalPrice, orderItems } = order;

    return {
      id: order.id,
      status,
      createdAt,
      totalPrice,
      products: orderItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }
}
