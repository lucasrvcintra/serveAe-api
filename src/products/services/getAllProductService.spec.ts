import { describe, it } from '@jest/globals';
import { ProductPrismaRepository } from '../repositories/productPrismaRepository';
import { GetAllProductService } from './getAllProductService';
import { Response } from 'express';

let getAllProductService: GetAllProductService;
let productPrismaRepository: ProductPrismaRepository;
let response: Partial<Response>;

jest.mock('../repositories/productPrismaRepository');
describe('GetAllProductService', () => {
  beforeEach(() => {
    productPrismaRepository = new ProductPrismaRepository();
    getAllProductService = new GetAllProductService(productPrismaRepository);

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('shoulf return all products', async () => {
    const products = [
      {
        id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        imageUrl: 'https://example.com/image.jpg',
        category: 'PRATO_PRINCIPAL',
      },
      {
        id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
        name: 'Product 2',
        description: 'Description 2',
        price: 20,
        imageUrl: 'https://example.com/image.jpg',
        category: 'PRATO_PRINCIPAL',
      },
    ];

    productPrismaRepository.findAll = jest.fn().mockResolvedValue(products);

    const productsReturned = await getAllProductService.findAllProducts();

    expect(productsReturned).toEqual(products);
    expect(productPrismaRepository.findAll).toHaveBeenCalled();
    expect(response.status).not.toHaveBeenCalledWith(404);
  });

  it('should not return any products, because there are no products', async () => {
    productPrismaRepository.findAll = jest.fn().mockResolvedValue([]);

    const productsReturned = await getAllProductService.findAllProducts();

    expect(productsReturned).toEqual([]);
    expect(productPrismaRepository.findAll).toHaveBeenCalled();
  });
});
