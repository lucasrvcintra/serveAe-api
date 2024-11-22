import { UserPrismaRepository } from '../../repositories/userPrismaRepository';
import { FindUserByIdService } from '../findUserByIdService';

export function makeFindUserByIdService() {
  const usersRepository = new UserPrismaRepository();
  const findUserByIdService = new FindUserByIdService(usersRepository);

  return findUserByIdService;
}
