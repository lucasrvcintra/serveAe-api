import { describe, it } from '@jest/globals';
import { FindUserByIdService } from '../services/findUserByIdService';
import { UserPrismaRepository } from '../repositories/userPrismaRepository';
import type { User } from '@prisma/client';

let createUserService: FindUserByIdService;
let userPrismaRepository: UserPrismaRepository;

jest.mock('../repositories/userPrismaRepository');
describe('FindUserByIdService', () => {
  beforeEach(() => {
    userPrismaRepository = new UserPrismaRepository();
    createUserService = new FindUserByIdService(userPrismaRepository);
  });

  it('should find a user by email', async () => {
    const id = '37fd1baf-e41b-4cd6-87e7-1347f5db51cb';

    const user: User = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123456789',
    };

    userPrismaRepository.findById = jest.fn().mockResolvedValue(user);

    const foundUser = await createUserService.findUserById(id);

    expect(foundUser).toEqual(user);
    expect(userPrismaRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should not find a user, because user does not exist', async () => {
    const id = '37fd1baf-e41b-4cd6-87e7-1347f5db51cb';

    userPrismaRepository.findById = jest.fn().mockResolvedValue(null);

    await expect(createUserService.findUserById(id)).rejects.toThrow(
      new Error('Usuário não encontrado')
    );
    expect(userPrismaRepository.findById).toHaveBeenCalledWith(id);
  });
});
