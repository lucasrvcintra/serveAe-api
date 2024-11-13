import { describe, it } from '@jest/globals';
import { ProductPrismaRepository } from '../repositories/productPrismaRepository';
import { DeleteProductService } from './deleteProductService';
import { Response } from 'express';

let deleteProductService: DeleteProductService;
let productPrismaRepository: ProductPrismaRepository;
let response: Partial<Response>;

jest.mock('../repositories/productPrismaRepository');
describe('DeleteProductService', () => {
  beforeEach(() => {
    productPrismaRepository = new ProductPrismaRepository();
    deleteProductService = new DeleteProductService(productPrismaRepository);

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should be able to delete a product', async () => {
    const product = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      category: 'PRATO_PRINCIPAL',
    };

    productPrismaRepository.findById = jest.fn().mockResolvedValue(product);
    productPrismaRepository.delete = jest.fn().mockResolvedValue(undefined);

    await deleteProductService.deleteProduct(product.id, response as Response);

    expect(productPrismaRepository.findById).toHaveBeenCalledWith(product.id);
    expect(productPrismaRepository.delete).toHaveBeenCalledWith(product.id);
    expect(response.status).not.toHaveBeenCalledWith(404);
  });

  it('should not be able to delete a product, bause it does not exist', async () => {
    const product = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      category: 'PRATO_PRINCIPAL',
    };

    productPrismaRepository.findById = jest.fn().mockResolvedValue(null);

    await deleteProductService.deleteProduct(product.id, response as Response);

    expect(productPrismaRepository.findById).toHaveBeenCalledWith(product.id);
    expect(productPrismaRepository.delete).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(404);
  });
});
