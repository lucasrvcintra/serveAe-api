import { describe, it } from '@jest/globals';
import { ProductPrismaRepository } from '../repositories/productPrismaRepository';
import { UpdateProductService } from './updateProductService';
import { Response } from 'express';
import { CustomError } from '../../middlewares/errorHandler';

let updateProductService: UpdateProductService;
let productPrismaRepository: ProductPrismaRepository;
let response: Partial<Response>;

jest.mock('../repositories/productPrismaRepository');
describe('UpdateProductService', () => {
  beforeEach(() => {
    productPrismaRepository = new ProductPrismaRepository();
    updateProductService = new UpdateProductService(productPrismaRepository);

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should be able to update a product', async () => {
    const product = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      category: 'PRATO_PRINCIPAL',
    };

    const productUpdated = {
      ...product,
      description: 'Description 2',
      price: 20,
    };

    productPrismaRepository.findById = jest.fn().mockResolvedValue(product);
    productPrismaRepository.update = jest
      .fn()
      .mockResolvedValue(productUpdated);

    const productReturned = await updateProductService.updateProduct(
      product.id,
      { description: 'Description 2', price: 20 }
    );

    expect(productReturned).not.toEqual(product);
    expect(productReturned.id).toStrictEqual(product.id);
    expect(productPrismaRepository.findById).toHaveBeenCalledWith(product.id);
    expect(productPrismaRepository.update).toHaveBeenCalledWith(product.id, {
      description: 'Description 2',
      price: 20,
    });
    expect(response.status).not.toHaveBeenCalledWith(404);
  });

  it('should not be able to update a product, because it does not exist', async () => {
    const product = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      category: 'PRATO_PRINCIPAL',
    };

    productPrismaRepository.findById = jest.fn().mockResolvedValue(null);

    const error = new Error() as CustomError;
    error.status = 404;
    error.message = 'Produto não encontrado';

    await expect(
      updateProductService.updateProduct(product.id, {
        description: 'Description 2',
        price: 20,
      })
    ).rejects.toThrow(error);

    expect(productPrismaRepository.findById).toHaveBeenCalledWith(product.id);
  });
});
