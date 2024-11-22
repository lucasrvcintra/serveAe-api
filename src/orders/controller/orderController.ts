import { z } from 'zod';
import { Request, Response } from 'express';
import { makeCreateOrderService } from '../services/factories/makeCreateOrderService';
import { makeGetOrderByIdService } from '../services/factories/makeGetOrderByIdService';
import { CreateOrderDto, CreateOrderSchema } from '../dto/createOrderDto';
import { makeGetAllOrdersService } from '../services/factories/makeGetAllOrdersService';

const createOrderService = makeCreateOrderService();
const getOrderByIdService = makeGetOrderByIdService();
const getAllOrdersService = makeGetAllOrdersService();

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

  async getAllOrders(request: Request, response: Response) {
    try {
      const orders = await getAllOrdersService.findAllOrders();
      return response.status(200).json(orders);
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao buscar pedidos' });
      }
    }
  }

  async getOrderById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const order = await getOrderByIdService.findOrderById(id);
      return response.status(200).json(order);
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao buscar pedido' });
      }
    }
  }
}
