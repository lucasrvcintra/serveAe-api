import { describe, it } from '@jest/globals';
import { CreateOrderItemService } from './createOrderItemService';
import { OrderItemPrismaRepository } from '../repositories/orderItemPrismaRepository';
import { CreateOrderItemDto } from '../dto/createOrderItemDto';
import { OrderItem } from '@prisma/client';

let createOrderItemService: CreateOrderItemService;
let orderItemPrismaRepository: OrderItemPrismaRepository;

jest.mock('../repositories/orderItemPrismaRepository');
describe('CreateOrderItemService', () => {
  beforeEach(() => {
    orderItemPrismaRepository = new OrderItemPrismaRepository();
    createOrderItemService = new CreateOrderItemService(
      orderItemPrismaRepository
    );
  });
  it('should be able to create an order item', async () => {
    const orderItemData: CreateOrderItemDto = {
      orderId: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      productId: '5678',
      quantity: 2,
    };

    const createdOrderItem: OrderItem = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db52fe',
      ...orderItemData,
    };

    orderItemPrismaRepository.create = jest
      .fn()
      .mockResolvedValue(createdOrderItem);

    const result = await createOrderItemService.create(orderItemData);

    expect(result).toEqual(createdOrderItem);
    expect(orderItemPrismaRepository.create).toHaveBeenCalledWith(
      orderItemData
    );
    expect(orderItemPrismaRepository.create).toHaveBeenCalledTimes(1);
  });
});
