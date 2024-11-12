import { describe, it } from '@jest/globals';
import { CreateUserService } from '../services/createUserService';
import { UserPrismaRepository } from '../repositories/userPrismaRepository';
import { CreateUserDto } from '../dto/createUserDto';
import { CustomError } from '../../middlewares/errorHandler';
import { User } from '@prisma/client';

let createUserService: CreateUserService;
let userPrismaRepository: UserPrismaRepository;

jest.mock('../repositories/userPrismaRepository');
describe('CreateUserService', () => {
  beforeEach(() => {
    userPrismaRepository = new UserPrismaRepository();
    createUserService = new CreateUserService(userPrismaRepository);
  });

  it('should create a new user when email is not being used', async () => {
    const newUserData: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123456789',
    };

    const newUser: User = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      ...newUserData,
    };

    userPrismaRepository.findByEmail = jest.fn().mockResolvedValue(null);
    userPrismaRepository.create = jest.fn().mockResolvedValue(newUser);

    const user = await createUserService.create(newUserData);

    expect(user).toEqual(newUser);
    expect(user.id).toStrictEqual('37fd1baf-e41b-4cd6-87e7-1347f5db51cb');
    expect(userPrismaRepository.create).toHaveBeenCalledWith(newUserData);
  });

  it('should throw an error when email is being used', async () => {
    const newUserData: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123456789',
    };

    userPrismaRepository.findByEmail = jest
      .fn()
      .mockResolvedValue({ user: { email: 'john@example.com' } });

    const error = new Error() as CustomError;
    error.status = 409;
    error.message = 'Já existe um usuário com esse email';

    await expect(createUserService.create(newUserData)).rejects.toThrow(error);

    expect(userPrismaRepository.create).not.toHaveBeenCalled();
  });
});
