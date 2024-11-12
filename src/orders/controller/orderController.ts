import { z } from 'zod';
import { Response } from 'express';
import { makeCreateOrderService } from '../services/factories/makeCreateOrderService';
import { CreateOrderDto, CreateOrderSchema } from '../dto/createOrderDto';

const createOrderService = makeCreateOrderService();

export default class OrdersController {
  async createOrder(request: CreateOrderDto, response: Response) {
    try {
      const orderData = CreateOrderSchema.parse(request);
      const order = await createOrderService.create(orderData);

      return response
        .status(201)
        .json({ order, message: 'Pedido cadastrado com sucesso' });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao criar pedido' });
      }
    }
  }
}
