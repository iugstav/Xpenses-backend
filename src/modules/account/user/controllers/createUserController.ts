import { RegisterDto } from "../dto/register.dto";
import { BCryptHash } from "@modules/account/auth/hash/implementations/BCrypthash";
import type { Request, Response } from "express";
import { UsersRepository } from "../repositories/implementations/PrismaUsers.repository";
import { CreateUserService } from "../services/createUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const { name, email, password, createdAt } = request.body;
      const data = new RegisterDto(name, email, password, createdAt);

      const usersRepository = new UsersRepository();
      const bCryptHasher = new BCryptHash();

      const service = new CreateUserService(usersRepository, bCryptHasher);

      const { id, properties } = await service.execute({
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: data.createdAt,
      });

      return response.status(201).json({
        id: id,
        name: properties.name,
        email: properties.email,
        createdAt: properties.createdAt,
        wallets: properties.wallets,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
