import { ProductPrismaRepository } from '../../repositories/productPrismaRepository';
import { GetProductService } from '../getAllProductService';

export function makeGetAllProductsService() {
  const productsRepository = new ProductPrismaRepository();
  const getAllProductsService = new GetProductService(productsRepository);

  return getAllProductsService;
}
