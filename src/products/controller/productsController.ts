import { z } from 'zod';
import { Request, Response } from 'express';
import { CreateProductDto, CreateProductSchema } from '../dto/createProductDto';
import { makeCreateProductService } from '../services/factories/makeCreateProductService';
import { makeGetAllProductsService } from '../services/factories/makeGetAllProductService';
import { makeGetProductByIdService } from '../services/factories/makeGetProductByIdService';
import { makeUpdateProductService } from '../services/factories/makeUpdateProuctService';
import { UpdateProductSchema } from '../dto/updateProductDto';
import { makeDeleteProductService } from '../services/factories/makeDeletProductService';

const createProductService = makeCreateProductService();
const getAllProductsService = makeGetAllProductsService();
const getProductByIdService = makeGetProductByIdService();
const updateProductService = makeUpdateProductService();
const deleteProductService = makeDeleteProductService();

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

  async getAllProducts(request: Request, response: Response) {
    try {
      const products = await getAllProductsService.findAllProducts();
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

  async getProductById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const product = await getProductByIdService.findProductById(id);
      return response.status(200).json(product);
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao buscar produto' });
      }
    }
  },

  async updateProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const productData = UpdateProductSchema.parse(request.body);

      const verifyProduct = await getProductByIdService.findProductById(id);
      if (!verifyProduct) {
        return response.status(404).json({ message: 'Produto não encontrado' });
      }

      const product = await updateProductService.updateProduct(id, productData);
      return response
        .status(200)
        .json({ product, message: 'Produto atualizado com sucesso' });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao atualizar produto' });
      }
    }
  },

  async deleteProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const verifyProduct = await getProductByIdService.findProductById(id);
      if (!verifyProduct) {
        return response.status(404).json({ message: 'Produto não encontrado' });
      }

      await deleteProductService.deleteProduct(id);
      return response
        .status(200)
        .json({ message: 'Produto excluído com sucesso' });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao excluir produto' });
      }
    }
  },
};
