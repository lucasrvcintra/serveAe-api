import { z } from 'zod';
import { Response } from 'express';
import { makeCreateOrderItemService } from '../services/factories/makeCreateOrderItemService';
import {
  CreateOrderItemDto,
  CreateOrderItemSchema,
} from '../dto/createOrderItemDto';

const createOrderItemService = makeCreateOrderItemService();

export default class OrderItemsController {
  async createOrderItem(request: CreateOrderItemDto, response: Response) {
    try {
      const orderItemData = CreateOrderItemSchema.parse(request);
      const orderItem = await createOrderItemService.create(orderItemData);

      return response
        .status(201)
        .json({ orderItem, message: 'Item do pedido cadastrado com sucesso' });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao criar item' });
      }
    }
  }
}
