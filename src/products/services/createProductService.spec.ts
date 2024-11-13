import { describe, it } from '@jest/globals';
import { CreateProductService } from './createProductService';
import { ProductPrismaRepository } from '../repositories/productPrismaRepository';
import { CreateProductDto } from '../dto/createProductDto';
import { Product } from '@prisma/client';

enum Category {
  ENTRADA = 'ENTRADA',
  PRATO_PRINCIPAL = 'PRATO_PRINCIPAL',
  SOBREMESA = 'SOBREMESA',
  BEBIDA = 'BEBIDA',
}

let createProductService: CreateProductService;
let productPrismaRepository: ProductPrismaRepository;

jest.mock('../repositories/productPrismaRepository');
describe('CreateProductService', () => {
  beforeEach(() => {
    productPrismaRepository = new ProductPrismaRepository();
    createProductService = new CreateProductService(productPrismaRepository);
  });

  it('should create a new product', async () => {
    const newProductData: CreateProductDto = {
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      category: Category.PRATO_PRINCIPAL,
    };

    const newProduct: Product = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      ...newProductData,
    };

    productPrismaRepository.create = jest.fn().mockResolvedValue(newProduct);

    const product = await createProductService.create(newProductData);

    expect(product).toEqual(newProduct);
    expect(product.id).toStrictEqual('37fd1baf-e41b-4cd6-87e7-1347f5db51cb');
    expect(productPrismaRepository.create).toHaveBeenCalledWith(newProductData);
  });
});
