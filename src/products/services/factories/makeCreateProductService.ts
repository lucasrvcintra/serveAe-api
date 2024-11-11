import { PrismaProductRepository } from '../../repositories/productPrismaRepository';
import { CreateProductService } from '../createProductService';

export function makeCreateProductService() {
  const productsRepository = new PrismaProductRepository();
  const createProductService = new CreateProductService(productsRepository);

  return createProductService;
}
