import { describe, it, beforeEach } from '@jest/globals';
import { CreateOrderService } from './createOrderService';
import { OrderPrismaRepository } from '../repositories/orderPrismaRepository';
import { CreateOrderDto } from '../dto/createOrderDto';
import { Order } from '@prisma/client';

let createOrderService: CreateOrderService;
let orderPrismaRepository: OrderPrismaRepository;

jest.mock('../repositories/orderPrismaRepository');
describe('CreateOrderService', () => {
  beforeEach(() => {
    orderPrismaRepository = new OrderPrismaRepository();
    createOrderService = new CreateOrderService(orderPrismaRepository);
  });

  it('should be able to create a new order', async () => {
    const newOrderData: CreateOrderDto = {
      userId: 'user123',
      products: [
        { productId: 'prod1', quantity: 2 },
        { productId: 'prod2', quantity: 1 },
      ],
    };

    const newOrder: Order = {
      id: 'order123',
      userId: newOrderData.userId,
      totalPrice: 300,
      status: 'PENDENTE',
      createdAt: new Date(),
    };

    orderPrismaRepository.create = jest.fn().mockResolvedValue(newOrder);

    const order = await createOrderService.create(newOrderData);

    expect(order).toEqual(newOrder);
    expect(order.id).toStrictEqual('order123');
    expect(orderPrismaRepository.create).toHaveBeenCalledWith(newOrderData);
  });
});
