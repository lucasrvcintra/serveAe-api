import { describe, it } from '@jest/globals';
import { ProductPrismaRepository } from '../repositories/productPrismaRepository';
import { GetProductByIdService } from './getProductByIdService';
import { Response } from 'express';

let getProductByIdService: GetProductByIdService;
let productPrismaRepository: ProductPrismaRepository;
let response: Partial<Response>;

jest.mock('../repositories/productPrismaRepository');
describe('GetProductByIdService', () => {
  beforeEach(() => {
    productPrismaRepository = new ProductPrismaRepository();
    getProductByIdService = new GetProductByIdService(productPrismaRepository);

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should be able to get a product by id', async () => {
    const product = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      category: 'PRATO_PRINCIPAL',
    };

    productPrismaRepository.findById = jest.fn().mockResolvedValue(product);

    const productReturned = await getProductByIdService.findProductById(
      product.id
    );

    expect(productReturned).toEqual(product);
    expect(productPrismaRepository.findById).toHaveBeenCalledWith(product.id);
    expect(response.status).not.toHaveBeenCalledWith(404);
  });

  it('should not be able to get a product by id, because it does not exist', async () => {
    const product = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      category: 'PRATO_PRINCIPAL',
    };

    productPrismaRepository.findById = jest.fn().mockResolvedValue(null);

    await expect(
      getProductByIdService.findProductById(product.id)
    ).rejects.toThrow(new Error('Produto não encontrado'));

    expect(productPrismaRepository.findById).toHaveBeenCalledWith(product.id);
  });
});
