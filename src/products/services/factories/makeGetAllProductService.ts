import { ProductPrismaRepository } from '../../repositories/productPrismaRepository';
import { GetAllProductService } from '../getAllProductService';

export function makeGetAllProductsService() {
  const productsRepository = new ProductPrismaRepository();
  const getAllProductsService = new GetAllProductService(productsRepository);

  return getAllProductsService;
}
