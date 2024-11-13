import { describe, it, beforeEach } from '@jest/globals';
import { GetOrderByIdService } from './getOrderByIdService';
import { OrderPrismaRepository } from '../repositories/orderPrismaRepository';

let getOrderByIdService: GetOrderByIdService;
let orderPrismaRepository: OrderPrismaRepository;

jest.mock('../repositories/orderPrismaRepository');

describe('GetOrderByIdService', () => {
  beforeEach(() => {
    orderPrismaRepository = new OrderPrismaRepository();
    getOrderByIdService = new GetOrderByIdService(orderPrismaRepository);
  });

  it('should return the order', async () => {
    const orderId = 'order123';

    const mockOrder = {
      id: orderId,
      status: 'PENDENTE',
      createdAt: new Date(),
      totalPrice: 300,
      orderItems: [
        { name: 'Product 1', quantity: 2, price: 100 },
        { name: 'Product 2', quantity: 1, price: 100 },
      ],
    };

    orderPrismaRepository.findById = jest.fn().mockResolvedValue(mockOrder);

    const order = await getOrderByIdService.findOrderById(orderId);

    expect(order).toEqual({
      id: mockOrder.id,
      status: mockOrder.status,
      createdAt: mockOrder.createdAt,
      totalPrice: mockOrder.totalPrice,
      products: mockOrder.orderItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    });
    expect(orderPrismaRepository.findById).toHaveBeenCalledWith(orderId);
  });

  it('should throw an error if the order is not found', async () => {
    const orderId = 'order123';

    orderPrismaRepository.findById = jest.fn().mockResolvedValue(null);

    await expect(getOrderByIdService.findOrderById(orderId)).rejects.toThrow(
      new Error('Produto não encontrado')
    );
  });
});
