import { describe, it } from '@jest/globals';
import { OrderPrismaRepository } from '../repositories/orderPrismaRepository';
import { GetAllOrdersService } from './getAllOrdersService';
import { Response } from 'express';

let getAllOrdersService: GetAllOrdersService;
let orderPrismaRepository: OrderPrismaRepository;
let response: Partial<Response>;

jest.mock('../repositories/orderPrismaRepository');
describe('GetAllOrdersService', () => {
  beforeEach(() => {
    orderPrismaRepository = new OrderPrismaRepository();
    getAllOrdersService = new GetAllOrdersService(orderPrismaRepository);

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('shoulf return all products', async () => {
    const orders = [
      {
        id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
        status: 'PENDENTE',
        createdAt: new Date(),
        totalPrice: 10,
        orderItems: [
          {
            name: 'Product 1',
            quantity: 2,
            price: 10,
          },
          {
            name: 'Product 2',
            quantity: 1,
            price: 10,
          },
        ],
      },
      {
        id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
        status: 'PENDENTE',
        createdAt: new Date(),
        totalPrice: 20,
        orderItems: [
          {
            name: 'Product 1',
            quantity: 2,
            price: 10,
          },
          {
            name: 'Product 2',
            quantity: 1,
            price: 10,
          },
        ],
      },
    ];

    orderPrismaRepository.findAll = jest.fn().mockResolvedValue(orders);

    const ordersReturned = await getAllOrdersService.findAllOrders();

    expect(ordersReturned).toEqual(orders);
    expect(orderPrismaRepository.findAll).toHaveBeenCalled();
    expect(response.status).not.toHaveBeenCalledWith(404);
  });

  it('should not return any products, because there are no products', async () => {
    orderPrismaRepository.findAll = jest.fn().mockResolvedValue([]);

    const ordersReturned = await getAllOrdersService.findAllOrders();

    expect(ordersReturned).toEqual([]);
    expect(orderPrismaRepository.findAll).toHaveBeenCalled();
  });
});
