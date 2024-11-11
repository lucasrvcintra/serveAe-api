import { z } from 'zod';
import { Response } from 'express';
import { makeCreateUserService } from '../services/factories/makeCreateUserService';
import { CreateUserDto, CreateUserSchema } from '../dto/createUserDto';

const createUserService = makeCreateUserService();

export default class UsersController {
  async createUser(request: CreateUserDto, response: Response) {
    try {
      const userData = CreateUserSchema.parse(request);
      const user = await createUserService.create(userData);
      return response
        .status(201)
        .json({ user, message: 'Usuário cadastrado com sucesso' });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao criar usuário' });
      }
    }
  }
}
