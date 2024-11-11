import { PrismaProductRepository } from '../../repositories/productPrismaRepository';
import { GetProductService } from '../getProductService';

export function makeGetProductService() {
  const productsRepository = new PrismaProductRepository();
  const getProductService = new GetProductService(productsRepository);

  return getProductService;
}
