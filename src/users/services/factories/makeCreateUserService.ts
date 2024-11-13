import { UserPrismaRepository } from '../../repositories/userPrismaRepository';
import { CreateUserService } from '../createUserService';

export function makeCreateUserService() {
  const usersRepository = new UserPrismaRepository();
  const createUserService = new CreateUserService(usersRepository);

  return createUserService;
}
