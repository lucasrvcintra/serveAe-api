import { z } from 'zod';
import { Request, Response } from 'express';
import { CreateProductDto, CreateProductSchema } from '../dto/createProductDto';
import { makeCreateProductService } from '../services/factories/makeCreateProductService';
import { makeGetProductService } from '../services/factories/makeGetProductService';

const createProductService = makeCreateProductService();
const getProductService = makeGetProductService();

export default {
  async createProduct(request: CreateProductDto, response: Response) {
    try {
      const productData = CreateProductSchema.parse(request);
      const product = await createProductService.create(productData);
      return response
        .status(201)
        .json({ product, message: 'Produto cadastrado com sucesso' });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao criar produto' });
      }
    }
  },

  async getProducts(request: Request, response: Response) {
    try {
      const products = await getProductService.findAllProducts();
      return response.status(200).json({ products });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao buscar produtos' });
      }
    }
  },
};
