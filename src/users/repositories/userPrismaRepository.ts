import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from './userRepository';

export class UserPrismaRepository implements UserRepository {
  private prisma = new PrismaClient();

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: User): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }
}
