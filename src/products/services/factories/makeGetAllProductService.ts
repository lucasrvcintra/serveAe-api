import { PrismaProductRepository } from '../../repositories/productPrismaRepository';
import { GetProductService } from '../getAllProductService';

export function makeGetAllProductsService() {
  const productsRepository = new PrismaProductRepository();
  const getAllProductsService = new GetProductService(productsRepository);

  return getAllProductsService;
}
