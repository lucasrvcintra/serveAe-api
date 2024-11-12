import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/createUserDto';
import { UserRepository } from '../repositories/userRepository';
import { CustomError } from '../../middlewares/errorHandler';

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async create(request: CreateUserDto): Promise<User> {
    const { name, email, address, phone } = request;

    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const error = new Error() as CustomError;
      error.status = 409;
      error.message = 'Já existe um usuário com esse email';
      throw error;
    }

    const newUser = await this.userRepository.create({
      name,
      email,
      address,
      phone,
    });

    return newUser;
  }
}
