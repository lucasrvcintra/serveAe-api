import { User } from '@prisma/client';
import { UserRepository } from '../repositories/userRepository';
import { CustomError } from '../../middlewares/errorHandler';

export class FindUserByIdService {
  constructor(private userRepository: UserRepository) {}

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      const error = new Error() as CustomError;
      error.status = 404;
      error.message = 'Usuário não encontrado';
      throw error;
    }

    return user;
  }
}
